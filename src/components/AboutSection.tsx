import React from 'react';
import { motion } from 'motion/react';
import { Zap, Scale, CheckCircle, Lightbulb } from 'lucide-react';
import { About } from '../types';

const iconMap: Record<string, any> = {
  zap: Zap,
  scale: Scale,
  'check-circle': CheckCircle,
  lightbulb: Lightbulb,
};

export default function AboutSection({ data }: { data: About }) {
  return (
    <section id="about" className="bg-brand-bg py-24">
      <div className="grid grid-cols-12 gap-8">
        
        {/* About Me */}
        <div className="col-start-1 col-span-12 mb-20">
          <h2 className="text-brand-orange text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <p className="text-brand-teal/80 text-lg md:text-xl max-w-4xl leading-relaxed font-light">
            {data.description}
          </p>
        </div>

        {/* My Journey */}
        <div className="col-start-1 col-span-12 mb-24 relative">
          <div className="flex items-center space-x-4 mb-10">
            <h2 className="text-brand-orange text-3xl md:text-4xl font-bold">My Journey</h2>
            <svg width="100" height="30" viewBox="0 0 100 30" fill="none" className="text-brand-orange/30">
              <path d="M5 25C30 5 60 5 95 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-brand-teal/70 leading-relaxed text-[16px]">
            <div className="space-y-6">
              {data.journey.slice(0, 3).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="space-y-6">
              {data.journey.slice(3).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* How I Work */}
        <div className="col-start-1 col-span-12">
          <h2 className="text-brand-orange text-3xl md:text-4xl font-bold mb-12">How I Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.howIWork.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-brand-orange text-[17px]">{item.title}</h3>
                  </div>
                  <p className="text-brand-teal/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
