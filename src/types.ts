/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioData {
  profile: Profile;
  about: About;
  testimonials: Testimonial[];
  experience: Experience[];
  socials: Socials;
}

export interface Profile {
  name: string;
  title: string;
  experienceYears: string;
  cvUrl: string;
  profileImage: string;
}

export interface About {
  description: string;
  journey: string[];
  howIWork: HowIWorkItem[];
}

export interface HowIWorkItem {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  feedback: string;
  avatar: string;
}

export interface Experience {
  period: string;
  role: string;
  skills: string;
  description: string;
}

export interface Socials {
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
  discord: string;
  email: string;
}
