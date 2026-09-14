import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Sparkles, 
  User, 
  CheckCircle2, 
  Clock, 
  MapPin 
} from 'lucide-react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission goes here
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contact
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project idea? Let's discuss it.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile & Info Sidebar */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Brian Simiyu
                </h3>
                <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                  THE DEV
                </p>
                <p className="text-xs text-slate-400">Software Developer</p>
              </div>
            </div>

            <div className="py-6 space-y-6 border-b border-slate-800">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Email</span>
                  <a href="mailto:support@projecthub.com" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                    support@projecthub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Response Time</span>
                  <span className="text-sm font-semibold text-white">
                    Within 24 Hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Location</span>
                  <span className="text-sm font-semibold text-white">
                    Nairobi, Kenya
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3 text-xs text-slate-400">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  Ready to build right now? Submit a direct project request to get a fast-track breakdown.
                </span>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">Send a Message</h3>
              <p className="text-xs text-slate-400">
                Fill out the form below and I'll get back to you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Message Sent!</h4>
                <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6">
                  Thank you for reaching out. I'll review your inquiry and get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white hover:bg-slate-700 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / General Question"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or question..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;