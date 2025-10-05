import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Info } from 'lucide-react';
import Link from 'next/link';

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/assignments" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Assignments
        </Link>
      </div>

      <Card className="border-dashed">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="secondary">PLACEHOLDER</Badge>
              <CardTitle className="text-2xl">Assignment Details</CardTitle>
              <CardDescription>
                Assignment ID: {params.id}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="w-5 h-5" />
              <p className="text-sm font-medium">Detailed view coming soon</p>
            </div>
            <p className="text-sm text-muted-foreground">
              This page will display comprehensive assignment information once the backend API provides additional details such as:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-6 list-disc">
              <li>Complete assignment description and requirements</li>
              <li>Submission guidelines and format</li>
              <li>Grading rubric and point values</li>
              <li>Related materials and resources</li>
              <li>Submission history and status</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Due Date</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Available when backend provides data</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Course</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Available when backend provides data</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
