'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const capabilities = [
  {
    id: 'discovery',
    label: 'Product Discovery',
    short: 'Find what\'s worth building.',
    visual: 'discovery',
    accent: '#718F6B',
    size: 'large',
  },
  {
    id: 'ux-audit',
    label: 'UX Audits',
    short: 'Surface what\'s broken before users do.',
    visual: 'audit',
    accent: '#F08CA6',
    size: 'medium',
  },
  {
    id: 'product-design',
    label: 'Product Design',
    short: 'From wireframe to shipped screen.',
    visual: 'design',
    accent: '#718F6B',
    size: 'medium',
  },
  {
    id: 'flows',
    label: 'User Flows',
    short: 'Map the paths that matter.',
    visual: 'flows',
    accent: '#F08CA6',
    size: 'small',
  },
  {
    id: 'systems',
    label: 'Design Systems',
    short: 'Build once, scale everywhere.',
    visual: 'system',
    accent: '#718F6B',
    size: 'small',
  },
  {
    id: 'ai',
    label: 'AI-Assisted Design',
    short: 'Faster research, smarter prototypes.',
    visual: 'ai',
    accent: '#F08CA6',
    size: 'medium',
  },
  {
    id: 'mvp',
    label: 'MVP Definition',
    short: 'Scope ruthlessly. Ship what counts.',
    visual: 'mvp',
    accent: '#718F6B',
    size: 'medium',
  },
  {
    id: 'strategy',
    label: 'Product Strategy',
    short: 'Align vision with execution.',
    visual: 'strategy',
    accent: '#F08CA6',
    size: 'large',
  },
];

// Inline SVG visuals for each capability — simple, iconic, brand-colored
function CapabilityVisual({ type, color }: { type: string; color: string }) {
  const c = color;
  const dim = `${c}18`;
  const stroke = c;

  const visuals: Record<string, ReactNode> = {
    discovery: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="34" cy="34" r="18" stroke={stroke} strokeWidth="2.5" fill={dim} />
        <path d="M47 47L62 62" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="34" cy="34" r="8" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <circle cx="34" cy="26" r="2" fill={stroke} />
      </svg>
    ),
    audit: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="16" y="12" width="38" height="48" rx="4" stroke={stroke} strokeWidth="2" fill={dim} />
        <path d="M24 26h22M24 34h16M24 42h20" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="54" cy="54" r="10" fill={dim} stroke={stroke} strokeWidth="2" />
        <path d="M50 54l3 3 5-5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    design: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="10" y="10" width="28" height="22" rx="3" stroke={stroke} strokeWidth="2" fill={dim} />
        <rect x="44" y="10" width="26" height="22" rx="3" stroke={stroke} strokeWidth="2" fill={dim} />
        <rect x="10" y="38" width="60" height="30" rx="3" stroke={stroke} strokeWidth="2" fill={dim} />
        <circle cx="16" cy="48" r="3" fill={stroke} />
        <path d="M24 48h30M24 54h20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      </svg>
    ),
    flows: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="8" y="30" width="18" height="18" rx="9" stroke={stroke} strokeWidth="2" fill={dim} />
        <rect x="54" y="30" width="18" height="18" rx="3" stroke={stroke} strokeWidth="2" fill={dim} />
        <rect x="31" y="10" width="18" height="14" rx="3" stroke={stroke} strokeWidth="2" fill={dim} />
        <rect x="31" y="54" width="18" height="14" rx="3" stroke={stroke} strokeWidth="2" fill={dim} />
        <path d="M26 39h5M49 39h5M40 24v6M40 54v-6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 39h-4l4-3M26 39h-4l4 3" stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity=".6" />
      </svg>
    ),
    system: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {[0,1,2,3].map((i) => (
          <rect key={i} x={10 + (i % 2) * 36} y={10 + Math.floor(i / 2) * 36} width="28" height="28" rx="4"
            stroke={stroke} strokeWidth="1.5" fill={i === 0 ? stroke + '30' : dim} />
        ))}
        <rect x="14" y="14" width="20" height="4" rx="2" fill={stroke} opacity=".6" />
        <rect x="14" y="20" width="12" height="2" rx="1" fill={stroke} opacity=".3" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="20" stroke={stroke} strokeWidth="2" fill={dim} />
        <circle cx="40" cy="40" r="10" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <path d="M40 20V14M40 66V60M60 40h6M14 40h6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="40" cy="40" r="3" fill={stroke} />
        {[45,135,225,315].map((angle, i) => (
          <circle key={i}
            cx={40 + 20 * Math.cos((angle * Math.PI) / 180)}
            cy={40 + 20 * Math.sin((angle * Math.PI) / 180)}
            r="3" fill={stroke} opacity=".6" />
        ))}
      </svg>
    ),
    mvp: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path d="M10 65L28 40l14 12L58 22l12 43H10z" stroke={stroke} strokeWidth="2"
          fill={dim} strokeLinejoin="round" />
        <circle cx="28" cy="40" r="3" fill={stroke} />
        <circle cx="42" cy="52" r="3" fill={stroke} />
        <circle cx="58" cy="22" r="4" fill={stroke} />
        <path d="M54 18l8 8M62 18l-8 8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path d="M14 58h52" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity=".3" />
        <rect x="14" y="44" width="10" height="14" rx="2" fill={stroke} opacity=".3" />
        <rect x="30" y="34" width="10" height="24" rx="2" fill={stroke} opacity=".5" />
        <rect x="46" y="22" width="10" height="36" rx="2" fill={stroke} opacity=".8" />
        <path d="M19 44L35 34l16-12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="51" cy="22" r="3" fill={stroke} />
      </svg>
    ),
  };

  return visuals[type] || null;
}

