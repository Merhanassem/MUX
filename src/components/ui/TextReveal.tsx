'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = 'p',
  stagger = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const words = text.split(' ');

  return (
    <div ref={ref} className={className} aria-label={text}>
      <Tag className="overflow-hidden" aria-hidden>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
