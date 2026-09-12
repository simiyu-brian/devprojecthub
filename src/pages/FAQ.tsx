import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { faqs } from '@/data/faqs';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
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
              <MessageSquare className="h-4 w-4" />
              Questions & Answers
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">
              Everything you need to know about working with me. Can't find the
              answer you're looking for? Feel free to reach out.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="section-sm">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`card overflow-hidden transition-all duration-200 ${
                      isOpen ? 'border-electric-200 shadow-md' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-navy-50/50"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                            isOpen
                              ? 'bg-electric-600 text-white'
                              : 'bg-electric-50 text-electric-600'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-base font-semibold text-navy-900 sm:text-lg">
                          {faq.question}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-electric-600 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      id={`faq-answer-${faq.id}`}
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-16 text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="section-sm">
          <div className="card border-electric-200 bg-gradient-to-br from-electric-50 to-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-600 text-white shadow-lg shadow-electric-600/30">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h2 className="mt-6 heading-2">Still have questions? Contact me</h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              If you couldn't find the answer to your question, I'm happy to
              help. Reach out and I'll get back to you as soon as possible.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
              <Link to="/contact" className="btn-primary btn-lg">
                Contact Me
              </Link>
              <Link to="/request-project" className="btn-outline btn-lg">
                Request a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
