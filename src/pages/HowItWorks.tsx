import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MessageSquare, 
  Code, 
  CheckCircle2, 
  Rocket, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Submit Project Request',
    subtitle: 'Share your requirements',
    description: 'Fill out our quick project request form with your scope, target tech stack, features, and target completion date.',
    icon: FileText,
    highlights: ['Detailed scope submission', 'Tech stack selection', 'Timeline definition'],
  },
  {
    number: '02',
    title: 'Requirement Review & Quote',
    subtitle: 'Transparent scope analysis',
    description: 'We review your submission, clarify functional requirements, and provide a detailed timeline breakdown with a transparent quote.',
    icon: MessageSquare,
    highlights: ['Architecture breakdown', 'Transparent pricing', 'Direct consultation'],
  },
  {
    number: '03',
    title: 'Iterative Development',
    subtitle: 'Real-time progress tracking',
    description: 'Watch your system come to life via your personal student dashboard with live milestones, task updates, and code previews.',
    icon: Code,
    highlights: ['Live dashboard updates', 'Milestone tracking', 'Clean codebase standards'],
  },
  {
    number: '04',
    title: 'Review & Testing',
    subtitle: 'Quality assurance',
    description: 'We run end-to-end testing and walk you through a live demonstration of the complete software system to ensure every requirement is met.',
    icon: CheckCircle2,
    highlights: ['Live interactive demo', 'Bug fixes & refinements', 'System walkthrough'],
  },
  {
    number: '05',
    title: 'Final Handover & Support',
    subtitle: 'Deployment & setup',
    description: 'Receive full source code access, setup documentation, database scripts, and support to ensure seamless execution on your local machine.',
    icon: Rocket,
    highlights: ['Complete source code', 'Comprehensive documentation', 'Post-handover support'],
  },
];

export function HowItWorks() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>5-Step Process</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            From Idea to Handover
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            A clear, transparent process that takes your system from initial requirements to a fully tested, production-grade application.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all relative flex flex-col justify-between group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-700 group-hover:text-blue-500/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Bullet Checklist */}
                <div className="pt-4 border-t border-slate-800/80">
                  <ul className="space-y-2">
                    {step.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* CTA Card as the 6th Grid Slot */}
          <div className="bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-6 shadow-lg shadow-blue-600/30">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Build?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Submit your project specifications today and get an architecture roadmap with a quick turn-around.
              </p>
            </div>
            
            <Link
              to="/request-project"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 text-sm"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HowItWorks;