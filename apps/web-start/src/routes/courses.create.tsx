import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useApiMutation } from '../integrations/api';
import { CourseCreateIn, CourseOut } from '@repo/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/courses/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [instructorId, setInstructorId] = useState('');

  const mutation = useApiMutation<CourseCreateIn, CourseOut>(
    '/courses',
    'POST',
    {
      invalidateQueries: [['courses']],
      onSuccess: () => {
        navigate({ to: '/courses' });
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description: description || undefined,
      code,
      instructorId,
      isActive: true,
    });
  };

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
          <CardTitle>Create New Course</CardTitle>
          <CardDescription>
            Fill out the form below to add a new course to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mutation.isError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
              <p className="text-sm font-semibold text-destructive">
                Error creating course
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
              <p className="text-xs text-muted-foreground">
                Enter the UUID of an existing instructor user
              </p>
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
                Create Course
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
