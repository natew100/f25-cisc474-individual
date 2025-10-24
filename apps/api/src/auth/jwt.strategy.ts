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
  // Custom claims with namespace
  'https://f25-cisc474-individual-uiof.onrender.com/name'?: string;
  'https://f25-cisc474-individual-uiof.onrender.com/email'?: string;
  'https://f25-cisc474-individual-uiof.onrender.com/email_verified'?: boolean;
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
    const name = payload['https://f25-cisc474-individual-uiof.onrender.com/name'];
    const email = payload['https://f25-cisc474-individual-uiof.onrender.com/email'];

    console.log('🔐 JWT Validate called with payload:', {
      sub: payload.sub,
      aud: payload.aud,
      name: name,
      email: email
    });

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
          name: name || null,
          email: email || null,
          authentications: {
            create: { provider, providerId },
          },
        },
      });
      console.log('✅ User created:', user.id, 'with name:', user.name, 'email:', user.email);
      auth = { ...auth, user } as any;
    } else {
      console.log('👤 Existing user found:', auth.userId);
      // Update user with latest name/email from Auth0
      await this.prisma.user.update({
        where: { id: auth.userId },
        data: {
          name: name || auth.user.name,
          email: email || auth.user.email,
        },
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
