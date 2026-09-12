import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { services } from '@/data/services';

export function Services() {
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
              What We Offer
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Services
            </h1>
            <p className="mt-6 text-lg text-navy-300 max-w-2xl">
              Professional software development and technical support for IT, Computer Science and technology students.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">Our Services</span>
            <h2 className="mt-4 heading-2">Comprehensive Development & Support</h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              From building your system from scratch to debugging, testing, and preparing for demonstration — we cover every stage of your project.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="card-hover group flex flex-col p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-50 text-electric-600 transition-colors group-hover:bg-electric-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{service.description}</p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="badge-electric">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="mt-5 space-y-2 border-t border-navy-100 pt-4">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-navy-700"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-sm text-center">
          <h2 className="heading-2">Ready to Build Your Project?</h2>
          <p className="mt-4 text-lg text-muted">
            Submit your project requirements and receive a customized quotation. No obligation to proceed.
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
