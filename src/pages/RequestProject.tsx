import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, GraduationCap, FileText, Send, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  projectType: string;
  description: string;
  budget: string;
  deadline: string;
  duration: string;
  website: string; // honeypot — real visitors never see or fill this
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  institution: '',
  projectType: '',
  description: '',
  budget: '',
  deadline: '',
  duration: '',
  website: '',
};

const projectTypes = [
  'Web Application',
  'Mobile App',
  'Desktop System',
  'Data / ML Project',
  'API / Backend',
  'Other',
];

const durationOptions = [
  'Less than 1 week',
  '1 - 2 weeks',
  '2 - 4 weeks',
  '1 - 2 months',
  '2+ months',
  'Not sure yet',
];

export function RequestProject() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Honeypot: real visitors never see or fill this field. Bots that auto-fill every
    // input on the page do. If it's filled, pretend to succeed and drop the submission.
    if (form.website.trim() !== '') {
      setSubmitted(true);
      setForm(initialForm);
      return;
    }

    // Timing check: a human takes at least a few seconds to fill this out. An instant
    // submission is a strong bot signal — quietly reject the same way.
    if (Date.now() - mountedAt.current < 3000) {
      setSubmitted(true);
      setForm(initialForm);
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from('project_requests').insert({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone || null,
      institution: form.institution || null,
      project_type: form.projectType,
      description: form.description,
      budget: form.budget || null,
      deadline: form.deadline || null,
      duration: form.duration || null,
      status: 'new',
    });

    setSubmitting(false);

    if (insertError) {
      setError(
        "We couldn't submit your request right now. Please try again, or reach out directly via the Contact page.",
      );
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
  };

  if (submitted) {
    return (
      <div className="section-sm py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="heading-2 mt-6">Request received!</h1>
        <p className="mt-4 text-lg text-muted">
          Thanks for reaching out. Expect a quotation and next steps in your
          email within 24 hours.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
          <Link to="/" className="btn-primary btn-lg">
            Back to Home
          </Link>
          <Link to="/pricing" className="btn-outline btn-lg">
            Review Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-electric-600/20 blur-3xl" />

        <div className="section relative py-20 lg:py-24 text-center">
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Request Your Project
          </h1>
          <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">
            No account needed — tell us about your final-year project idea,
            requirements and timeline, and we'll reply with a scoped
            quotation within 24 hours.
          </p>
        </div>
      </section>

      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section-sm">
          <div className="card p-8">
            {error && (
              <div className="mb-6 flex items-start gap-2 rounded-lg bg-error-50 px-4 py-3 text-sm text-error-700">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field — hidden from sighted users and screen readers, but visible to most bots */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="label">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="label">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className="input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="institution" className="label">
                    Institution
                  </label>
                  <div className="relative">
                    <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                    <input
                      id="institution"
                      name="institution"
                      type="text"
                      value={form.institution}
                      onChange={handleChange}
                      placeholder="e.g. JKUAT"
                      className="input pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="projectType" className="label">
                    Project type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="deadline" className="label">
                    Deadline
                  </label>
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="duration" className="label">
                    Expected project duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="" disabled>
                      Select a timeframe
                    </option>
                    {durationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="label">
                    Estimated budget (optional)
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. KSh 10,000 - 15,000"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="label">
                  Project description
                </label>
                <div className="relative">
                  <FileText className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-navy-300" />
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your project idea, requirements, and any specifications you already have..."
                    className="input pl-10 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary btn-lg w-full sm:w-auto"
              >
                <Send className="h-5 w-5" />
                {submitting ? 'Submitting…' : 'Submit Request'}
              </button>

              <p className="text-xs text-navy-400">
                By submitting this form, you agree to our{' '}
                <Link to="/privacy" className="link">Privacy Policy</Link> and{' '}
                <Link to="/terms" className="link">Terms of Service</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
