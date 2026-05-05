import React from 'react';
import { motion } from 'motion/react';
import { Testimonial } from '../types';

export default function Testimonials({ data }: { data: Testimonial[] }) {
  return (
    <section className="bg-brand-bg py-24">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-1 col-span-12 font-display">
          <div className="text-center mb-20 relative">
            <h2 className="text-2xl md:text-3xl text-brand-orange italic">
              Words from people I've worked with
            </h2>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none" className="text-brand-teal">
                <path d="M10 50C40 20 160 20 190 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
              </svg>
            </div>
          </div>

          <div className="space-y-24">
            {data.map((item, i) => (
              <TestimonialCard 
                key={i} 
                item={item} 
                index={i}
                reverse={i % 2 !== 0} 
              />
            ))}
          </div>

          <div className="mt-32 text-center">
              <p className="text-brand-teal/80 text-xl font-medium italic flex items-center justify-center space-x-2">
                  <span>Grateful for the people I learn from</span>
                  <span className="text-red-400">♥</span>
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, reverse, index }: { item: Testimonial; reverse: boolean; index: number; key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-8 ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Avatar Container */}
      <div className="flex-shrink-0 relative group">
         <div className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-brand-teal/20 transform ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'} group-hover:rotate-0 transition-transform duration-500`}>
            <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-full h-full object-cover"
            />
         </div>
         {/* Simple name badge for mobile */}
         <div className="md:hidden mt-4 text-center">
            <h3 className="font-bold text-brand-teal">{item.name}</h3>
            <p className="text-xs text-brand-teal/60">{item.role}</p>
         </div>
      </div>

      {/* Content */}
      <div className={`flex-1 space-y-4 ${reverse ? 'md:text-right' : 'md:text-left'}`}>
        <h4 className="text-xl md:text-2xl font-display italic text-brand-orange leading-tight">
          "{item.quote}"
        </h4>
        <p className="text-brand-teal/70 text-sm md:text-base leading-relaxed bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-brand-teal/5">
          {item.feedback}
        </p>
        
        <div className="hidden md:block">
            <h3 className="font-bold text-brand-orange text-lg">{item.name}</h3>
            <p className="text-sm text-brand-teal/60">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
