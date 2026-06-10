'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const cards = [
  {
    emoji: '🖥️',
    stat: '1,000+',
    label: 'Screens designed',
    sub: 'Enough to make my laptop file a complaint.',
    size: 'tall',
    bg: '#0D0D0D',
    dark: true,
  },
  {
    emoji: '👾',
    stat: '∞',
    label: 'Figma memory warnings',
    sub: 'If Figma had feelings, it would have quit by now.',
    size: 'normal',
    bg: '#F7F5F1',
    dark: false,
  },
  {
    emoji: '🔍',
    stat: '2px',
    label: 'The misalignment that started wars',
    sub: 'Developers hate me for it. I\'d do it again.',
    size: 'wide',
    bg: '#F72585',
    dark: true,
  },
  {
    emoji: '🤔',
    stat: '"Why?"',
    label: 'My most-asked question',
    sub: 'Asked in every meeting. Never gets old.',
    size: 'normal',
    bg: '#F7F5F1',
    dark: false,
  },
  {
    emoji: '☕',
    stat: 'Classified',
    label: 'Coffee per sprint',
    sub: 'Some data is too sensitive to share.',
    size: 'normal',
    bg: '#1a1a2e',
    dark: true,
  },
  {
    emoji: '🔄',
    stat: '~0',
    label: 'Times "final" was final',
    sub: 'The final version is a myth we tell stakeholders.',
    size: 'wide',
    bg: '#F7F5F1',
    dark: false,
  },
  {
    emoji: '😅',
    stat: '0×',
    label: '"Just one small change"',
    sub: 'was actually small.',
    size: 'normal',
    bg: '#718F6B',
    dark: true,
  },
  {
    emoji: '😬',
    stat: 'Many',
    label: 'Hours spent on padding',
    sub: '"It\'s not just a pixel" — me, always.',
    size: 'normal',
    bg: '#F7F5F1',
    dark: false,
  },
];

export default function FunFacts() {
  return (
    <section className="px-5 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">

      <ScrollReveal>
        <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
          The human behind the work
        </span>
        <h2 className="font-display text-[2.4rem] md:text-[3.5rem] leading-tight text-primary-text mb-16 max-w-xl">
          A few things<br />
          <span className="text-pink-brand">you should know</span>
        </h2>
      </ScrollReveal>

      {/* Bento grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[160px]">
        {cards.map((card, i) => (
          <BentoCard key={i} card={card} index={i} />
        ))}
      </div>

    </section>
  );
}

function BentoCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  const spanClass =
    card.size === 'wide' ? 'col-span-2' :
    card.size === 'tall' ? 'row-span-2' :
    '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl p-4 md:p-6 flex flex-col justify-between overflow-hidden cursor-none transition-transform duration-300 ${spanClass}`}
      style={{
        background: card.bg,
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <span className="text-2xl leading-none">{card.emoji}</span>

      <div>
        <p className={`font-display text-2xl md:text-4xl leading-tight mb-0.5 ${card.dark ? 'text-white' : 'text-primary-text'}`}>
          {card.stat}
        </p>
        <p className={`font-body text-xs md:text-sm font-medium mb-0.5 ${card.dark ? 'text-white/80' : 'text-primary-text'}`}>
          {card.label}
        </p>
        <p className={`font-body text-[10px] md:text-xs leading-snug hidden sm:block ${card.dark ? 'text-white/50' : 'text-secondary-text'}`}>
          {card.sub}
        </p>
      </div>
    </motion.div>
  );
}
