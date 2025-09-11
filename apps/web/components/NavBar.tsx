import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/courses">Courses</Link>
        </li>
        <li>
          <Link href="/assignments">Assignments</Link>
        </li>
      </ul>
    </nav>
  )
}