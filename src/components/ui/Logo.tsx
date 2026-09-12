import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-navy-900';
  const subColor = variant === 'light' ? 'text-navy-300' : 'text-navy-500';

  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-electric-700 shadow-lg shadow-electric-600/20">
        <Code2 className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-tight ${textColor}`}>DevProject Hub</span>
        <span className={`text-[10px] font-medium tracking-wide ${subColor}`}>Build. Understand. Demonstrate.</span>
      </div>
    </Link>
  );
}
