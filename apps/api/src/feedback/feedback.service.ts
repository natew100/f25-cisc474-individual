import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.feedback.findMany({
      include: {
        submission: true,
        author: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.feedback.findUnique({
      where: { id },
      include: {
        submission: true,
        author: true,
      },
    });
  }
}