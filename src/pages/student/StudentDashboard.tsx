import { Link } from 'react-router-dom';
import {
  ListChecks, MessageSquare, FileText, Bell, ArrowRight, Briefcase, PlusCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressRing } from '@/components/ui/Progress';
import { useMyProject } from '@/hooks/useMyProject';
import { useMilestones } from '@/hooks/useMilestones';
import { useMessages } from '@/hooks/useMessages';

export function StudentDashboard() {
  const { user } = useAuth();
  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'there';

  const { project, loading: projectLoading } = useMyProject();
  const { milestones } = useMilestones(project?.id);
  const { messages } = useMessages(project?.id);

  if (projectLoading) {
    return <p className="text-sm text-muted">Loading your project…</p>;
  }

  if (!project) {
    return (
      <div>
        <PageHeader title={`Welcome, ${firstName}`} description="Let's get your first project started." />
        <EmptyState
          icon={PlusCircle}
          title="No active project yet"
          description="Once you submit a project request and it's approved, you'll see its progress, milestones and messages here."
        />
        <div className="mt-5 text-center">
          <Link to="/request-project" className="btn-primary btn-lg">
            Request Your Project
          </Link>
        </div>
      </div>
    );
  }

  const currentMilestone = milestones.find((m) => m.status === 'in-progress');
  const unreadMessages = messages.filter((m) => !m.read && m.sender_role === 'admin').length;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Here's where your project stands right now."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Current Project
              </p>
              <h2 className="mt-1 text-lg font-bold text-navy-900">{project.title}</h2>
            </div>
            <StatusBadge status={project.status} />
          </div>

          <div className="mt-6 flex items-center gap-6">
            <ProgressRing progress={project.progress} size={96} strokeWidth={7} />
            <div className="flex-1">
              {currentMilestone ? (
                <>
                  <p className="text-sm font-medium text-navy-700">Currently working on</p>
                  <p className="mt-1 text-base font-semibold text-navy-900">{currentMilestone.title}</p>
                  <p className="mt-1 text-sm text-muted">{currentMilestone.description}</p>
                </>
              ) : (
                <p className="text-sm text-muted">No milestones added yet — your developer will set these up soon.</p>
              )}
              <Link to="/student/milestones" className="link mt-3 inline-flex items-center gap-1 text-sm">
                View all milestones <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Link to="/student/messages" className="card-hover flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">Messages</p>
              <p className="text-xs text-muted">
                {unreadMessages > 0 ? `${unreadMessages} unread from your developer` : 'All caught up'}
              </p>
            </div>
          </Link>
          <div className="card-hover flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">Notifications</p>
              <p className="text-xs text-muted">You're all caught up</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 card p-6">
        <p className="text-sm font-semibold text-navy-900">Quick Links</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Link to="/student/tasks" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50">
            <ListChecks className="h-4.5 w-4.5 text-navy-400" /> View tasks
          </Link>
          <Link to="/student/quotes" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50">
            <FileText className="h-4.5 w-4.5 text-navy-400" /> Check quotes
          </Link>
          <Link to="/student/project" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50">
            <Briefcase className="h-4.5 w-4.5 text-navy-400" /> Project details
          </Link>
        </div>
      </div>
    </div>
  );
}
