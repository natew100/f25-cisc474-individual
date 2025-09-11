import Link from 'next/link'

const courses = [
  { id: '101', title: 'CS 101: Introduction to Programming', description: 'Learn the fundamentals of programming with Python.' },
  { id: '202', title: 'CS 202: Web Development', description: 'Build modern web applications with HTML, CSS, and JavaScript.' },
  { id: '303', title: 'CS 303: Database Systems', description: 'Master database design and SQL for data management.' }
]

export default function CoursesPage() {
  return (
    <>
      <h1>All Courses</h1>
      <p>Explore our available courses for this semester.</p>
      
      <div style={{ marginTop: '2rem' }}>
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link href={`/courses/${course.id}`} className="link">
              View Course Details →
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}