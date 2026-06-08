'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import ScrollReveal from '@/components/ui/ScrollReveal';

type StageKey = 'challenge' | 'decision' | 'wireframe' | 'design' | 'impact';

interface Stage {
  key: StageKey;
  label: string;
  content: string;
  isVisual?: boolean;
  imageUrl?: string;
}

interface Feature {
  id: string;
  title: string;
  tagline: string;
  stages: Stage[];
}

const DEFAULT_FEATURES: Feature[] = [
  {
    id: 'booking',
    title: 'Booking System',
    tagline: 'Making the most critical flow feel effortless.',
    stages: [
      { key: 'challenge', label: 'Challenge', content: 'Users were abandoning bookings mid-flow due to time zone confusion, unclear pricing tiers, and a lack of session-type clarity. Conversion was 34% below target.' },
      { key: 'decision',  label: 'Decision',  content: 'We decided to collapse a 7-step booking flow into a 3-step guided experience. Each step would answer one question: Who? When? How much?' },
      { key: 'wireframe', label: 'Wireframe', content: '', isVisual: true, imageUrl: '/taaly-wireframe-booking.png' },
      { key: 'design',    label: 'Final Design', content: '', isVisual: true, imageUrl: '/taaly-booking-hifi.png' },
      { key: 'impact',    label: 'Impact',    content: 'Booking completion rate increased from 51% to 84%. Time-to-booking dropped from 4.2 minutes to under 90 seconds.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Coaches',
    tagline: 'Intelligence that feels like intuition, not automation.',
    stages: [
      { key: 'challenge', label: 'Challenge', content: 'AI matching existed as a hidden algorithm. Users had no visibility into why a coach was recommended, eroding trust and reducing match acceptance.' },
      { key: 'decision',  label: 'Decision',  content: 'Transparency over mystery. We surfaced matching signals as human-readable reasons: "Matches your schedule", "Similar to coaches you\'ve loved".' },
      { key: 'wireframe', label: 'Wireframe', content: '', isVisual: true, imageUrl: '/taaly-ai-wireframe.png' },
      { key: 'design',    label: 'Final Design', content: '', isVisual: true, imageUrl: '/taaly-ai-hifi.png' },
      { key: 'impact',    label: 'Impact',    content: 'Match acceptance rate increased by 62%. Users who saw transparency signals were 3× more likely to complete their first session.' },
    ],
  },
  {
    id: 'wallet',
    title: 'Wallet',
    tagline: 'Money should never be the thing that breaks trust.',
    stages: [
      { key: 'challenge', label: 'Challenge', content: 'Coach payouts were opaque and delayed. Learners couldn\'t track credit usage. Every financial interaction created anxiety rather than confidence.' },
      { key: 'decision',  label: 'Decision',  content: 'A unified wallet view with real-time balance, transaction history, and scheduled payouts. Make the invisible visible.' },
      { key: 'wireframe', label: 'Wireframe', content: '', isVisual: true, imageUrl: '/taaly-ai-wireframe.png' },
      { key: 'design',    label: 'Final Design', content: '', isVisual: true, imageUrl: '/taaly-wallet-hifi.png' },
      { key: 'impact',    label: 'Impact',    content: 'Support tickets related to billing dropped 58%. Coach satisfaction scores for financial tools improved from 2.8 to 4.4/5.' },
    ],
  },
];

const STAGE_ORDER: StageKey[] = ['challenge', 'decision', 'wireframe', 'design', 'impact'];

function FeatureBlock({ feature, accentColor }: { feature: Feature; accentColor: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(feature.stages.length - 1, Math.floor(v * feature.stages.length));
      setActiveStage(idx);
    });
    return unsub;
  }, [scrollYProgress, feature.stages.length]);

  const stage = feature.stages[activeStage];

  return (
    <div
      ref={containerRef}
      style={{ height: `${feature.stages.length * 45}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — narrative */}
            <div>
              {/* Feature title */}
              <div className="mb-8">
                <span className="text-[10px] font-body text-secondary-text uppercase tracking-[0.14em] mb-2 block">
                  {feature.title}
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-primary-text leading-tight">
                  {feature.tagline}
                </h3>
              </div>

              {/* Stage steps */}
              <div className="space-y-3 mb-8">
                {STAGE_ORDER.map((key, i) => {
                  const s = feature.stages.find((st) => st.key === key);
                  if (!s) return null;
                  const isActive = i === activeStage;
                  return (
                    <motion.div
                      key={key}
                      className="flex items-start gap-4"
                      animate={{ opacity: isActive ? 1 : i < activeStage ? 0.35 : 0.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        animate={{
                          backgroundColor: isActive ? accentColor : 'transparent',
                          borderColor: isActive ? accentColor : accentColor + '30',
                          scale: isActive ? 1 : 0.85,
                        }}
                        style={{ border: '1.5px solid' }}
                        transition={{ duration: 0.25 }}
                      >
                        {i < activeStage && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </motion.div>
                      <span
                        className="font-body text-sm pt-0.5"
                        style={{ color: isActive ? '#1A1A1A' : '#9CA3AF' }}
                      >
                        {s.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Active stage text */}
              <AnimatePresence mode="wait">
                {!stage.isVisual && (
                  <motion.p
                    key={activeStage}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-body text-secondary-text leading-relaxed"
                  >
                    {stage.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Right — visual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden"
              >
                {stage.imageUrl ? (
                  <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: accentColor + '08', border: `1px solid ${accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={stage.imageUrl}
                      alt={`${feature.title} — ${stage.label}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : stage.isVisual ? (
                  <MediaPlaceholder
                    type="image"
                    aspectRatio="4/3"
                    accentColor={accentColor}
                    label={`→ ${feature.title} — ${stage.label}`}
                    className="rounded-2xl"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-2xl"
                    style={{
                      aspectRatio: '4/3',
                      backgroundColor: accentColor + '08',
                      border: `1px solid ${accentColor}20`,
                    }}
                  >
                    <span className="font-display text-6xl md:text-8xl select-none" style={{ color: accentColor + '20' }}>
                      {String(STAGE_ORDER.indexOf(stage.key) + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CSFeatureStoryProps {
  accentColor?: string;
  features?: Feature[];
}

export default function CSFeatureStory({ accentColor = '#718F6B', features = DEFAULT_FEATURES }: CSFeatureStoryProps) {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-24 pb-0">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            06 — Building the Product
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text mb-4 max-w-2xl">
            Feature by feature.<br />Decision by decision.
          </h2>
          <p className="font-body text-secondary-text max-w-lg leading-relaxed mb-0">
            Each feature had its own story of challenge, decision, and solution. Here are the ones that shaped the product most.
          </p>
        </ScrollReveal>
      </div>

      {features.map((feature) => (
        <FeatureBlock key={feature.id} feature={feature} accentColor={accentColor} />
      ))}
    </div>
  );
}
