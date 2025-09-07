# Data Model (ERD — Major Nouns)

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : includes
    COURSE ||--o{ ASSIGNMENT : has
    ASSIGNMENT ||--o{ PROBLEM : contains
    USER ||--o{ SUBMISSION : makes
    PROBLEM ||--o{ SUBMISSION : receives
    SUBMISSION ||--o{ ARTIFACT : stores
    SUBMISSION ||--o{ FEEDBACK : receives
    SUBMISSION ||--o{ GRADE : results_in
    RUBRIC ||--o{ RUBRICITEM : has
    ASSIGNMENT ||--o{ RUBRIC : uses
    USER ||--o{ FEEDBACK : authors
    USER ||--o{ COMMENT : writes
    SUBMISSION ||--o{ COMMENT : has
    USER ||--o{ NOTIFICATION : receives

    USER {
      uuid id PK
      string name
      string email
      string role
      json prefs
      datetime created_at
    }

    COURSE {
      uuid id PK
      string code
      string title
      string term
      uuid owner_instructor_id FK
    }

    ENROLLMENT {
      uuid id PK
      uuid user_id FK
      uuid course_id FK
      string role
      datetime enrolled_at
    }

    ASSIGNMENT {
      uuid id PK
      uuid course_id FK
      string title
      text description
      datetime due_at
      json late_policy
      bool allow_resubmits
    }

    PROBLEM {
      uuid id PK
      uuid assignment_id FK
      string title
      text prompt
      json starter_files
      json tests_public
      json tests_hidden
      json constraints
      int points
    }

    SUBMISSION {
      uuid id PK
      uuid problem_id FK
      uuid user_id FK
      string type
      datetime submitted_at
      int attempt_number
      string status
    }

    ARTIFACT {
      uuid id PK
      uuid submission_id FK
      string kind
      string uri
      json meta
    }

    RUBRIC {
      uuid id PK
      uuid assignment_id FK
      string name
    }

    RUBRICITEM {
      uuid id PK
      uuid rubric_id FK
      string criterion
      int points
      float weight
    }

    GRADE {
      uuid id PK
      uuid submission_id FK
      float score
      json breakdown
      datetime released_at
    }

    FEEDBACK {
      uuid id PK
      uuid submission_id FK
      uuid author_user_id FK
      text body
      json inline_comments
      datetime created_at
    }

    COMMENT {
      uuid id PK
      uuid submission_id FK
      uuid author_user_id FK
      text body
      datetime created_at
    }

    NOTIFICATION {
      uuid id PK
      uuid user_id FK
      string title
      text body
      bool read
      datetime created_at
    }
```

## Enum Values

### USER.role
- `learner`
- `instructor`
- `admin`

### ENROLLMENT.role
- `learner`
- `ta`
- `instructor`

### SUBMISSION.type
- `CODE`
- `CODE_VOICE`
- `NOTEBOOK`

### SUBMISSION.status
- `QUEUED`
- `RUNNING`
- `PASSED`
- `FAILED`

### ARTIFACT.kind
- `CODE`
- `LOG`
- `AUDIO`
- `TRANSCRIPT`
- `RESULTS`
- `DIFF`

## Notes

- **Code+Voice** is modeled by `SUBMISSION.type = CODE_VOICE` plus `ARTIFACT(kind = AUDIO | TRANSCRIPT)`.
- **Attempt history** is the sequence of `SUBMISSION.attempt_number` per user/problem; diffs stored as `ARTIFACT(kind=DIFF)`.
- **Autograder outputs** in `ARTIFACT(kind=RESULTS|LOG)`.

## Key Design Features

### Flexible Submission Types
The system supports multiple submission formats including traditional code, code with voice narration, and Jupyter notebooks.

### Comprehensive Feedback System
- Rubric-based grading with weighted criteria
- Inline code comments (stored as JSON mapping file:line to comment)
- General feedback text
- Discussion comments

### Artifact Storage
Uses signed URLs (`uri` field) for efficient storage of large files with metadata support (language, duration, etc.).

### Role Hierarchy
- Global user roles (system-wide permissions)
- Course-specific enrollment roles (course-level permissions)

### Constraints and Policies
- Problems support constraints (language requirements, time/memory limits)
- Assignments support flexible late policies via JSON configuration

### Attempt Tracking
Built-in versioning with attempt numbers and diff storage for tracking changes between submissions.
