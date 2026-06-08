'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface GoalCard {
  id: string;
  label: string;
  icon: string;
  summary: string;
  details: string[];
  color: string;
}

const DEFAULT_CARDS: GoalCard[] = [
  {
    id: 'business',
    label: 'Business Goals',
    icon: '◈',
    summary: 'What the business needs to succeed.',
    details: [
      'Increase monthly active users by 40%',
      'Reduce churn through better coach-learner matching',
      'Build a scalable monetisation model',
      'Establish brand trust in target markets',
    ],
    color: '#718F6B',
  },
  {
    id: 'user',
    label: 'User Goals',
    icon: '◉',
    summary: 'What users actually want to accomplish.',
    details: [
      'Find the right coach quickly and confidently',
      'Book sessions without friction',
      'Track progress meaningfully over time',
      'Feel supported between sessions',
    ],
    color: '#F08CA6',
  },
  {
    id: 'product',
    label: 'Product Goals',
    icon: '◎',
    summary: 'What the product must deliver to succeed.',
    details: [
      'A seamless end-to-end booking experience',
      'Real-time communication that feels native',
      'A personalised feed that drives return visits',
      'A design system that scales across platforms',
    ],
    color: '#718F6B',
  },
  {
    id: 'metrics',
    label: 'Success Metrics',
    icon: '◇',
    summary: 'How we know it\'s working.',
    details: [
      'Booking completion rate > 85%',
      'Day-30 retention > 60%',
      'NPS score > 50 within 6 months',
      'Coach satisfaction score > 4.5/5',
    ],
    color: '#F08CA6',
  },
];

interface CSBusinessGoalsProps {
  accentColor?: string;
  cards?: GoalCard[];
}

export default function CSBusinessGoals({ accentColor = '#718F6B', cards = DEFAULT_CARDS }: CSBusinessGoalsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="px-8 md:px-16 py-32 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            02 — Understanding the Business
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text mb-16 max-w-2xl">
            Four lenses.<br />One shared direction.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const isHovered = hoveredId === card.id;
            const isExpanded = expandedId === card.id;
            const isOtherHovered = hoveredId !== null && !isHovered;

            return (
              <ScrollReveal key={card.id} delay={i * 0.08}>
                <motion.div
                  onMouseEnter={() => setHoveredId(card.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setExpandedId(isExpanded ? null : card.id)}
                  className="relative border border-border rounded-2xl p-8 md:p-10 cursor-none overflow-hidden"
                  animate={{
                    opacity: isOtherHovered && !isExpanded ? 0.45 : 1,
                    scale: isHovered || isExpanded ? 1.015 : 1,
                    borderColor: isHovered || isExpanded ? card.color + '50' : '#E5E0D6',
                  }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Bg tint */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{ opacity: isHovered || isExpanded ? 1 : 0, backgroundColor: card.color + '07' }}
                    transition={{ duration: 0.25 }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xl" style={{ color: card.color }}>{card.icon}</span>
                        <h3 className="font-display text-xl text-primary-text">{card.label}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.22 }}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: isExpanded ? card.color + '60' : undefined }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1v8M1 5h8" stroke={isExpanded ? card.color : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </div>

                    <p className="font-body text-secondary-text text-sm leading-relaxed mb-0">
                      {card.summary}
                    </p>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t space-y-3" style={{ borderColor: card.color + '25' }}>
                            {card.details.map((detail, di) => (
                              <motion.div
                                key={di}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: di * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-start gap-3"
                              >
                                <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: card.color }} />
                                <p className="font-body text-sm text-secondary-text leading-relaxed">{detail}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="font-body text-xs text-secondary-text mt-6 text-center">
            Click any card to explore —
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
