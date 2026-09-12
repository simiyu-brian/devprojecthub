import { Link } from 'react-router-dom';
import {
  ArrowRight, ClipboardList, Search, FileText, Code2, CheckCircle2,
} from 'lucide-react';
import { processSteps } from '@/data/process';

const stepIcons = [ClipboardList, Search, FileText, Code2, CheckCircle2];

export function HowItWorks() {
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
              <ArrowRight className="h-4 w-4" />
              The Process
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              How It{' '}
              <span className="bg-gradient-to-r from-electric-400 to-electric-200 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="mt-6 text-lg text-navy-300 max-w-2xl">
              A clear, transparent 5-step process that takes your project from an idea to a tested, presentable system. Every step is designed to keep you informed and confident.
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section">
          <div className="text-center">
            <span className="badge-electric">5-Step Process</span>
            <h2 className="mt-4 heading-2">From Idea to Handover</h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              Every project follows the same transparent path — no surprises, no hidden steps.
            </p>
          </div>

          {/* Desktop: Horizontal timeline */}
          <div className="mt-16 hidden lg:block">
            <div className="relative">
              {/* Horizontal connecting line */}
              <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-electric-500 via-electric-400 to-electric-500" />

              <div className="grid grid-cols-5 gap-4">
                {processSteps.map((step, i) => {
                  const Icon = stepIcons[i] ?? ClipboardList;
                  return (
                    <div
                      key={step.step}
                      className="relative flex flex-col items-center text-center animate-fade-in-up"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      {/* Step number circle */}
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-electric-700 text-white shadow-lg shadow-electric-600/30 ring-4 ring-white">
                        <Icon className="h-8 w-8" />
                      </div>
                      <span className="mt-4 text-sm font-bold text-electric-600">{step.step}</span>
                      <h3 className="mt-1 heading-3">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="mt-12 lg:hidden">
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-500 via-electric-400 to-electric-500" />

              <div className="space-y-8">
                {processSteps.map((step, i) => {
                  const Icon = stepIcons[i] ?? ClipboardList;
                  return (
                    <div
                      key={step.step}
                      className="relative flex gap-6 animate-fade-in-up"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      {/* Step number circle */}
                      <div className="relative z-10 flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-electric-700 text-white shadow-lg shadow-electric-600/30 ring-4 ring-white" style={{ width: '4.5rem', height: '4.5rem' }}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1 pt-2">
                        <span className="text-sm font-bold text-electric-600">{step.step}</span>
                        <h3 className="mt-1 text-lg font-semibold text-navy-900">{step.title}</h3>
                        <p className="mt-2 text-sm text-muted">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16 lg:py-20">
        <div className="section-sm text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="heading-2 text-white">Ready to Start?</h2>
            <p className="mt-4 text-lg text-navy-300">
              Submit your project requirements and begin the process today. No obligation to proceed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
              <Link to="/request-project" className="btn-primary btn-lg">
                Request Your Project
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn btn-lg border-2 border-navy-600 text-white hover:border-electric-400 hover:bg-navy-800">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
