import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses/index';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CourseCreateIn): Promise<CourseOut> {
    const newCourse = await this.prisma.course.create({
      data: createCourseDto,
      include: {
        instructor: true,
      },
    });

    return {
      id: newCourse.id,
      title: newCourse.title,
      description: newCourse.description,
      code: newCourse.code,
      instructorId: newCourse.instructorId,
      isActive: newCourse.isActive,
      createdAt: newCourse.createdAt.toISOString(),
      updatedAt: newCourse.updatedAt.toISOString(),
      instructor: {
        id: newCourse.instructor.id,
        name: newCourse.instructor.name,
        email: newCourse.instructor.email,
      },
    };
  }

  async findAll(): Promise<CourseOut[]> {
    const courses = await this.prisma.course.findMany({
      include: {
        instructor: true,
        enrollments: true,
        assignments: true,
      },
    });

    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: {
        id: course.instructor.id,
        name: course.instructor.name,
        email: course.instructor.email,
      },
      enrollments: course.enrollments.map((e) => ({
        id: e.id,
        userId: e.userId,
        courseId: e.courseId,
        enrolledAt: e.enrolledAt.toISOString(),
      })),
      assignments: course.assignments.map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        dueDate: a.dueDate?.toISOString() || null,
      })),
    }));
  }

  async findOne(id: string): Promise<CourseOut | null> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: true,
        enrollments: true,
        assignments: true,
      },
    });

    if (!course) {
      return null;
    }

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      code: course.code,
      instructorId: course.instructorId,
      isActive: course.isActive,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
      instructor: {
        id: course.instructor.id,
        name: course.instructor.name,
        email: course.instructor.email,
      },
      enrollments: course.enrollments.map((e) => ({
        id: e.id,
        userId: e.userId,
        courseId: e.courseId,
        enrolledAt: e.enrolledAt.toISOString(),
      })),
      assignments: course.assignments.map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        dueDate: a.dueDate?.toISOString() || null,
      })),
    };
  }

  async update(id: string, updateCourseDto: CourseUpdateIn): Promise<CourseOut> {
    const updatedCourse = await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
      include: {
        instructor: true,
      },
    });

    return {
      id: updatedCourse.id,
      title: updatedCourse.title,
      description: updatedCourse.description,
      code: updatedCourse.code,
      instructorId: updatedCourse.instructorId,
      isActive: updatedCourse.isActive,
      createdAt: updatedCourse.createdAt.toISOString(),
      updatedAt: updatedCourse.updatedAt.toISOString(),
      instructor: {
        id: updatedCourse.instructor.id,
        name: updatedCourse.instructor.name,
        email: updatedCourse.instructor.email,
      },
    };
  }

  async remove(id: string): Promise<CourseOut> {
    const deletedCourse = await this.prisma.course.delete({
      where: { id },
      include: {
        instructor: true,
      },
    });

    return {
      id: deletedCourse.id,
      title: deletedCourse.title,
      description: deletedCourse.description,
      code: deletedCourse.code,
      instructorId: deletedCourse.instructorId,
      isActive: deletedCourse.isActive,
      createdAt: deletedCourse.createdAt.toISOString(),
      updatedAt: deletedCourse.updatedAt.toISOString(),
      instructor: {
        id: deletedCourse.instructor.id,
        name: deletedCourse.instructor.name,
        email: deletedCourse.instructor.email,
      },
    };
  }
}