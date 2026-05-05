import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Instagram, Mail, Twitter, MessageSquare } from 'lucide-react';
import { Socials } from '../types';

export default function Footer({ socials }: { socials?: Socials }) {
  if (!socials) return null;

  const row1 = [
    { icon: Linkedin, href: socials.linkedin, name: 'LinkedIn', color: 'bg-[#0077B5]' },
    { icon: MessageSquare, href: socials.discord, name: 'Discord', color: 'bg-[#5865F2]' },
    { icon: Github, href: socials.github, name: 'GitHub', color: 'bg-[#000000]' },
  ];

  const row2 = [
    { icon: Instagram, href: socials.instagram, name: 'Instagram', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
    { icon: Mail, href: `mailto:${socials.email}`, name: 'Email', color: 'bg-[#EA4335]' },
    { icon: Twitter, href: socials.twitter, name: 'Twitter', color: 'bg-[#1DA1F2]' },
  ];

  return (
    <footer id="contact" className="bg-brand-bg">
      {/* 1. Hero Image Header */}
      <div className="max-w-[1920px] mx-auto px-0 md:px-[70px] pt-12">
        <div className="aspect-[3/1] w-full rounded-[40px] overflow-hidden shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=1200" 
            alt="Cinematic Landscape Sunset"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2. Content Layout (Brand Background Section) */}
      <div className="bg-brand-bg mt-[-100px] pt-[180px] pb-32 relative z-0">
        <div className="max-w-[1920px] mx-auto px-[70px] grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          
          {/* Left Column (Text) */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-brand-orange text-4xl md:text-5xl font-bold leading-tight font-sans">
                Very Happy to see you down here:)
              </h2>
              <p className="text-brand-teal text-xl md:text-2xl leading-relaxed max-w-2xl font-light">
                Even I'm a little confused in life right now and not working on something big and long-term. 
                But if you have something to talk about, or something we can work on together --- let's connect, let's talk.
              </p>
            </motion.div>
          </div>

          {/* Right Column (Socials) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <h3 className="text-3xl font-bold mb-16 font-sans">
                <span className="text-brand-teal">Start By </span>
                <a 
                  href={`mailto:${socials.email}`}
                  className="text-brand-orange border-b-2 border-brand-orange pb-1 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  Saying Hi.
                </a>
              </h3>

              {/* 3. Social Media Icon Specifications */}
              <div className="space-y-6">
                {/* Row 1 */}
                <div className="flex space-x-6 justify-center md:justify-start">
                  {row1.map((item, i) => (
                    <SocialIcon key={i} item={item} />
                  ))}
                </div>
                
                {/* Row 2 - Staggered to the right */}
                <div className="flex space-x-6 justify-center md:justify-start md:pl-12">
                  {row2.map((item, i) => (
                    <SocialIcon key={i} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Traditional Footer Bottom */}
        <div className="max-w-[1920px] mx-auto px-[70px] mt-32 pt-12 border-t border-brand-teal/10 flex flex-col md:flex-row justify-between items-center text-sm text-brand-teal/40">
           <p className="font-medium">© {new Date().getFullYear()} Ravina Kumari. All rights reserved.</p>
           <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
             <span>Built with Logic & Art</span>
             <a href="/login" className="hover:text-brand-teal transition-colors underline underline-offset-4">Admin Access</a>
           </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ item }: { item: any }) {
  return (
    <motion.a
      whileHover={{ y: -8, scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${item.color} w-16 h-16 rounded-[22px] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
    >
      <item.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
    </motion.a>
  );
}
