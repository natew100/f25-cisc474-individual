import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';

dotenv.config();

type JwtPayload = {
  sub: string;
  iss: string;
  aud: string | string[];
  scope?: string;
};

export interface JwtUser {
  userId: string;
  provider: string;
  providerId: string;
  sub: string;
  scopes: string[];
}

function splitSub(sub: string) {
  const [provider, ...rest] = sub.split('|');
  return { provider, providerId: rest.join('|') };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    console.log('🔐 JWT Validate called with payload:', { sub: payload.sub, aud: payload.aud });

    const { sub } = payload;
    const { provider, providerId } = splitSub(sub);

    console.log('🔍 Looking for auth:', { provider, providerId });

    let auth = await this.prisma.authentication.findFirst({
      where: { provider, providerId },
      include: { user: true },
    });

    if (!auth) {
      console.log('✨ Creating new user - first time login!');
      const user = await this.prisma.user.create({
        data: {
          authentications: {
            create: { provider, providerId },
          },
        },
      });
      console.log('✅ User created:', user.id);
      auth = { ...auth, user } as any;
    } else {
      console.log('👤 Existing user found:', auth.userId);
      await this.prisma.user.update({
        where: { id: auth.userId },
        data: {},
      });
    }

    return {
      userId: auth.userId,
      provider,
      providerId,
      sub,
      scopes: (payload.scope ?? '').split(' ').filter(Boolean),
    } as JwtUser;
  }
}
