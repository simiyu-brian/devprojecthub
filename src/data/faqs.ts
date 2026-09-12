export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'cost',
    question: 'How much does a project cost?',
    answer: 'Project development starts from KSh 4,000+. The final quotation depends on the project type, complexity, features, technologies, integrations, deadline, and development requirements.',
  },
  {
    id: 'diploma',
    question: 'Do you support diploma projects?',
    answer: 'Yes. I support diploma projects across IT, Computer Science, and technology-related fields.',
  },
  {
    id: 'degree',
    question: 'Do you support degree projects?',
    answer: 'Yes. I support degree projects including final-year and capstone projects for undergraduate and postgraduate programs.',
  },
  {
    id: 'existing-project',
    question: 'Can you fix an existing project?',
    answer: 'Yes. I provide debugging and technical support for existing projects — fixing API errors, authentication issues, database problems, frontend bugs, and integration errors.',
  },
  {
    id: 'databases',
    question: 'Can you help with databases?',
    answer: 'Yes. I provide database development including PostgreSQL, MySQL, and MariaDB — covering architecture, ERD design, data modelling, and query optimization.',
  },
  {
    id: 'ai-ml',
    question: 'Can you develop AI/ML systems?',
    answer: 'Yes. I develop AI and machine learning systems including prediction systems, classification, recommendation systems, and analytics with visualization.',
  },
  {
    id: 'mobile',
    question: 'Can you develop mobile applications?',
    answer: 'Yes. I develop mobile and cross-platform applications for Android and iOS with modern frameworks.',
  },
  {
    id: 'deployment',
    question: 'Can you help with deployment?',
    answer: 'Yes. I help prepare systems for deployment and hosting on cloud platforms including configuration and domain setup.',
  },
  {
    id: 'quotation',
    question: 'Can I request a quotation before starting?',
    answer: 'Yes. You can submit your project requirements and receive a customized quotation before any development begins. There is no obligation to proceed.',
  },
  {
    id: 'duration',
    question: 'How long does development take?',
    answer: 'The duration depends on the complexity and scope of the project. Simple systems may take a few days while complex systems may take several weeks. A timeline is included in your quotation.',
  },
];
