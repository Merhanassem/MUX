'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';

const skills = [
  'Product Strategy', 'UX Research', 'Information Architecture',
  'Interaction Design', 'Design Systems', 'Prototyping',
  'User Testing', 'Design Sprints', 'Stakeholder Alignment',
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="section-padding px-8 md:px-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
            The person
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <h2 className="font-display text-[2.5rem] md:text-[3.5rem] leading-tight text-primary-text mb-8">
                I&apos;m a product designer who thinks in{' '}
                <span className="text-pink-brand">outcomes</span>, not outputs.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="font-body text-secondary-text leading-relaxed mb-6">
                I work with startups and scale-ups to figure out what&apos;s worth building — and then build it well. That usually means more time in the problem space than most designers are comfortable with, and a lot of honest conversations before any screens get made.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="font-body text-secondary-text leading-relaxed mb-10">
                I care about clarity, craft, and the tiny details that make the difference between a product that people tolerate and one they actually enjoy using. And I care about working with people who give a damn.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mb-10">
                <p className="text-xs font-body text-secondary-text uppercase tracking-wider mb-4">What I work with</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-body text-secondary-text border border-border rounded-full px-4 py-2 hover:border-pink-brand hover:text-pink-brand transition-colors duration-200 cursor-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <MagneticButton href="#contact" variant="default">
                Work with me
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Image */}
          <motion.div style={{ y: imageY }}>
            <ScrollReveal direction="right">
              <div className="relative">
                <MediaPlaceholder
                  type="image"
                  aspectRatio="4/5"
                  accentColor="#F08CA6"
                  label="→ Your photo goes here"
                  className="rounded-3xl"
                />
                {/* Floating decoration */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-5 shadow-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="font-display text-2xl text-primary-text mb-1">5+ yrs</p>
                  <p className="font-body text-xs text-secondary-text">Product design experience</p>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 bg-pink-brand rounded-2xl p-4"
                  animate={{ rotate: [0, 5, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="font-body text-xs text-white font-medium">Available now</p>
                </motion.div>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
