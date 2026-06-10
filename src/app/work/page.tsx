'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion, useScroll, useTransform, useInView,
  useMotionValueEvent, AnimatePresence,
  useMotionValue, useSpring,
} from 'framer-motion';
import { projects as allProjects } from '@/lib/data/projects';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Only show projects that have a real cover image
const projects = allProjects.filter(p => p.coverImage);

/* ── project atmosphere map ───────────────────────────────────────────────── */
const ATMOSPHERE: Record<string, { glow: string; industry: string; bg: string }> = {
  'taaly':               { glow: '#4B63F7', bg: 'rgba(75,99,247,0.04)',   industry: 'Language Learning · AI'           },
  'relax-body':          { glow: '#8B4A4A', bg: 'rgba(139,74,74,0.04)',   industry: 'Wellness Marketplace'             },
  'park-peace':          { glow: '#2A7F8A', bg: 'rgba(42,127,138,0.04)', industry: 'Smart Mobility'                   },
  'animap':              { glow: '#E8601C', bg: 'rgba(232,96,28,0.04)',   industry: 'Community & Social Impact'        },
  'dream-cairo':         { glow: '#C9922A', bg: 'rgba(201,146,42,0.04)', industry: 'Luxury Commerce'                  },
  'youmats':             { glow: '#1B4FD8', bg: 'rgba(27,79,216,0.04)',   industry: 'Construction Commerce'           },
  'cash':                { glow: '#F5A623', bg: 'rgba(245,166,35,0.04)',  industry: 'Consumer Fintech'                 },
  'clarity-dashboard':   { glow: '#718F6B', bg: 'rgba(113,143,107,0.04)',industry: 'Data Intelligence'                },
  'onboarding-overhaul': { glow: '#F08CA6', bg: 'rgba(240,140,166,0.04)',industry: 'SaaS Experience'                  },
  'zero-to-mvp':         { glow: '#6B8F71', bg: 'rgba(107,143,113,0.04)',industry: 'End-to-End Product Build'         },
};

const atm = (slug: string) =>
  ATMOSPHERE[slug] ?? { glow: '#1A1A1A', bg: 'rgba(0,0,0,0.03)', industry: 'Product Design' };

/* ── count-up hook ────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.6) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      n += step;
      if (n >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(n));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return { val, ref };
}

/* ── Stat counter ─────────────────────────────────────────────────────────── */
function Stat({ n, suffix = '', label, prefix = '' }: { n: number; suffix?: string; label: string; prefix?: string }) {
  const { val, ref } = useCountUp(n);
  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1, color: 'var(--color-primary-text)', letterSpacing: '-0.02em' }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--color-secondary-text)', marginTop: 10, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
        {label}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════════ */
function WorkHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yText    = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* word animation */
  const line1 = ['Products', "I've"];
  const line2 = ['helped', 'shape.'];

  /* floating shape defs */
  const shapes = [
    { w: 320, h: 320, x: '72%', y: '8%',  color: 'rgba(75,99,247,0.06)',  dur: 9,  delay: 0   },
    { w: 200, h: 200, x: '85%', y: '55%', color: 'rgba(236,72,153,0.05)', dur: 12, delay: 2   },
    { w: 160, h: 160, x: '60%', y: '70%', color: 'rgba(42,127,138,0.06)', dur: 7,  delay: 1   },
    { w: 100, h: 100, x: '5%',  y: '20%', color: 'rgba(201,146,42,0.04)', dur: 11, delay: 3   },
    { w: 240, h: 240, x: '20%', y: '75%', color: 'rgba(75,99,247,0.04)',  dur: 15, delay: 0.5 },
  ];

  return (
    <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--color-background)' }}>

      {/* Floating ambient shapes */}
      {shapes.map((s, i) => (
        <motion.div key={i}
          animate={{ y: [0, -24, 12, -8, 0], x: [0, 12, -8, 16, 0], scale: [1, 1.08, 0.96, 1.03, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          style={{ position: 'absolute', left: s.x, top: s.y, width: s.w, height: s.h, borderRadius: '50%', background: `radial-gradient(circle, ${s.color} 0%, transparent 70%)`, filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0 }}
        />
      ))}

      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)', backgroundSize: '72px 72px', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div style={{ y: yText, opacity, position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 80 }}
        className="max-w-7xl mx-auto px-8 md:px-16 w-full">

        {/* Label */}
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--color-secondary-text)', textTransform: 'uppercase', fontFamily: 'var(--font-body)', display: 'block', marginBottom: 40, marginTop: 120 }}>
          Selected Work · {projects.length} Products
        </motion.span>

        {/* Kinetic headline */}
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: 40, overflow: 'hidden' }}>
          {/* Line 1 */}
          <div style={{ display: 'flex', gap: '0.22em', overflow: 'hidden' }}>
            {line1.map((w, i) => (
              <motion.span key={w}
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: 'var(--color-primary-text)' }}>
                {w}
              </motion.span>
            ))}
          </div>
          {/* Line 2 */}
          <div style={{ display: 'flex', gap: '0.22em', overflow: 'hidden' }}>
            {line2.map((w, i) => (
              <motion.span key={w}
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.45 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: i === 1 ? 'var(--color-pink-brand)' : 'var(--color-primary-text)' }}>
                {w}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--color-secondary-text)', maxWidth: 520, lineHeight: 1.75, marginBottom: 80 }}>
          From AI-powered learning platforms to fintech, mobility, wellness and commerce — products built to solve real problems.
        </motion.p>

        {/* Animated counters — hidden on mobile to prevent overflow */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hidden sm:flex"
          style={{ gap: 'clamp(24px, 4vw, 56px)', alignItems: 'center', paddingTop: 40, borderTop: '1px solid var(--color-border)', paddingBottom: 80 }}>
          <Stat n={projects.length} label="Products designed" />
          <div style={{ width: 1, height: 40, background: 'var(--color-border)', flexShrink: 0 }} />
          <Stat n={8} label="Industries" />
          <div style={{ width: 1, height: 40, background: 'var(--color-border)', flexShrink: 0 }} />
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, lineHeight: 1, color: 'var(--color-primary-text)' }}>B2B+B2C</div>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--color-secondary-text)', marginTop: 10, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Market focus</div>
          </div>
          <div style={{ width: 1, height: 40, background: 'var(--color-border)', flexShrink: 0 }} />
          <Stat n={0} suffix="" label="Templates used" />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 24, height: 38, border: '1.5px solid var(--color-border)', borderRadius: 999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 5 }}>
          <motion.div animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-secondary-text)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PROGRESS INDICATOR
