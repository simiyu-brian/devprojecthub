import { PageHeader } from '@/components/dashboard/PageHeader';
import { services } from '@/data/services';

export function AdminServices() {
  return (
    <div>
      <PageHeader title="Services" description="Services listed on the public Services page." />
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.id} className="card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
                <s.icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-semibold text-navy-900">{s.title}</p>
            </div>
            <p className="mt-3 text-sm text-muted">{s.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-navy-400">
        Services are currently managed in <code className="rounded bg-navy-100 px-1 py-0.5">src/data/services.ts</code> — an in-console editor isn't built yet.
      </p>
    </div>
  );
}
