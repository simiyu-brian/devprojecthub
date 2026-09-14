import React, { useState } from 'react';
import { Sparkles, ExternalLink, Code2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'AI/ML' | 'Database' | 'Analytics';
  tags: string[];
  description: string;
  image: string;
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Intelligent Inventory Forecasting System',
    category: 'AI/ML',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'scikit-learn'],
    description: 'A machine learning-powered system that predicts inventory demand based on historical sales data, seasonal trends, and market indicators. Includes a real-time dashboard.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Hospital Management System',
    category: 'Web',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    description: 'A comprehensive hospital management platform handling patient registration, appointments, medical records, billing, and staff management with role-based access control.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Student Management System',
    category: 'Database',
    tags: ['Django', 'PostgreSQL', 'Bootstrap', 'Chart.js'],
    description: 'A full-featured student information system with course registration, grade tracking, attendance management, and automated report generation.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Cross-Platform Campus Companion App',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'Firebase', 'Tailwind CSS'],
    description: 'A mobile application for students featuring real-time timetables, assignment reminders, campus maps, and instant peer notification sync.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'E-Commerce Customer Behavior Analytics',
    category: 'Analytics',
    tags: ['Python', 'Pandas', 'PowerBI', 'SQL', 'Streamlit'],
    description: 'An end-to-end data analytics dashboard analyzing buyer journeys, conversion funnels, product performance metrics, and customer churn prediction models.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Automated Code Vulnerability Scanner',
    category: 'AI/ML',
    tags: ['Python', 'PyTorch', 'Docker', 'REST API'],
    description: 'An AI-assisted code review platform that analyzes repositories for security vulnerabilities, syntax bottlenecks, and compliance violations prior to deployment.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  }
];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web', 'Mobile', 'AI/ML', 'Database', 'Analytics'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Work</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Featured Projects
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            A showcase of production-ready systems built across web applications, mobile platforms, AI/ML, and data analytics.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Image Container */}
              <div className="h-52 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-slate-800">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    Verified Architecture
                  </span>
                  <span className="text-blue-400 group-hover:underline font-semibold flex items-center gap-1">
                    Details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Portfolio;