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
      enum role  // learner|instructor|admin
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
      enum role // learner|ta|instructor
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
      json constraints  // lang, time/mem limits
      int points
    }

    SUBMISSION {
      uuid id PK
      uuid problem_id FK
      uuid user_id FK
      enum type // CODE | CODE_VOICE | NOTEBOOK
      datetime submitted_at
      int attempt_number
      enum status // QUEUED|RUNNING|PASSED|FAILED
    }

    ARTIFACT {
      uuid id PK
      uuid submission_id FK
      enum kind // CODE|LOG|AUDIO|TRANSCRIPT|RESULTS|DIFF
      string uri  // signed URL
      json meta   // language, duration, etc.
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
      json breakdown // per criterion/test
      datetime released_at
    }

    FEEDBACK {
      uuid id PK
      uuid submission_id FK
      uuid author_user_id FK
      text body
      json inline_comments // file:line -> comment
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

**Notes**
- **Code+Voice** is modeled by `SUBMISSION.type = CODE_VOICE` plus `ARTIFACT(kind = AUDIO | TRANSCRIPT)`.
- Attempt history is the sequence of `SUBMISSION.attempt_number` per user/problem; diffs stored as `ARTIFACT(kind=DIFF)`.
- Autograder outputs in `ARTIFACT(kind=RESULTS|LOG)`.

