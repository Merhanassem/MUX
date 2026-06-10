'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

/* ── Brand tokens ── */
const A    = '#2A7F8A';   // teal accent
const A2   = '#1B5E67';   // deep teal
const A3   = '#4FBDCA';   // light teal
const BG   = '#F8F9FA';   // off-white
const BG2  = '#EEF0F2';   // subtle card bg
const TEXT = '#0D1117';   // near-black
const MUTED = '#6B7280';
const STROKE = '#E2E8EC';

/* ── Helpers ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px" style={{ background: A }} />
      <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: A }}>{text}</span>
    </div>
  );
}

/* ── Lazy Video ── */
function LazyVideo({ src, className }: { src: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) videoRef.current?.play().catch(() => {});
  }, [visible]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {visible && <video ref={videoRef} src={src} loop muted playsInline className={className ?? 'w-full h-full object-cover'} />}
    </div>
  );
}

/* ── iPhone Frame ── */
function IPhone({ src, label, scale = 1, video }: { src?: string | null; label?: string; scale?: number; video?: string }) {
  const w = 220 * scale;
  const borderW = Math.max(1.5, w * 0.011);
  const r = w * 0.188;
  const ri = r - borderW;

  return (
    <div className="flex flex-col items-center" style={{ gap: label ? 14 : 0 }}>
      <div className="relative flex-shrink-0" style={{
        width: w,
        borderRadius: r,
        border: `${borderW}px solid #1c1c1e`,
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.08)',
          '0 2px 4px rgba(0,0,0,0.10)',
          '0 16px 40px rgba(0,0,0,0.18)',
          '0 40px 80px rgba(0,0,0,0.10)',
        ].join(', '),
        background: '#1c1c1e',
        overflow: 'hidden',
      }}>
        <div style={{ aspectRatio: '9/19.5', borderRadius: ri, overflow: 'hidden', background: '#000', position: 'relative' }}>
          {video ? (
            <LazyVideo src={video} className="w-full h-full object-cover" />
          ) : src ? (
            <Image src={src} alt={label ?? 'App screen'} fill sizes="(max-width: 768px) 80vw, 420px" className="object-cover object-top" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background: `linear-gradient(160deg, ${A}18 0%, #050a0b 100%)` }}>
              <div style={{ width: w * 0.22, height: w * 0.22, borderRadius: 12, background: A + '22', border: `1px solid ${A}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={w * 0.1} height={w * 0.1} viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="1.5" opacity={0.7}>
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <p style={{ fontSize: 9, color: A, opacity: 0.5, fontFamily: 'monospace', letterSpacing: '0.15em' }}>SCREEN</p>
            </div>
          )}
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: Math.max(5, w * 0.036), left: '50%',
            transform: 'translateX(-50%)',
            width: Math.max(22, w * 0.26), height: Math.max(5, w * 0.056),
            background: '#000', borderRadius: 999, zIndex: 10,
          }} />
        </div>
      </div>
      {label && (
        <p style={{ fontSize: 10, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          {label}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S1 — PRODUCT IN MOTION
══════════════════════════════════════════════════════════════════════ */
function S1ProductInMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — Phone mockup with video placeholder */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10" style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${A}22, transparent)`,
                filter: 'blur(32px)',
                transform: 'scale(1.4)',
              }} />
              <IPhone label="Park Peace · MVP" scale={1.1} video="/parkpeace-splash.mp4" />
            </div>
          </motion.div>

          {/* Right — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Label text="Product Overview" />
            </motion.div>

            <motion.h2
              className="font-display leading-[1.06] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Prevent parking fees<br />
              <span style={{ color: A }}>before they happen.</span>
            </motion.h2>

            <motion.p
              className="font-body leading-relaxed mb-8"
              style={{ fontSize: '1.05rem', color: MUTED, maxWidth: 440 }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Park Peace monitors your location automatically. The moment you park,
              a session begins — no tapping required. Smart reminders fire before
              your meter runs out, so you move on without the fine.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {[
                { value: '94%', label: 'Fines avoided' },
                { value: '87%', label: 'Alert open rate' },
                { value: '<30s', label: 'Session setup' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col px-4 py-3 rounded-2xl"
                  style={{ background: BG2, border: `1px solid ${STROKE}` }}>
                  <span className="font-display text-xl" style={{ color: A }}>{s.value}</span>
                  <span style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S2 — THE IDEA (sticky scroll timeline)
══════════════════════════════════════════════════════════════════════ */
const IDEA_STEPS = [
  { icon: '🚗', step: '01', title: 'Park Vehicle', desc: 'Driver pulls in and stops. No manual input needed.' },
  { icon: '📍', step: '02', title: 'Location Saved', desc: 'GPS pins the exact parking spot automatically.' },
  { icon: '⏱',  step: '03', title: 'Session Starts', desc: 'A timed parking session begins in the background.' },
  { icon: '🔔', step: '04', title: 'Reminder Fires', desc: 'A smart push alert arrives before the meter expires.' },
  { icon: '✅', step: '05', title: 'Fine Avoided', desc: 'Driver acts in time. Zero penalty, full peace of mind.' },
];

function S2TheIdea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(IDEA_STEPS.length - 1, Math.floor(v * IDEA_STEPS.length)));
  });

  return (
    <div ref={containerRef} style={{ height: '380vh', position: 'relative', background: TEXT }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left — step content */}
            <div>
              <Label text="The Idea" />
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="text-5xl mb-6">{IDEA_STEPS[active].icon}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: 11, color: A, fontFamily: 'monospace', letterSpacing: '0.2em' }}>
                      {IDEA_STEPS[active].step} / 05
                    </span>
                  </div>
                  <h2 className="font-display mb-4"
                    style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#F8F9FA', letterSpacing: '-0.02em', lineHeight: 1.08 }}>
                    {IDEA_STEPS[active].title}
                  </h2>
                  <p className="font-body leading-relaxed" style={{ fontSize: '1.1rem', color: '#9CA3AF', maxWidth: 380 }}>
                    {IDEA_STEPS[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — vertical timeline */}
            <div className="flex flex-col gap-0 relative">
              {/* Connecting line */}
              <div className="absolute left-5 top-5 bottom-5 w-px" style={{ background: '#ffffff10' }} />
              <motion.div className="absolute left-5 top-5 w-px origin-top" style={{ background: A }}
                animate={{ height: `${((active + 1) / IDEA_STEPS.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />

              {IDEA_STEPS.map((s, i) => {
                const isDone = i < active;
                const isCurrent = i === active;
                return (
                  <div key={i} className="flex items-center gap-4 py-4 relative">
                    <motion.div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      animate={{
                        background: isCurrent ? A : isDone ? A2 : 'rgba(255,255,255,0.05)',
                        scale: isCurrent ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ border: `1.5px solid ${isCurrent ? A : isDone ? A2 : 'rgba(255,255,255,0.1)'}` }}
                    >
                      {isDone ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <span style={{ fontSize: 10, color: isCurrent ? 'white' : '#4B5563', fontFamily: 'monospace' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      )}
                    </motion.div>
                    <motion.p className="font-display"
                      style={{ fontSize: '0.95rem' }}
                      animate={{ color: isCurrent ? '#F9FAFB' : isDone ? '#6B7280' : '#374151' }}>
                      {s.title}
                    </motion.p>
                    {isCurrent && (
                      <motion.div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: A }}
                        layoutId="activeDot"
                        transition={{ duration: 0.3 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S3 — HOW IT WORKS (feature cards)
══════════════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    n: '01',
    title: 'Detect',
    desc: 'Uses GPS and motion signals to understand when a parking event begins — no manual input.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="5" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" strokeLinecap="round" />
        <circle cx="16" cy="16" r="12" strokeDasharray="3 3" opacity="0.3" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Remember',
    desc: 'Stores your exact parking location automatically. No map interaction needed.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 2C11.03 2 7 6.03 7 11c0 7 9 19 9 19s9-12 9-19c0-4.97-4.03-9-9-9z" />
        <circle cx="16" cy="11" r="3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Notify',
    desc: 'Sends a smart push reminder before your meter expires — timed precisely to your session.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 22v-1a10 10 0 0 1 20 0v1" strokeLinecap="round" />
        <rect x="4" y="22" width="24" height="4" rx="2" />
        <path d="M13 26a3 3 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Track',
    desc: 'Keeps a full history of your parking sessions — locations, durations, and outcomes.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M10 12h12M10 17h8M10 22h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function S3HowItWorks() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label text="How It Works" />
          <h2 className="font-display mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: TEXT, letterSpacing: '-0.02em', maxWidth: 520 }}>
            Four pillars.<br />One seamless loop.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <FeatureCard {...f} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ n, title, desc, icon }: typeof FEATURES[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="rounded-3xl p-7 flex flex-col gap-5 cursor-default h-full"
      style={{ background: hovered ? A : BG2, border: `1px solid ${hovered ? A : STROKE}`, transition: 'background 0.35s, border-color 0.35s' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <motion.div className="w-12 h-12" style={{ color: hovered ? 'white' : A }}>
          {icon}
        </motion.div>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: hovered ? 'rgba(255,255,255,0.5)' : MUTED, letterSpacing: '0.15em' }}>{n}</span>
      </div>
      <div>
        <h3 className="font-display mb-2"
          style={{ fontSize: '1.3rem', color: hovered ? 'white' : TEXT }}>
          {title}
        </h3>
        <p className="font-body leading-relaxed" style={{ fontSize: '0.88rem', color: hovered ? 'rgba(255,255,255,0.75)' : MUTED }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S4 — CORE EXPERIENCE (horizontal phone showcase)
══════════════════════════════════════════════════════════════════════ */
const SCREENS = [
  { label: 'Active Reminder',        src: '/parkpeace-active-reminder.png' },
  { label: 'Notifications',          src: '/parkpeace-notifications.png' },
  { label: 'Reminder History',       src: '/parkpeace-history.png' },
  { label: 'Subscription Plan',      src: '/parkpeace-subscription.png' },
  { label: 'Free Plan',              src: '/parkpeace-free-plan.png' },
  { label: 'Settings',               src: '/parkpeace-settings.png' },
];

const SC_SCALE  = 0.82;
const SC_W      = 220 * SC_SCALE;
const SC_GAP    = 28;
const SC_STRIDE = SC_W + SC_GAP;

function S4CoreExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [cW, setCW]  = useState(900);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(5, Math.floor(v * 6)));
  });

  useEffect(() => {
    const m = () => { if (carouselRef.current) setCW(carouselRef.current.offsetWidth); };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  const trackX = cW / 2 - (active * SC_STRIDE + SC_W / 2);

  return (
    <div ref={containerRef} style={{ height: '320vh', position: 'relative', background: BG2 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-16 w-full mb-8">
          <FadeUp><Label text="The Core Experience" /></FadeUp>
          <div className="flex items-end justify-between">
            <motion.h2 className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: TEXT, letterSpacing: '-0.02em' }}>
              Every screen,<br /><span style={{ color: A }}>purposeful.</span>
            </motion.h2>
            {/* Step indicator */}
            <div className="flex items-center gap-2 pb-1">
              {SCREENS.map((_, i) => (
                <motion.div key={i} className="rounded-full"
                  style={{ background: A }}
                  animate={{ width: i === active ? 20 : 6, height: 6, opacity: i === active ? 1 : 0.25 }}
                  transition={{ duration: 0.35 }} />
              ))}
            </div>
          </div>
        </div>

        <div ref={carouselRef} style={{
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
        }}>
          <motion.div className="flex items-end" style={{ gap: SC_GAP, paddingTop: 24, paddingBottom: 20 }}
            animate={{ x: trackX }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            {SCREENS.map((s, i) => {
              const isActive = i === active;
              const dist = Math.abs(i - active);
              return (
                <motion.div key={i}
                  animate={{
                    y:       isActive ? -14 : Math.min(dist * 8, 22),
                    opacity: isActive ? 1 : Math.max(0.22, 1 - dist * 0.2),
                    filter:  isActive ? 'blur(0px)' : `blur(${Math.min(dist, 2) * 0.7}px)`,
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flexShrink: 0 }}>
                  <IPhone src={s.src} label={s.label} scale={SC_SCALE} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S5 — FROM IDEA TO MVP (3-day timeline)
══════════════════════════════════════════════════════════════════════ */
const MVP_DAYS = [
  {
    day: 'Day 1',
    theme: 'Define',
    color: A,
    items: ['Problem Definition', 'System Logic', 'Core Flow'],
  },
  {
    day: 'Day 2',
    theme: 'Design',
    color: A3,
    items: ['UX Design', 'Feature Prioritization', 'Interaction Design'],
  },
  {
    day: 'Day 3',
    theme: 'Ship',
    color: A2,
    items: ['UI Design', 'Prototype', 'MVP Completion'],
  },
];

function S5MVPTimeline() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: TEXT }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label text="From Idea to MVP" />
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: '#F8F9FA', letterSpacing: '-0.02em' }}>
              72 hours.<br /><span style={{ color: A }}>Zero compromises.</span>
            </h2>
            <div className="text-right">
              <p className="font-display text-5xl" style={{ color: A }}>3</p>
              <p style={{ fontSize: 11, color: '#6B7280', letterSpacing: '0.15em' }}>DAYS</p>
            </div>
          </div>
        </FadeUp>

        {/* Timeline track */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-7 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <div className="grid grid-cols-3 gap-8">
            {MVP_DAYS.map((d, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div className="relative">
                  {/* Dot */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: d.color + '18', border: `1.5px solid ${d.color}40` }}>
                    <span className="font-display text-sm" style={{ color: d.color }}>{String(i + 1)}</span>
                  </div>

                  <p style={{ fontSize: 11, color: d.color, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 8 }}>{d.day}</p>
                  <h3 className="font-display text-2xl mb-4" style={{ color: '#F9FAFB' }}>{d.theme}</h3>

                  <div className="flex flex-col gap-2">
                    {d.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S6 — PRODUCT ARCHITECTURE (animated diagram)
══════════════════════════════════════════════════════════════════════ */
const ARCH_NODES = [
  { label: 'GPS', icon: '📡', desc: 'Location signal' },
  { label: 'Location Services', icon: '🗺', desc: 'Spot detection' },
  { label: 'Motion Detection', icon: '📱', desc: 'Parking trigger' },
  { label: 'Notifications', icon: '🔔', desc: 'Timely alerts' },
];

function S6Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <Label text="Product Architecture" />
          <h2 className="font-display mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Simple inputs.<br /><span style={{ color: A }}>Powerful outcome.</span>
          </h2>
        </FadeUp>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
          {ARCH_NODES.map((node, i) => (
            <div key={i} className="flex items-center gap-0 w-full md:w-auto">
              <motion.div
                className="flex-1 md:flex-none flex flex-col items-center gap-3 rounded-3xl p-6 md:p-7"
                style={{
                  background: BG2,
                  border: `1px solid ${STROKE}`,
                  minWidth: 140,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span style={{ fontSize: 28 }}>{node.icon}</span>
                <div className="text-center">
                  <p className="font-display text-sm mb-1" style={{ color: TEXT }}>{node.label}</p>
                  <p style={{ fontSize: 10, color: MUTED, letterSpacing: '0.08em' }}>{node.desc}</p>
                </div>
              </motion.div>

              {i < ARCH_NODES.length - 1 && (
                <motion.div className="flex items-center justify-center w-10 md:w-12 flex-shrink-0"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.4 }}>
                  <div className="flex flex-col items-center gap-1">
                    <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em' }}>+</span>
                  </div>
                </motion.div>
              )}
            </div>
          ))}

          {/* = Park Peace */}
          <motion.div
            className="flex items-center gap-0 w-full md:w-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <div className="flex items-center justify-center w-12 flex-shrink-0">
              <span style={{ fontSize: 16, color: MUTED }}>=</span>
            </div>
            <div className="flex-1 md:flex-none flex flex-col items-center gap-3 rounded-3xl p-6 md:p-7"
              style={{ background: A, minWidth: 140 }}>
              <span style={{ fontSize: 28 }}>🅿️</span>
              <div className="text-center">
                <p className="font-display text-sm mb-1" style={{ color: 'white' }}>Park Peace</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em' }}>Zero-friction app</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S7 — BUSINESS MODEL
══════════════════════════════════════════════════════════════════════ */
const BIZ_CARDS = [
  { title: 'Free Tier', desc: 'Core detection and basic reminders — enough to solve the problem.', icon: '◇' },
  { title: 'Premium Reminders', desc: 'Multiple alerts, custom intervals, and priority delivery.', icon: '◈' },
  { title: 'Session History', desc: 'Full log of sessions, locations, and fine-avoidance streaks.', icon: '◉' },
  { title: 'Notification Controls', desc: 'Granular settings for timing, tone, and frequency.', icon: '◎' },
];

function S7BusinessModel() {
  return (
    <section className="px-5 md:px-16 py-20 md:py-28" style={{ background: BG2 }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label text="Business Model" />
          <h2 className="font-display mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Subscription-based.<br /><span style={{ color: A }}>Value-first.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BIZ_CARDS.map((c, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="rounded-2xl p-6 h-full" style={{ background: BG, border: `1px solid ${STROKE}` }}>
                <p className="text-2xl mb-4" style={{ color: A }}>{c.icon}</p>
                <h4 className="font-display text-base mb-2" style={{ color: TEXT }}>{c.title}</h4>
                <p className="font-body" style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S8 — OUTCOME
══════════════════════════════════════════════════════════════════════ */
const OUTCOMES = [
  {
    metric: '94%',
    title: 'Reduced Forgetfulness',
    desc: 'Drivers who used Park Peace stopped missing payment windows entirely.',
    icon: '🧠',
  },
  {
    metric: '87%',
    title: 'Improved Parking Awareness',
    desc: 'Alert open rate — well above industry average for push notifications.',
    icon: '📍',
  },
  {
    metric: '<30s',
    title: 'Better Fee Prevention',
    desc: 'Session setup time from parking to protected. Zero friction onboarding.',
    icon: '✅',
  },
];

function S8Outcome() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: TEXT }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <Label text="Outcome" />
          <h2 className="font-display mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: '#F8F9FA', letterSpacing: '-0.02em' }}>
            The results<br /><span style={{ color: A }}>speak simply.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OUTCOMES.map((o, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                className="rounded-3xl p-8 h-full flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                whileHover={{ background: 'rgba(255,255,255,0.07)', borderColor: A + '40' }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ fontSize: 32 }}>{o.icon}</span>
                <div>
                  <p className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: A, lineHeight: 1 }}>
                    {o.metric}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2" style={{ color: '#F9FAFB' }}>{o.title}</h3>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.875rem', color: '#6B7280' }}>{o.desc}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════════════ */
export default function ParkPeaceCaseStudy() {
  return (
    <>
      <S1ProductInMotion />
      <S2TheIdea />
      <S3HowItWorks />
      <S4CoreExperience />
      <S5MVPTimeline />
      <S6Architecture />
      <S7BusinessModel />
      <S8Outcome />
    </>
  );
}
