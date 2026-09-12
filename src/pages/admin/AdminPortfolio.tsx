import { PageHeader } from '@/components/dashboard/PageHeader';
import { portfolioProjects } from '@/data/portfolio';

export function AdminPortfolio() {
  return (
    <div>
      <PageHeader
        title="Portfolio"
        description="Projects shown on the public Portfolio page."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {portfolioProjects.map((p) => (
          <div key={p.id} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-electric-600">{p.category}</p>
            <p className="mt-1 text-sm font-semibold text-navy-900">{p.title}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <span key={t} className="badge-navy">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-navy-400">
        Portfolio entries are currently managed in <code className="rounded bg-navy-100 px-1 py-0.5">src/data/portfolio.ts</code> — an in-console editor isn't built yet.
      </p>
    </div>
  );
}
