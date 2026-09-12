import { PageHeader } from '@/components/dashboard/PageHeader';
import { studentNotifications } from '@/data/sampleData';

export function AdminNotifications() {
  return (
    <div>
      <PageHeader title="Notifications" description="Recent system events." />
      <div className="card divide-y divide-navy-50">
        {studentNotifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-5">
            <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${n.read ? 'bg-navy-200' : 'bg-electric-500'}`} />
            <div>
              <p className="text-sm font-medium text-navy-800">{n.title}</p>
              <p className="text-sm text-muted">{n.message}</p>
              <p className="mt-0.5 text-xs text-navy-400">{n.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
