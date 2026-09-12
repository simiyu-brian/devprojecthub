import { CheckCircle2, Circle, Clock, ListChecks } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/Progress';
import { useMyProject } from '@/hooks/useMyProject';
import { useMilestones } from '@/hooks/useMilestones';

export function Milestones() {
  const { project, loading: projectLoading } = useMyProject();
  const { milestones, loading: milestonesLoading } = useMilestones(project?.id);

  if (projectLoading || milestonesLoading) {
    return <p className="text-sm text-muted">Loading milestones…</p>;
  }

  if (!project) {
    return (
      <div>
        <PageHeader title="Milestones" description="Track each phase of your project from start to finish." />
        <EmptyState
          icon={ListChecks}
          title="No active project yet"
          description="Milestones will show up here once your project is approved and set up."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Milestones" description="Track each phase of your project from start to finish." />

      {milestones.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No milestones yet"
          description="Your developer hasn't added milestones for this project yet."
        />
      ) : (
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div key={m.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {m.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-accent-500" />
                    ) : m.status === 'in-progress' ? (
                      <Clock className="h-5 w-5 text-electric-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-navy-300" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Phase {i + 1}
                    </p>
                    <h3 className="text-base font-bold text-navy-900">{m.title}</h3>
                    {m.description && <p className="mt-1 text-sm text-muted max-w-lg">{m.description}</p>}
                  </div>
                </div>
                <StatusBadge status={m.status} />
              </div>

              <div className="mt-4 pl-8">
                <div className="flex items-center justify-between text-xs text-navy-500">
                  <span>{m.due_date ? `Due ${m.due_date}` : 'No due date set'}</span>
                  <span>{m.progress}%</span>
                </div>
                <ProgressBar progress={m.progress} className="mt-1.5" />

                {m.tasks.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {m.tasks.map((t) => (
                      <li key={t.id} className="flex items-center gap-2 text-sm">
                        {t.done ? (
                          <CheckCircle2 className="h-4 w-4 text-accent-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-navy-300" />
                        )}
                        <span className={t.done ? 'text-navy-500 line-through' : 'text-navy-700'}>
                          {t.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
