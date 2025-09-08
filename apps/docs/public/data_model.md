# Data Model

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : includes
    COURSE ||--o{ ASSIGNMENT : has
    ASSIGNMENT ||--o{ PROBLEM : contains
    PROBLEM ||--o{ SUBMISSION : receives
    USER ||--o{ SUBMISSION : makes
    SUBMISSION ||--o{ FEEDBACK : has
    SUBMISSION ||--o{ GRADE : results_in

    USER {
      int id
      string name
      string email
      string role // student|instructor|admin
    }

    COURSE {
      int id
      string title
      int owner_instructor_id
    }

    ENROLLMENT {
      int id
      int user_id
      int course_id
    }

    ASSIGNMENT {
      int id
      int course_id
      string title
      text description
      datetime due_date
    }

    PROBLEM {
      int id
      int assignment_id
      string title
      text prompt
      int points
    }

    SUBMISSION {
      int id
      int problem_id
      int user_id
      string type // file|short_text|code+reflection
      string file_uri // optional
      text short_text // optional
      text reflection // optional
      datetime submitted_at
    }

    FEEDBACK {
      int id
      int submission_id
      int author_user_id
      text comment
      datetime created_at
    }

    GRADE {
      int id
      int submission_id
      int score
      datetime released_at
    }
```
