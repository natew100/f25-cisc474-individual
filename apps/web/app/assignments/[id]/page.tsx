import Link from 'next/link'

const assignmentsData = {
  '1': {
    title: 'Hello World Program',
    courseId: '101',
    courseName: 'CS 101: Introduction to Programming',
    points: 10,
    dueDate: 'February 15, 2024',
    prompt: 'Write a simple Python program that prints "Hello, World!" to the console. This is your first programming assignment to get familiar with Python syntax and running programs.'
  },
  '2': {
    title: 'Variables and Data Types',
    courseId: '101',
    courseName: 'CS 101: Introduction to Programming',
    points: 20,
    dueDate: 'February 22, 2024',
    prompt: 'Create a Python program that demonstrates the use of different data types (int, float, string, boolean) and performs basic operations with variables. Include comments explaining each data type.'
  },
  '3': {
    title: 'Loops and Conditionals',
    courseId: '101',
    courseName: 'CS 101: Introduction to Programming',
    points: 30,
    dueDate: 'March 1, 2024',
    prompt: 'Build a program that uses loops (for and while) and conditional statements (if/elif/else) to solve a problem. Create a simple number guessing game where the user has to guess a random number.'
  }
}

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const assignment = assignmentsData[params.id as keyof typeof assignmentsData]
  
  if (!assignment) {
    return (
      <>
        <h1>Assignment Not Found</h1>
        <p>The assignment you are looking for does not exist.</p>
        <Link href="/assignments" className="back-link">
          ← Back to Assignments
        </Link>
      </>
    )
  }

  return (
    <>
      <h1>{assignment.title}</h1>
      <div className="card">
        <p><strong>Course:</strong> {assignment.courseName}</p>
        <p><strong>Points:</strong> {assignment.points}</p>
        <p><strong>Due Date:</strong> {assignment.dueDate}</p>
      </div>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Assignment Prompt</h2>
        <div className="card">
          <p>{assignment.prompt}</p>
        </div>
      </section>
      
      <div style={{ marginTop: '2rem' }}>
        <Link href={`/courses/${assignment.courseId}`} className="back-link">
          ← Back to Course
        </Link>
        <Link href="/assignments" className="back-link" style={{ marginLeft: '2rem' }}>
          ← Back to All Assignments
        </Link>
      </div>
    </>
  )
}