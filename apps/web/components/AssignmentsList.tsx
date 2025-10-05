'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Database } from 'lucide-react';

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

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        setApiUrl(url);
        const response = await fetch(`${url}/assignments`);

        if (!response.ok) {
          throw new Error(`Failed to fetch assignments: ${response.statusText}`);
        }

        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive text-lg">Unable to Load Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive mb-2">{error}</p>
          <p className="text-xs text-muted-foreground">
            Please make sure the backend API is running and accessible.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (assignments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">No assignments available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Check back later for new assignments.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-green-500/50 bg-green-500/5">
        <CardContent className="flex items-center gap-3 pt-4 pb-4">
          <Database className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-700">Backend Connected</p>
            <p className="text-xs text-green-600/80">Loading data from: {apiUrl}/assignments</p>
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
            <Link href={`/assignments/${assignment.id}`} className="text-primary hover:underline text-xs font-medium">
              View Assignment →
            </Link>
          </CardFooter>
        </Card>
        ))}
      </div>
    </div>
  );
}
