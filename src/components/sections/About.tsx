'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const stats = [
  { value: '5+', label: 'Years designing products' },
  { value: '20+', label: 'Products shipped' },
  { value: '10+', label: 'Industries covered' },
  { value: '0→1', label: 'Founder-level experience' },
];

const skills = [
  'Product Strategy', 'UX Research', 'Information Architecture',
  'Interaction Design', 'Design Systems', 'Prototyping',
  'User Testing', 'Design Sprints', 'Stakeholder Alignment',
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="section-padding px-5 md:px-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
            The person
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div>
            <ScrollReveal>
              <h2 className="font-display text-[2rem] md:text-[3.5rem] leading-tight text-primary-text mb-6 md:mb-8">
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
                I care about clarity, craft, and the tiny details that make the difference between a product people tolerate and one they actually enjoy using.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="border border-border rounded-2xl p-5 hover:border-pink-brand transition-colors duration-300"
                  >
                    <p className="font-display text-2xl md:text-3xl text-primary-text mb-1">{stat.value}</p>
                    <p className="font-body text-xs text-secondary-text leading-snug">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
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

            <ScrollReveal delay={0.3}>
              <MagneticButton href="/about" variant="default">
                View experience
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* ── Right: Illustration ── */}
          <motion.div style={{ y: imageY }}>
            <ScrollReveal direction="right">
              <div className="relative">

                {/* Main illustration */}
                <div className="relative rounded-3xl overflow-hidden bg-[#F7EDE8]" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/about-hero-3.png"
                    alt="Merhan Assem — Product Designer"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Floating stat card */}
                <motion.div
                  className="absolute -bottom-4 -left-3 md:-bottom-6 md:-left-6 bg-background border border-border rounded-2xl p-3 md:p-5 shadow-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="font-display text-2xl text-primary-text mb-1">5+ yrs</p>
                  <p className="font-body text-xs text-secondary-text">Product design experience</p>
                </motion.div>

                {/* Floating status */}
                <motion.div
                  className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-pink-brand rounded-2xl p-3 md:p-4 shadow-lg"
                  animate={{ rotate: [0, 4, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <p className="font-body text-xs text-white font-medium">Available now</p>
                  </div>
                </motion.div>

                {/* Floating projects card */}
                <motion.div
                  className="absolute top-1/3 -right-8 bg-background border border-border rounded-2xl p-4 shadow-sm hidden xl:block"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <p className="font-display text-xl text-primary-text mb-0.5">20+</p>
                  <p className="font-body text-[11px] text-secondary-text">Products shipped</p>
                </motion.div>

              </div>
            </ScrollReveal>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
