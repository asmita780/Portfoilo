import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Send } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
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
        className="text-slate text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </motion.p>
      
      <motion.form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto text-left space-y-6"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-lightest-slate font-mono text-sm ml-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full bg-light-navy border border-lightest-navy rounded px-4 py-3 text-slate focus:outline-none focus:border-green transition-colors"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-lightest-slate font-mono text-sm ml-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full bg-light-navy border border-lightest-navy rounded px-4 py-3 text-slate focus:outline-none focus:border-green transition-colors"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-lightest-slate font-mono text-sm ml-1">Message</label>
          <textarea
            name="message"
            id="message"
            required
            rows={5}
            className="w-full bg-light-navy border border-lightest-navy rounded px-4 py-3 text-slate focus:outline-none focus:border-green transition-colors resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-12 py-4 border-2 border-green text-green font-mono rounded hover:bg-green/10 transition-all duration-300 text-lg group cursor-pointer"
          >
            <span>Say Hello</span>
            <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </motion.form>
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
