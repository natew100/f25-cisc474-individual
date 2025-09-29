import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany({
      include: {
        instructor: true,
        enrollments: true,
        assignments: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: true,
        enrollments: true,
        assignments: true,
      },
    });
  }
}