import React from 'react';
import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';
import { Profile } from '../types';

export default function Hero({ data }: { data: Profile }) {
  return (
    <section id="home" className="min-h-[calc(100vh-240px)] flex flex-col justify-between relative">
      <div className="grid grid-cols-12 gap-8 items-start pt-12">
        
        {/* Left Content - Column 1 */}
        <div className="col-start-1 col-span-4 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="mb-8">
              <span className="text-brand-teal text-lg block font-medium">Ravina</span>
              <span className="text-brand-orange text-5xl font-extrabold block">Kumari</span>
            </div>

            <div>
              <p className="text-brand-teal text-xl font-medium mb-4">Hy! I am</p>
              <h1 className="text-brand-orange text-5xl font-extrabold leading-tight">
                Ravina Kumari.
              </h1>
            </div>
            
            {/* Hand-drawn arrow - curves from below text to image center */}
            <div className="absolute top-[320px] left-[200px] pointer-events-none z-0">
              <svg width="200" height="120" viewBox="0 0 200 120" fill="none" className="text-brand-teal">
                <path 
                  d="M10 10C30 90 120 100 180 30" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeDasharray="6 6" 
                />
                <path d="M170 45L182 32L165 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Center Image - Columns 5-8 */}
        <div className="col-start-5 col-span-4 flex justify-center pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-4 border-2 border-brand-teal rounded-[40px] bg-white inline-block shadow-sm z-10"
          >
            <div className="w-[320px] h-[420px] overflow-hidden rounded-[30px]">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" 
                alt="Ravina Kumari"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Description - Columns 11-12, aligned horizontally with name block */}
        <div className="col-start-11 col-span-2 text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-brand-teal leading-relaxed"
          >
            <p className="text-xl font-medium mb-1 line-clamp-2">Developer by logic, designer by heard.</p>
            <p className="text-xl font-medium">Obsessed with clean code.</p>
          </motion.div>
        </div>
      </div>

      {/* Footer Elements */}
      <div className="grid grid-cols-12 items-end pb-12 mt-24">
        {/* Experience - Columns 1-3 */}
        <div className="col-start-1 col-span-3 flex items-center space-x-3">
          <span className="text-brand-teal text-7xl font-bold leading-none">03</span>
          <div className="flex flex-col text-brand-teal font-light text-lg leading-tight pt-2">
            <span>Years</span>
            <span>Experience</span>
          </div>
        </div>

        {/* Connect - Columns 10-12 */}
        <div className="col-start-10 col-span-3 flex justify-end items-center">
          <a 
            href="#contact" 
            className="text-brand-teal font-bold text-xl flex items-center space-x-3 group border-b-2 border-brand-teal pb-1"
          >
            <span>Let’s Connect</span>
            <span className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">🚀</span>
          </a>
        </div>
      </div>
    </section>
  );
}
