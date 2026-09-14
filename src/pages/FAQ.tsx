import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How much does a project cost?',
    answer: 'Project development starts from KSh 4,000+. The final quotation depends on the project scope, technical complexity, required integrations, deadline, and target stack requirements.',
  },
  {
    id: '2',
    question: 'How long does it take to complete a project?',
    answer: 'Timeline varies by project size. Simple web pages or small databases take 3-5 days, while full-stack web or mobile applications typically take 1-2 weeks depending on key requirements.',
  },
  {
    id: '3',
    question: 'What is included in the project handover?',
    answer: 'You receive full access to the source code repository, clean setup documentation, database scripts/schemas, environment variable configurations, and a live demonstration walkthrough.',
  },
  {
    id: '4',
    question: 'Can I track the progress of my project in real-time?',
    answer: 'Yes! Once logged into your student dashboard, you can view live project status updates, completed milestone checklists, task boards, uploaded files, and system messages.',
  },
  {
    id: '5',
    question: 'Do you offer post-project support and fixes?',
    answer: 'Absolutely. Every handover includes post-delivery support to fix any deployment bugs or assist with local machine installation and execution.',
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about starting, tracking, and receiving your project deliverables.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-white focus:outline-none"
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-800/60 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support CTA Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-slate-400 text-sm max-w-md mb-6">
            If you couldn’t find an answer here, reach out directly or submit your project details to get a customized proposal.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all text-xs shadow-lg shadow-blue-600/20"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}

export default FAQ;