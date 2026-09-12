import { PageHeader } from '@/components/dashboard/PageHeader';
import { faqs } from '@/data/faqs';

export function AdminFAQs() {
  return (
    <div>
      <PageHeader title="FAQs" description="Questions shown on the public FAQ page." />
      <div className="card divide-y divide-navy-50">
        {faqs.map((f) => (
          <div key={f.id} className="p-5">
            <p className="text-sm font-semibold text-navy-900">{f.question}</p>
            <p className="mt-1 text-sm text-muted">{f.answer}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-navy-400">
        FAQs are currently managed in <code className="rounded bg-navy-100 px-1 py-0.5">src/data/faqs.ts</code> — an in-console editor isn't built yet.
      </p>
    </div>
  );
}
