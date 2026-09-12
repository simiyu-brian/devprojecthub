import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Github, MailCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A11.998 11.998 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
  );
}

type Mode = 'signin' | 'signup' | 'forgot';

export function Login() {
  const navigate = useNavigate();
  const { user, signIn, signUp, signInWithOAuth, resetPassword } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Handles landing back here after a Google/GitHub redirect, once the session resolves.
  useEffect(() => {
    if (!user) return;
    const role = user.user_metadata?.role;
    navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard', { replace: true });
  }, [user, navigate]);

  const switchMode = (next: Mode) => {
    setError(null);
    setConfirmationSent(false);
    setResetSent(false);
    setMode(next);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (mode === 'forgot') {
      setLoading(true);
      const { error } = await resetPassword(email);
      setLoading(false);
      if (error) { setError(error); return; }
      setResetSent(true);
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);

    if (mode === 'signin') {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) { setError(error); return; }

      const { data } = await supabase.auth.getUser();
      const role = data.user?.user_metadata?.role;
      navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      return;
    }

    // signup
    const { error, needsEmailConfirmation } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) { setError(error); return; }

    if (needsEmailConfirmation) {
      // No active session yet — don't navigate anywhere, since ProtectedRoute would
      // just bounce them straight back here with no explanation.
      setConfirmationSent(true);
      return;
    }

    // Email confirmation is disabled on this project — signup logged them in immediately.
    navigate('/student/dashboard');
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError(null);
    setOauthLoading(provider);
    const { error } = await signInWithOAuth(provider);
    setOauthLoading(null);
    if (error) setError(error);
    // On success the browser redirects away to the provider, so nothing else to do here.
  };

  if (confirmationSent) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-navy-50 py-16">
        <div className="w-full max-w-md text-center">
          <div className="card p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
              <MailCheck className="h-7 w-7" />
            </div>
            <h1 className="heading-3 mt-4">Check your email</h1>
            <p className="mt-2 text-sm text-muted">
              We've sent a confirmation link to <strong>{email}</strong>. Click it to activate
              your account, then come back here to sign in.
            </p>
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className="btn-outline mt-6 w-full"
            >
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-navy-50 py-16">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center">
            <h1 className="heading-3">
              {mode === 'signin' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {mode === 'signin' && 'Sign in to track your project, milestones and messages.'}
              {mode === 'signup' && 'Sign up to start requesting projects and tracking progress.'}
              {mode === 'forgot' && "Enter your email and we'll send you a reset link."}
            </p>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg bg-error-50 px-4 py-3 text-sm text-error-700">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {resetSent ? (
            <div className="mt-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                <MailCheck className="h-7 w-7" />
              </div>
              <p className="mt-4 text-sm text-muted">
                If an account exists for <strong>{email}</strong>, a reset link is on its way.
              </p>
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="btn-outline mt-6 w-full"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              {mode !== 'forgot' && (
                <>
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={() => handleOAuth('google')}
                      disabled={oauthLoading !== null}
                      className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50 disabled:opacity-60"
                    >
                      <GoogleIcon />
                      {oauthLoading === 'google' ? 'Redirecting…' : 'Continue with Google'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOAuth('github')}
                      disabled={oauthLoading !== null}
                      className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50 disabled:opacity-60"
                    >
                      <Github className="h-4.5 w-4.5" />
                      {oauthLoading === 'github' ? 'Redirecting…' : 'Continue with GitHub'}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-navy-100" />
                    <span className="text-xs uppercase tracking-wider text-navy-400">or</span>
                    <div className="h-px flex-1 bg-navy-100" />
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="fullName" className="label">
                      Full name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Wanjiru"
                        className="input pl-10"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input pl-10"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="label">
                        Password
                      </label>
                      {mode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => switchMode('forgot')}
                          className="text-xs font-medium text-electric-600 hover:text-electric-700"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
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
                )}

                {mode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="label">
                      Confirm password
                    </label>
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
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-lg w-full"
                >
                  {loading
                    ? 'Please wait…'
                    : mode === 'signin' ? 'Sign In'
                    : mode === 'signup' ? 'Create Account'
                    : 'Send Reset Link'}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </button>

                {mode === 'signup' && (
                  <p className="text-center text-xs text-navy-400">
                    By creating an account, you agree to our{' '}
                    <Link to="/privacy" className="link">Privacy Policy</Link> and{' '}
                    <Link to="/terms" className="link">Terms of Service</Link>.
                  </p>
                )}
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                {mode === 'signin' && (
                  <>
                    Don't have an account?{' '}
                    <button type="button" onClick={() => switchMode('signup')} className="link">
                      Sign up
                    </button>
                  </>
                )}
                {mode === 'signup' && (
                  <>
                    Already have an account?{' '}
                    <button type="button" onClick={() => switchMode('signin')} className="link">
                      Sign in
                    </button>
                  </>
                )}
                {mode === 'forgot' && (
                  <button type="button" onClick={() => switchMode('signin')} className="link">
                    Back to sign in
                  </button>
                )}
              </p>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/" className="link">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
