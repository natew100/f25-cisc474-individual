import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.submission.findMany({
      include: {
        problem: true,
        user: true,
        feedback: true,
        grade: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        problem: true,
        user: true,
        feedback: true,
        grade: true,
      },
    });
  }
}