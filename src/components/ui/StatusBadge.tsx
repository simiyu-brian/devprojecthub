interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusStyles: Record<string, string> = {
    'New': 'bg-navy-100 text-navy-700',
    'Under Review': 'bg-electric-50 text-electric-700',
    'Quote Sent': 'bg-electric-50 text-electric-700',
    'Approved': 'bg-accent-50 text-accent-700',
    'In Development': 'bg-electric-100 text-electric-800',
    'Testing': 'bg-warning-50 text-warning-700',
    'Ready for Handover': 'bg-accent-100 text-accent-800',
    'Completed': 'bg-accent-100 text-accent-800',
    'Cancelled': 'bg-error-50 text-error-700',
    'Draft': 'bg-navy-100 text-navy-600',
    'Sent': 'bg-electric-50 text-electric-700',
    'Viewed': 'bg-electric-50 text-electric-600',
    'Accepted': 'bg-accent-50 text-accent-700',
    'Rejected': 'bg-error-50 text-error-700',
    'Expired': 'bg-navy-100 text-navy-500',
    'completed': 'bg-accent-50 text-accent-700',
    'in-progress': 'bg-electric-50 text-electric-700',
    'pending': 'bg-navy-100 text-navy-600',
  };

  const style = statusStyles[status] ?? 'bg-navy-100 text-navy-700';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.includes('accent') ? 'bg-accent-500' : style.includes('error') ? 'bg-error-500' : style.includes('warning') ? 'bg-warning-500' : style.includes('electric') ? 'bg-electric-500' : 'bg-navy-400'}`} />
      {status}
    </span>
  );
}
