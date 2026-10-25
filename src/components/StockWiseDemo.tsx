import { ExternalLink, X, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export function StockWiseDemo({onClose}:{onClose:()=>void}){
 const [version,setVersion]=useState(0);
 return <section id="stockwise-demo" aria-labelledby="stockwise-demo-title" className="mt-12 scroll-mt-8 rounded-2xl border border-emerald-800 bg-slate-900 overflow-hidden">
  <header className="p-5 sm:p-7 flex flex-wrap items-start justify-between gap-4">
   <div><span className="text-xs uppercase tracking-widest text-emerald-400">Interactive project showcase</span><h2 id="stockwise-demo-title" className="text-2xl font-bold text-white mt-2">StockWise</h2><p className="text-sm text-slate-400 mt-2 max-w-2xl">Start at the login screen and choose a demo role to explore inventory, sales, analytics and returns. This demo uses sample data in memory and never accesses business accounts.</p></div>
   <div className="flex flex-wrap gap-3 text-sm"><a href="/demos/stockwise/index.html#/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">Open full screen<ExternalLink size={15}/></a><button type="button" onClick={()=>setVersion(value=>value+1)} className="inline-flex items-center gap-2 px-3 py-2 border border-slate-700 rounded-lg text-slate-200"><RotateCcw size={15}/>Back to login</button><button type="button" aria-label="Close StockWise demo" onClick={onClose} className="p-2 text-slate-400 hover:text-white"><X size={20}/></button></div>
  </header>
  <iframe key={version} title="StockWise interactive inventory and sales analytics demo" src="/demos/stockwise/index.html#/login" loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-downloads" className="block w-full h-[760px] sm:h-[850px] border-0 bg-slate-100"/>
  <p className="px-6 py-4 text-xs leading-relaxed text-slate-400 border-t border-slate-800">Public demo · Changes reset on reload. Live SQLite forecasting supports Naive, Moving Average and Seasonal Naive models; demo charts are illustrative. Backend deployment and advanced model integration are separate from this showcase.</p>
 </section>;
}
