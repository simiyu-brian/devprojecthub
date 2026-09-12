import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, User, Phone, MessageSquare, Send, CheckCircle2,
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-electric-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-electric-500/10 blur-3xl" />

        <div className="section relative py-20 lg:py-28 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-sm font-medium text-electric-300">
              <Mail className="h-4 w-4" />
              Get In Touch
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Contact
            </h1>
            <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">
              Have a project idea? Let's discuss it.
            </p>
          </div>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact info card */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <div className="card h-full p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-electric-700 text-white shadow-lg shadow-electric-600/30">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-navy-900 tracking-wide">
                      BRIAN SIMIYU
                    </p>
                    <p className="text-sm font-semibold text-electric-600">THE DEV</p>
                    <p className="text-sm text-muted">Software Developer</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-navy-100 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-700">Email</p>
                      <a
                        href="mailto:bsimiyu698@gmail.com"
                        className="text-sm text-muted transition-colors hover:text-electric-600"
                      >
                        bsimiyu698@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-700">Role</p>
                      <p className="text-sm text-muted">Software Developer</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-700">Phone</p>
                      <p className="text-sm text-muted">Available on request</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-lg bg-navy-50 p-4">
                  <p className="text-sm text-muted">
                    Prefer email? Reach out directly and I'll respond within 24
                    hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3 animate-fade-in-up animate-delay-200">
              <div className="card p-8">
                <h2 className="heading-2">Send a Message</h2>
                <p className="mt-2 text-muted">
                  Fill out the form below and I'll get back to you shortly.
                </p>

                {submitted && (
                  <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent-200 bg-accent-50 p-4">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-600" />
                    <p className="text-sm font-medium text-accent-700">
                      Message sent! I'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label">
                        Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
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
                      <label htmlFor="subject" className="label">
                        Subject
                      </label>
                      <div className="relative">
                        <MessageSquare className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          className="input pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="input resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-lg w-full sm:w-auto">
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-sm text-center">
          <h2 className="heading-2">Prefer to Browse First?</h2>
          <p className="mt-4 text-lg text-muted">
            Check out the services I offer or explore frequently asked questions
            before reaching out.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Link to="/services" className="btn-primary btn-lg">
              View Services
            </Link>
            <Link to="/faq" className="btn-outline btn-lg">
              Read FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
