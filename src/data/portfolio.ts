export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  categoryType: 'web' | 'mobile' | 'ai-ml' | 'database' | 'analytics';
  technologies: string[];
  description: string;
  image: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'inventory-forecast',
    title: 'Intelligent Inventory Forecasting System',
    category: 'AI / Data Analytics / Web',
    categoryType: 'ai-ml',
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'scikit-learn'],
    description: 'A machine learning-powered system that predicts inventory demand based on historical sales data, seasonal trends, and market indicators. Includes a real-time dashboard with forecasting visualizations.',
    image: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    category: 'Web / Database',
    categoryType: 'web',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    description: 'A comprehensive hospital management platform handling patient registration, appointments, medical records, billing, and staff management with role-based access control.',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    category: 'Web / Database',
    categoryType: 'database',
    technologies: ['Django', 'PostgreSQL', 'Bootstrap', 'Chart.js'],
    description: 'A full-featured student information system with course registration, grade tracking, attendance management, and automated report generation for academic institutions.',
    image: 'https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web / Payments',
    categoryType: 'web',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    description: 'A modern e-commerce platform with product catalog, shopping cart, secure checkout, order tracking, and an admin dashboard for inventory and order management.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'learning-management',
    title: 'Learning Management System',
    category: 'Education / Web',
    categoryType: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    description: 'An online learning platform with course creation, video lessons, quizzes, progress tracking, certificates, and discussion forums for student-teacher interaction.',
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'ai-prediction',
    title: 'AI Prediction System',
    category: 'AI / Machine Learning',
    categoryType: 'ai-ml',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    description: 'A predictive analytics system using neural networks to forecast business metrics. Features data preprocessing, model training, evaluation, and a web interface for real-time predictions.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const portfolioFilters = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'AI/ML', value: 'ai-ml' },
  { label: 'Database', value: 'database' },
  { label: 'Analytics', value: 'analytics' },
] as const;
