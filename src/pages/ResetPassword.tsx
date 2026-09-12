import { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function ResetPassword() {
  const navigate = useNavigate();
  const { user, loading: authLoading, updatePassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Supabase turns the recovery link into a real (temporary) session automatically —
  // if there's no session by the time auth finishes loading, the link was invalid or expired.
  const hasRecoverySession = !authLoading && !!user;

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => navigate('/student/dashboard'), 2500);
      return () => clearTimeout(t);
    }
  }, [done, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);

    if (error) { setError(error); return; }
    setDone(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-navy-50 py-16">
      <div className="w-full max-w-md">
        <div className="card p-8 text-center">
          {authLoading ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : done ? (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h1 className="heading-3 mt-4">Password updated</h1>
              <p className="mt-2 text-sm text-muted">Taking you to your dashboard…</p>
            </>
          ) : !hasRecoverySession ? (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error-50 text-error-600">
                <AlertCircle className="h-7 w-7" />
              </div>
              <h1 className="heading-3 mt-4">Link expired or invalid</h1>
              <p className="mt-2 text-sm text-muted">
                This password reset link is no longer valid. Request a new one from the sign-in page.
              </p>
              <Link to="/login" className="btn-primary btn-lg mt-6 w-full">
                Back to sign in
              </Link>
            </>
          ) : (
            <>
              <h1 className="heading-3 text-left">Set a new password</h1>
              <p className="mt-2 text-left text-sm text-muted">
                Choose a new password for your account.
              </p>

              {error && (
                <div className="mt-6 flex items-start gap-2 rounded-lg bg-error-50 px-4 py-3 text-left text-sm text-error-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-left">
                <div>
                  <label htmlFor="password" className="label">New password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="label">Confirm new password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
                  {loading ? 'Updating…' : 'Update Password'}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
