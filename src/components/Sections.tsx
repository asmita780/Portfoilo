import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/src/constants";
import { cn } from "@/src/lib/utils";

const SectionHeader = ({ title }: { number?: string; title: string }) => (
  <div className="flex items-center space-x-4 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-lightest-slate flex items-center">
      {title}
    </h2>
    <div className="h-px bg-lightest-navy grow max-w-xs" />
  </div>
);

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <SectionHeader title="About Me" />
      
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-4 text-slate leading-relaxed">
          <p>
            Hello! My name is Ravina and I’m a full-stack developer with over 4 years of experience, specializing in SaaS product development. My journey in tech is fueled by curiosity and a drive to build scalable solutions that solve real-world problems.
          </p>
          <p>
            I have a unique background, having graduated from <a href="https://navgurukul.org" target="_blank" rel="noreferrer" className="text-green transition-all hover:underline">Navgurukul</a>, an NGO that empowers underprivileged youth through software engineering education. This experience ingrained in me a self-taught mindset and a passion for continuous learning.
          </p>
          <p>
            Currently, I’m working as a <span className="text-green">Senior Engineer</span> at Inizio, where I develop high-security, AWS-heavy systems for global pharma clients. I’m also an aspiring entrepreneur, constantly exploring new ideas and building towards my own startup.
          </p>
          <p>Here are a few technologies I’ve been working with recently:</p>
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
            {["JavaScript (ES6+)", "TypeScript", "React / Next.js", "Node.js / Nest.js", "AWS", "MongoDB / PostgreSQL"].map(tech => (
              <li key={tech} className="flex items-center space-x-2">
                <span className="text-green text-xs">▹</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2 group relative max-w-xs mx-auto">
          <div className="relative z-10">
            <div className="absolute inset-0 border-2 border-green rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 -z-10" />
            <div className="bg-green/20 mix-blend-multiply absolute inset-0 rounded transition-opacity duration-300 group-hover:opacity-0" />
            <img
              src="/assets/profile.jpg"
              alt="Profile"
              className="rounded filter grayscale hover:grayscale-0 transition-all duration-500 w-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader title="Some Things I’ve Built" />
      
      <div className="space-y-32">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={cn(
              "relative grid md:grid-cols-12 gap-4 items-center group",
              index % 2 !== 0 && "md:text-right"
            )}
          >
            {/* Project Image */}
            <div className={cn(
              "md:col-span-7 relative z-10",
              index % 2 !== 0 ? "md:order-last md:col-start-6" : "md:col-start-1"
            )}>
              <a href={project.liveUrl} className="block relative group">
                <div className="absolute inset-0 bg-navy/60 group-hover:bg-transparent transition-all duration-300 z-20" />
                <div className="absolute inset-0 bg-green/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300 z-10" />
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="rounded shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500 w-full"
                />
              </a>
            </div>

            {/* Project Info */}
            <div className={cn(
              "md:col-span-6 relative z-30",
              index % 2 !== 0 ? "md:col-start-1 md:text-left md:items-start" : "md:col-start-7 md:text-right md:items-end",
              "flex flex-col"
            )}>
              <p className="text-green font-mono text-sm mb-2">Featured Project</p>
              <h3 className="text-2xl md:text-3xl font-bold text-lightest-slate mb-6 hover:text-green transition-colors">
                <a href={project.liveUrl}>{project.title}</a>
              </h3>
              
              <div className="bg-light-navy p-6 rounded shadow-xl text-slate text-lg mb-6 md:-mx-4 md:w-[120%] z-40">
                {project.description}
              </div>
              
              <ul className={cn(
                "flex flex-wrap gap-x-4 gap-y-2 mb-6 font-mono text-xs text-light-slate",
                index % 2 !== 0 ? "justify-start" : "justify-end"
              )}>
                {project.techStack.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              
              <div className="flex space-x-4 items-center">
                <a href={project.githubUrl} className="text-lightest-slate hover:text-green transition-colors">
                  <Github size={20} />
                </a>
                <a href={project.liveUrl} className="text-lightest-slate hover:text-green transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
