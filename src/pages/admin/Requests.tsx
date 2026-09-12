import { useEffect, useState } from 'react';
import { Inbox, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { supabase } from '@/lib/supabase';

interface ProjectRequestRow {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  institution: string | null;
  project_type: string;
  description: string;
  budget: string | null;
  deadline: string | null;
  duration: string | null;
  status: string;
  project_id: string | null;
  created_at: string;
}

export function Requests() {
  const [requests, setRequests] = useState<ProjectRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('project_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) setError(error.message);
    else {
      setRequests(data ?? []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (request: ProjectRequestRow) => {
    setApprovingId(request.id);
    const title = `${request.project_type} — ${request.full_name}`;
    const { error } = await supabase.rpc('approve_request', {
      p_request_id: request.id,
      p_title: title,
    });
    setApprovingId(null);
    if (error) {
      setError(error.message);
      return;
    }
    load();
  };

  return (
    <div>
      <PageHeader
        title="Project Requests"
        description="Live submissions from the public 'Request Your Project' form."
      />

      {loading && <p className="text-sm text-muted">Loading requests…</p>}

      {!loading && error && (
        <div className="card flex items-start gap-3 p-6 text-sm text-error-700">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Something went wrong</p>
            <p className="mt-1 text-muted">
              {error} — make sure both migrations have been applied to your Supabase project.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <EmptyState
          icon={Inbox}
          title="No requests yet"
          description="Submissions from the public project request form will show up here."
        />
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-xs uppercase tracking-wider text-navy-400">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Institution</th>
                <th className="px-3 py-3 font-medium">Deadline</th>
                <th className="px-3 py-3 font-medium">Duration</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Submitted</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-navy-50 last:border-0">
                  <td className="px-6 py-3">
                    <p className="font-medium text-navy-800">{r.full_name}</p>
                    <p className="text-xs text-muted">{r.email}</p>
                  </td>
                  <td className="px-3 py-3 text-muted">{r.project_type}</td>
                  <td className="px-3 py-3 text-muted">{r.institution ?? '—'}</td>
                  <td className="px-3 py-3 text-muted">{r.deadline ?? '—'}</td>
                  <td className="px-3 py-3 text-muted">{r.duration ?? '—'}</td>
                  <td className="px-3 py-3">
                    <span className="badge-navy">{r.status}</span>
                  </td>
                  <td className="px-3 py-3 text-muted">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {r.project_id ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approved
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApprove(r)}
                        disabled={approvingId === r.id}
                        className="btn-outline btn-sm"
                      >
                        {approvingId === r.id ? 'Approving…' : 'Approve'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
