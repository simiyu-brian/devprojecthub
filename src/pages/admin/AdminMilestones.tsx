import { Link } from 'react-router-dom';
import { ListChecks } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';

export function AdminMilestones() {
  return (
    <div>
      <PageHeader title="Milestones" description="Manage milestones from within each project." />
      <EmptyState
        icon={ListChecks}
        title="Open a project to manage its milestones"
        description="Milestones and tasks are managed per-project now — head to Active Projects and pick one."
      />
      <div className="mt-4 text-center">
        <Link to="/admin/projects" className="btn-outline btn-sm">Go to Active Projects</Link>
      </div>
    </div>
  );
}
