import { Link } from 'react-router-dom';
import { Mail, Code2 } from 'lucide-react';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/portfolio' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      <div className="section py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white">DevProject Hub</span>
                <span className="text-[10px] font-medium tracking-wide text-navy-400">Build. Understand. Demonstrate.</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-navy-400 max-w-xs">
              Brian Simiyu — The Dev. Software Developer. Final-Year Project Development & Technical Support.
            </p>
            <a href="mailto:bsimiyu698@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm text-electric-400 hover:text-electric-300 transition-colors">
              <Mail className="h-4 w-4" />
              bsimiyu698@gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-navy-400 hover:text-electric-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Get Started</h3>
            <p className="mt-4 text-sm text-navy-400">
              Have a project idea? Let's turn it into a working system.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link to="/request-project" className="btn-primary btn-sm w-full sm:w-auto">
                Request Your Project
              </Link>
              <Link to="/pricing" className="btn btn-sm border border-navy-700 text-navy-200 hover:bg-navy-800 w-full sm:w-auto">
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6">
          <p className="text-xs text-navy-500 leading-relaxed">
            Students are responsible for complying with their institution's academic policies and requirements. DevProject Hub provides software development assistance, technical guidance and project support.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-500">
            <span>&copy; 2026 DevProject Hub. All rights reserved.</span>
            <Link to="/privacy" className="hover:text-electric-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-electric-400 transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
