import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { ArrowRight, BookOpen, FileText, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Authenticated User View
  if (isAuthenticated) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground">
            You're successfully logged in to EduFlow
          </p>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || 'User'}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">{user?.name || 'User'}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/courses" className="group">
            <Card className="hover:border-primary/50 hover:shadow-lg transition-all h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Browse Courses</CardTitle>
                    <CardDescription>Explore available courses</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/assignments" className="group">
            <Card className="hover:border-primary/50 hover:shadow-lg transition-all h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">View Assignments</CardTitle>
                    <CardDescription>Check your assignments</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    );
  }

  // Unauthenticated Landing Page
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
        <div className="py-4">
          <LoginButton />
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
