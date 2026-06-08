'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';

interface NextProjectData {
  title: string;
  subtitle: string;
  category: string;
  href: string;
  coverImage?: string | null;
  accentColor: string;
  year: string;
}

interface CSNextProjectProps {
  next: NextProjectData;
  currentAccent?: string;
}

export default function CSNextProject({ next, currentAccent = '#718F6B' }: CSNextProjectProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="px-8 md:px-16 py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.span
            className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            11 — Next Project
          </motion.span>
        </div>

        <motion.a
          href={next.href}
          className="relative block rounded-3xl overflow-hidden cursor-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            animate={{ scale: hovered ? 1.015 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '60vh', minHeight: 360 }}
          >
            {next.coverImage ? (
              <motion.img
                src={next.coverImage}
                alt={next.title}
                className="w-full h-full object-cover"
                animate={{ scale: hovered ? 1.04 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <MediaPlaceholder
                type="image"
                aspectRatio="unset"
                accentColor={next.accentColor}
                label={`→ Cover for ${next.title}`}
                className="w-full h-full rounded-3xl"
              />
            )}

            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 1 : 0.65 }}
              transition={{ duration: 0.35 }}
              style={{ background: 'linear-gradient(135deg, rgba(26,26,26,0.75) 0%, rgba(26,26,26,0.35) 60%, transparent 100%)' }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
              <div>
                <span
                  className="text-[10px] font-body px-2.5 py-1 rounded-full tracking-widest uppercase"
                  style={{ backgroundColor: next.accentColor + '25', color: next.accentColor, border: `1px solid ${next.accentColor}40` }}
                >
                  {next.category}
                </span>
              </div>

              <div>
                <h3 className="font-display text-[2.2rem] md:text-[3.5rem] text-white leading-tight mb-3 max-w-xl">
                  {next.title}
                </h3>
                <p className="font-body text-white/60 text-base mb-6 max-w-lg">{next.subtitle}</p>

                <AnimatePresence>
                  {hovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-flex items-center gap-3 px-5 py-3 rounded-full font-body text-sm font-medium"
                      style={{ backgroundColor: next.accentColor, color: '#fff' }}
                    >
                      View case study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Year badge */}
            <div className="absolute top-8 right-8">
              <span className="font-body text-xs text-white/40">{next.year}</span>
            </div>
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
