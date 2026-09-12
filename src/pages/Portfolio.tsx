import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { portfolioProjects, portfolioFilters } from '@/data/portfolio';

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.categoryType === activeFilter);

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
              Our Work
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Projects
            </h1>
            <p className="mt-6 text-lg text-navy-300 max-w-2xl">
              A showcase of systems built for students across web, mobile, AI/ML, and database development.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {portfolioFilters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={
                    isActive
                      ? 'btn-primary px-4 py-2 text-sm'
                      : 'btn-outline px-4 py-2 text-sm'
                  }
                  aria-pressed={isActive}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <article
                key={project.id}
                className="card-hover group flex flex-col overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 badge-electric bg-navy-900/90 text-electric-300 backdrop-blur">
                    {project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-navy-900">
                    {project.title}
                  </h3>

                  {/* Technologies */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="badge-electric">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-muted">{project.description}</p>

                  <div className="mt-6 pt-4 border-t border-navy-100">
                    <Link
                      to="/request-project"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-electric-600 transition-colors hover:text-electric-700"
                    >
                      View Project
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="mt-12 text-center text-muted">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-sm text-center">
          <h2 className="heading-2">Request Your Project</h2>
          <p className="mt-4 text-lg text-muted">
            Have a project idea of your own? Submit your requirements and receive a customized quotation — no obligation to proceed.
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
