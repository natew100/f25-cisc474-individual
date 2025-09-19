import { prisma } from "./client";

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.grade.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creating users...");

  // Create users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@eduflow.edu",
      role: "ADMIN",
    },
  });

  const instructor = await prisma.user.create({
    data: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@eduflow.edu",
      role: "INSTRUCTOR",
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@student.edu",
      role: "STUDENT",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@student.edu",
      role: "STUDENT",
    },
  });

  console.log("Creating courses...");

  // Create course
  const course = await prisma.course.create({
    data: {
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming",
      code: "CS101",
      instructorId: instructor.id,
      isActive: true,
    },
  });

  console.log("Creating enrollments...");

  // Enroll students
  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: course.id,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: student2.id,
      courseId: course.id,
    },
  });

  console.log("Creating assignments and problems...");

  // Create assignment
  const assignment = await prisma.assignment.create({
    data: {
      courseId: course.id,
      title: "Python Basics",
      description: "Introduction to Python",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      isPublished: true,
    },
  });

  // Create problems
  const problem1 = await prisma.problem.create({
    data: {
      assignmentId: assignment.id,
      title: "Hello World",
      prompt: "Write a program that prints 'Hello, World!'",
      points: 10,
      orderIndex: 1,
    },
  });

  const problem2 = await prisma.problem.create({
    data: {
      assignmentId: assignment.id,
      title: "Calculator",
      prompt: "Create a simple calculator function",
      points: 20,
      orderIndex: 2,
    },
  });

  console.log("Creating submissions...");

  // Create submissions
  const submission1 = await prisma.submission.create({
    data: {
      problemId: problem1.id,
      userId: student1.id,
      type: "CODE_REFLECTION",
      code: 'print("Hello, World!")',
      reflection: "This is my first Python program!",
    },
  });

  const submission2 = await prisma.submission.create({
    data: {
      problemId: problem1.id,
      userId: student2.id,
      type: "SHORT_TEXT",
      shortText: "I would use print() function to display Hello World",
    },
  });

  const submission3 = await prisma.submission.create({
    data: {
      problemId: problem2.id,
      userId: student1.id,
      type: "FILE",
      fileUri: "/uploads/calculator.py",
    },
  });

  console.log("Creating feedback...");

  // Add feedback
  await prisma.feedback.create({
    data: {
      submissionId: submission1.id,
      authorId: instructor.id,
      comment: "Great job! Your code is correct.",
    },
  });

  console.log("📊 Creating grades...");

  // Add grades
  await prisma.grade.create({
    data: {
      submissionId: submission1.id,
      score: 10,
      maxScore: 10,
      releasedAt: new Date(),
    },
  });

  await prisma.grade.create({
    data: {
      submissionId: submission2.id,
      score: 8,
      maxScore: 10,
      releasedAt: new Date(),
    },
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });