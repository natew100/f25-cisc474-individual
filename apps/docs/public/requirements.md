# Requirements

## Roles

### Student
- Enroll in courses (join by code or instructor add)
- View assignments and due dates
- Submit solutions in allowed formats:
  - Code/file upload
  - **Code + Reflection** (code/file + short text explanation)
  - Short-answer text (for quizzes/simple prompts)
- View grades and instructor feedback
- See submission history

### Instructor
- Create/manage courses and enroll students
- Create assignments and problems (title, prompt, points, due date)
- Choose allowed submission types (code/file, **code+reflection**, short answer)
- Review submissions, leave feedback, assign grades
- Download submissions as a ZIP; export grades as CSV

### Admin
- Basic user and course management (create user, create course)
- Reset passwords / set roles (student, instructor, admin)

---

## MVP Scope (1 semester)
- Single web app + single database
- Auth with sessions (login/register)
- CRUD for courses, assignments, problems
- Submissions (file upload, text, **code+reflection**)
- Feedback + grade entry
- Due date display and simple "late" indicator
- Table views for instructors to review submissions
- CSV export of grades

### Stretch (optional, time permitting)
- Basic autograder stub for one language (e.g., Python tests) OR manual grade workflow only
- Tags/filters for assignments
- Per-problem rubric (simple point breakdown)