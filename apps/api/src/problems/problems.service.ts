import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.problem.findMany({
      include: {
        assignment: true,
        submissions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.problem.findUnique({
      where: { id },
      include: {
        assignment: true,
        submissions: true,
      },
    });
  }
}