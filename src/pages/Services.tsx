import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function Services() {
  const servicesList = [
    {
      title: 'Full-Stack Web Applications',
      tag: 'Web / SaaS',
      description: 'End-to-end web platforms built with React, Next.js, Node.js, and modern CSS frameworks.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      techs: ['React', 'Next.js', 'Tailwind CSS', 'Node.js']
    },
    {
      title: 'Database Architecture & APIs',
      tag: 'Backend / DB',
      description: 'Scalable relational database schemas, RESTful API design, and authentication flows.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      techs: ['PostgreSQL', 'Supabase', 'Python', 'FastAPI']
    },
    {
      title: 'AI & Data Science Projects',
      tag: 'AI / Analytics',
      description: 'Machine learning model integration, data visualization dashboards, and predictive analysis.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      techs: ['Python', 'scikit-learn', 'Pandas', 'Chart.js']
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>What We Offer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Our Development Services
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Professional software development and technical support tailored to your project requirements.
          </p>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-slate-800">
                  {service.tag}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                  {service.techs.map((tech, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Services;