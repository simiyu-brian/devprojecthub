import { useState, FormEvent } from 'react';
import { User, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { PageHeader } from '@/components/dashboard/PageHeader';

export function Profile() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState((user?.user_metadata?.full_name as string) ?? '');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('idle');
    const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
    setSaving(false);
    setStatus(error ? 'error' : 'saved');
  };

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account details." />

      <div className="card max-w-lg p-6">
        {status === 'saved' && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
            <CheckCircle2 className="h-4 w-4" /> Profile updated.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-error-50 px-4 py-3 text-sm text-error-700">
            <AlertCircle className="h-4 w-4" /> Couldn't save your changes. Try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="label">Full name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
              <input type="email" value={user?.email ?? ''} disabled className="input pl-10 opacity-60" />
            </div>
            <p className="mt-1.5 text-xs text-navy-400">Email changes aren't supported yet.</p>
          </div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
