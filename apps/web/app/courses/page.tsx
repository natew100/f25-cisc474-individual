import { Suspense } from 'react';
import CoursesList from '@/components/CoursesList';
import { Card, CardContent } from '@/components/ui/card';

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

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Explore available courses and start learning
        </p>
      </div>

      <Suspense fallback={<CoursesLoadingFallback />}>
        <CoursesList />
      </Suspense>
    </div>
  );
}