══════════════════════════════════════════════════════════════════════════════ */
function ProgressNav({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <motion.nav
      aria-label="Project navigation"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: 'fixed', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {projects.map((p, i) => {
        const a = atm(p.slug);
        return (
          <button key={p.id}
            aria-label={`Go to ${p.title}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => onSelect(i)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', minHeight: 24 }}>
            <AnimatePresence>
              {i === active && (
                <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                  style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--color-secondary-text)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {p.title}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              aria-hidden="true"
              animate={{ width: i === active ? 22 : 5, background: i === active ? a.glow : 'var(--color-border)', opacity: i < active ? 0.45 : 1 }}
              transition={{ duration: 0.35 }}
              style={{ height: 5, borderRadius: 999, flexShrink: 0 }} />
          </button>
        );
      })}
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PROJECT SCENE
   Layout: image occupies top 70 % of viewport. Text lives in its own
   solid-backed panel (bottom 32 %) — completely separated from the image
   so the overlay never fights text that already exists in the cover image.
══════════════════════════════════════════════════════════════════════════════ */
const IMAGE_HEIGHT = 66; // % of viewport height the image occupies

function ProjectScene({ project, isActive }: { project: typeof projects[0]; isActive: boolean }) {
  const [hovered, setHovered] = useState(false);
  const a = atm(project.slug);

  return (
    <div style={{ width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

      {/* ── IMAGE — top 70 % ───────────────────────────────────────────────── */}
      <div style={{ height: `${IMAGE_HEIGHT}%`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <motion.div
          animate={{ scale: isActive ? 1 : 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}>
          {project.coverImage
            ? <img
                src={project.coverImage}
                alt={`${project.title} — ${a.industry} case study cover`}
                loading={isActive ? 'eager' : 'lazy'}
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            : <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${a.glow}50 0%, #06060a 100%)` }} />}
        </motion.div>
        {/* Bottom fade — pure dark blend so it always matches the actual image colors */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(9,9,13,0.92) 0%, rgba(9,9,13,0.55) 30%, rgba(9,9,13,0.18) 65%, transparent 100%)', zIndex: 2 }} />
      </div>

      {/* ── TEXT PANEL — bottom 30 % ───────────────────────────────────────── */}
      {/* Fully opaque — never fights the image's own text */}
      <div style={{
        flex: 1, background: '#09090d',
        borderTop: `1px solid ${a.glow}25`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Accent wash */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 50% 120% at 0% 50%, ${a.glow}12 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', padding: '0 56px', gap: 0 }}>

          {/* COL 1 — title + subtitle (takes all remaining space) */}
          <div style={{ flex: 1, minWidth: 0, paddingRight: 32 }}>
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 18, height: 1.5, background: a.glow, flexShrink: 0 }} />
              <span style={{ fontSize: 9, letterSpacing: '0.16em', color: a.glow, textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {a.industry}
              </span>
            </motion.div>

            {/* Title — allow natural flow, no clip */}
            <motion.h2
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ duration: 0.55, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 6px' }}>
              {project.title}
            </motion.h2>

            <motion.p
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.68)', lineHeight: 1.55, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {project.subtitle}
            </motion.p>
          </div>

          {/* DIVIDER */}
          <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.08)', flexShrink: 0, margin: '0 28px' }} />

          {/* COL 2 — badges (fixed width) */}
          <motion.div
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.45, delay: 0.20 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 10, padding: '4px 11px', borderRadius: 999, background: a.glow + '30', color: '#fff', border: `1px solid ${a.glow}55`, fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                {project.category}
              </span>
              <span style={{ fontSize: 10, padding: '4px 11px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.60)', fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>
                {project.year}
              </span>
              {project.role && (
                <span style={{ fontSize: 10, padding: '4px 11px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.62)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                  {project.role}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {project.tags?.slice(0, 3).map(t => (
                <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.50)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* DIVIDER */}
          <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.08)', flexShrink: 0, margin: '0 28px' }} />

          {/* COL 3 — CTA */}
          <motion.div
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
            transition={{ duration: 0.45, delay: 0.26 }}
            style={{ flexShrink: 0 }}>
            <motion.a
              href={`/work/${project.slug}`}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.04 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                color: '#fff', textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.20)',
                borderRadius: 999, padding: '12px 24px',
                background: 'rgba(255,255,255,0.07)',
                letterSpacing: '0.02em',
                transition: 'background 0.25s, border-color 0.25s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = a.glow + '35'; el.style.borderColor = a.glow; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.07)'; el.style.borderColor = 'rgba(255,255,255,0.20)'; }}>
              View Case Study
              <motion.svg animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.18 }}
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HORIZONTAL SHOWCASE — wheel-snap: one scroll = one project
══════════════════════════════════════════════════════════════════════════════ */
function HorizontalShowcase() {
  const [winW, setWinW] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Delta accumulator — advances only when user scrolls past threshold
  const deltaAccRef = useRef(0);
  // Lock on mount so accidental scroll during page-in animation is ignored
  const animatingRef = useRef(true);

  useEffect(() => {
    // Release the mount lock after the page-in animation completes
    const t = setTimeout(() => { animatingRef.current = false; }, 700);
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.6 });
  const progress = useMotionValue(0);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, idx));
    if (clamped === activeRef.current) return;
    activeRef.current = clamped;
    setActive(clamped);
    rawX.set(-clamped * (winW || window.innerWidth));
    progress.set(clamped / (projects.length - 1));
    // Lock further advances until spring settles (~600 ms)
    animatingRef.current = true;
    setTimeout(() => { animatingRef.current = false; deltaAccRef.current = 0; }, 450);
  };

  useEffect(() => {
    const THRESHOLD = 50;

    const onWheel = (e: WheelEvent) => {
      const el = containerRef.current;
      if (!el) return;

      // Sticky panel is active when its top ≈ 0 and fills the viewport height
      const rect = el.getBoundingClientRect();
      const isSticky = rect.top >= -4 && rect.top <= 4 && rect.height >= window.innerHeight - 4;
      if (!isSticky) return;

      const atFirst = activeRef.current === 0;
      const atLast  = activeRef.current === projects.length - 1;

      // At edges: release so the page can scroll away from this section
      if (e.deltaY < 0 && atFirst)  return;
      if (e.deltaY > 0 && atLast)   return;

      // Inside the showcase: capture the event
      e.preventDefault();
      if (animatingRef.current) return;

      deltaAccRef.current += e.deltaY;

      if (deltaAccRef.current >= THRESHOLD) {
        deltaAccRef.current = 0;
        goTo(activeRef.current + 1);
      } else if (deltaAccRef.current <= -THRESHOLD) {
        deltaAccRef.current = 0;
        goTo(activeRef.current - 1);
      }
    };

    // Attach to window so we never miss the event (sticky divs don't scroll)
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winW]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo(activeRef.current + 1); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); goTo(activeRef.current - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winW]);

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      // Only respond to horizontal-dominant swipes (>40px) that aren't scrolls
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goTo(activeRef.current + 1);
      else        goTo(activeRef.current - 1);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProgressNav active={active} onSelect={goTo} />

      {/* Outer wrapper: must be taller than the sticky child so sticky can release
          before EndSection appears — no overlap */}
      <div style={{ position: 'relative', height: '200vh' }}>

      {/* sticky panel */}
      <div ref={containerRef} style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' }}>

        {/* Project counter badge */}
        <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderRadius: 999, padding: '6px 20px', border: '1px solid var(--color-border)', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--color-primary-text)' }}>
            {String(active + 1).padStart(2, '0')}
          </span>
          <span style={{ width: 1, height: 12, background: 'var(--color-border)' }} />
          <span style={{ fontSize: 11, color: 'var(--color-secondary-text)', fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}>
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <motion.div style={{ scaleX: progress, transformOrigin: 'left', position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: projects[active]?.accentColor ?? 'var(--color-pink-brand)', zIndex: 50 }} />

        {/* Prev / Next — sit inside the image zone at mid-height */}
        <motion.button
          aria-label="Previous project"
          onClick={() => goTo(activeRef.current - 1)}
          animate={{ opacity: active > 0 ? 1 : 0 }}
          style={{ pointerEvents: active > 0 ? 'auto' : 'none', position: 'absolute', left: 20, top: `${IMAGE_HEIGHT / 2}%`, transform: 'translateY(-50%)', zIndex: 50, width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
          whileHover={{ scale: 1.08, borderColor: 'rgba(255,255,255,0.6)' }} whileTap={{ scale: 0.93 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </motion.button>
        <motion.button
          aria-label="Next project"
          onClick={() => goTo(activeRef.current + 1)}
          animate={{ opacity: active < projects.length - 1 ? 1 : 0 }}
          style={{ pointerEvents: active < projects.length - 1 ? 'auto' : 'none', position: 'absolute', right: 20, top: `${IMAGE_HEIGHT / 2}%`, transform: 'translateY(-50%)', zIndex: 50, width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
          whileHover={{ scale: 1.08, borderColor: 'rgba(255,255,255,0.6)' }} whileTap={{ scale: 0.93 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </motion.button>

        {/* Track */}
        <motion.div style={{ x, display: 'flex', height: '100%', willChange: 'transform' }}>
          {projects.map((project, i) => (
            <ProjectScene key={project.id} project={project} isActive={i === active} />
          ))}
        </motion.div>
      </div>
      </div>{/* /outer 200vh wrapper — sticky releases here, no EndSection overlap */}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ENDING SECTION
══════════════════════════════════════════════════════════════════════════════ */
function EndSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 48px', background: 'var(--color-background)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--color-border)' }}>

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(236,72,153,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 56, border: '1px solid var(--color-border)', borderRadius: 999, padding: '7px 22px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-pink-brand)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--color-secondary-text)', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            End of exhibition
          </span>
        </motion.div>

        {/* Big line 1 */}
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 104px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--color-primary-text)' }}>
            More than
          </motion.div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 104px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--color-pink-brand)' }}>
            interfaces.
          </motion.div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 40 }}>
          <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--color-primary-text)', opacity: 0.55 }}>
            Products built from idea to launch.
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--color-secondary-text)', maxWidth: 480, margin: '0 auto 56px', lineHeight: 1.8 }}>
          Every product here was designed around a real problem, a real user, and a real outcome. That&apos;s the only brief that matters.
        </motion.p>

        {/* Sub headline */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ overflow: 'hidden', marginBottom: 36 }}>
          <motion.p initial={{ y: '80%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 700, color: 'var(--color-primary-text)', lineHeight: 1.2 }}>
            Let&apos;s build the next one.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.a
          href="/contact"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.65 }}
          whileHover={{ scale: 1.04, backgroundColor: 'var(--color-pink-brand)' }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: '#fff', backgroundColor: 'var(--color-primary-text)', padding: '16px 36px', borderRadius: 999, textDecoration: 'none' }}
          className="cursor-none">
          Start a conversation
          <motion.svg animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </motion.a>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════════ */
export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ background: 'var(--color-background)' }}>
        <WorkHero />
        <HorizontalShowcase />
        <EndSection />
      </main>
      <Footer />
    </>
  );
}
