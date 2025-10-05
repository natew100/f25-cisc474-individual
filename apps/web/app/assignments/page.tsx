import { Suspense } from 'react';
import AssignmentsList from '@/components/AssignmentsList';
import { Card, CardContent } from '@/components/ui/card';

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

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          View and manage your upcoming assignments
        </p>
      </div>

      <Suspense fallback={<AssignmentsLoadingFallback />}>
        <AssignmentsList />
      </Suspense>
    </div>
  );
}