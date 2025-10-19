import { z } from 'zod';

// Schema for the output DTO (what the backend returns)
export const CourseOut = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  instructorId: z.string().uuid(),
  isActive: z.boolean(),
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
  // Optional nested relations
  instructor: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
    })
    .optional(),
  enrollments: z
    .array(
      z.object({
        id: z.string().uuid(),
        userId: z.string().uuid(),
        courseId: z.string().uuid(),
        enrolledAt: z.string(),
      }),
    )
    .optional(),
  assignments: z
    .array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        description: z.string().nullable(),
        dueDate: z.string().nullable(),
      }),
    )
    .optional(),
});

// Schema for creating a course (no id, no timestamps)
export const CourseCreateIn = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  code: z.string().min(1, 'Course code is required'),
  instructorId: z.string().uuid('Instructor ID must be a valid UUID'),
  isActive: z.boolean().optional().default(true),
});

// Schema for updating a course (all fields optional)
export const CourseUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  code: z.string().min(1).optional(),
  instructorId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

// Type exports for TypeScript
export type CourseOut = z.infer<typeof CourseOut>;
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;
