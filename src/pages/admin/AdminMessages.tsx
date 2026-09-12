import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function AdminMessages() {
  return (
    <div>
      <PageHeader title="Messages" description="Conversations are managed from within each project." />
      <EmptyState
        icon={MessageSquare}
        title="Open a project to view its messages"
        description="Each project has its own conversation thread with the student — head to Active Projects and pick one."
      />
      <div className="mt-4 text-center">
        <Link to="/admin/projects" className="btn-outline btn-sm">Go to Active Projects</Link>
      </div>
    </div>
  );
}
