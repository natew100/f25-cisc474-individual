# Requirements (with User Stories)

## Vision
Create a flexible, user‑friendly, and scalable **Learning Management System** for programming courses that manages **courses, assignments, problems, submissions,** and **feedback**, with a unique **Code+Voice** submission type to deepen understanding and improve feedback quality.

---

## Roles & High-Level Capabilities

### Learner
- Browse and enroll in courses (self-enroll or instructor invite)
- View assignments, due dates, and grading rubrics
- Work on programming problems in a built-in code editor & test runner
- Submit solutions as:
  - **Standard Code** (files, language/runtime)
  - **Code+Voice** (code + 60–90s audio explanation recorded in-app)
  - Notebook upload (ipynb) or external repo link (optional)
- See autograder feedback (test results, runtime logs) and instructor comments
- Resubmit until deadline (or with late penalty rules)
- View grades, per‑test breakdown, and feedback history
- Discuss in problem-level discussion threads
- Receive notifications (due dates, feedback posted, test failures)

### Instructor
- Create and manage courses, enrollments, and sections
- Create assignments composed of one or more programming problems
- Author problems with:
  - Starter code & hidden/public tests
  - Constraints (language version, time limits, memory)
  - Rubrics & points per test/problem
- Choose allowed submission types per assignment (Code, **Code+Voice**, Notebook)
- Configure autograder (container runtime, test suites)
- Review submissions (diff view, run logs, **audio transcript**)
- Leave feedback (inline comments, rubric scoring, audio feedback optional)
- Regrade single test or whole assignment; post grade releases
- Analytics: class-level progress, item analysis, late trends

### Administrator
- Manage users, roles, and SSO (e.g., campus IdP)
- Global catalogs, terms/semesters, and course provisioning
- Resource quotas & sandbox runtimes (Docker images)
- Policy: late rules, plagiarism settings, retention
- System health, queues, and grading workers
- Compliance & exports (FERPA/GDPR), backups

---

## Non-Functional Requirements
- **Scalability:** handle 1k+ concurrent autograder jobs; queue-based workers
- **Accessibility:** WCAG 2.2 AA; transcripts for all audio (**Code+Voice** auto-ASR)
- **Security:** RBAC, least-privilege; signed URLs for artifacts; audit logs
- **Reliability:** 99.9% for core UX; autograder job retry with idempotency keys
- **Interoperability:** LTI 1.3, grade passback; export to CSV/JSON; webhook events
- **Observability:** metrics (Prometheus), traces, structured logs

---

## User Stories (Representative)

### Learner Stories
- As a learner, I can see all assignments with due dates so I can plan my week.
- As a learner, I can submit **Code+Voice**, so the instructor understands my approach even when tests fail.
- As a learner, I can view per‑test autograder output so I can fix failing cases quickly.
- As a learner, I can see a history of my attempts (diffs) to reflect on progress.
- As a learner, I receive notifications when feedback or grades are posted.

### Instructor Stories
- As an instructor, I can define a rubric with criteria and weights to grade consistently.
- As an instructor, I can restrict submission types (e.g., **force Code+Voice** on “Explain your algorithm” tasks).
- As an instructor, I can listen to the learner’s **audio explanation** and read its transcript.
- As an instructor, I can leave inline comments on specific lines of code.
- As an instructor, I can re-run tests on a submission after updating test cases.

### Admin Stories
- As an admin, I can bulk-provision courses for a term.
- As an admin, I can configure compute quotas per course to control costs.
- As an admin, I can review plagiarism reports across the institution.

---

## Acceptance Criteria (Examples)
- Given a published assignment with Code+Voice enabled, when a learner submits, **the audio is uploaded, transcribed, and associated** with the submission; transcript is searchable by the instructor.
- Given a submission, the system **stores versioned artifacts** (code, logs, audio, transcript) and shows a **timeline of attempts** with diffs.
- Given a rubric, the instructor can **grade per criterion** and the grade is computed and stored; learners see grade + rubric breakdown upon release.