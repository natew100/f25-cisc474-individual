# API Endpoints Documentation

This document contains all the available API endpoints for the LMS (Learning Management System) backend application.

## Base URL

**Local Development:** `http://localhost:3000`
**Production (Render):** `https://api-[YOUR-RENDER-ID].onrender.com`

> Note: Replace `[YOUR-RENDER-ID]` with your actual Render deployment ID

## Available Endpoints

Each database table has two endpoints:
1. GET all records from the table
2. GET a specific record by its ID

### Users Endpoints

- **Get all users**
  `GET /users`
  Returns all users with their related data (enrollments, owned courses, submissions, and feedback)

- **Get user by ID**
  `GET /users/:id`
  Returns a specific user with all their related data

### Courses Endpoints

- **Get all courses**
  `GET /courses`
  Returns all courses with instructor information, enrollments, and assignments

- **Get course by ID**
  `GET /courses/:id`
  Returns a specific course with all its related data

### Enrollments Endpoints

- **Get all enrollments**
  `GET /enrollments`
  Returns all enrollment records with user and course information

- **Get enrollment by ID**
  `GET /enrollments/:id`
  Returns a specific enrollment record

### Assignments Endpoints

- **Get all assignments**
  `GET /assignments`
  Returns all assignments with their course and problems

- **Get assignment by ID**
  `GET /assignments/:id`
  Returns a specific assignment with all its problems

### Problems Endpoints

- **Get all problems**
  `GET /problems`
  Returns all problems with their assignment and submissions

- **Get problem by ID**
  `GET /problems/:id`
  Returns a specific problem with its submissions

### Submissions Endpoints

- **Get all submissions**
  `GET /submissions`
  Returns all submissions with problem, user, feedback, and grade information

- **Get submission by ID**
  `GET /submissions/:id`
  Returns a specific submission with all its related data

### Feedback Endpoints

- **Get all feedback**
  `GET /feedback`
  Returns all feedback entries with submission and author information

- **Get feedback by ID**
  `GET /feedback/:id`
  Returns a specific feedback entry

### Grades Endpoints

- **Get all grades**
  `GET /grades`
  Returns all grades with their submission information

- **Get grade by ID**
  `GET /grades/:id`
  Returns a specific grade record

## Example Usage

### Local Development

```bash
# Get all users
curl http://localhost:3000/users

# Get a specific course
curl http://localhost:3000/courses/5668a9a8-77b3-4f4e-a916-f04f2c8afcc4

# Get all assignments
curl http://localhost:3000/assignments
```

### Production (Render)

```bash
# Get all users (replace with your actual Render URL)
curl https://api-xxxx.onrender.com/users

# Get a specific course
curl https://api-xxxx.onrender.com/courses/5668a9a8-77b3-4f4e-a916-f04f2c8afcc4

# Get all assignments
curl https://api-xxxx.onrender.com/assignments
```

## Response Format

All endpoints return JSON data. The structure includes:
- For "get all" endpoints: An array of objects
- For "get by id" endpoints: A single object or null if not found

## Related Data

Most endpoints include related data through Prisma's `include` feature:
- **Users**: Include enrollments, owned courses, submissions, and feedback
- **Courses**: Include instructor, enrollments, and assignments
- **Assignments**: Include course and problems
- **Problems**: Include assignment and submissions
- **Submissions**: Include problem, user, feedback, and grade
- **Enrollments**: Include user and course
- **Feedback**: Include submission and author
- **Grades**: Include submission

## Error Handling

- **404 Not Found**: When requesting a specific ID that doesn't exist
- **500 Internal Server Error**: When there's a database connection issue or server error