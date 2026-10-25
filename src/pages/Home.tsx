import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, Mail, Sparkles, Terminal, Pause, Play } from 'lucide-react';
import { skillCategories } from '@/data/skills';

export function Home() {
  const { hash } = useLocation();
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (hash === '#skills') document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section aria-labelledby="hero-title" className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden px-5 pb-28 pt-36 sm:min-h-[720px] sm:px-8 lg:min-h-[calc(100svh)]">
        <img src="/media/portfolio-background.jpg" alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        {motion && <video autoPlay muted loop playsInline preload="metadata" poster="/media/portfolio-background.jpg" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover"><source src="/media/portfolio-background.mp4" type="video/mp4" /></video>}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950" />
        <div className="mx-auto w-full max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-blue-300 sm:text-xs"><Sparkles size={15} className="text-amber-400" />Software &amp; Project Engineering Hub</div>
          <h1 id="hero-title" className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">Turn Ideas Into<br /><span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Production Code</span></h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">Get robust full-stack applications, database designs, and custom software systems built with production-grade architecture.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/request-project" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Request Project<ArrowRight size={16} /></Link>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-500 bg-slate-900/50 px-7 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><Mail size={16} />Contact Me</Link>
          </div>
          <Link to="/portfolio" className="mt-6 inline-block text-sm font-medium text-blue-300 underline-offset-4 hover:underline">View Projects</Link>
        </div>
        <a href="#skills" aria-label="Explore my skills" className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"><ArrowDown size={28} /></a>
        <button onClick={() => setMotion(!motion)} type="button" aria-label={motion ? 'Pause background video' : 'Play background video'} className="absolute bottom-6 right-5 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-300 hover:text-white">{motion ? <Pause size={13} /> : <Play size={13} />}<span className="hidden sm:inline">{motion ? 'Pause motion' : 'Play motion'}</span></button>
      </section>
      <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">What I work with</p>
        <h2 id="skills-title" className="mb-10 text-center text-3xl font-bold text-white">Skills &amp; Expertise</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((group) => <div key={group.category} className="rounded-xl border border-slate-800 bg-slate-900/70 p-6"><h3 className="mb-5 text-lg font-semibold text-white">{group.category}</h3><div className="flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-md border border-blue-400/15 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-200">{skill}</span>)}</div></div>)}
        </div>
        <div className="mt-10 text-center"><Link to="/portfolio" className="inline-flex rounded-md bg-white px-7 py-3 text-sm font-semibold text-slate-900 hover:bg-blue-100">View My Projects</Link></div>
        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 sm:flex"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80" alt="Developer terminal setup" loading="lazy" className="h-52 w-full object-cover sm:w-1/2" /><div className="flex flex-col justify-center p-8"><Terminal className="mb-4 h-6 w-6 text-blue-400" /><p className="mb-2 text-xs text-slate-400">Tech Stack Supported</p><p className="text-lg font-semibold text-white">React · Next.js · Python · PostgreSQL</p><Link to="/services" className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300">Explore Services →</Link></div></div>
      </section>
    </div>
  );
}

export default Home;
