'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  // Respect prefers-reduced-motion
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) { setVisible(true); setDone(true); return; }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
          // Release willChange after the animation finishes
          const totalMs = (0.75 + delay) * 1000 + 200;
          setTimeout(() => setDone(true), totalMs);
        } else if (!once) {
          setVisible(false);
          setDone(false);
        }
      },
      { threshold: 0.05, rootMargin: '-30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, delay, reduced]);

  const initialTransforms = {
    up:    'translateY(24px)',
    down:  'translateY(-24px)',
    left:  'translateX(24px)',
    right: 'translateX(-24px)',
    none:  'none',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : initialTransforms[direction],
        transition: reduced
          ? 'none'
          : `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: done ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
