import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { supabase } from '@/lib/supabase';

interface StudentSummary {
  email: string;
  projectCount: number;
}

export function Students() {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('projects').select('email');
      const counts = new Map<string, number>();
      (data ?? []).forEach((p) => counts.set(p.email, (counts.get(p.email) ?? 0) + 1));
      setStudents(Array.from(counts, ([email, projectCount]) => ({ email, projectCount })));
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Students" description="Everyone who has an approved project so far." />

      {loading && <p className="text-sm text-muted">Loading…</p>}

      {!loading && students.length === 0 && (
        <EmptyState
          icon={Users}
          title="No students yet"
          description="Once you approve a project request, that student will show up here."
        />
      )}

      {!loading && students.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((s) => (
            <div key={s.email} className="card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-100 text-sm font-semibold text-electric-700">
                {s.email.charAt(0).toUpperCase()}
              </div>
              <p className="mt-3 text-sm font-semibold text-navy-900">{s.email}</p>
              <p className="mt-2 text-xs text-navy-400">
                {s.projectCount} project{s.projectCount !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
