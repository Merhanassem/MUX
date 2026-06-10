'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Screen {
  id: string;
  label: string;
  caption?: string;
  src?: string | null;
  aspectRatio?: string;
  size?: 'full' | 'wide' | 'half';
}

const DEFAULT_SCREENS: Screen[] = [
  { id: 's1', label: 'Home Screens', caption: 'Three role-aware home experiences — Learner, Coach, and Dual Role — each surfacing exactly what that user needs without overlap.', size: 'full', src: '/taaly-home-screens.png' },
  { id: 's2', label: 'Live Rooms', caption: 'Drop into a live language room and practise in real time — solo with AI, one-on-one with a coach, or in a group session with other learners.', size: 'wide', src: '/taaly-live-rooms.png' },
  // { id: 's3', label: 'Booking Flow', caption: 'Three steps to a confirmed session.', size: 'half' },
  // { id: 's4', label: 'Session View', caption: 'The live session experience.', size: 'half' },
  { id: 's5', label: 'Video Call', caption: 'Instant and scheduled video sessions between learners and coaches — with real-time AI assistance, wallet-based billing, and session controls built in.', size: 'full', src: '/taaly-video-call.png' },
  { id: 's6', label: 'AI Coach', caption: 'Practice anytime with an AI coach — run roleplay scenarios, get instant feedback on fluency and grammar, and build confidence between human sessions.', size: 'wide', src: '/taaly-ai-cover.png' },
];

function ScreenItem({ screen, accentColor, index }: { screen: Screen; accentColor: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.9], [1.04, 1, 1.06]);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const aspectMap = { full: '21/9', wide: '16/9', half: '4/3' };
  const aspect = screen.aspectRatio ?? aspectMap[screen.size ?? 'full'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl ${screen.size === 'half' ? '' : 'col-span-full'}`}
    >
      <motion.div style={{ scale }} className="origin-center">
        {screen.src ? (
          <img
            src={screen.src}
            alt={screen.label}
            className="w-full block"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <MediaPlaceholder
            type="image"
            aspectRatio={aspect}
            accentColor={accentColor}
            label={`→ ${screen.label}`}
            className="rounded-3xl"
          />
        )}
      </motion.div>

      {/* Caption */}
      {screen.caption && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.06 + 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
          style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 100%)' }}
        >
          <p className="text-[10px] font-body text-white/50 uppercase tracking-widest mb-1">{screen.label}</p>
          <p className="font-body text-white/80 text-sm">{screen.caption}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

interface CSScreensProps {
  accentColor?: string;
  screens?: Screen[];
}

export default function CSScreens({ accentColor = '#718F6B', screens = DEFAULT_SCREENS }: CSScreensProps) {
  // Separate full/wide from halfs for layout
  const pairs: Screen[][] = [];
  const fullWidths: Screen[] = [];

  screens.forEach((s) => {
    if (s.size === 'half') {
      const last = pairs[pairs.length - 1];
      if (last && last.length < 2) {
        last.push(s);
      } else {
        pairs.push([s]);
      }
    } else {
      fullWidths.push(s);
    }
  });

  return (
    <section className="py-24 bg-primary-text overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <ScrollReveal>
          <span className="text-xs font-body text-white/30 tracking-[0.14em] uppercase mb-5 block">
            08 — Selected Screens
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-white mb-16 max-w-xl">
            The work,<br />in context.
          </h2>
        </ScrollReveal>

        <div className="space-y-5">
          {screens.map((screen, i) => {
            if (screen.size === 'half') {
              // find the pair partner
              const pairIndex = Math.floor(i / 2);
              const isFirst = i % 2 === 0;
              if (!isFirst) return null; // rendered with the first
              const next = screens[i + 1];
              return (
                <div key={screen.id} className="grid grid-cols-2 gap-5">
                  <ScreenItem screen={screen} accentColor={accentColor} index={i} />
                  {next && <ScreenItem screen={next} accentColor={accentColor} index={i + 1} />}
                </div>
              );
            }
            return <ScreenItem key={screen.id} screen={screen} accentColor={accentColor} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}
