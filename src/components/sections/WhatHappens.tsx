'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const cards = [
  {
    id: 1,
    question: 'Got an idea?',
    answer: "Let's validate it.",
    detail: "Before you build a single screen, we'll test whether the problem is real, the market exists, and your solution is the right one. Fast, focused, and honest.",
    icon: '💡',
    accent: '#F08CA6',
  },
  {
    id: 2,
    question: 'Product feels messy?',
    answer: "Let's find the gaps.",
    detail: "An audit that goes beyond UI polish. We'll map where users get confused, where trust breaks down, and where the product is promising something it can't deliver.",
    icon: '🧩',
    accent: '#718F6B',
  },
  {
    id: 3,
    question: 'Users are dropping off?',
    answer: "Let's understand why.",
    detail: "Session recordings, funnel analysis, user interviews — whatever it takes to move from gut feeling to a clear picture of what's actually happening and why.",
    icon: '📉',
    accent: '#F08CA6',
  },
  {
    id: 4,
    question: 'Need to move fast?',
    answer: "Let's build the right foundation first.",
    detail: "Speed without direction is how teams end up rebuilding in 6 months. We'll define scope, prioritize ruthlessly, and move fast — on the right things.",
    icon: '⚡',
    accent: '#718F6B',
  },
];

function Card({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative border border-border rounded-3xl p-8 md:p-10 overflow-hidden cursor-none group"
        animate={{
          borderColor: hovered ? card.accent + '60' : '#E5E0D6',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background fill on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            opacity: hovered ? 1 : 0,
            backgroundColor: card.accent + '08',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full"
          animate={{
            opacity: hovered ? 0.15 : 0,
            backgroundColor: card.accent,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          <span className="text-3xl mb-6 block">{card.icon}</span>

          <p className="font-display text-2xl md:text-3xl text-secondary-text mb-2">
            {card.question}
          </p>
          <motion.p
            className="font-display text-2xl md:text-3xl font-medium"
            style={{ color: card.accent }}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {card.answer}
          </motion.p>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-secondary-text text-sm leading-relaxed mt-4 overflow-hidden"
              >
                {card.detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-8 right-8"
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={card.accent} strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function WhatHappens() {
  return (
    <section className="section-padding px-8 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
              What we do together
            </span>
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] leading-tight text-primary-text">
              What happens when<br />
              <span className="text-pink-brand">we work together</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
