import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Welcome to Mini Canvas LMS</h1>
      <p>Your simple learning management system for courses and assignments.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <Link href="/courses" className="button">
          View All Courses
        </Link>
        <Link href="/assignments" className="button">
          View All Assignments
        </Link>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h2>Featured Courses</h2>
        <div className="card">
          <h3>CS 101: Introduction to Programming</h3>
          <p>Learn the fundamentals of programming with Python.</p>
          <Link href="/courses/101" className="link">
            View Course →
          </Link>
        </div>
        <div className="card">
          <h3>CS 202: Web Development</h3>
          <p>Build modern web applications with HTML, CSS, and JavaScript.</p>
          <Link href="/courses/202" className="link">
            View Course →
          </Link>
        </div>
      </section>
    </>
  )
}
