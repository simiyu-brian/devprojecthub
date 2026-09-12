import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

/**
 * Admin-only sign-in.
 *
 * Deliberately NOT linked from the public Navbar or footer — reachable only if you
 * know the URL. There is no sign-up option here: admin accounts are created the
 * normal way through /login and then promoted to the "admin" role from the backend
 * (see supabase/make-admin.sql), so credentials are always issued out of band by
 * whoever manages the Supabase project rather than self-served on this page.
 */
export function AdminLogin() {
  const navigate = useNavigate();
  const { user, role, signIn, signOut } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, role, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setLoading(false);
      setError(signInError);
      return;
    }

    const { data } = await supabase.auth.getUser();
    const signedInRole = data.user?.user_metadata?.role;

    if (signedInRole !== 'admin') {
      // Correct credentials, but not an admin account — don't leave them signed in
      // to a hidden admin surface with a student session.
      await signOut();
      setLoading(false);
      setError('This account does not have admin access.');
      return;
    }

    setLoading(false);
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-600/10 text-electric-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-white">Admin sign in</h1>
          <p className="mt-1 text-sm text-navy-400">
            Restricted area. Authorized personnel only.
          </p>
        </div>

        <div className="rounded-xl border border-navy-800 bg-navy-950/40 p-6">
          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-lg bg-error-50 px-4 py-3 text-sm text-error-700">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="label text-navy-300">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-500" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yourcompany.com"
                  className="input pl-10 border-navy-700 bg-navy-900 text-white placeholder:text-navy-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="label text-navy-300">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-500" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10 border-navy-700 bg-navy-900 text-white placeholder:text-navy-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-lg w-full"
            >
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-navy-500">
          Not an admin? This page isn't for you — head back to the{' '}
          <a href="/" className="text-navy-300 underline underline-offset-2">
            main site
          </a>
          .
        </p>
      </div>
    </div>
  );
}
