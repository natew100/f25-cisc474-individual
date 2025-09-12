import Link from 'next/link'

const coursesData = {
  '101': {
    title: 'CS 101: Introduction to Programming',
    description: 'Learn the fundamentals of programming with Python.',
    instructor: 'Dr. Smith',
    assignments: [
      { id: '1', title: 'Hello World Program' },
      { id: '2', title: 'Variables and Data Types' },
      { id: '3', title: 'Loops and Conditionals' }
    ]
  },
  '202': {
    title: 'CS 202: Web Development',
    description: 'Build modern web applications with HTML, CSS, and JavaScript.',
    instructor: 'Prof. Johnson',
    assignments: [
      { id: '4', title: 'HTML Portfolio Page' },
      { id: '5', title: 'CSS Styling Project' }
    ]
  },
  '303': {
    title: 'CS 303: Database Systems',
    description: 'Master database design and SQL for data management.',
    instructor: 'Dr. Chen',
    assignments: [
      { id: '1', title: 'ER Diagram Design' },
      { id: '3', title: 'SQL Query Practice' }
    ]
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = coursesData[id as keyof typeof coursesData]
  
  if (!course) {
    return (
      <>
        <h1>Course Not Found</h1>
        <p>The course you are looking for does not exist.</p>
        <Link href="/courses" className="back-link">
          ← Back to Courses
        </Link>
      </>
    )
  }

  return (
    <>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Course Assignments</h2>
        {course.assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <h3>{assignment.title}</h3>
            <Link href={`/assignments/${assignment.id}`} className="link">
              View Assignment →
            </Link>
          </div>
        ))}
      </section>
      
      <Link href="/courses" className="back-link">
        ← Back to All Courses
      </Link>
    </>
  )
}