import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export function NotFound() {
  return (
    <div className="section-sm flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center py-24">
      <p className="text-sm font-semibold text-electric-600">404</p>
      <h1 className="heading-2 mt-2">Page not found</h1>
      <p className="mt-4 text-lg text-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="btn-primary btn-lg mt-8">
        <HomeIcon className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
}
