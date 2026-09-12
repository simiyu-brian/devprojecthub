export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Python', 'FastAPI', 'Django', 'Node.js', 'REST APIs'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MariaDB'],
  },
  {
    category: 'Other',
    skills: ['Git', 'GitHub', 'API Integration', 'AI/ML', 'Data Analytics', 'System Architecture', 'Deployment'],
  },
];

export const developerBio = "I help students and organizations turn software ideas into practical, working systems. My focus is on modern software development, reliable systems, technical problem-solving and helping clients understand the technology behind their solutions.";
