'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';

interface HeroProps {
  revealed: boolean;
}


const OBJECTS = [
  {
    src: '/obj-bust.svg',
    alt: 'Greek bust',
    width: 200,
    height: 200,
    style: { top: '8%', left: '2%' },
    rotate: -8,
    hoverRotate: -4,
  },
  {
    src: '/obj-clock.png',
    alt: 'Melting clock',
    width: 190,
    height: 190,
    style: { top: '5%', right: '5%' },
    rotate: 10,
    hoverRotate: 5,
  },
  {
    src: '/obj-cat.svg',
    alt: 'Black cat',
    width: 115,
    height: 185,
    style: { bottom: '7%', left: '4%' },
    rotate: 4,
    hoverRotate: 8,
  },
  {
    src: '/obj-chess.svg',
    alt: 'Chess knight',
    width: 230,
    height: 150,
    style: { bottom: '1%', right: '-3%' },
    rotate: -6,
    hoverRotate: -2,
  },
];

export default function Hero({ revealed }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#F7F5F1' }}
    >

      {/* ── FLOATING OBJECTS ── */}
      {OBJECTS.map((obj, i) => (
        /* Outer: handles reveal (opacity/scale) */
        <motion.div
          key={obj.alt}
          className="absolute select-none"
          style={{
            ...obj.style,
            x: mouse.x * (i % 2 === 0 ? -18 : 18),
            y: mouse.y * (i < 2 ? -14 : 14),
            zIndex: 2,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.85 }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Inner: handles continuous float + hover (separate from reveal) */}
          <motion.div
            style={{ rotate: obj.rotate }}
            animate={revealed ? {
              y: [0, -12, 0],
              rotate: [obj.rotate, obj.rotate + (i % 2 === 0 ? 2 : -2), obj.rotate],
            } : {}}
            transition={{
              duration: 5 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6,
            }}
            whileHover={{
              scale: 1.07,
              rotate: obj.hoverRotate,
              transition: { type: 'spring', stiffness: 280, damping: 18 },
            }}
          >
            <Image
              src={obj.src}
              alt={obj.alt}
              width={obj.width}
              height={obj.height}
              className="drop-shadow-xl"
              style={{ maxWidth: '100%', height: 'auto' }}
              priority={i < 2}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* ── HERO CONTENT ── */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-8 pt-20"
        style={{ y: contentY, opacity }}
      >

        {/* Logo */}
        <motion.div
          className="mb-12 md:mb-14 flex justify-center"
          data-cursor="Hey 👋"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/mux-logo.svg"
            alt="MUX"
            width={280}
            height={110}
            priority
            className="w-[150px] md:w-[210px] lg:w-[250px]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-[2.5rem] md:text-[3.6rem] lg:text-[4.6rem] leading-[1.08] mb-8"
          style={{
            color: '#1A1A1A',
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 24 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Helping teams{' '}
          <span className="relative inline-block">
            find clarity
            <motion.svg
              className="absolute -bottom-1.5 left-0 w-full"
              viewBox="0 0 260 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: revealed ? 1 : 0,
                opacity: revealed ? 1 : 0,
              }}
              transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
            >
              <path
                d="M2 6 Q65 2 130 6 Q195 10 258 5"
                stroke="#F08CA6"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
          <br />
          before building the wrong thing.
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          className="font-body text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          style={{
            color: 'rgba(26,26,26,0.72)',
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
          transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          Got an idea, a messy product, or a feature that&apos;s not landing?{' '}
          Let&apos;s find what&apos;s actually getting in the way.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: revealed ? 1 : 0,
            scale: revealed ? 1 : 0.96,
          }}
          transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton href="#work" variant="default">
            See the work
          </MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            Start a conversation
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── AVAILABILITY ── */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-16 hidden md:flex items-center gap-2 z-10"
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : 14 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-olive"
          animate={{ scale: [1, 1.45, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <span
          className="text-xs font-body"
          style={{ color: 'rgba(26,26,26,0.65)', textShadow: '0 1px 2px rgba(247,245,241,0.4)' }}
        >
          Available for projects
        </span>
      </motion.div>

    </section>
  );
}
