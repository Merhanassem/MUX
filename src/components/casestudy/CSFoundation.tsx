'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';

interface Chapter {
  id: string;
  number: string;
  title: string;
  body: string;
  images: number; // how many image slots
  imageUrls?: (string | null)[]; // actual image paths (null = keep placeholder)
}

const DEFAULT_CHAPTERS: Chapter[] = [
  {
    id: 'ia',
    number: '01',
    title: 'Information Architecture',
    body: 'Before any screens, I mapped the entire product hierarchy. Every section, every sub-section, every user-facing object. The goal was to surface structural problems before they became design problems.',
    images: 2,
    imageUrls: ['/taaly-ia.png', '/taaly-ia2.png'],
  },
  {
    id: 'flows',
    number: '02',
    title: 'User Flows',
    body: 'I documented every critical path: booking a session, onboarding as a coach, recovering from a failed payment. These flows became the contract between design and engineering.',
    images: 1,
    imageUrls: ['/taaly-userflow1.png'],
  },
  {
    id: 'nav',
    number: '03',
    title: 'Navigation Strategy',
    body: 'The platform served two distinct user types with different mental models. The navigation needed to adapt to role without creating complexity. We landed on a role-aware tab bar with contextual depth.',
    images: 1,
    imageUrls: ['/taaly-navigation.png'],
  },
  {
    id: 'ds',
    number: '04',
    title: 'Design System',
    body: 'Built a token-based design system covering colour, typography, spacing, and components. Everything was documented in Figma and handed off with usage guidelines.',
    images: 1,
    imageUrls: ['/taaly-ds.png'],
  },
];

function ChapterBlock({ chapter, accentColor, index }: { chapter: Chapter; accentColor: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="py-20 border-t border-border first:border-t-0">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
        {/* Left: label + title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-32"
        >
          <span className="font-display text-[4rem] md:text-[5rem] leading-none block mb-4 select-none" style={{ color: accentColor + '18' }}>
            {chapter.number}
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-primary-text mb-4 leading-tight">
            {chapter.title}
          </h3>
          <p className="font-body text-secondary-text text-sm leading-relaxed">{chapter.body}</p>
        </motion.div>

        {/* Right: images */}
        <div className="space-y-5">
          {Array.from({ length: chapter.images }).map((_, i) => {
            const url = chapter.imageUrls?.[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {url ? (
                  <img
                    src={url}
                    alt={`${chapter.title} — artifact ${i + 1}`}
                    className="w-full rounded-2xl"
                  />
                ) : (
                  <MediaPlaceholder
                    type="image"
                    aspectRatio={i === 0 ? '16/9' : '21/9'}
                    accentColor={accentColor}
                    label={`→ ${chapter.title} — artifact ${i + 1}`}
                    className="rounded-2xl"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface CSFoundationProps {
  accentColor?: string;
  chapters?: Chapter[];
}

export default function CSFoundation({ accentColor = '#718F6B', chapters = DEFAULT_CHAPTERS }: CSFoundationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="px-5 md:px-16 py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            05 — Designing the Foundation
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text max-w-2xl">
            Before the screens,<br />the structure.
          </h2>
        </motion.div>

        <div>
          {chapters.map((chapter, i) => (
            <ChapterBlock key={chapter.id} chapter={chapter} accentColor={accentColor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
