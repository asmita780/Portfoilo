import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Send } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-3xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-green font-mono mb-4"
      >
        What’s Next?
      </motion.p>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6"
      >
        Get In Touch
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate text-lg mb-12 leading-relaxed"
      >
        Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="mailto:ravinasingh697@gmail.com"
          className="inline-flex items-center space-x-2 px-10 py-5 border-2 border-green text-green font-mono rounded hover:bg-green/10 transition-all duration-300 text-lg group"
        >
          <span>Say Hello</span>
          <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  const socialLinks = [
    { icon: <Github size={20} />, href: "#", name: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/ravina-kumari-76279616a", name: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", name: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", name: "Instagram" },
  ];

  return (
    <footer className="py-8 text-center px-6">
      <div className="flex justify-center space-x-6 mb-6">
        {socialLinks.map(social => (
          <a
            key={social.name}
            href={social.href}
            className="text-slate hover:text-green transition-all duration-300 hover:-translate-y-1"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <div className="font-mono text-sm text-slate space-y-2">
        <p className="hover:text-green transition-colors">
          Built by Ravina Kumari
        </p>
        <p className="opacity-70">
          Designed with intention & crafted with React
        </p>
      </div>
    </footer>
  );
};
