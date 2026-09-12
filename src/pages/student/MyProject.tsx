import { Link } from 'react-router-dom';
import { Calendar, Layers, DollarSign, ArrowRight, PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/Progress';
import { useMyProject } from '@/hooks/useMyProject';

export function MyProject() {
  const { project, loading } = useMyProject();

  if (loading) {
    return <p className="text-sm text-muted">Loading your project…</p>;
  }

  if (!project) {
    return (
      <div>
        <PageHeader title="My Project" description="Everything about your active project in one place." />
        <EmptyState
          icon={PlusCircle}
          title="No active project yet"
          description="Submit a request to get a quotation and start your project."
        />
        <div className="mt-5 text-center">
          <Link to="/request-project" className="btn-primary btn-lg">
            Request Your Project
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="My Project" description="Everything about your active project in one place." />

      <div className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-navy-900">{project.title}</h2>
            {project.description && (
              <p className="mt-1 text-sm text-muted max-w-xl">{project.description}</p>
            )}
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-navy-50 p-4">
            <Layers className="h-5 w-5 text-electric-600" />
            <div>
              <p className="text-xs text-navy-500">Category</p>
              <p className="text-sm font-semibold text-navy-900">{project.category ?? '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy-50 p-4">
            <Calendar className="h-5 w-5 text-electric-600" />
            <div>
              <p className="text-xs text-navy-500">Deadline</p>
              <p className="text-sm font-semibold text-navy-900">{project.deadline ?? 'Not set'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-navy-50 p-4">
            <DollarSign className="h-5 w-5 text-electric-600" />
            <div>
              <p className="text-xs text-navy-500">Budget</p>
              <p className="text-sm font-semibold text-navy-900">{project.budget ?? 'Not set'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-navy-700">Overall progress</span>
            <span className="font-semibold text-navy-900">{project.progress}%</span>
          </div>
          <ProgressBar progress={project.progress} className="mt-2" />
        </div>

        <Link to="/student/milestones" className="link mt-6 inline-flex items-center gap-1 text-sm">
          See milestone breakdown <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
