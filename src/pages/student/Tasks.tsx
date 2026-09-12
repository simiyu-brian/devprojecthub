import { CheckSquare, Square, ListChecks } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { useMyProject } from '@/hooks/useMyProject';
import { useMilestones } from '@/hooks/useMilestones';
import { supabase } from '@/lib/supabase';

export function Tasks() {
  const { project, loading: projectLoading } = useMyProject();
  const { milestones, loading: milestonesLoading, refresh } = useMilestones(project?.id);

  const toggle = async (taskId: string, done: boolean) => {
    await supabase.from('milestone_tasks').update({ done: !done }).eq('id', taskId);
    refresh();
  };

  if (projectLoading || milestonesLoading) {
    return <p className="text-sm text-muted">Loading tasks…</p>;
  }

  if (!project) {
    return (
      <div>
        <PageHeader title="Tasks" description="A flat view of every task across your project's milestones." />
        <EmptyState
          icon={ListChecks}
          title="No active project yet"
          description="Tasks will show up here once your project has milestones set up."
        />
      </div>
    );
  }

  const hasTasks = milestones.some((m) => m.tasks.length > 0);

  return (
    <div>
      <PageHeader
        title="Tasks"
        description="A flat view of every task across your project's milestones."
      />

      {!hasTasks ? (
        <EmptyState
          icon={ListChecks}
          title="No tasks yet"
          description="Your developer hasn't broken any milestones into tasks yet."
        />
      ) : (
        <div className="space-y-5">
          {milestones.filter((m) => m.tasks.length > 0).map((m) => (
            <div key={m.id} className="card p-6">
              <p className="text-sm font-semibold text-navy-900">{m.title}</p>
              <ul className="mt-3 space-y-1">
                {m.tasks.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => toggle(t.id, t.done)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-navy-50"
                    >
                      {t.done ? (
                        <CheckSquare className="h-4.5 w-4.5 flex-shrink-0 text-electric-600" />
                      ) : (
                        <Square className="h-4.5 w-4.5 flex-shrink-0 text-navy-300" />
                      )}
                      <span className={t.done ? 'text-navy-500 line-through' : 'text-navy-700'}>
                        {t.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
