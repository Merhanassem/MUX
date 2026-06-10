'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const outcomes = [
  {
    label: 'Faster decisions',
    description: 'Teams stop debating and start moving because the direction is clear.',
    stat: '3–5×',
    statLabel: 'faster alignment',
    color: '#718F6B',
  },
  {
    label: 'Less rework',
    description: 'When you build the right thing first, you don\'t rebuild it six months later.',
    stat: '40%',
    statLabel: 'avg. reduction in scope changes',
    color: '#F08CA6',
  },
  {
    label: 'Better conversations',
    description: 'Stakeholders, engineers, and users finally on the same page — without a 40-slide deck.',
    stat: '100%',
    statLabel: 'clearer briefs',
    color: '#718F6B',
  },
  {
    label: 'Products that ship',
    description: 'Not prototypes that live in Notion. Real, designed, tested, shippable work.',
    stat: '→',
    statLabel: 'from concept to launch',
    color: '#F08CA6',
  },
];

const notList = [
  "Bloated 80-page UX reports.",
  "200 screens when 12 solve the problem.",
  "Disappearing after handoff.",
  "Charging for complexity I created.",
];

export default function WhyTeams() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding px-5 md:px-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-10 md:mb-20">
            <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
              The real reason
            </span>
            <h2 className="font-display text-[2rem] md:text-[3.5rem] leading-tight text-primary-text">
              Why teams bring me in
            </h2>
          </div>
        </ScrollReveal>

        {/* Outcomes grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-12">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-6 md:p-12 group cursor-none"
            >
              <div className="flex items-start gap-6 mb-4">
                <div>
                  <motion.span
                    className="font-display text-4xl md:text-5xl block mb-1"
                    style={{ color: outcome.color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {outcome.stat}
                  </motion.span>
                  <span className="text-xs font-body text-secondary-text uppercase tracking-wider">
                    {outcome.statLabel}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-xl text-primary-text mb-3">{outcome.label}</h3>
              <p className="font-body text-secondary-text leading-relaxed text-sm">{outcome.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Not list */}
        <ScrollReveal>
          <div className="border border-border rounded-2xl md:rounded-3xl p-6 md:p-12">
            <h3 className="font-display text-2xl text-primary-text mb-8">
              What I&apos;m not —
            </h3>
            <div className="space-y-4">
              {notList.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08} direction="left">
                  <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                    <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-brand" />
                    </div>
                    <p className="font-body text-secondary-text">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
