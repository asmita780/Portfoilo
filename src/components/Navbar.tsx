import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-teal/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-brand-teal font-bold text-xl">Author Dashboard</Link>
        <Link to="/" className="text-sm font-medium text-gray-500 hover:text-brand-teal transition-colors">Back to Site</Link>
      </div>
    </nav>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md px-[70px] py-8">
      <div className="max-w-[1920px] mx-auto grid grid-cols-12 items-center">
        {/* Navigation - Starts at Column 5 */}
        <div className="col-start-5 col-span-5 flex items-center space-x-12 text-[15px] font-medium text-brand-teal">
          <NavLink href="#home" label="Home" active />
          <NavLink href="#about" label="About" />
          <NavLink href="#work" label="Work" />
          <NavLink href="#contact" label="Contact" />
        </div>

        {/* Action - Columns 10-12 */}
        <div className="col-start-10 col-span-3 flex items-center justify-end">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/cv.pdf"
            download
            className="bg-brand-teal text-white px-8 py-3 rounded-xl flex items-center space-x-2 text-[14px] font-bold hover:bg-brand-teal/90 transition-all shadow-sm"
          >
            <span>Download CV</span>
          </motion.a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <a 
      href={href} 
      className={`transition-colors hover:text-brand-teal ${active ? 'text-brand-teal' : ''}`}
    >
      {active ? `(${label})` : label}
    </a>
  );
}
