import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Code2, ShieldCheck, Zap } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Software & Project Engineering Hub</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
                Turn Ideas Into <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Production Code
                </span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 max-w-xl">
                Get robust full-stack applications, database designs, and custom software systems built with production-grade architecture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/request-project"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                >
                  <span>Request Project</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>

            {/* Right Side High-Tech Graphic Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
                  alt="Developer Terminal Setup"
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
                  <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Tech Stack Supported</p>
                      <p className="text-sm font-bold text-white">React • Next.js • Python • PostgreSQL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;