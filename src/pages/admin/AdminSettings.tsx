import { Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/dashboard/PageHeader';

export function AdminSettings() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="Settings" description="Account and console preferences." />
      <div className="card max-w-lg p-6">
        <p className="label">Signed in as</p>
        <div className="flex items-center gap-3 rounded-lg bg-navy-50 p-3">
          <Mail className="h-4.5 w-4.5 text-navy-400" />
          <span className="text-sm text-navy-800">{user?.email}</span>
        </div>
        <p className="mt-4 text-xs text-navy-400">
          Console-wide settings (branding, notification preferences, team roles) aren't built yet.
        </p>
      </div>
    </div>
  );
}
