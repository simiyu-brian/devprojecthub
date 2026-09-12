import { Mail, Phone, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/dashboard/PageHeader';

export function Support() {
  return (
    <div>
      <PageHeader title="Support" description="Need help? Reach out directly." />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="card p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
            <Mail className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm font-semibold text-navy-900">Email</p>
          <a href="mailto:bsimiyu698@gmail.com" className="link text-sm">
            bsimiyu698@gmail.com
          </a>
        </div>
        <div className="card p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
            <Phone className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm font-semibold text-navy-900">Phone</p>
          <p className="text-sm text-muted">Available on request</p>
        </div>
      </div>

      <div className="card mt-5 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-navy-400" />
          <p className="text-sm text-navy-700">
            Looking for a quick answer? Check the FAQ before reaching out.
          </p>
        </div>
        <Link to="/faq" className="btn-outline btn-sm flex-shrink-0">
          View FAQ
        </Link>
      </div>
    </div>
  );
}
