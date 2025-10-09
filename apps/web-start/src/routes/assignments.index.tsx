import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { serverFetch } from '../integrations/server-fetcher';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Database } from 'lucide-react';

export const Route = createFileRoute('/assignments/')({
  component: AssignmentsPage,
});

interface Assignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  course: {
    id: string;
    title: string;
    code: string;
  };
}

function AssignmentsLoadingFallback() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading assignments...</p>
      </CardContent>
    </Card>
  );
}

function AssignmentsPage() {
  const { data: assignments, isLoading, error } = useQuery<Assignment[]>({
    queryKey: ['assignments'],
    queryFn: () => serverFetch<Assignment[]>('/assignments'),
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          View and manage your upcoming assignments
        </p>
      </div>

      {isLoading ? (
        <AssignmentsLoadingFallback />
      ) : error ? (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive text-lg">Unable to Load Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive mb-2">
              {error instanceof Error ? error.message : 'Failed to fetch assignments'}
            </p>
            <p className="text-xs text-muted-foreground">
              Please make sure the backend API is running and accessible.
            </p>
          </CardContent>
        </Card>
      ) : !assignments || assignments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No assignments available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Check back later for new assignments.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="border-green-500/50 bg-green-500/5">
            <CardContent className="flex items-center gap-3 pt-4 pb-4">
              <Database className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700">Backend Connected</p>
                <p className="text-xs text-green-600/80">Loading data from: {import.meta.env.VITE_BACKEND_URL}/assignments</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                {assignments.length} {assignments.length === 1 ? 'item' : 'items'}
              </Badge>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-2">
                  <Badge variant="secondary" className="w-fit text-xs">{assignment.course.code}</Badge>
                  <CardTitle className="text-lg leading-tight">{assignment.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {assignment.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{assignment.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/assignments/$id" params={{ id: assignment.id }} className="text-primary hover:underline text-xs font-medium">
                    View Assignment →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
