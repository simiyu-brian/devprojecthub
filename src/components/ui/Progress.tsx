interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({ progress, size = 120, strokeWidth = 8, className = '' }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-navy-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-electric-600 transition-all duration-500"
        />
      </svg>
      <span className="absolute text-lg font-bold text-navy-900">{progress}%</span>
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: 'electric' | 'accent' | 'warning' | 'error';
}

export function ProgressBar({ progress, className = '', color = 'electric' }: ProgressBarProps) {
  const colors = {
    electric: 'bg-electric-600',
    accent: 'bg-accent-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };
  return (
    <div className={`h-2 w-full rounded-full bg-navy-100 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
