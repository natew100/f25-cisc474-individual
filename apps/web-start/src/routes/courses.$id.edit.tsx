import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';
import { CourseUpdateIn, CourseOut } from '@repo/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/courses/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Fetch the existing course data
  const { data: course, isLoading, error } = useQuery<CourseOut>({
    queryKey: ['courses', id],
    queryFn: backendFetcher<CourseOut>(`/courses/${id}`),
  });

  // Populate form when course data loads
  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description || '');
      setCode(course.code);
      setInstructorId(course.instructorId);
      setIsActive(course.isActive);
    }
  }, [course]);

  const mutation = useMutation({
    mutationFn: (updatedCourse: CourseUpdateIn) => {
      return mutateBackend<CourseOut>(`/courses/${id}`, 'PATCH', updatedCourse);
    },
    onSuccess: (data: CourseOut) => {
      queryClient.setQueryData(['courses', id], data);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      navigate({ to: '/courses' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description: description || undefined,
      code,
      instructorId,
      isActive,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading course...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/courses' })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive text-lg">Unable to Load Course</CardTitle>
            <CardDescription className="text-destructive">
              {error instanceof Error ? error.message : 'Course not found'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/courses' })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle>Edit Course</CardTitle>
              <CardDescription>
                Update the course information below
              </CardDescription>
            </div>
            <Badge variant={course.isActive ? 'default' : 'secondary'}>
              {course.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {mutation.isError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
              <p className="text-sm font-semibold text-destructive">
                Error updating course
              </p>
              <p className="text-xs text-destructive/80 mt-1">
                {mutation.error.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Course Title <span className="text-destructive">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Introduction to Computer Science"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium">
                  Course Code <span className="text-destructive">*</span>
                </label>
                <input
                  id="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="CS101"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the course (optional)"
                rows={3}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="instructorId" className="text-sm font-medium">
                Instructor ID <span className="text-destructive">*</span>
              </label>
              <input
                id="instructorId"
                type="text"
                required
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                placeholder="Instructor UUID"
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Course is active
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update Course
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/courses' })}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
