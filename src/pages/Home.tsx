import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import ExperienceSection from '../components/ExperienceSection';
import { PortfolioData } from '../types';
import { motion } from 'motion/react';

export default function Home({ data }: { data: PortfolioData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-0"
    >
      <Hero data={data.profile} />
      <AboutSection data={data.about} />
      <ExperienceSection data={data.experience} />
      <Testimonials data={data.testimonials} />
    </motion.div>
  );
}
