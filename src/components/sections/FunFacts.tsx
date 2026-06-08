'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const facts = [
  { text: 'Developers mostly hate me for noticing 2px misalignment.', emoji: '🔍' },
  { text: '"Just one small change" was actually small: 0 times.', emoji: '😅' },
  { text: 'Screens designed — enough to make my laptop nervous.', emoji: '🖥️' },
  { text: 'Figma memory warnings received — too many to count.', emoji: '👾' },
  { text: 'I\'ve asked "but why do users do that?" in more meetings than I can remember.', emoji: '🤔' },
  { text: 'Coffee consumed per design sprint: classified.', emoji: '☕' },
  { text: 'Hours spent convincing engineers that padding is not "just a pixel thing": many.', emoji: '😬' },
  { text: 'Times the "final" version was actually final: rarely.', emoji: '🔄' },
];

// Duplicate for seamless loop
const doubled = [...facts, ...facts];

export default function FunFacts() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-8 md:px-16 mb-10">
          <span className="text-xs font-body text-secondary-text tracking-widest uppercase">
            The human behind the work
          </span>
        </div>
      </ScrollReveal>

      {/* Marquee strip */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F7F5F1, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F7F5F1, transparent)' }} />

        <div
          className="flex gap-4 w-max"
          style={{
            animation: paused ? 'none' : 'marquee 40s linear infinite',
            willChange: 'transform',
          }}
        >
          {doubled.map((fact, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 border border-border rounded-full px-5 py-3 bg-background flex-shrink-0 cursor-none"
              whileHover={{
                borderColor: i % 2 === 0 ? '#718F6B60' : '#F08CA660',
                backgroundColor: i % 2 === 0 ? '#718F6B08' : '#F08CA608',
                y: -2,
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-lg leading-none">{fact.emoji}</span>
              <span className="text-sm font-body text-secondary-text whitespace-nowrap">
                {fact.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
