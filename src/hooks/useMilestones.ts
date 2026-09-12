import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface TaskRow {
  id: string;
  milestone_id: string;
  title: string;
  done: boolean;
  position: number;
}

export interface MilestoneRow {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  progress: number;
  position: number;
  tasks: TaskRow[];
}

export function useMilestones(projectId: string | null | undefined) {
  const [milestones, setMilestones] = useState<MilestoneRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!projectId) {
      setMilestones([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const { data: milestoneRows, error: milestoneError } = await supabase
      .from('milestones')
      .select('*')
      .eq('project_id', projectId)
      .order('position', { ascending: true });

    if (milestoneError) {
      setError(milestoneError.message);
      setLoading(false);
      return;
    }

    const ids = (milestoneRows ?? []).map((m) => m.id);
    let tasksByMilestone: Record<string, TaskRow[]> = {};

    if (ids.length > 0) {
      const { data: taskRows, error: taskError } = await supabase
        .from('milestone_tasks')
        .select('*')
        .in('milestone_id', ids)
        .order('position', { ascending: true });

      if (taskError) {
        setError(taskError.message);
        setLoading(false);
        return;
      }

      tasksByMilestone = (taskRows ?? []).reduce<Record<string, TaskRow[]>>((acc, t) => {
        (acc[t.milestone_id] ??= []).push(t);
        return acc;
      }, {});
    }

    setMilestones(
      (milestoneRows ?? []).map((m) => ({ ...m, tasks: tasksByMilestone[m.id] ?? [] })),
    );
    setError(null);
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { milestones, loading, error, refresh };
}
