import {
  Code2, Server, Database, Smartphone, BrainCircuit, BarChart3,
  Bug, ShieldCheck, Rocket, FileText, GraduationCap, Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  technologies: string[];
  features: string[];
}

export const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Application Development',
    description: 'Modern responsive websites and web applications built with industry-standard frameworks.',
    icon: Code2,
    technologies: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
    features: ['Responsive design', 'SPA & SSR', 'Component architecture', 'API integration'],
  },
  {
    id: 'backend-dev',
    title: 'Backend Development',
    description: 'Build secure APIs and backend systems with modern server-side technologies.',
    icon: Server,
    technologies: ['Python', 'FastAPI', 'Django', 'Node.js', 'REST APIs'],
    features: ['RESTful APIs', 'Authentication', 'Authorization', 'Server architecture'],
  },
  {
    id: 'database-dev',
    title: 'Database Development',
    description: 'Design and connect reliable databases with proper architecture and data modeling.',
    icon: Database,
    technologies: ['PostgreSQL', 'MySQL', 'MariaDB'],
    features: ['Database architecture', 'ERD design', 'Data modelling', 'Query optimization'],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Mobile and cross-platform application development for Android and iOS.',
    icon: Smartphone,
    technologies: ['React Native', 'Flutter', 'Android', 'iOS'],
    features: ['Cross-platform', 'Native performance', 'Offline support', 'Push notifications'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Build intelligent systems with prediction, classification, and recommendation models.',
    icon: BrainCircuit,
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas'],
    features: ['Prediction systems', 'Classification', 'Recommendation systems', 'Analytics'],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with dashboards and visualizations.',
    icon: BarChart3,
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Power BI'],
    features: ['Dashboards', 'Reports', 'Data processing', 'Data visualization'],
  },
  {
    id: 'debugging',
    title: 'Debugging',
    description: 'Find and fix errors across your entire stack — frontend, backend, database, and integrations.',
    icon: Bug,
    technologies: ['DevTools', 'Postman', 'Debuggers', 'Log analysis'],
    features: ['API errors', 'Authentication issues', 'Database problems', 'Integration errors'],
  },
  {
    id: 'testing',
    title: 'Testing',
    description: 'Comprehensive testing to ensure your system works correctly before demonstration.',
    icon: ShieldCheck,
    technologies: ['Jest', 'PyTest', 'Postman', 'Selenium'],
    features: ['Functional testing', 'API testing', 'Database testing', 'Bug fixing'],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Help prepare systems for deployment and hosting on cloud platforms.',
    icon: Rocket,
    technologies: ['Docker', 'Vercel', 'Heroku', 'Netlify', 'AWS'],
    features: ['Cloud deployment', 'CI/CD setup', 'Hosting configuration', 'Domain setup'],
  },
  {
    id: 'documentation',
    title: 'Documentation Guidance',
    description: 'Technical guidance for system architecture, database design, and documentation.',
    icon: FileText,
    technologies: ['Markdown', 'UML', 'ERD tools', 'Technical writing'],
    features: ['System architecture', 'Database design', 'Testing methodology', 'User manuals'],
  },
  {
    id: 'demo-prep',
    title: 'Demonstration Preparation',
    description: 'Help students understand their system and prepare to explain and demonstrate its functionality.',
    icon: GraduationCap,
    technologies: ['System walkthroughs', 'Q&A preparation', 'Technical explanations'],
    features: ['System understanding', 'Viva preparation', 'Technical Q&A', 'Presentation coaching'],
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'End-to-end system architecture and design for complex multi-component projects.',
    icon: Layers,
    technologies: ['UML', 'ERD', 'Architecture patterns', 'Microservices'],
    features: ['Architecture design', 'Component planning', 'Integration strategy', 'Scalability'],
  },
];
