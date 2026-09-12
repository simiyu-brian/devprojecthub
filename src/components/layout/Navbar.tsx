import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/portfolio' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
      <nav className="section flex h-16 items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-electric-600 bg-electric-50'
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/login" className="btn-ghost btn-sm">Student Login</Link>
          <Link to="/request-project" className="btn-primary btn-sm">
            Request Your Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          className="rounded-lg p-2 text-navy-700 hover:bg-navy-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-navy-100 bg-white">
          <div className="section py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-electric-600 bg-electric-50'
                      : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-navy-100 pt-4">
              <Link to="/login" className="btn-outline btn-sm w-full">Student Login</Link>
              <Link to="/request-project" className="btn-primary btn-sm w-full">
                Request Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
