import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, FileText } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            EduFlow
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Modern learning management for the digital age
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/assignments"
            className="inline-flex items-center gap-2 border border-border bg-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            View Assignments
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">Everything you need</h2>
          <p className="text-sm text-muted-foreground">Powerful features for seamless learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <Link to="/courses" className="group">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform" />
              <div className="relative space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Courses</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Browse comprehensive course catalog with detailed instructor information
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all pt-1">
                  Explore courses
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/assignments" className="group">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform" />
              <div className="relative space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Assignments</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Track deadlines and manage your coursework efficiently in one place
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all pt-1">
                  View assignments
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
