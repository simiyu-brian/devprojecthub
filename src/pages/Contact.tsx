import { Mail, MapPin, User, ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 px-5 py-16 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-400"><Mail size={15} />Get in Touch</span>
          <h1 className="mb-5 text-4xl font-black tracking-tight sm:text-5xl">Contact Me</h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">Have a question, an opportunity, or an idea? Email me directly and let's talk.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-10">
          <div className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="rounded-xl bg-blue-600/10 p-4 text-blue-400"><User size={28} /></div>
            <div><h2 className="text-xl font-bold">Brian Simiyu</h2><p className="mt-1 text-sm text-slate-400">Software Developer</p></div>
          </div>
          <p className="mb-2 text-sm text-slate-400">Reach me at</p>
          <a href="mailto:bsimiyu698@gmail.com" className="break-all text-xl font-semibold text-blue-300 underline-offset-4 hover:underline sm:text-2xl">bsimiyu698@gmail.com</a>
          <p className="mb-8 mt-5 flex items-center gap-2 text-sm text-slate-400"><MapPin size={16} />Nairobi, Kenya</p>
          <a href="mailto:bsimiyu698@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"><Mail size={18} />Email Me<ArrowUpRight size={17} /></a>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">Opens your email app. You can also copy my address into Gmail or your preferred email service.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;