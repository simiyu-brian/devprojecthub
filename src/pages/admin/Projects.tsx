import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/Progress';
import { supabase } from '@/lib/supabase';
import type { ProjectRow } from '@/hooks/useMyProject';

export function Projects() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) setError(error.message);
      else setProjects(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Active Projects" description="Every project currently in the pipeline." />

      {loading && <p className="text-sm text-muted">Loading projects…</p>}

      {!loading && error && (
        <div className="card flex items-start gap-3 p-6 text-sm text-error-700">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <EmptyState
          icon={Briefcase}
          title="No projects yet"
          description="Approve a project request to create your first project."
        />
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-xs uppercase tracking-wider text-navy-400">
                <th className="px-6 py-3 font-medium">Project</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Progress</th>
                <th className="px-3 py-3 font-medium">Budget</th>
                <th className="px-6 py-3 font-medium">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50">
                  <td className="px-6 py-3">
                    <Link to={`/admin/projects/${p.id}`} className="font-medium text-navy-800 hover:text-electric-600">
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted">{p.category ?? '—'}</p>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-3 py-3 w-40">
                    <div className="flex items-center gap-2">
                      <ProgressBar progress={p.progress} className="w-24" />
                      <span className="text-xs text-muted">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted">{p.budget ?? '—'}</td>
                  <td className="px-6 py-3 text-muted">{p.deadline ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
