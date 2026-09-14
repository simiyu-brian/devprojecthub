import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: 'Starter / Student Project',
      price: '$150 - $350',
      description: 'Ideal for small web applications, landing pages, or academic term projects.',
      features: [
        'Responsive UI with Tailwind CSS',
        'Frontend React / Next.js setup',
        'Up to 5 custom pages',
        'Basic database integration',
        'Source code & documentation',
        '3 Days standard turnaround',
      ],
      highlighted: false,
      ctaText: 'Start Project',
    },
    {
      name: 'Professional / Full-Stack',
      price: '$500 - $1,200',
      description: 'Complete web apps with user authentication, database workflows, and dashboards.',
      features: [
        'Full-stack Next.js / React app',
        'Supabase / Node.js backend',
        'Authentication & Role RBAC',
        'Payment gateway integration',
        'Admin dashboard & analytics',
        '14 Days priority support',
      ],
      highlighted: true,
      ctaText: 'Get Started Best Choice',
    },
    {
      name: 'Custom / Enterprise System',
      price: 'Custom Quote',
      description: 'For complex platforms, multi-role systems, or custom software architectures.',
      features: [
        'Custom scalable architecture',
        'Advanced API & microservices',
        'Custom UI/UX component design',
        'Third-party cloud integrations',
        'Dedicated project manager',
        '30 Days extended support',
      ],
      highlighted: false,
      ctaText: 'Contact for Quote',
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            Transparent, Value-Packed Pricing
          </h1>
          <p className="text-slate-400 text-lg">
            Choose the tier that fits your scope, or request a custom quote tailored to your exact project specs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? 'bg-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs min-h-[36px]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-3xl font-black text-white">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/request-project"
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-center text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/25'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Allows both `import Pricing from ...` AND `import { Pricing } from ...`
export default Pricing;