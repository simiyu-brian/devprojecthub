import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const home = location.pathname === '/';
  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <header className={`absolute inset-x-0 top-0 z-50 text-white ${home ? 'bg-slate-950/40 backdrop-blur-md' : 'bg-slate-950 border-b border-slate-800'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo variant="light" className="shrink-0" />
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((link) => (
            <Link key={link.name} to={link.href}
              aria-current={location.pathname + location.hash === link.href ? 'page' : undefined}
              className="py-2 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 aria-[current=page]:text-white">
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="border-l border-slate-700 pl-5 text-sm text-slate-300 hover:text-white">Sign In</Link>
        </nav>
        <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls="mobile-navigation"
          className="rounded-md p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 lg:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-white/10 bg-slate-950/95 px-5 py-4 shadow-xl backdrop-blur-md lg:hidden">
          {links.map((link) => <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-3 text-sm text-slate-200 hover:bg-white/5 hover:text-cyan-300">{link.name}</Link>)}
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4"><Link to="/login" className="rounded-lg border border-slate-700 px-4 py-3 text-center text-sm">Sign In</Link><Link to="/request-project" className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold">Submit Project</Link></div>
        </nav>
      )}
    </header>
  );
}
