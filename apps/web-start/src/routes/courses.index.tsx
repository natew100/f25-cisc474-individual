import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiQuery, useApiMutation } from '../integrations/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { User, Database, Plus, Edit, Trash2, AlertTriangle, X, Lock } from 'lucide-react';
import { CourseOut } from '@repo/api';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/courses/')({
  component: CoursesPage,
});

// Using CourseOut from @repo/api instead of local interface
type Course = CourseOut;

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

function EditModal({
  isOpen,
  onClose,
  onSave,
  course,
  isSaving,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; code: string; description: string }) => void;
  course: Course | null;
  isSaving: boolean;
}) {
  const [title, setTitle] = useState(course?.title || '');
  const [code, setCode] = useState(course?.code || '');
  const [description, setDescription] = useState(course?.description || '');

  if (!isOpen || !course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      code,
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-2xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Edit className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Edit Course</CardTitle>
                <CardDescription className="mt-1">
                  Update course information
                </CardDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-sm transition-colors"
              disabled={isSaving}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                required
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                Code
              </label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., CS101"
                required
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                rows={4}
                disabled={isSaving}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  courseTitle,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseTitle: string;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-md mx-4 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-lg">Delete Course</CardTitle>
                <CardDescription className="mt-1">
                  This action cannot be undone
                </CardDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-sm transition-colors"
              disabled={isDeleting}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <span className="font-semibold text-foreground">"{courseTitle}"</span>?
            All associated data will be permanently removed.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CoursesPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{ id: string; title: string } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  // ALL HOOKS MUST BE AT THE TOP - before any conditional returns!
  const { data: courses, isLoading, error } = useApiQuery<Course[]>(
    ['courses'],
    '/courses'
  );

  const deleteMutation = useApiMutation<string, CourseOut>(
    (courseId) => `/courses/${courseId}`,
    'DELETE',
    {
      invalidateQueries: [['courses']],
      onSuccess: () => {
        setDeleteModalOpen(false);
        setCourseToDelete(null);
      },
    }
  );

  const updateMutation = useApiMutation<{ title: string; code: string; description: string }, CourseOut>(
    () => `/courses/${courseToEdit?.id}`,
    'PATCH',
    {
      invalidateQueries: [['courses']],
      onSuccess: () => {
        setEditModalOpen(false);
        setCourseToEdit(null);
      },
    }
  );

  // Show login prompt if not authenticated (AFTER all hooks)
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Explore available courses and start learning
          </p>
        </div>

        <Card className="border-primary/50">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Authentication Required</CardTitle>
            <CardDescription>
              Please log in to view and manage courses
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDeleteClick = (courseId: string, courseTitle: string) => {
    setCourseToDelete({ id: courseId, title: courseTitle });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      deleteMutation.mutate(courseToDelete.id);
    }
  };

  const handleEditClick = (course: Course) => {
    setCourseToEdit(course);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (data: { title: string; code: string; description: string }) => {
    if (courseToEdit) {
      updateMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Explore available courses and start learning
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: '/courses/create' })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
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
              <Card key={course.id} className="h-full hover:shadow-md hover:border-primary/50 transition-all group">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="default" className="text-xs">{course.code}</Badge>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditClick(course)}
                        className="p-1.5 hover:bg-primary/10 rounded transition-colors"
                        title="Edit course"
                      >
                        <Edit className="w-3.5 h-3.5 text-primary" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(course.id, course.title)}
                        className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
                        title="Delete course"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link to="/courses/$id" params={{ id: course.id }}>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors cursor-pointer">
                        {course.title}
                      </CardTitle>
                    </Link>
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
                    <span>{course.instructor?.name || 'Unknown'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <EditModal
        key={courseToEdit?.id}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setCourseToEdit(null);
        }}
        onSave={handleSaveEdit}
        course={courseToEdit}
        isSaving={updateMutation.isPending}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCourseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        courseTitle={courseToDelete?.title || ''}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
