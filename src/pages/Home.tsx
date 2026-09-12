import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Smartphone, Server, Database, BrainCircuit,
  BarChart3, Plug, Rocket, Lightbulb, Monitor, Bug, GraduationCap,
  CheckCircle2, Star, Zap, Shield, Clock, Users, Briefcase,
} from 'lucide-react';
import { problemCards, techCategories, processSteps } from '@/data/process';
import { pricingCategories, pricingNote } from '@/data/pricing';

const iconMap: Record<string, typeof Code2> = {
  Code2, Smartphone, Server, Database, BrainCircuit, BarChart3, Plug, Rocket,
  Lightbulb, Monitor, Bug, GraduationCap,
};

export function Home() {
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
                <Zap className="h-4 w-4" />
                Final-Year Project Development & Technical Support
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Turn Your Final-Year Project Idea Into a{' '}
                <span className="bg-gradient-to-r from-electric-400 to-electric-200 bg-clip-text text-transparent">
                  Working System.
                </span>
              </h1>
              <p className="mt-6 text-lg text-navy-300 max-w-xl">
                Professional development, technical support and project guidance for IT, Computer Science and technology students. Get help transforming your project requirements into a functional, tested and presentable system.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/request-project" className="btn-primary btn-lg">
                  Request Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/services" className="btn btn-lg border-2 border-navy-600 text-white hover:border-electric-400 hover:bg-navy-800">
                  Explore Services
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-navy-400">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-400" /> Starting from KSh 4,000+</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-400" /> Custom quotations</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-400" /> Demonstration support</span>
              </div>
            </div>

            {/* Code preview card */}
            <div className="relative animate-fade-in-up animate-delay-200 hidden lg:block">
              <div className="rounded-2xl border border-navy-700 bg-navy-800/80 backdrop-blur shadow-2xl">
                <div className="flex items-center gap-2 border-b border-navy-700 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-error-500" />
                    <div className="h-3 w-3 rounded-full bg-warning-500" />
                    <div className="h-3 w-3 rounded-full bg-accent-500" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-navy-400">project-dashboard.tsx</span>
                </div>
                <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
                  <pre className="text-navy-300"><span className="text-purple-400">import</span> {'{ '}<span className="text-electric-300">Project</span>{' } '}<span className="text-purple-400">from</span> <span className="text-accent-400">'@/types'</span>;{'\n\n'}
<span className="text-purple-400">const</span> <span className="text-yellow-300">project</span>: <span className="text-electric-300">Project</span> = {'{'}{'\n'}
{'  '}title: <span className="text-accent-400">'Hospital Management System'</span>,{'\n'}
{'  '}student: <span className="text-accent-400">'John Mwangi'</span>,{'\n'}
{'  '}status: <span className="text-accent-400">'In Development'</span>,{'\n'}
{'  '}progress: <span className="text-orange-300">65</span>,{'\n'}
{'  '}milestone: <span className="text-accent-400">'Backend Development'</span>,{'\n'}
{'}'};{'\n\n'}
<span className="text-purple-400">function</span> <span className="text-yellow-300">Dashboard</span>() {'{'}{'\n'}
{'  '}<span className="text-purple-400">return</span> <span className="text-electric-300">&lt;ProjectView /&gt;</span>;{'\n'}
{'}'}</pre>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-electric-500/30 bg-navy-800 px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/20">
                    <CheckCircle2 className="h-4 w-4 text-accent-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Milestone 3 Complete</p>
                    <p className="text-xs text-navy-400">Frontend Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Technology section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <h2 className="heading-2">Technology Categories</h2>
            <p className="mt-3 text-lg text-muted">Expertise across the full development stack</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {techCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? Code2;
              return (
                <div
                  key={cat.name}
                  className="card-hover group flex flex-col items-center gap-3 p-6 text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-50 text-electric-600 transition-colors group-hover:bg-electric-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-navy-900">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">Common Challenges</span>
            <h2 className="mt-4 heading-2">Stuck on Your Final-Year Project?</h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              Whatever stage you're at, get the technical support you need to move forward.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problemCards.map((card, i) => {
              const Icon = iconMap[card.icon] ?? Lightbulb;
              return (
                <div
                  key={card.title}
                  className="card-hover p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 text-electric-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-navy-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted">{card.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link to="/request-project" className="btn-primary btn-lg">
              Get Technical Support
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">How It Works</span>
            <h2 className="mt-4 heading-2">A Clear 5-Step Process</h2>
            <p className="mt-3 text-lg text-muted">From idea to handover — every step is transparent.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-electric-700 text-white shadow-lg shadow-electric-600/20">
                    <span className="text-lg font-bold">{step.step}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-full h-0.5 bg-navy-200" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/how-it-works" className="btn-outline">
              See Full Process
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">Pricing</span>
            <h2 className="mt-4 heading-2">Transparent Starting Prices</h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">{pricingNote}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pricingCategories.slice(0, 6).map((cat, i) => (
              <div
                key={cat.id}
                className={`card-hover p-6 animate-fade-in-up ${cat.popular ? 'ring-2 ring-electric-500' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {cat.popular && (
                  <span className="badge-electric absolute -top-3 left-1/2 -translate-x-1/2 bg-electric-600 text-white">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-navy-900">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted">{cat.description}</p>
                <p className="mt-4 text-2xl font-bold text-electric-600">{cat.startingPrice}</p>
                <ul className="mt-4 space-y-2">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/pricing" className="btn-primary btn-lg">
              View Full Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="bg-navy-900 py-16">
        <div className="section">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { icon: Users, value: '50+', label: 'Students Supported' },
              { icon: Briefcase, value: '40+', label: 'Projects Completed' },
              { icon: Shield, value: '100%', label: 'Project Ownership' },
              { icon: Clock, value: '5+ Years', label: 'Development Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/20 text-electric-400">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-navy-400">{stat.label}</p>
              </div>
            ))}
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
