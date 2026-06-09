'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ── Brand tokens ─────────────────────────────────────────────────────────── */
const ACCENT  = '#E8601C';
const ACCENT2 = '#F28C54';
const BG      = '#F7F5F1';
const BG_DARK = '#1C1008';
const TEXT    = '#1A1A1A';
const TEXT2   = '#575757';
const BORDER  = '#E5E0D6';
const WARM    = '#FDF0E8';

/* ── Shared helpers ───────────────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ width: 20, height: 1.5, background: ACCENT, display: 'block', flexShrink: 0 }} />
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: ACCENT, fontFamily: 'var(--font-body)', textTransform: 'uppercase', fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Phone mockup ─────────────────────────────────────────────────────────── */
function Phone({ src, label, scale = 1 }: { src: string; label?: string; scale?: number }) {
  const w = 220 * scale;
  const bw = Math.max(1.5, w * 0.010);
  const r  = w * 0.188;
  const ri = r - bw;
  return (
    <div className="flex flex-col items-center" style={{ gap: label ? 12 : 0 }}>
      <div style={{
        width: w, borderRadius: r,
        border: `${bw}px solid #2a1a0e`,
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.06)',
          '0 2px 4px rgba(0,0,0,0.12)',
          '0 20px 50px rgba(0,0,0,0.35)',
          `0 40px 80px ${ACCENT}18`,
        ].join(', '),
        background: '#1a0e06',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{ aspectRatio: '9/19.5', borderRadius: ri, overflow: 'hidden', position: 'relative' }}>
          <img src={src} alt={label || 'App screen'} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          {/* Dynamic island */}
          <div style={{ position: 'absolute', top: Math.max(5, w * 0.034), left: '50%', transform: 'translateX(-50%)', width: Math.max(20, w * 0.25), height: Math.max(5, w * 0.052), background: '#000', borderRadius: 999, zIndex: 10 }} />
        </div>
      </div>
      {label && <p style={{ fontSize: 10, color: ACCENT, fontFamily: 'var(--font-body)', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>{label}</p>}
    </div>
  );
}

/* ── Screen placeholder helper ────────────────────────────────────────────── */
function ScreenSlot({
  label,
  width = 320,
  height = 580,
  className = '',
}: {
  label: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        flexShrink: 0,
        background: `linear-gradient(145deg, ${WARM} 0%, #FBE8D8 100%)`,
        borderRadius: 20,
        border: `1.5px dashed ${ACCENT}40`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="8.5" cy="8.5" r="1.5" fill={ACCENT} />
        <path d="M21 15l-5-5L5 21" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 11, color: ACCENT, fontFamily: 'var(--font-body)', opacity: 0.6, textAlign: 'center', padding: '0 20px' }}>
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION 01 — THE PROBLEM
══════════════════════════════════════════════════════════════════════════ */
const problemNodes = [
  { id: 'animal',    label: 'Animal in Need',    icon: '🐾', x: 50,  y: 50,  delay: 0 },
  { id: 'community', label: 'Community',         icon: '👥', x: 20,  y: 20,  delay: 0.15 },
  { id: 'shelter',   label: 'Shelter',           icon: '🏠', x: 80,  y: 20,  delay: 0.3 },
  { id: 'vet',       label: 'Veterinarian',      icon: '⚕️',  x: 80,  y: 80,  delay: 0.45 },
  { id: 'adoption',  label: 'Adoption',          icon: '❤️',  x: 20,  y: 80,  delay: 0.6 },
];

const connections = [
  ['animal', 'community'],
  ['animal', 'shelter'],
  ['animal', 'vet'],
  ['animal', 'adoption'],
  ['community', 'shelter'],
  ['shelter', 'vet'],
  ['vet', 'adoption'],
];

function ProblemDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const [size, setSize] = useState({ w: 480, h: 360 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.offsetWidth, 560);
        setSize({ w, h: w * 0.72 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const getXY = (node: typeof problemNodes[0]) => ({
    x: (node.x / 100) * size.w,
    y: (node.y / 100) * size.h,
  });

  return (
    <div ref={containerRef} className="w-full relative select-none">
      <svg
        ref={ref}
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="w-full h-auto"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.2" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map(([aId, bId], i) => {
          const a = problemNodes.find(n => n.id === aId)!;
          const b = problemNodes.find(n => n.id === bId)!;
          const ax = getXY(a).x, ay = getXY(a).y;
          const bx = getXY(b).x, by = getXY(b).y;
          const mx = (ax + bx) / 2 + (Math.random() - 0.5) * 20;
          const my = (ay + by) / 2 + (Math.random() - 0.5) * 20;
          return (
            <motion.path
              key={`${aId}-${bId}`}
              d={`M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth="1"
              strokeOpacity="0.18"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
            />
          );
        })}

        {/* Animated traveling dots on lines */}
        {inView && connections.slice(0, 3).map(([aId, bId], i) => {
          const a = problemNodes.find(n => n.id === aId)!;
          const b = problemNodes.find(n => n.id === bId)!;
          const ax = getXY(a).x, ay = getXY(a).y;
          const bx = getXY(b).x, by = getXY(b).y;
          return (
            <motion.circle
              key={`dot-${i}`}
              r="3"
              fill={ACCENT}
              opacity="0.55"
              initial={{ cx: ax, cy: ay }}
              animate={{ cx: [ax, bx, ax], cy: [ay, by, ay] }}
              transition={{ duration: 3 + i * 0.7, delay: 1.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}

        {/* Nodes */}
        {problemNodes.map((node) => {
          const { x, y } = getXY(node);
          const isCenter = node.id === 'animal';
          const r = isCenter ? 42 : 34;
          return (
            <g key={node.id}>
              {/* Glow ring for center */}
              {isCenter && (
                <motion.circle
                  cx={x} cy={y} r={r + 14}
                  fill="url(#nodeGlow)"
                  animate={{ r: [r + 10, r + 20, r + 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <motion.circle
                cx={x} cy={y} r={r}
                fill={isCenter ? ACCENT : WARM}
                stroke={isCenter ? 'transparent' : ACCENT}
                strokeWidth="1.5"
                strokeOpacity="0.35"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: node.delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
              <motion.text
                x={x} y={y - 6}
                textAnchor="middle"
                fontSize="18"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: node.delay + 0.5 }}
              >
                {node.icon}
              </motion.text>
              <motion.text
                x={x} y={y + (isCenter ? 16 : 14)}
                textAnchor="middle"
                fontSize={isCenter ? 8 : 7.5}
                fontFamily="var(--font-body)"
                fontWeight="600"
                fill={isCenter ? 'white' : TEXT2}
                letterSpacing="0.04em"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: node.delay + 0.6 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION 03 — JOURNEY STEP
══════════════════════════════════════════════════════════════════════════ */
const journeySteps = [
  {
    n: '01',
    label: 'Report',
    desc: 'User spots an animal and reports location, condition, and photos instantly on the map.',
    src: '/animap-report.png',
    isPhoto: false,
    color: ACCENT,
  },
  {
    n: '02',
    label: 'Community responds',
    desc: 'Nearby helpers are notified. Comments, confirmations, and volunteers start arriving.',
    src: '/animap-community.png',
    isPhoto: false,
    color: '#D45010',
  },
  {
    n: '03',
    label: 'Rescue action',
    desc: 'A rescuer or shelter accepts the case. Status updates in real-time for everyone watching.',
    src: '/animap-rescue.png',
    isPhoto: false,
    color: '#C04008',
  },
  {
    n: '04',
    label: 'Status updates',
    desc: 'Track the animal\'s condition, location, and care progress through the lifecycle.',
    src: '/animap-status.png',
    isPhoto: false,
    color: '#B03808',
  },
  {
    n: '05',
    label: 'Animal safe ❤️',
    desc: 'Case resolved. Community is notified. The story is shared — creating trust and motivation.',
    src: '/animap-safe.png',
    isPhoto: true,
    color: '#18A058',
  },
];

function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative">
      {/* Connecting path — desktop */}
      <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}30, ${ACCENT}50, ${ACCENT}30, transparent)` }} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative">
        {journeySteps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start gap-4"
          >
            {/* Step number circle */}
            <div className="relative z-10">
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-display text-sm font-bold"
                style={{
                  background: i === 4 ? '#18A058' : i === 0 ? ACCENT : WARM,
                  border: `2px solid ${i === 4 ? '#18A058' : ACCENT}`,
                  color: i === 0 || i === 4 ? 'white' : ACCENT,
                }}
              >
                {step.n}
              </div>
              {/* Arrow between steps on desktop */}
              {i < journeySteps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-[calc(50%+8px)] w-8 -translate-y-1/2"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  style={{ transformOrigin: 'left center' }}
                >
                  <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
                    <path d="M0 5h28M24 1l4 4-4 4" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              )}
            </div>

            {/* Label */}
            <div className="text-center lg:text-left">
              <h4 className="font-display text-base font-semibold mb-1.5" style={{ color: TEXT }}>{step.label}</h4>
              <p className="font-body text-sm leading-relaxed" style={{ color: TEXT2 }}>{step.desc}</p>
            </div>

            {/* Screen */}
            {step.isPhoto ? (
              <div style={{
                width: 160, height: 220, borderRadius: 20, overflow: 'hidden',
                border: `2px solid ${step.color}40`,
                boxShadow: `0 12px 32px ${step.color}25`,
              }}>
                <img src={step.src} alt={step.label} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
            ) : (
              <Phone src={step.src} scale={0.73} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION 07 — ECOSYSTEM DIAGRAM
══════════════════════════════════════════════════════════════════════════ */
const ecoNodes = [
  { id: 'center',   label: 'Animal\nin Need',    icon: '🐾', r: 100,  angle: 0,    isCenter: true },
  { id: 'comm',     label: 'Community',          icon: '👥', r: 220,  angle: 0 },
  { id: 'vet',      label: 'Veterinarians',      icon: '⚕️',  r: 220,  angle: 60 },
  { id: 'shelter',  label: 'Shelters',           icon: '🏠', r: 220,  angle: 120 },
  { id: 'org',      label: 'Organizations',      icon: '🤝', r: 220,  angle: 180 },
  { id: 'adopter',  label: 'Adopters',           icon: '❤️',  r: 220,  angle: 240 },
  { id: 'rescuer',  label: 'Rescuers',           icon: '🚑', r: 220,  angle: 300 },
];

function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);
  const cx = 340, cy = 300;

  const getPos = (node: typeof ecoNodes[0]) => {
    if (node.isCenter) return { x: cx, y: cy };
    const rad = (node.angle - 90) * (Math.PI / 180);
    return { x: cx + node.r * Math.cos(rad), y: cy + node.r * Math.sin(rad) };
  };

  return (
    <div ref={ref} className="flex justify-center">
      <svg width="680" height="600" viewBox="0 0 680 600" className="w-full max-w-3xl h-auto" aria-hidden="true">
        <defs>
          <radialGradient id="ecoBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.06" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background halo */}
        <circle cx={cx} cy={cy} r={260} fill="url(#ecoBg)" />

        {/* Orbit rings */}
        {[140, 220].map((r, i) => (
          <motion.circle
            key={r}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={ACCENT}
            strokeOpacity={0.07 + i * 0.03}
            strokeWidth="1"
            strokeDasharray="3 8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Connection lines */}
        {ecoNodes.filter(n => !n.isCenter).map((node, i) => {
          const pos = getPos(node);
          const isHov = hovered === node.id;
          return (
            <motion.line
              key={node.id + '-line'}
              x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={ACCENT}
              strokeWidth={isHov ? 1.5 : 1}
              strokeOpacity={isHov ? 0.55 : 0.15}
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.09 }}
            />
          );
        })}

        {/* Traveling dots */}
        {inView && ecoNodes.filter(n => !n.isCenter).map((node, i) => {
          const pos = getPos(node);
          return (
            <motion.circle
              key={node.id + '-traveler'}
              r="3.5" fill={ACCENT} opacity="0.5"
              initial={{ cx, cy }}
              animate={{ cx: [cx, pos.x, cx], cy: [cy, pos.y, cy] }}
              transition={{ duration: 3.5 + i * 0.4, delay: 1.2 + i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}

        {/* All nodes */}
        {ecoNodes.map((node, i) => {
          const pos = getPos(node);
          const isCenter = !!node.isCenter;
          const isHov = hovered === node.id;
          const nr = isCenter ? 52 : 40;

          return (
            <g
              key={node.id}
              style={{ cursor: 'default' }}
              onMouseEnter={() => !isCenter && setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {isCenter && (
                <motion.circle
                  cx={pos.x} cy={pos.y}
                  fill="url(#centerGlow)"
                  animate={{ r: [70, 88, 70] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <motion.circle
                cx={pos.x} cy={pos.y} r={nr}
                fill={isCenter ? ACCENT : isHov ? `${ACCENT}15` : WARM}
                stroke={ACCENT}
                strokeWidth={isCenter ? 0 : isHov ? 1.5 : 1}
                strokeOpacity={isCenter ? 0 : 0.3}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: isCenter ? 0.3 : 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
              <motion.text
                x={pos.x} y={pos.y - (isCenter ? 8 : 6)}
                textAnchor="middle"
                fontSize={isCenter ? 22 : 18}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: isCenter ? 0.7 : 0.9 + i * 0.08 }}
              >
                {node.icon}
              </motion.text>
              {node.label.split('\n').map((line, li) => (
                <motion.text
                  key={li}
                  x={pos.x}
                  y={pos.y + (isCenter ? 14 : 12) + li * 11}
                  textAnchor="middle"
                  fontSize={isCenter ? 9 : 8}
                  fontFamily="var(--font-body)"
                  fontWeight="600"
                  fill={isCenter ? 'white' : TEXT2}
                  letterSpacing="0.04em"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: isCenter ? 0.9 : 1.1 + i * 0.08 }}
                >
                  {line}
                </motion.text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   COMMUNITY COUNTERS
══════════════════════════════════════════════════════════════════════════ */
const communityStats = [
  { value: '2.4k+', label: 'Community Reports' },
  { value: '61%',   label: 'Rescue Rate' },
  { value: '8k+',   label: 'Active Members' },
  { value: '120+',  label: 'Community Events' },
];

/* ══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════════════ */
export default function AnimapCaseStudy() {
  return (
    <div style={{ background: BG, color: TEXT, fontFamily: 'var(--font-body)' }}>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 01 — THE PROBLEM
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: copy */}
            <div>
              <FadeUp>
                <SectionLabel text="01 — The Problem" />
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2
                  className="font-display leading-[0.92] mb-8"
                  style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)', color: TEXT }}
                >
                  Animals in need<br />
                  <span style={{ color: ACCENT }}>are everywhere.</span><br />
                  Help isn&apos;t.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body text-lg leading-relaxed mb-8" style={{ color: TEXT2, maxWidth: 440 }}>
                  People want to help — but information is scattered across shelters, rescue groups, clinics and local communities. By the time word gets around, it&apos;s often too late.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="space-y-4">
                  {[
                    'No single place to report a stray or injured animal',
                    'Shelters and vets operate in silos',
                    'Volunteers can\'t find each other',
                    'Rescue efforts duplicate or fall through the cracks',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, marginTop: 7, flexShrink: 0 }} />
                      <p className="font-body text-sm leading-relaxed" style={{ color: TEXT2 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: animated node diagram */}
            <FadeUp delay={0.2}>
              <div
                className="rounded-3xl p-8"
                style={{ background: WARM, border: `1px solid ${ACCENT}20` }}
              >
                <p className="font-body text-xs tracking-widest uppercase mb-6 text-center" style={{ color: ACCENT, opacity: 0.7 }}>
                  The broken ecosystem
                </p>
                <ProblemDiagram />
                <p className="font-body text-xs text-center mt-5" style={{ color: TEXT2, opacity: 0.6 }}>
                  Five stakeholders. Zero connection.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 02 — THE RESCUE MAP
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', background: BG_DARK, borderTop: `1px solid rgba(232,96,28,0.15)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-20 items-start">

            {/* Left: copy */}
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <SectionLabel text="02 — The Rescue Map" />
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2
                  className="font-display leading-[0.92] mb-6"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'white' }}
                >
                  Every rescue starts with a{' '}
                  <span style={{ color: ACCENT2 }}>location.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>
                  Users can report animals, discover nearby shelters, connect with vets and see community activity directly on the map.
                </p>
              </FadeUp>

              {/* Floating map labels */}
              <FadeUp delay={0.15}>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: '📍', text: 'Reported Animal',   color: ACCENT },
                    { icon: '⚕️',  text: 'Nearby Vet',        color: '#4B9EF8' },
                    { icon: '🏠', text: 'Shelter',            color: '#44C987' },
                    { icon: '🎪', text: 'Community Event',    color: '#F7C94B' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      <span className="font-body text-sm" style={{ color: item.color, fontWeight: 500 }}>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: large map screenshots */}
            <FadeUp delay={0.25}>
              <div className="relative flex flex-col gap-5">
                {/* Main cover */}
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid rgba(232,96,28,0.2)` }}>
                  <Image
                    src="/animap-cover.png"
                    alt="Animap map view"
                    width={720}
                    height={460}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Phone mockups row */}
                <div className="flex justify-center gap-6 items-end">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Phone src="/animap-animal-map.png" label="Animal Reports" scale={0.88} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Phone src="/animap-map-vets.png" label="Nearby Vets" scale={0.88} />
                  </motion.div>
                </div>

                {/* Floating pin animation */}
                <motion.div
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-full text-xs font-body font-semibold"
                  style={{ background: ACCENT, color: 'white', boxShadow: `0 8px 28px ${ACCENT}55` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  📍 Live Map
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 03 — REPORT → TRACK → RESOLVE
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <FadeUp>
            <SectionLabel text="03 — Report → Track → Resolve" />
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
            <FadeUp delay={0.05}>
              <h2
                className="font-display leading-[0.92]"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: TEXT }}
              >
                Follow a rescue<br />
                <span style={{ color: ACCENT }}>from start to safe.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-body text-lg leading-relaxed" style={{ color: TEXT2, maxWidth: 400 }}>
                Every reported animal moves through a lifecycle. Community, professionals, and technology all play a role in getting them to safety.
              </p>
            </FadeUp>
          </div>

          <JourneySection />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 04 — COMMUNITY IN ACTION
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', background: WARM, borderTop: `1px solid ${ACCENT}15` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <FadeUp>
            <SectionLabel text="04 — Community in Action" />
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <FadeUp delay={0.05}>
              <h2
                className="font-display leading-[0.92]"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: TEXT }}
              >
                Rescue is a<br />
                <span style={{ color: ACCENT }}>team effort.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-body text-lg leading-relaxed" style={{ color: TEXT2, maxWidth: 420 }}>
                Feeds, threads, events, and chats bind rescuers, volunteers and local communities into a coordinated network — not just a list of strangers.
              </p>
            </FadeUp>
          </div>

          {/* Phone mockup collage */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-end">
            {[
              { src: '/animap-community-feed.png',    label: 'Community Feed',     scale: 0.95 },
              { src: '/animap-rescue-thread.png',     label: 'Rescue Thread',      scale: 0.85 },
              { src: '/animap-events-board.png',      label: 'Events Board',       scale: 0.85 },
              { src: '/animap-group-chat.png',        label: 'Group Chat',         scale: 0.95 },
              { src: '/animap-community-map.png',     label: 'Map Activity',       scale: 0.80 },
              { src: '/animap-discussion-thread.png', label: 'Discussion',         scale: 0.80 },
              { src: '/animap-member-profiles.png',   label: 'Member Profiles',    scale: 0.80 },
              { src: '/animap-event-detail.png',      label: 'Event Detail',       scale: 0.80 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center"
              >
                <Phone src={item.src} label={item.label} scale={item.scale} />
              </motion.div>
            ))}
          </div>

          {/* Floating counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats.map((stat, i) => (
              <FadeUp key={i} delay={0.08 * i}>
                <div
                  className="text-center py-8 rounded-2xl"
                  style={{ background: 'white', border: `1px solid ${ACCENT}20` }}
                >
                  <div className="font-display text-4xl font-bold mb-2" style={{ color: ACCENT }}>{stat.value}</div>
                  <div className="font-body text-xs tracking-widest uppercase" style={{ color: TEXT2 }}>{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 05 — FIND HELP FAST
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 lg:gap-20 items-start">

            {/* Left: copy */}
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <SectionLabel text="05 — Find Help Fast" />
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2
                  className="font-display leading-[0.92] mb-6"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: TEXT }}
                >
                  Trusted help,<br />
                  <span style={{ color: ACCENT }}>right nearby.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body leading-relaxed mb-8" style={{ color: TEXT2, fontSize: 16 }}>
                  When an animal needs urgent care, finding the right veterinarian or shelter can&apos;t take hours. Animap surfaces trusted, proximity-based help in seconds — with profiles, reviews, and one-tap booking.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="space-y-3">
                  {['Veterinarians with availability', 'Verified shelters', 'Animal welfare organizations', 'Appointment booking'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: BORDER }}>
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: ACCENT }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                      />
                      <span className="font-body text-sm" style={{ color: TEXT2 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: phone mockups with cat in center */}
            <div className="flex flex-col items-center gap-8">
              {/* Top row */}
              <div className="flex gap-6 items-end">
                {[
                  { src: '/animap-vet-map.png',  label: 'Vet Map',    scale: 0.82 },
                  { src: '/animap-loading.png',  label: 'Loading',    scale: 1.0  },
                  { src: '/animap-vet-list.png', label: 'Vet List',   scale: 0.82 },
                ].map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Phone src={p.src} label={p.label} scale={p.scale} />
                  </motion.div>
                ))}
              </div>
              {/* Bottom row */}
              <div className="flex gap-6 items-start">
                {[
                  { src: '/animap-vet-profile.png',  label: 'Vet Profile',   scale: 0.88 },
                  { src: '/animap-vet-booking.png',  label: 'Book Appointment', scale: 0.88 },
                ].map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Phone src={p.src} label={p.label} scale={p.scale} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 06 — FOR VETERINARIANS
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', background: '#FAFAF8', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <FadeUp>
            <SectionLabel text="06 — For Veterinarians" />
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <FadeUp delay={0.05}>
              <h2
                className="font-display leading-[0.92]"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', color: TEXT }}
              >
                Built for the people<br />
                <span style={{ color: ACCENT }}>providing care.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-body text-lg leading-relaxed" style={{ color: TEXT2, maxWidth: 400 }}>
                Animap wasn&apos;t only for rescuers. Veterinary clinics needed tools to manage their availability, appointment requests, and care schedule — all connected to the rescue network.
              </p>
            </FadeUp>
          </div>

          {/* Row 1 — 3 phones */}
          <div className="flex flex-wrap justify-center gap-6 items-end mb-8">
            {[
              { src: '/animap-dash-staff.png',         label: 'Staff Dashboard',    scale: 0.92 },
              { src: '/animap-dash-today.png',         label: "Today's Appointments", scale: 1.0  },
              { src: '/animap-dash-all.png',           label: 'All Appointments',   scale: 0.92 },
            ].map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Phone src={p.src} label={p.label} scale={p.scale} />
              </motion.div>
            ))}
          </div>

          {/* Row 2 — 3 phones */}
          <div className="flex flex-wrap justify-center gap-6 items-end mb-8">
            {[
              { src: '/animap-dash-schedule-setup.png', label: 'Schedule Setup',     scale: 0.88 },
              { src: '/animap-schedule-calendar.png',   label: 'Calendar View',      scale: 0.88 },
              { src: '/animap-schedule.png',            label: 'Manage Schedule',    scale: 0.88 },
            ].map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Phone src={p.src} label={p.label} scale={p.scale} />
              </motion.div>
            ))}
          </div>

          {/* Row 3 — 3 phones */}
          <div className="flex flex-wrap justify-center gap-6 items-end">
            {[
              { src: '/animap-appointment-details.png', label: 'Appointment Detail', scale: 0.88 },
              { src: '/animap-vet-edit-profile.png',    label: 'Edit Profile',        scale: 0.88 },
              { src: '/animap-vet-settings.png',        label: 'Settings',            scale: 0.88 },
            ].map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Phone src={p.src} label={p.label} scale={p.scale} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 07 — THE ECOSYSTEM
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0', background: BG_DARK, borderTop: `1px solid rgba(232,96,28,0.15)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <FadeUp>
            <SectionLabel text="07 — The Ecosystem" />
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2
              className="font-display leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: 'white' }}
            >
              Every node,<br />
              <span style={{ color: ACCENT2 }}>connected.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-lg leading-relaxed mb-16 mx-auto" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 520 }}>
              Animap doesn&apos;t serve just one user. It builds the infrastructure for an entire rescue ecosystem to function as one.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <EcosystemDiagram />
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL — CLOSING STATEMENT
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '140px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>

          {/* Map-line decoration */}
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-12" aria-hidden="true">
              <motion.div
                style={{ flex: 1, maxWidth: 120, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}40)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: ACCENT }} />
              <motion.div
                style={{ flex: 1, maxWidth: 120, height: 1, background: `linear-gradient(90deg, ${ACCENT}40, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2
              className="font-display leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: TEXT }}
            >
              Better outcomes happen<br />
              when help is{' '}
              <span style={{ color: ACCENT }}>connected.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-body text-xl leading-relaxed mb-16 mx-auto" style={{ color: TEXT2, maxWidth: 600 }}>
              Animap transformed scattered rescue efforts into a coordinated community experience where people, organizations and professionals could work together to support animals in need.
            </p>
          </FadeUp>

          {/* Metrics */}
          <FadeUp delay={0.15}>
            <div className="grid grid-cols-3 gap-8 mb-16 border-y py-12" style={{ borderColor: BORDER }}>
              {[
                { value: '2.4k+', label: 'Animals reported in 3 months' },
                { value: '8k+',   label: 'Community members at launch' },
                { value: '+61%',  label: 'Reports leading to rescue' },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-5xl font-bold mb-2" style={{ color: ACCENT }}>{m.value}</div>
                  <div className="font-body text-sm" style={{ color: TEXT2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <a
              href="/work"
              className="inline-flex items-center gap-3 font-body font-semibold text-sm rounded-full px-8 py-4 transition-all duration-300 cursor-none group"
              style={{
                background: ACCENT,
                color: 'white',
                boxShadow: `0 8px 32px ${ACCENT}40`,
              }}
            >
              View next project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
