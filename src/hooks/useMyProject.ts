import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export interface ProjectRow {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string;
  progress: number;
  budget: string | null;
  deadline: string | null;
  created_at: string;
}

export function useMyProject() {
  const { user } = useAuth();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;
      if (error) setError(error.message);
      else setProject(data);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [user]);

  return { project, loading, error };
}
