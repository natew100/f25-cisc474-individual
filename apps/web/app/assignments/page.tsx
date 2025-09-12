import Link from 'next/link'

// Sample assignment list with due dates - AI generated mock data
const assignments = [
  { id: '1', title: 'Hello World Program', course: 'CS 101', dueDate: 'Feb 15, 2024' },
  { id: '2', title: 'Variables and Data Types', course: 'CS 101', dueDate: 'Feb 22, 2024' },
  { id: '3', title: 'Loops and Conditionals', course: 'CS 101', dueDate: 'Mar 1, 2024' }
]

export default function AssignmentsPage() {
  return (
    <>
      <h1>All Assignments</h1>
      <p>View and manage your upcoming assignments.</p>
      
      {/* Display each assignment as a card with key info */}
      <div style={{ marginTop: '2rem' }}>
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card">
            <h3>{assignment.title}</h3>
            <p><strong>Course:</strong> {assignment.course}</p>
            <p><strong>Due:</strong> {assignment.dueDate}</p>
            <Link href={`/assignments/${assignment.id}`} className="link">
              View Assignment →
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}