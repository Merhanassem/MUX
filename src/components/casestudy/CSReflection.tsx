'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ReflectionItem {
  question: string;
  answer: string;
}

const DEFAULT_REFLECTION: ReflectionItem[] = [
  {
    question: 'What worked.',
    answer: 'Starting with the ecosystem before any individual features. The mapping exercise in week one aligned the team faster than three months of scattered design reviews could have. Everyone finally understood how the pieces connected.',
  },
  {
    question: 'What was challenging.',
    answer: 'Scope. This platform had 12 features, two user types, and a legacy codebase. Deciding what to redesign versus what to leave alone was harder than the design itself. Every decision had downstream consequences.',
  },
  {
    question: 'What I would do differently.',
    answer: 'Involve coaches earlier. We ran most discovery with learners, and some of the most impactful insights came from coaches — but only in the final weeks of the project. Their perspective would have changed some early decisions.',
  },
  {
    question: 'What this project taught me.',
    answer: 'That complexity is not the enemy. Unclear ownership is. Once each part of the ecosystem had a clear owner and a clear purpose, the complexity became manageable. The design system helped — but shared language helped more.',
  },
];

function ReflectionRow({ item, index, accentColor }: { item: ReflectionItem; index: number; accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 py-12 border-b border-border last:border-0"
    >
      <div>
        <h3
          className="font-display text-2xl md:text-3xl leading-tight"
          style={{ color: index % 2 === 0 ? accentColor : '#1A1A1A' }}
        >
          {item.question}
        </h3>
      </div>
      <div>
        <p className="font-body text-secondary-text leading-relaxed text-base md:text-lg">
          {item.answer}
        </p>
      </div>
    </motion.div>
  );
}

interface CSReflectionProps {
  accentColor?: string;
  items?: ReflectionItem[];
  designerNote?: string;
}

export default function CSReflection({ accentColor = '#718F6B', items = DEFAULT_REFLECTION, designerNote }: CSReflectionProps) {
  return (
    <section className="px-8 md:px-16 py-32 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            10 — Reflection
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text mb-20 max-w-xl">
            Honest notes<br />from the designer.
          </h2>
        </ScrollReveal>

        <div>
          {items.map((item, i) => (
            <ReflectionRow key={i} item={item} index={i} accentColor={accentColor} />
          ))}
        </div>

        {designerNote && (
          <ScrollReveal delay={0.2}>
            <div
              className="mt-16 p-8 md:p-10 rounded-2xl"
              style={{ backgroundColor: accentColor + '08', border: `1px solid ${accentColor}20` }}
            >
              <p className="font-display text-xl md:text-2xl leading-relaxed" style={{ color: accentColor }}>
                &ldquo;{designerNote}&rdquo;
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
