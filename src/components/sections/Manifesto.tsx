'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const statements = [
  {
    id: 1,
    pre: 'Most products fail not because of bad execution —',
    accent: 'but because of the wrong problem.',
    accentColor: '#F72585',
  },
  {
    id: 2,
    pre: 'The most expensive thing you can build is something',
    accent: 'nobody needed.',
    accentColor: '#F08CA6',
  },
  {
    id: 3,
    pre: '',
    accent: 'Clarity',
    post: 'is a design decision. So is ambiguity.',
    accentColor: '#718F6B',
  },
  {
    id: 4,
    pre: "Don't just make things look good.",
    accent: 'Make sure they make sense first.',
    accentColor: '#F72585',
  },
];

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(statements.length - 1, Math.floor(v * statements.length));
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  const s = statements[activeIndex];

  return (
    /* Tall scroll container — 4 × 80vh gives enough dwell per statement */
    <div
      ref={containerRef}
      style={{ height: `${statements.length * 45}vh` }}
      className="relative bg-background"
    >
      {/* Sticky viewport panel */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-16 w-full">

          {/* Two-column horizontal layout */}
          <div className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-center">

            {/* Big ghost number — left column */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display leading-none select-none text-right"
                style={{
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  color: s.accentColor + '18',
                }}
              >
                0{activeIndex + 1}
              </motion.div>
            </AnimatePresence>

            {/* Statement — right column */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-[1.75rem] md:text-[2.6rem] lg:text-[3.2rem] leading-[1.1] text-primary-text">
                  {s.pre && <span>{s.pre} </span>}
                  <span style={{ color: s.accentColor }}>{s.accent}</span>
                  {'post' in s && s.post && <span> {s.post}</span>}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex gap-2 mt-12 md:mt-16 pl-[120px] md:pl-[200px] ml-8 md:ml-16">
            {statements.map((st, i) => (
              <motion.div
                key={i}
                className="h-[2px] rounded-full"
                animate={{
                  width: i === activeIndex ? 40 : 14,
                  backgroundColor: i === activeIndex ? s.accentColor : '#E5E0D6',
                  opacity: i < activeIndex ? 0.4 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
