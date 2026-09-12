import { Link } from 'react-router-dom';
import {
  ArrowRight, Mail, Code2, Server, Database, Wrench, Sparkles, Zap,
} from 'lucide-react';
import { skillCategories, developerBio } from '@/data/skills';

const categoryIcons: Record<string, typeof Code2> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Other: Wrench,
};

export function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-electric-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-electric-500/10 blur-3xl" />

        <div className="section relative py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-sm font-medium text-electric-300">
                <Sparkles className="h-4 w-4" />
                About the Developer
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Brian{' '}
                <span className="bg-gradient-to-r from-electric-400 to-electric-200 bg-clip-text text-transparent">
                  Simiyu
                </span>
              </h1>
              <p className="mt-3 text-xl font-semibold text-electric-300">The Dev</p>
              <p className="mt-1 text-lg text-navy-300">Software Developer</p>
              <p className="mt-6 text-lg text-navy-300 max-w-xl">{developerBio}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/request-project" className="btn-primary btn-lg">
                  Request Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/contact" className="btn btn-lg border-2 border-navy-600 text-white hover:border-electric-400 hover:bg-navy-800">
                  Contact Me
                </Link>
              </div>
            </div>

            {/* Profile card */}
            <div className="relative animate-fade-in-up animate-delay-200 hidden lg:block">
              <div className="rounded-2xl border border-navy-700 bg-navy-800/80 p-8 backdrop-blur shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-electric-700 text-white shadow-lg shadow-electric-600/30">
                    <Code2 className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">Brian Simiyu</p>
                    <p className="text-electric-300">The Dev · Software Developer</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 border-t border-navy-700 pt-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-5 w-5 text-electric-400" />
                    <a href="mailto:bsimiyu698@gmail.com" className="text-navy-300 transition-colors hover:text-electric-300">
                      bsimiyu698@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="h-5 w-5 text-electric-400" />
                    <span className="text-navy-300">Available for project requests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">Skills & Expertise</span>
            <h2 className="mt-4 heading-2">Technical Skill Categories</h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              A full-stack toolkit covering frontend, backend, databases, and the supporting tools that bring a project to production.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat, i) => {
              const Icon = categoryIcons[cat.category] ?? Wrench;
              return (
                <div
                  key={cat.category}
                  className="card-hover group p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-50 text-electric-600 transition-colors group-hover:bg-electric-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-navy-900">{cat.category}</h3>
                  <ul className="mt-3 space-y-2">
                    {cat.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-sm text-navy-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-electric-500" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-electric">Get In Touch</span>
            <h2 className="mt-4 heading-2">Let's Build Something</h2>
            <p className="mt-4 text-lg text-muted">
              Have a project in mind or a question about the process? Reach out and let's talk.
            </p>
            <a
              href="mailto:bsimiyu698@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-electric-600 transition-colors hover:text-electric-700"
            >
              <Mail className="h-5 w-5" />
              bsimiyu698@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-sm text-center">
          <h2 className="heading-2">Ready to Work Together?</h2>
          <p className="mt-4 text-lg text-muted">
            Submit your project requirements or get in touch to discuss your idea.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Link to="/request-project" className="btn-primary btn-lg">
              Request Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="btn-outline btn-lg">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
