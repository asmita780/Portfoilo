/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Navbar, Hero } from "./components/Hero";
import { About, Projects } from "./components/Sections";
import { Contact, Footer } from "./components/Footer";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-green/50 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? "rgba(100, 255, 218, 0.1)" : "transparent",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
    />
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative selection:bg-green selection:text-navy">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <div className="space-y-0">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Decorative vertical lines on sides (hidden on mobile) */}
      <div className="fixed left-4 bottom-0 hidden lg:flex flex-col items-center space-y-6 after:content-[''] after:w-px after:h-24 after:bg-slate/30">
        <div className="flex flex-col space-y-4">
          {/* Social icons could go here too, but they are in footer */}
        </div>
      </div>
      
      <div className="fixed right-4 bottom-0 hidden lg:flex flex-col items-center space-y-6 after:content-[''] after:w-px after:h-24 after:bg-slate/30">
        <a 
          href="mailto:ravinasingh697@gmail.com" 
          className="font-mono text-xs tracking-widest text-slate hover:text-green transition-all vertical-rl hover:-translate-y-2"
          style={{ writingMode: 'vertical-rl' }}
        >
          ravinasingh697@gmail.com
        </a>
      </div>
    </main>
  );
}
