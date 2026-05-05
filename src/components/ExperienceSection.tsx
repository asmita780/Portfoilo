import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

export default function ExperienceSection({ data }: { data: Experience[] }) {
  const dotColors = [
    'bg-brand-teal ring-brand-teal/20',
    'bg-gray-300 ring-gray-100',
    'bg-green-400 ring-green-100',
    'bg-brand-orange ring-brand-orange/20'
  ];

  return (
    <section id="work" className="bg-brand-bg py-24">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-1 col-span-12">
          <h2 className="text-3xl md:text-4xl font-display text-brand-orange mb-20 text-center">
              My Work Experience
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-brand-teal/10"></div>

            <div className="space-y-16">
              {data.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Date & Dot */}
                  <div className={`flex items-center space-x-4 md:w-1/2 ${i % 2 !== 0 ? 'md:flex-row-reverse md:space-x-reverse md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <span className="text-brand-teal font-bold whitespace-nowrap text-lg">
                      [ ● {item.period} ]
                    </span>
                    
                    {/* Central Dot */}
                    <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-8 ${dotColors[i % dotColors.length]} z-10`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`mt-6 md:mt-0 md:w-1/2 ${i % 2 !== 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-brand-teal/5 shadow-xs hover:shadow-md transition-shadow group">
                      <div className={`flex items-center space-x-2 mb-2 ${i % 2 !== 0 ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-orange">{item.role}</h3>
                        <Briefcase className="w-5 h-5 text-brand-teal opacity-50 group-hover:rotate-12 transition-transform" />
                      </div>
                      
                      <p className="text-brand-teal/60 text-sm font-medium mb-4 italic">
                        {item.skills}
                      </p>
                      
                      <p className="text-brand-teal/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
