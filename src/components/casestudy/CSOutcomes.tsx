'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Outcome {
  id: string;
  label: string;
  stat?: string;
  statLabel?: string;
  description: string;
  color?: string;
}

const DEFAULT_OUTCOMES: Outcome[] = [
  { id: 'clarity',   label: 'Product Clarity',         description: 'For the first time, the entire team had a shared, visual understanding of how every feature connected to every other.',                        color: '#718F6B' },
  { id: 'complexity',label: 'Reduced Complexity',       stat: '−40%',    statLabel: 'flows simplified',      description: 'Removed 40% of navigational dead ends by consolidating overlapping features into unified surfaces.',                color: '#F08CA6' },
  { id: 'decisions', label: 'Faster Decision Making',   stat: '3×',      statLabel: 'faster sign-off',       description: 'Design reviews that previously took 3 rounds of feedback were resolved in one, because the logic was visible.',   color: '#718F6B' },
  { id: 'coach',     label: 'Better Coach Experience',  stat: '4.4/5',   statLabel: 'coach satisfaction',    description: 'Coaches reported being able to manage their practice entirely within the platform for the first time.',          color: '#F08CA6' },
  { id: 'learner',   label: 'Better Learner Experience',stat: '+62%',    statLabel: 'booking completion',    description: 'Learners found and booked their first session in under 90 seconds, down from over 4 minutes.',                  color: '#718F6B' },
  { id: 'retention', label: 'Higher Retention',          stat: '+75%',    statLabel: 'day-30 retention',      description: 'Learners who completed at least one session with both AI and a human coach retained at 3× the rate of single-mode users.', color: '#4B63F7' },
];

interface CSOutcomesProps {
  accentColor?: string;
  outcomes?: Outcome[];
}

export default function CSOutcomes({ accentColor = '#718F6B', outcomes = DEFAULT_OUTCOMES }: CSOutcomesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="px-8 md:px-16 py-32 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            09 — Outcomes
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text mb-16 max-w-2xl">
            What actually<br />changed.
          </h2>
        </ScrollReveal>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {outcomes.map((outcome, i) => {
            const color = outcome.color ?? accentColor;
            return (
              <motion.div
                key={outcome.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background p-10 md:p-12"
              >
                {outcome.stat && (
                  <div className="mb-5">
                    <span className="font-display text-[3.5rem] leading-none block" style={{ color }}>
                      {outcome.stat}
                    </span>
                    <span className="text-xs font-body text-secondary-text uppercase tracking-wider">{outcome.statLabel}</span>
                  </div>
                )}
                <h3 className="font-display text-xl text-primary-text mb-3">{outcome.label}</h3>
                <p className="font-body text-secondary-text text-sm leading-relaxed">{outcome.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
