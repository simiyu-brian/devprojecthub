export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  dueDate: string;
  progress: number;
  tasks: { id: string; title: string; done: boolean }[];
}

export interface ProjectMessage {
  id: string;
  sender: 'student' | 'developer';
  name: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'project-request' | 'quote' | 'status' | 'milestone' | 'message' | 'file' | 'testing' | 'completed' | 'support';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AdminProject {
  id: string;
  title: string;
  student: string;
  university: string;
  status: 'New' | 'Under Review' | 'Quote Sent' | 'Approved' | 'In Development' | 'Testing' | 'Ready for Handover' | 'Completed' | 'Cancelled';
  progress: number;
  deadline: string;
  category: string;
  budget: string;
}

export const sampleMilestones: Milestone[] = [
  {
    id: 'm1',
    title: 'Requirements & Planning',
    description: 'Gather and document all project requirements, create project plan.',
    status: 'completed',
    dueDate: '2026-09-15',
    progress: 100,
    tasks: [
      { id: 't1', title: 'Initial consultation', done: true },
      { id: 't2', title: 'Requirements document', done: true },
      { id: 't3', title: 'Project plan', done: true },
    ],
  },
  {
    id: 'm2',
    title: 'Database & Architecture',
    description: 'Design database schema, create ERD, set up database.',
    status: 'completed',
    dueDate: '2026-09-22',
    progress: 100,
    tasks: [
      { id: 't4', title: 'ERD design', done: true },
      { id: 't5', title: 'Database schema', done: true },
      { id: 't6', title: 'Seed data', done: true },
    ],
  },
  {
    id: 'm3',
    title: 'Frontend Development',
    description: 'Build the user interface with responsive design.',
    status: 'completed',
    dueDate: '2026-09-29',
    progress: 100,
    tasks: [
      { id: 't7', title: 'Layout & navigation', done: true },
      { id: 't8', title: 'Dashboard pages', done: true },
      { id: 't9', title: 'Forms & validation', done: true },
    ],
  },
  {
    id: 'm4',
    title: 'Backend Development',
    description: 'Build APIs, authentication, and server-side logic.',
    status: 'in-progress',
    dueDate: '2026-10-06',
    progress: 65,
    tasks: [
      { id: 't10', title: 'API endpoints', done: true },
      { id: 't11', title: 'Authentication system', done: true },
      { id: 't12', title: 'API Integration', done: false },
      { id: 't13', title: 'Business logic', done: false },
    ],
  },
  {
    id: 'm5',
    title: 'Testing',
    description: 'Functional, API, and database testing.',
    status: 'pending',
    dueDate: '2026-10-13',
    progress: 0,
    tasks: [
      { id: 't14', title: 'Unit tests', done: false },
      { id: 't15', title: 'Integration tests', done: false },
      { id: 't16', title: 'User testing', done: false },
    ],
  },
  {
    id: 'm6',
    title: 'Deployment / Handover',
    description: 'Deploy system and prepare for handover with documentation.',
    status: 'pending',
    dueDate: '2026-10-20',
    progress: 0,
    tasks: [
      { id: 't17', title: 'Production deployment', done: false },
      { id: 't18', title: 'Documentation', done: false },
      { id: 't19', title: 'Demo preparation', done: false },
    ],
  },
];

export const sampleMessages: ProjectMessage[] = [
  {
    id: 'msg1',
    sender: 'developer',
    name: 'Brian Simiyu',
    content: "Hi! I've reviewed your project requirements. The database design is complete and I'm now working on the backend. Everything is on track.",
    timestamp: '2026-09-28 10:30',
    read: true,
  },
  {
    id: 'msg2',
    sender: 'student',
    name: 'You',
    content: "That's great to hear! When do you think the API integration will be done?",
    timestamp: '2026-09-28 14:15',
    read: true,
  },
  {
    id: 'msg3',
    sender: 'developer',
    name: 'Brian Simiyu',
    content: 'I expect to have the API integration completed by October 3rd. I will send you a test link once the backend is ready.',
    timestamp: '2026-09-29 09:00',
    read: false,
  },
];

export const studentNotifications: Notification[] = [
  { id: 'n1', type: 'message', title: 'New Message', message: 'Brian Simiyu sent you a message about your project.', timestamp: '2 hours ago', read: false },
  { id: 'n2', type: 'milestone', title: 'Milestone Completed', message: 'Frontend Development milestone has been completed.', timestamp: '1 day ago', read: false },
  { id: 'n3', type: 'status', title: 'Project Status Updated', message: 'Your project status changed to In Development.', timestamp: '3 days ago', read: true },
  { id: 'n4', type: 'quote', title: 'Quote Accepted', message: 'Your quotation has been accepted. Development is starting.', timestamp: '1 week ago', read: true },
];

export const adminProjects: AdminProject[] = [
  { id: 'p1', title: 'Hospital Management System', student: 'John Mwangi', university: 'Kenyatta University', status: 'In Development', progress: 65, deadline: '2026-10-06', category: 'Web / Database', budget: 'KSh 12,000' },
  { id: 'p2', title: 'AI Prediction System', student: 'Sarah Achieng', university: 'University of Nairobi', status: 'Testing', progress: 85, deadline: '2026-10-01', category: 'AI / ML', budget: 'KSh 15,000' },
  { id: 'p3', title: 'E-Commerce Platform', student: 'David Kamau', university: 'JKUAT', status: 'Quote Sent', progress: 0, deadline: '2026-11-15', category: 'Web / Payments', budget: 'KSh 8,000' },
  { id: 'p4', title: 'Student Management System', student: 'Grace Wanjiru', university: 'Strathmore University', status: 'New', progress: 0, deadline: '2026-11-30', category: 'Web / Database', budget: 'Pending' },
  { id: 'p5', title: 'Inventory Forecasting System', student: 'Brian Otieno', university: 'Moi University', status: 'Completed', progress: 100, deadline: '2026-09-20', category: 'AI / Analytics', budget: 'KSh 18,000' },
  { id: 'p6', title: 'Learning Management System', student: 'Faith Nyambura', university: 'Kenyatta University', status: 'Under Review', progress: 0, deadline: '2026-12-01', category: 'Education / Web', budget: 'Pending' },
  { id: 'p7', title: 'Mobile Banking App', student: 'Kevin Mutua', university: 'JKUAT', status: 'Approved', progress: 10, deadline: '2026-11-10', category: 'Mobile', budget: 'KSh 10,000' },
  { id: 'p8', title: 'Data Analytics Dashboard', student: 'Mercy Atieno', university: 'University of Nairobi', status: 'Ready for Handover', progress: 95, deadline: '2026-09-30', category: 'Analytics', budget: 'KSh 9,000' },
];

export const adminStats = {
  totalProjects: 8,
  newRequests: 2,
  activeProjects: 4,
  completedProjects: 1,
  pendingQuotes: 1,
  revenue: 'KSh 72,000',
  unreadMessages: 3,
};

export const projectStatuses = [
  'New',
  'Under Review',
  'Quote Sent',
  'Approved',
  'In Development',
  'Testing',
  'Ready for Handover',
  'Completed',
  'Cancelled',
] as const;

export const quoteStatuses = ['Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected', 'Expired'] as const;

export const projectRequestFormOptions = {
  studyLevels: ['Certificate', 'Diploma', 'Degree', 'Other'],
  projectStatuses: ['Just an idea', 'Proposal completed', 'Design completed', 'Partially developed', 'Existing project needs fixing', 'Almost complete'],
  services: [
    'Full system development',
    'Frontend development',
    'Backend development',
    'Database development',
    'Mobile application',
    'AI / ML',
    'Data analytics',
    'Debugging',
    'API integration',
    'Testing',
    'Deployment',
    'Documentation guidance',
    'Demonstration preparation',
  ],
};
