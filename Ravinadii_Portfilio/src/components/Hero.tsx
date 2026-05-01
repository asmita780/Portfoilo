import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, ExternalLink } from "lucide-react";
import { cn } from "@/src/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4",
        scrolled ? "bg-glass shadow-lg py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-green font-mono text-xl font-bold tracking-tighter"
        >
          RK<span className="text-white">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-lightest-slate hover:text-green font-mono text-sm tracking-wide transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-2 border border-green text-green text-sm font-mono rounded hover:bg-green/10 transition-colors"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-green"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-light-navy z-40 flex flex-col items-center justify-center space-y-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-lightest-slate hover:text-green font-mono"
              >
                {link.name}
              </motion.a>
            ))}
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-green text-green text-xl font-mono rounded hover:bg-green/10 transition-colors"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-green font-mono mb-5"
      >
        Hi, my name is
      </motion.p>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-5xl md:text-7xl font-bold text-lightest-slate mb-4 tracking-tight"
      >
        Ravina Kumari.
      </motion.h1>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-4xl md:text-6xl font-bold text-slate mb-8 leading-tight"
      >
        I build things for the web.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-xl text-lg text-slate mb-12 leading-relaxed"
      >
        I love turning ideas into working solutions through code💡💻.
        <br /><br />
        After years of focusing on mastering my craft, I’m now looking to create, take ownership, and build something of my own — whether it becomes a product, a startup, or something entirely new🚀.
        <br /><br />
        If you’re exploring ideas, building something, or driven by curiosity, I’d be glad to connect✨.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col items-start"
      >
        <a
          href="#projects"
          className="px-8 py-4 border-2 border-green text-green font-mono rounded hover:bg-green/10 transition-all duration-300 text-lg relative group overflow-hidden"
        >
          <span className="relative z-10">Check out my work!</span>
          <span className="absolute inset-0 bg-green/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate/50"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] mb-4 vertical-rl" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-green/50 to-transparent" />
      </motion.div>
    </section>
  );
};
