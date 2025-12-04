import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Saron",
  title: "Web Developer & Administrator",
  about: "I am a detailed-oriented professional combining technical web development skills with robust administrative experience. Currently based in Singapore, I specialize in building clean, responsive interfaces using HTML, CSS, and JavaScript, while maintaining high standards in Quality M&E administration.",
  email: "saronraj03@gmail.com",
  location: "Singapore",
  socials: {
    github: "#",
    linkedin: "#",
    twitter: "#"
  },
  skills: [
    { name: "HTML5", level: 95, category: "Frontend" },
    { name: "CSS3", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "Administration", level: 90, category: "Admin" },
    { name: "Quality Assurance", level: 85, category: "Admin" },
    { name: "Microsoft Office", level: 80, category: "Admin" },
  ],
  experience: [
    {
      id: "1",
      role: "Admin",
      company: "Quality M&E pte ltd",
      period: "2025 - Present",
      description: "Handling administrative tasks, quality monitoring, and evaluation processes in Singapore."
    },
    {
      id: "2",
      role: "Process Associate",
      company: "SCYO Decision services pvt ltd",
      period: "2023 - 2025",
      description: "Managed process workflows and decision support services in Chennai."
    }
  ],
  projects: []
};

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];