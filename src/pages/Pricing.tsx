import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star, Info, Sparkles } from 'lucide-react';
import { pricingCategories, pricingNote } from '@/data/pricing';

export function Pricing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-electric-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-electric-500/10 blur-3xl" />

        <div className="section relative py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-sm font-medium text-electric-300">
              <Sparkles className="h-4 w-4" />
              Pricing
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Transparent{' '}
              <span className="bg-gradient-to-r from-electric-400 to-electric-200 bg-clip-text text-transparent">
                Starting Prices
              </span>
            </h1>
            <p className="mt-6 text-lg text-navy-300 max-w-2xl">
              Clear starting prices across seven project categories. Every quotation is customized based on your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Note Banner */}
      <section className="bg-electric-50 py-6">
        <div className="section">
          <div className="flex items-center justify-center gap-3 rounded-xl border border-electric-200 bg-white px-6 py-4 text-center shadow-sm">
            <Info className="h-5 w-5 shrink-0 text-electric-600" />
            <p className="text-sm font-medium text-navy-900 sm:text-base">{pricingNote}</p>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">7 Categories</span>
            <h2 className="mt-4 heading-2">Pricing Categories</h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              Choose a category that matches your project. Each starting price is a baseline — your final quote is tailored to your exact needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricingCategories.map((cat, i) => (
              <div
                key={cat.id}
                className={`card-hover relative flex flex-col p-6 animate-fade-in-up ${cat.popular ? 'ring-2 ring-electric-500' : ''}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {cat.popular && (
                  <span className="badge-electric absolute -top-3 left-1/2 -translate-x-1/2 bg-electric-600 text-white whitespace-nowrap">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-navy-900">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted">{cat.description}</p>
                <p className="mt-4 text-2xl font-bold text-electric-600">{cat.startingPrice}</p>
                <ul className="mt-4 space-y-2 border-t border-navy-100 pt-4">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Every project is different" section */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-electric">Custom Quotations</span>
            <h2 className="mt-4 heading-2">Every Project Is Different</h2>
            <p className="mt-4 text-lg text-muted">
              The final price depends on the project's type, complexity, features, technologies, integrations, deadline and development requirements.
            </p>
            <p className="mt-4 text-base text-muted">
              The starting prices above give you a sense of the baseline cost. Once you submit your project details, you'll receive a quotation that reflects the actual scope of your work — no hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-sm text-center">
          <h2 className="heading-2">Ready to Get a Quote?</h2>
          <p className="mt-4 text-lg text-muted">
            Submit your project requirements or reach out directly to discuss your needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Link to="/request-project" className="btn-primary btn-lg">
              Request Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="btn-outline btn-lg">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
