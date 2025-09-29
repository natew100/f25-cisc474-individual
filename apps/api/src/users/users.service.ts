import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      include: {
        enrollments: true,
        ownedCourses: true,
        submissions: true,
        feedback: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        enrollments: true,
        ownedCourses: true,
        submissions: true,
        feedback: true,
      },
    });
  }
}