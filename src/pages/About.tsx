import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Terminal, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: Code2,
    description: 'Modern, responsive UI/UX built with component-driven architecture.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript (ES6+)'],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    description: 'Scalable server architecture, microservices, and secure RESTful APIs.',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'Django'],
  },
  {
    title: 'Database Architecture',
    icon: Database,
    description: 'Relational & non-relational database design, ORM integration, and query optimization.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Supabase'],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    description: 'Version control, deployment pipelines, containerization, and backend infrastructure.',
    skills: ['Git & GitHub', 'Docker', 'Vercel', 'Postman', 'Linux / PowerShell'],
  },
];

export function About() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Skills & Expertise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Technical Skill Categories
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            A full-stack toolkit covering frontend, backend, databases, and system architecture to bring projects to production.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cat.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-800 text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production Engineering Standards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Built for Clarity, Speed, and Reliability
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-2xl">
                Every project is designed with structured database schemas, clean component hierarchies, documented APIs, and modern UI practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/request-project"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 text-xs"
                >
                  <span>Request Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-950 border border-slate-800 hover:bg-slate-800 transition-all text-xs"
                >
                  <span>Contact Me</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="w-32 h-32 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Cpu className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;