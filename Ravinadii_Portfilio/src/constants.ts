export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    number: "01",
    title: "Launchnav at Inizio",
    description: "Fixed critical bugs and delivered new features within tight deadlines for a high-security pharma client. Took ownership of blocked features and successfully delivered end-to-end within 24 hours.",
    techStack: ["Nest.js", "React.js", "MongoDB", "PostgreSQL", "TypeScript", "AWS"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbda4833effb?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "2",
    number: "02",
    title: "Gaming Jobs at Outscal",
    description: "Engineered a scalable backend to collect and process gaming job listings from diverse sources. Built robust parsing workflows using custom logic and AI tools (Gemini API, GPT API).",
    techStack: ["MERN", "Next.js", "Web Scraping", "Selenium", "Octoparse"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "3",
    number: "03",
    title: "Multitrade (Stock Market)",
    description: "Led a team of three on a stock market project at Infistack. Developed and enhanced the frontend, implemented side menu, keyboard shortcuts, and dynamic charts for a seamless trading experience.",
    techStack: ["Vue.js", "DevExtreme", "CSS", "JavaScript"],
    imageUrl: "https://images.unsplash.com/photo-1611974717482-452f08f1b626?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "4",
    number: "04",
    title: "Log Ingestion System",
    description: "A high-performance log ingestion application capable of querying logs in real-time. Created a listing page for log visualization with schema validation for incoming data.",
    techStack: ["React.js", "Node.js", "JSON Storage"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
  },
];
