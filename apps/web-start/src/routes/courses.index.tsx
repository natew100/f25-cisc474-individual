import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '../integrations/fetcher';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { User, Database } from 'lucide-react';

export const Route = createFileRoute('/courses/')({
  component: CoursesPage,
});

interface Course {
  id: string;
  title: string;
  description: string | null;
  code: string;
  instructor: {
    id: string;
    name: string;
    email: string;
  };
}

function CoursesLoadingFallback() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading courses...</p>
      </CardContent>
    </Card>
  );
}

function CoursesPage() {
  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/courses'),
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Explore available courses and start learning
        </p>
      </div>

      {isLoading ? (
        <CoursesLoadingFallback />
      ) : error ? (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive text-lg">Unable to Load Courses</CardTitle>
            <CardDescription className="text-destructive">
              {error instanceof Error ? error.message : 'Failed to fetch courses'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Please make sure the backend API is running and accessible.
            </p>
          </CardContent>
        </Card>
      ) : !courses || courses.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No courses available</CardTitle>
            <CardDescription>Check back later for new course offerings.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="border-green-500/50 bg-green-500/5">
            <CardContent className="flex items-center gap-3 pt-4 pb-4">
              <Database className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700">Backend Connected</p>
                <p className="text-xs text-green-600/80">Loading data from: {import.meta.env.VITE_BACKEND_URL}/courses</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                {courses.length} {courses.length === 1 ? 'item' : 'items'}
              </Badge>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Link key={course.id} to="/courses/$id" params={{ id: course.id }}>
                <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="default" className="text-xs">{course.code}</Badge>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      {course.description && (
                        <CardDescription className="text-sm line-clamp-2">
                          {course.description}
                        </CardDescription>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{course.instructor.name}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
