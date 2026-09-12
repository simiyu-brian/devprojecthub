import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { supabase } from '@/lib/supabase';
import type { ProjectRow } from '@/hooks/useMyProject';

export function AdminDashboard() {
  const [newRequests, setNewRequests] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [recentProjects, setRecentProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ count: reqCount }, { data: projects }] = await Promise.all([
        supabase.from('project_requests').select('*', { count: 'exact', head: true }).is('project_id', null),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
      ]);

      setNewRequests(reqCount ?? 0);
      const all = projects ?? [];
      setActiveProjects(all.filter((p) => p.status !== 'Completed' && p.status !== 'Cancelled').length);
      setCompletedProjects(all.filter((p) => p.status === 'Completed').length);
      setRecentProjects(all.slice(0, 5));
      setLoading(false);
    })();
  }, []);

  const stats = [
    { label: 'New Requests', value: newRequests, icon: Inbox, color: 'text-electric-600 bg-electric-50' },
    { label: 'Active Projects', value: activeProjects, icon: Briefcase, color: 'text-warning-600 bg-warning-50' },
    { label: 'Completed', value: completedProjects, icon: CheckCircle2, color: 'text-accent-600 bg-accent-50' },
  ];

  return (
    <div>
      <PageHeader title="Developer Console" description="An overview of requests and projects." />

      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-navy-900">{loading ? '—' : s.value}</p>
            <p className="text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card mt-5 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-navy-900">Recent Projects</p>
          <Link to="/admin/projects" className="link inline-flex items-center gap-1 text-sm">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Loading…</p>
        ) : recentProjects.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No projects yet — approve a request to create your first one.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-xs uppercase tracking-wider text-navy-400">
                  <th className="pb-2 pr-4 font-medium">Project</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((p) => (
                  <tr key={p.id} className="border-b border-navy-50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-navy-800">
                      <Link to={`/admin/projects/${p.id}`} className="hover:text-electric-600">{p.title}</Link>
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-3 text-muted">{p.deadline ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
