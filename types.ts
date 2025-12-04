export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoLink: string;
  repoLink: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  email: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}