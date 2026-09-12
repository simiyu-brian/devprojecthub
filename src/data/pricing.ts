export interface PricingCategory {
  id: string;
  name: string;
  startingPrice: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const pricingCategories: PricingCategory[] = [
  {
    id: 'basic-web',
    name: 'Basic Web System',
    startingPrice: 'KSh 4,000+',
    description: 'Simple web applications and static sites with essential functionality.',
    features: ['Responsive design', 'Up to 5 pages', 'Contact form', 'Basic SEO setup'],
  },
  {
    id: 'database-system',
    name: 'Database Management System',
    startingPrice: 'KSh 4,000+',
    description: 'Database-driven applications with CRUD operations and data management.',
    features: ['Database design', 'CRUD operations', 'Data validation', 'Admin panel'],
  },
  {
    id: 'business-system',
    name: 'Business / Management System',
    startingPrice: 'KSh 5,000+',
    description: 'Comprehensive management systems with multiple modules and user roles.',
    features: ['Multi-role access', 'Dashboard & reports', 'Data management', 'API integration'],
    popular: true,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce System',
    startingPrice: 'KSh 7,000+',
    description: 'Full online store with product catalog, cart, and payment integration.',
    features: ['Product catalog', 'Shopping cart', 'Payment gateway', 'Order management'],
  },
  {
    id: 'mobile-app',
    name: 'Mobile Application',
    startingPrice: 'KSh 7,000+',
    description: 'Cross-platform mobile applications with native-like performance.',
    features: ['iOS & Android', 'Offline support', 'Push notifications', 'API integration'],
  },
  {
    id: 'ai-ml',
    name: 'AI / Machine Learning Project',
    startingPrice: 'KSh 8,000+',
    description: 'Intelligent systems with prediction, classification, and analytics.',
    features: ['Model training', 'Data preprocessing', 'Prediction API', 'Visualization dashboard'],
  },
  {
    id: 'advanced',
    name: 'Advanced Systems',
    startingPrice: 'Custom quotation',
    description: 'Complex multi-component systems requiring custom architecture.',
    features: ['Custom architecture', 'Microservices', 'Advanced integrations', 'Scalable design'],
  },
];

export const pricingNote = 'Starting prices only. Request a project assessment for an accurate quotation.';