function CapabilityCard({ cap }: { cap: typeof capabilities[0] }) {
  const [hovered, setHovered] = useState(false);

  const heights = { large: 'h-52', medium: 'h-44', small: 'h-36' };
  const visualSizes = { large: 'w-20 h-20', medium: 'w-16 h-16', small: 'w-14 h-14' };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative border border-border rounded-2xl p-6 overflow-hidden cursor-none group flex flex-col justify-between ${heights[cap.size as keyof typeof heights]}`}
      animate={{
        borderColor: hovered ? cap.accent + '60' : '#E5E0D6',
        backgroundColor: hovered ? cap.accent + '07' : 'transparent',
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Visual */}
      <div className={`${visualSizes[cap.size as keyof typeof visualSizes]} flex-shrink-0`}>
        <CapabilityVisual type={cap.visual} color={cap.accent} />
      </div>

      {/* Label */}
      <div>
        <motion.h3
          className="font-display text-lg text-primary-text mb-1 leading-tight"
          animate={{ color: hovered ? cap.accent : '#1A1A1A' }}
          transition={{ duration: 0.2 }}
        >
          {cap.label}
        </motion.h3>
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-body text-secondary-text leading-relaxed"
            >
              {cap.short}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl"
        animate={{ opacity: hovered ? 0.12 : 0, backgroundColor: cap.accent }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

export default function ThinkAndDesign() {
  return (
    <section className="section-padding px-8 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-14">
            <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
              Capabilities
            </span>
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] leading-tight text-primary-text">
              I think and design.<br />
              <span className="text-pink-brand">Here&apos;s what that looks like.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Responsive masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.id} delay={i * 0.05} className={
              cap.size === 'large' ? 'col-span-2' :
              cap.size === 'medium' ? 'col-span-1 md:col-span-1' :
              'col-span-1'
            }>
              <CapabilityCard cap={cap} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom line */}
        <ScrollReveal className="mt-12">
          <p className="font-body text-secondary-text text-center max-w-lg mx-auto leading-relaxed">
            The combination of strategic thinking and hands-on design is what makes the work actually ship.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
