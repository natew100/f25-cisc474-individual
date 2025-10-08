import { Link } from '@tanstack/react-router'

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            EduFlow
          </Link>
          <nav className="flex gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/assignments" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Assignments
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}
