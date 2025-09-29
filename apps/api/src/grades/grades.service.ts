import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.grade.findMany({
      include: {
        submission: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
      include: {
        submission: true,
      },
    });
  }
}