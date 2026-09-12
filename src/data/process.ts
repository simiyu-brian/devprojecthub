export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Submit Your Project',
    description: 'Tell Brian about your project requirements through the project request form.',
  },
  {
    step: '02',
    title: 'Project Assessment',
    description: 'Your requirements are reviewed and assessed for scope, complexity, and feasibility.',
  },
  {
    step: '03',
    title: 'Receive Your Quote',
    description: 'You receive a customized quotation based on project complexity, features, and timeline.',
  },
  {
    step: '04',
    title: 'Development & Support',
    description: 'Development, testing, debugging, and technical support take place with regular updates.',
  },
  {
    step: '05',
    title: 'Testing & Handover',
    description: 'The system is tested and prepared for handover with demonstration support.',
  },
];

export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}

export const problemCards: ProblemCard[] = [
  {
    icon: 'Lightbulb',
    title: 'I Have the Idea',
    description: "I know what I want to build but don't know where to start.",
  },
  {
    icon: 'Monitor',
    title: 'I Need a Working System',
    description: 'Turn project requirements into a functional application.',
  },
  {
    icon: 'Bug',
    title: 'My Code Has Errors',
    description: 'Get debugging and technical assistance.',
  },
  {
    icon: 'Server',
    title: 'I Need Backend Help',
    description: 'Build APIs, authentication and server-side functionality.',
  },
  {
    icon: 'Database',
    title: 'I Need Database Help',
    description: 'Design and connect a reliable database.',
  },
  {
    icon: 'GraduationCap',
    title: 'I Need Help Preparing My Demo',
    description: 'Understand the system and prepare for technical demonstration.',
  },
];

export interface TechCategory {
  name: string;
  icon: string;
}

export const techCategories: TechCategory[] = [
  { name: 'Web Development', icon: 'Code2' },
  { name: 'Mobile Development', icon: 'Smartphone' },
  { name: 'Backend Development', icon: 'Server' },
  { name: 'Database Systems', icon: 'Database' },
  { name: 'AI & Machine Learning', icon: 'BrainCircuit' },
  { name: 'Data Analytics', icon: 'BarChart3' },
  { name: 'API Development', icon: 'Plug' },
  { name: 'Testing & Deployment', icon: 'Rocket' },
];
