'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';

interface Meta { label: string; value: string }

interface CSHeroProps {
  title: string;
  summary: string;
  accentColor: string;
  category: string;
  meta: Meta[];
  coverImage?: string | null;
}

export default function CSHero({ title, summary, accentColor, category, meta, coverImage }: CSHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end pb-0 overflow-hidden bg-background">
      {/* Content */}
      <motion.div
        className="relative z-10 px-5 md:px-16 pt-28 md:pt-36 pb-12 md:pb-16 max-w-7xl mx-auto w-full"
        style={{ y: contentY, opacity }}
      >
        {/* Category pill */}
        <motion.div {...stagger(0)} className="mb-8">
          <span
            className="text-xs font-body px-3 py-1.5 rounded-full tracking-wider uppercase"
            style={{
              backgroundColor: accentColor + '15',
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-[2.6rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] text-primary-text mb-6 md:mb-8 max-w-5xl"
          {...stagger(1)}
        >
          {title}
        </motion.h1>

        {/* Summary */}
        <motion.p
          className="font-body text-base md:text-xl text-secondary-text leading-relaxed max-w-2xl mb-10 md:mb-14"
          {...stagger(2)}
        >
          {summary}
        </motion.p>

        {/* Metadata row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 border-t border-border pt-8"
          {...stagger(3)}
        >
          {meta.map((item, i) => (
            <div
              key={item.label}
              className={`${i > 0 ? 'md:border-l border-border md:pl-8' : ''}`}
            >
              <p className="text-[10px] font-body text-secondary-text uppercase tracking-[0.12em] mb-1.5">
                {item.label}
              </p>
              <p className="font-body text-sm text-primary-text font-medium leading-snug">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero visual */}
      <motion.div className="relative z-0 overflow-hidden" style={{ y: imageY }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-5 md:mx-16 mb-0 rounded-t-3xl overflow-hidden"
          style={{ height: '52vh' }}
        >
          {coverImage ? (
            <Image src={coverImage} alt={title} fill priority quality={85} sizes="100vw" className="object-cover" />
          ) : (
            <MediaPlaceholder
              type="image"
              aspectRatio="unset"
              accentColor={accentColor}
              label="→ Hero cover image"
              className="w-full h-full rounded-t-3xl"
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
