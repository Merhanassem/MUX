'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

/* ── Brand tokens ─────────────────────────────────────────────────────────── */
const BG      = '#06090F';
const BG2     = '#090D18';
const BG3     = '#0D1424';
const ACCENT  = '#2D6FE8';
const ACCENT2 = '#5B9FFF';
const STROKE  = '#182038';
const MUTED   = '#4A6080';
const TEXT    = '#E8EDF5';
const TEXT2   = '#8BA0BE';
const GLASS   = 'rgba(45,111,232,0.08)';

/* ── Shared helpers ───────────────────────────────────────────────────────── */
function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ width: 24, height: 1.5, background: ACCENT }} />
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: ACCENT, fontFamily: 'monospace', textTransform: 'uppercase' }}>
        {text}
      </span>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ── Phone Mockup ─────────────────────────────────────────────────────────── */
function Phone({ src, label, scale = 1, video }: {
  src?: string | null; label?: string; scale?: number; video?: string;
}) {
  const w = 220 * scale;
  const bw = Math.max(1.5, w * 0.010);
  const r  = w * 0.188;
  const ri = r - bw;
  return (
    <div className="flex flex-col items-center" style={{ gap: label ? 14 : 0 }}>
      <div style={{
        width: w, borderRadius: r,
        border: `${bw}px solid #1c2540`,
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.06)',
          `0 2px 4px rgba(0,0,0,0.12)`,
          `0 20px 50px rgba(0,0,0,0.4)`,
          `0 40px 80px rgba(45,111,232,0.08)`,
        ].join(', '),
        background: '#0A0D1A',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{ aspectRatio: '9/19.5', borderRadius: ri, overflow: 'hidden', background: '#08091A', position: 'relative' }}>
          {video ? (
            <video src={video} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : src ? (
            <img src={src} alt={label || 'App screen'} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'linear-gradient(160deg, #0D1628 0%, #08091A 100%)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity={0.6}>
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <line x1="9" y1="7" x2="15" y2="7" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="9" y1="11" x2="15" y2="11" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="9" y1="15" x2="13" y2="15" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontSize: 8, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.2em' }}>SCREEN</span>
            </div>
          )}
          {/* Dynamic island */}
          <div style={{ position: 'absolute', top: Math.max(5, w * 0.034), left: '50%', transform: 'translateX(-50%)', width: Math.max(20, w * 0.25), height: Math.max(5, w * 0.052), background: '#000', borderRadius: 999, zIndex: 10 }} />
        </div>
      </div>
      {label && <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{label}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S1 — FINANCING MADE SIMPLE
══════════════════════════════════════════════════════════════════════════════ */
function S1Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section style={{ background: BG, padding: '120px 0 100px', overflow: 'hidden' }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <FadeUp>
            <Label text="01 — Financing Made Simple" />
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.08, marginBottom: 24 }}>
              Understand Your Financing<br />
              <span style={{ color: ACCENT }}>Before You Commit.</span>
            </h2>
            <p style={{ color: TEXT2, fontSize: 16, lineHeight: 1.8, marginBottom: 40, maxWidth: 460 }}>
              Cash gives users the clarity to explore financing options, calculate monthly installments, submit funding applications, and track their request status — all from a single, intuitive mobile experience.
            </p>
            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { n: '100K', label: 'Max Financing (EGP)' },
                { n: '4', label: 'Core Flows' },
                { n: '1', label: 'Unified Experience' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 6, letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right: phone */}
          <FadeUp delay={0.2} className="flex justify-center items-center">
            <div ref={ref} className="relative">
              {/* Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5 }}
                style={{ position: 'absolute', inset: -60, background: `radial-gradient(ellipse at center, ${ACCENT}20 0%, transparent 70%)`, pointerEvents: 'none' }}
              />
              {/* Main phone */}
              <Phone video="/cash-splash.mov" scale={1.1} />
              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{ position: 'absolute', top: '18%', right: -90, background: BG3, border: `1px solid ${STROKE}`, borderRadius: 14, padding: '12px 16px', minWidth: 140, boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}>
                <div style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 6 }}>INSTALLMENT</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: ACCENT }}>1,250 EGP</div>
                <div style={{ fontSize: 10, color: TEXT2, marginTop: 4 }}>per month / 12 months</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{ position: 'absolute', bottom: '22%', left: -80, background: BG3, border: `1px solid ${STROKE}`, borderRadius: 14, padding: '12px 16px', minWidth: 120, boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}>
                <div style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 6 }}>STATUS</div>
                <div className="flex items-center gap-2">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Approved</span>
                </div>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S2 — THE DECISION JOURNEY (Sticky Scroll)
══════════════════════════════════════════════════════════════════════════════ */
const JOURNEY_STEPS = [
  { n: '01', icon: '💡', label: 'Need Funding', desc: 'User identifies a financing need and opens Cash to explore available options and programs.' },
  { n: '02', icon: '🔍', label: 'Explore Options', desc: 'Browse financing products, eligibility criteria, interest rates, and available funding programs.' },
  { n: '03', icon: '🧮', label: 'Calculate Installments', desc: 'Input desired loan amount and duration. Instantly see monthly installment breakdown before committing.' },
  { n: '04', icon: '📝', label: 'Submit Application', desc: 'Complete guided application form with personal details, documents, and financing requirements.' },
  { n: '05', icon: '🔄', label: 'Review Status', desc: 'Track application progress in real time. Get notified when additional information is needed.' },
  { n: '06', icon: '✅', label: 'Receive Decision', desc: 'Approval or rejection communicated clearly with next steps, offer details, and funding timeline.' },
];

function S2DecisionJourney() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setActive(Math.min(JOURNEY_STEPS.length - 1, Math.floor(v * JOURNEY_STEPS.length)));
  });

  return (
    <div ref={stickyRef} style={{ height: `${JOURNEY_STEPS.length * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: BG2, display: 'flex', alignItems: 'center' }}>
        <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: step list */}
            <div>
              <FadeUp>
                <Label text="02 — The Decision Journey" />
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 40 }}>
                  Every decision,<br /><span style={{ color: ACCENT }}>guided.</span>
                </h2>
              </FadeUp>
              <div className="flex flex-col gap-2">
                {JOURNEY_STEPS.map((s, i) => (
                  <motion.div key={s.n}
                    animate={{ opacity: i === active ? 1 : i < active ? 0.5 : 0.25, x: i === active ? 0 : -4 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 14, background: i === active ? GLASS : 'transparent', border: `1px solid ${i === active ? ACCENT + '40' : 'transparent'}`, cursor: 'default' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: i === active ? ACCENT : BG3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, transition: 'background 0.3s' }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: i === active ? TEXT : TEXT2, fontSize: 14 }}>{s.label}</div>
                      {i === active && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                          <p style={{ color: MUTED, fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>{s.desc}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: visual */}
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 28, padding: '48px 40px', minWidth: 320, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 24 }}>{JOURNEY_STEPS[active].icon}</div>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', color: ACCENT, marginBottom: 12 }}>
                    STEP {JOURNEY_STEPS[active].n} / {JOURNEY_STEPS.length}
                  </div>
                  <div style={{ fontWeight: 700, color: TEXT, fontSize: 26, marginBottom: 16, lineHeight: 1.2 }}>
                    {JOURNEY_STEPS[active].label}
                  </div>
                  <p style={{ color: TEXT2, fontSize: 14, lineHeight: 1.75, maxWidth: 280, margin: '0 auto 32px' }}>
                    {JOURNEY_STEPS[active].desc}
                  </p>
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2">
                    {JOURNEY_STEPS.map((_, i) => (
                      <div key={i} style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 999, background: i === active ? ACCENT : STROKE, transition: 'all 0.3s' }} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S3 — HOW THE PLATFORM WORKS
══════════════════════════════════════════════════════════════════════════════ */
const FEATURES = [
  { icon: '🧮', label: 'Calculate', desc: 'Estimate monthly installments before applying. Input amount and duration for instant clarity.', color: ACCENT },
  { icon: '📝', label: 'Apply', desc: 'Submit financing requests through a guided, step-by-step application flow designed to reduce errors.', color: '#7C5CFC' },
  { icon: '📡', label: 'Track', desc: 'Monitor your application progress and receive real-time status updates throughout the review process.', color: '#10B981' },
  { icon: '📂', label: 'Manage', desc: 'Access your complete financing history, review previous requests, and manage all active applications.', color: '#F59E0B' },
];

function S3HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="03 — How the Platform Works" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Four flows.<br /><span style={{ color: ACCENT }}>One experience.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.75 }}>
            Cash is organized around the actions users actually take — not financial jargon. Each flow is purposefully designed to reduce friction and build confidence.
          </p>
        </FadeUp>
        <div className="grid grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <FadeUp key={f.label} delay={i * 0.08}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                animate={{ y: hovered === i ? -8 : 0, borderColor: hovered === i ? f.color + '60' : STROKE }}
                transition={{ duration: 0.3 }}
                style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 24, padding: '32px 24px', cursor: 'default', height: '100%' }}>
                <motion.div
                  animate={{ background: hovered === i ? f.color + '20' : f.color + '12', scale: hovered === i ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: 52, height: 52, borderRadius: 16, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  {f.icon}
                </motion.div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 18, marginBottom: 10 }}>{f.label}</div>
                <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7 }}>{f.desc}</div>
                <motion.div
                  animate={{ width: hovered === i ? '100%' : '32px', background: f.color }}
                  transition={{ duration: 0.4 }}
                  style={{ height: 2, borderRadius: 999, marginTop: 24 }} />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S4 — LOAN CALCULATOR EXPERIENCE
══════════════════════════════════════════════════════════════════════════════ */
const CALC_STEPS = [
  { icon: '💰', label: 'Loan Amount', desc: 'Set desired funding' },
  { icon: '📅', label: 'Duration', desc: 'Choose repayment period' },
  { icon: '🧮', label: 'Installment Calc', desc: 'Instant monthly preview' },
  { icon: '📊', label: 'Financing Summary', desc: 'Full cost breakdown' },
  { icon: '✅', label: 'Application Decision', desc: 'Submit with confidence' },
];

function S4Calculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="04 — Loan Calculator Experience" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Know your numbers<br /><span style={{ color: ACCENT }}>before you apply.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 500, marginBottom: 60, lineHeight: 1.75 }}>
            The installment calculator is the platform's key trust-builder — giving users total transparency on cost before any commitment is made.
          </p>
        </FadeUp>

        {/* Flow diagram */}
        <FadeUp delay={0.1}>
          <div ref={ref} style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 28, padding: '48px 40px', marginBottom: 60 }}>
            <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.2em', color: MUTED, marginBottom: 36 }}>— FINANCING FLOW</p>
            <div className="flex items-start justify-between">
              {CALC_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      style={{ width: 60, height: 60, borderRadius: 18, background: `${ACCENT}14`, border: `1.5px solid ${ACCENT}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                      {step.icon}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
                      style={{ textAlign: 'center', maxWidth: 90 }}>
                      <div style={{ fontWeight: 600, color: TEXT, fontSize: 12 }}>{step.label}</div>
                      <div style={{ color: MUTED, fontSize: 10, marginTop: 3 }}>{step.desc}</div>
                    </motion.div>
                  </div>
                  {i < CALC_STEPS.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
                      style={{ width: 36, height: 1.5, background: `linear-gradient(to right, ${ACCENT}70, ${ACCENT}30)`, marginTop: 30, flexShrink: 0, transformOrigin: 'left' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Phone showcase */}
        <FadeUp delay={0.2}>
          <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.16em', color: MUTED, marginBottom: 40 }}>— CALCULATOR SCREENS</p>
          <div className="flex justify-center gap-10 items-end">
            {[
              { label: 'Amount Input', scale: 0.85, src: '/cash-amount-input.png' },
              { label: 'Calculator',   scale: 1.0,  src: '/cash-calculator.png' },
              { label: 'Fund Type',    scale: 0.85, src: '/cash-fund-type.png' },
            ].map((p, i) => (
              <motion.div key={p.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}>
                <Phone src={p.src} label={p.label} scale={p.scale} />
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S5 — APPLICATION EXPERIENCE
══════════════════════════════════════════════════════════════════════════════ */
const APP_STEPS = [
  { icon: '🎯', label: 'Eligibility', desc: 'Quick eligibility check before full application', color: ACCENT },
  { icon: '📋', label: 'Application Form', desc: 'Guided fields with inline validation', color: '#7C5CFC' },
  { icon: '📎', label: 'Document Submission', desc: 'Upload required documents securely', color: '#10B981' },
  { icon: '🔍', label: 'Review', desc: 'Internal verification of submitted information', color: '#F59E0B' },
  { icon: '🏆', label: 'Approval Process', desc: 'Decision communicated with next steps', color: '#EC4899' },
];

function S5Application() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="05 — Application Experience" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Apply with<br /><span style={{ color: ACCENT }}>confidence.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 500, marginBottom: 60, lineHeight: 1.75 }}>
            A structured, guided application flow that removes ambiguity at every step — from eligibility to final approval.
          </p>
        </FadeUp>

        {/* Workflow diagram */}
        <FadeUp delay={0.1}>
          <div ref={ref} className="flex flex-col items-center gap-0 mb-16">
            {APP_STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: BG3, border: `1px solid ${step.color}35`, borderRadius: 20, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 20, minWidth: 420, boxShadow: `0 4px 20px rgba(0,0,0,0.25)` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${step.color}16`, border: `1px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {step.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: TEXT, fontSize: 15 }}>{step.label}</div>
                    <div style={{ color: MUTED, fontSize: 12, marginTop: 3 }}>{step.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: step.color }} />
                </motion.div>
                {i < APP_STEPS.length - 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={inView ? { height: 28, opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    style={{ width: 1.5, background: `linear-gradient(to bottom, ${APP_STEPS[i].color}60, ${APP_STEPS[i + 1].color}60)` }} />
                )}
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Phone gallery */}
        <FadeUp delay={0.2}>
          <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.16em', color: MUTED, marginBottom: 40 }}>— APPLICATION SCREENS</p>
          <div className="flex justify-center gap-8 items-end">
            {[
              { label: 'Eligibility',       scale: 0.82, src: '/cash-eligibility.png' },
              { label: 'Application Form',  scale: 0.95, src: '/cash-application-form.png' },
              { label: 'Documents',         scale: 0.82, src: '/cash-documents.png' },
              { label: 'Submission',        scale: 0.82, src: '/cash-submission.png' },
            ].map((p, i) => (
              <motion.div key={p.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Phone src={p.src} label={p.label} scale={p.scale} />
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S6 — APPLICATION TRACKING
══════════════════════════════════════════════════════════════════════════════ */
const TRACK_STATES = [
  { icon: '📤', label: 'Submitted', desc: 'Application received and queued for review', color: ACCENT, done: true },
  { icon: '🔍', label: 'Under Review', desc: 'Team actively reviewing application details', color: '#7C5CFC', done: true },
  { icon: '📋', label: 'Additional Info', desc: 'User prompted to submit supporting documentation', color: '#F59E0B', done: false },
  { icon: '🏆', label: 'Approved / Rejected', desc: 'Final decision communicated with clear next steps', color: '#10B981', done: false },
];

function S6Tracking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="06 — Application Tracking" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Always know<br /><span style={{ color: ACCENT }}>where you stand.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 500, marginBottom: 60, lineHeight: 1.75 }}>
            Financing applications are stressful. Real-time status tracking eliminates the uncertainty and keeps users informed at every stage.
          </p>
        </FadeUp>

        {/* Status timeline */}
        <div className="grid grid-cols-2 gap-16 mb-16 items-center">
          <FadeUp delay={0.1}>
            <div ref={ref} className="relative">
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: 21, top: 24, bottom: 24, width: 1.5, background: `linear-gradient(to bottom, ${ACCENT}, ${STROKE})` }} />
              <div className="flex flex-col gap-6">
                {TRACK_STATES.map((s, i) => (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-5 items-start">
                    {/* Node */}
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: s.done ? s.color : BG3, border: `2px solid ${s.done ? s.color : STROKE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, zIndex: 1, boxShadow: s.done ? `0 0 20px ${s.color}40` : 'none' }}>
                      {s.icon}
                    </div>
                    <div style={{ paddingTop: 8 }}>
                      <div style={{ fontWeight: 700, color: s.done ? TEXT : TEXT2, fontSize: 16 }}>{s.label}</div>
                      <div style={{ color: MUTED, fontSize: 13, marginTop: 4, lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Phone showcase */}
          <FadeUp delay={0.2} className="flex justify-center gap-8 items-end">
            <Phone src="/cash-request-status.png" label="Request Status" scale={0.9} />
            <Phone src="/cash-status-detail.png" label="Status Detail" scale={0.78} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S7 — PROFILE & ACCOUNT MANAGEMENT
══════════════════════════════════════════════════════════════════════════════ */
const PROFILE_MODULES = [
  { icon: '📊', label: 'Financing History', desc: 'Complete record of past applications and outcomes', color: ACCENT },
  { icon: '📋', label: 'Previous Requests', desc: 'Review, resubmit, or reference past financing requests', color: '#7C5CFC' },
  { icon: '👤', label: 'Account Details', desc: 'Personal profile, verification status, and identity info', color: '#10B981' },
  { icon: '⚙️', label: 'Settings', desc: 'Notifications, preferences, and account security controls', color: '#F59E0B' },
  { icon: '🔎', label: 'Request Details', desc: 'Full breakdown of each financing application submitted', color: '#EC4899' },
  { icon: '💼', label: 'Active Products', desc: 'Track current financing products and repayment schedules', color: '#14B8A6' },
];

function S7Profile() {
  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="07 — Profile & Account Management" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Your complete<br /><span style={{ color: ACCENT }}>financing record.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 500, marginBottom: 60, lineHeight: 1.75 }}>
            Everything a user needs to manage their financing journey — past, present, and future — in a single organized account view.
          </p>
        </FadeUp>

        {/* Module grid */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {PROFILE_MODULES.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.07}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '24px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.color}16`, border: `1px solid ${m.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 5 }}>{m.label}</div>
                  <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>{m.desc}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Phone showcase */}
        <FadeUp delay={0.2}>
          <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.16em', color: MUTED, marginBottom: 40 }}>— PROFILE SCREENS</p>
          <div className="flex justify-center gap-8 items-end">
            {[
              { label: 'Profile',       scale: 0.88, src: '/cash-profile.png' },
              { label: 'Notifications', scale: 0.95, src: '/cash-notifications.png' },
              { label: 'About Us',      scale: 0.88, src: '/cash-about-us.png' },
              { label: 'Settings',      scale: 0.88, src: '/cash-settings.png' },
            ].map((p, i) => (
              <motion.div key={p.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Phone src={p.src} label={p.label} scale={p.scale} />
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S8 — KEY PRODUCT DECISIONS
══════════════════════════════════════════════════════════════════════════════ */
const DECISIONS = [
  {
    n: '01', color: ACCENT,
    title: 'Financing Transparency',
    challenge: 'Users feared hidden costs and didn\'t trust opaque financing products, causing drop-off before application.',
    decision: 'Built a full cost breakdown screen showing total amount, monthly installment, fees, and duration upfront.',
    impact: 'Users entered the application flow with full financial context, reducing mid-flow abandonment.',
  },
  {
    n: '02', color: '#7C5CFC',
    title: 'Installment Visibility',
    challenge: 'Without seeing monthly costs in advance, users submitted applications they later couldn\'t commit to.',
    decision: 'Placed the installment calculator as the primary entry point before any application steps begin.',
    impact: 'Higher quality applications with users already confident in the monthly commitment.',
  },
  {
    n: '03', color: '#10B981',
    title: 'Application Confidence',
    challenge: 'Multi-step forms created anxiety. Users weren\'t sure what documents were needed or what to expect.',
    decision: 'Designed a guided application with progress indicators, inline validation, and upfront document checklists.',
    impact: 'Completion rates improved. Users felt guided rather than interrogated.',
  },
  {
    n: '04', color: '#F59E0B',
    title: 'Status Communication',
    challenge: 'Post-submission silence caused anxiety. Users had no visibility into what happened to their application.',
    decision: 'Built a real-time status timeline with push notifications and clear explanations at each review stage.',
    impact: 'Reduced support inquiries about application status. Users stayed engaged rather than dropping off.',
  },
];

function S8Decisions() {
  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="08 — Key Product Decisions" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Every choice<br /><span style={{ color: ACCENT }}>had a reason.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.75 }}>
            Four product decisions that shaped how Cash builds trust with users throughout their financing journey.
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 gap-5">
          {DECISIONS.map((d, i) => (
            <FadeUp key={d.n} delay={i * 0.08}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '36px 32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -8, right: 20, fontSize: 90, fontWeight: 900, color: `${d.color}07`, fontFamily: 'monospace', lineHeight: 1, userSelect: 'none' }}>
                  {d.n}
                </div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 18, marginBottom: 24 }}>{d.title}</div>
                {[
                  { tag: 'CHALLENGE', val: d.challenge, c: '#F87171' },
                  { tag: 'DECISION',  val: d.decision,  c: ACCENT },
                  { tag: 'IMPACT',    val: d.impact,     c: '#22C55E' },
                ].map(row => (
                  <div key={row.tag} style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.2em', color: row.c, fontWeight: 600 }}>{row.tag}</span>
                    <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.65, marginTop: 4 }}>{row.val}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S9 — FINANCING ECOSYSTEM
══════════════════════════════════════════════════════════════════════════════ */
const ECO_NODES = [
  { icon: '👤', label: 'User', sub: 'Opens app, explores options', color: ACCENT },
  { icon: '🧮', label: 'Calculator', sub: 'Simulates installment costs', color: '#7C5CFC' },
  { icon: '📝', label: 'Application', sub: 'Submits guided request', color: '#10B981' },
  { icon: '🔍', label: 'Review Process', sub: 'Verification & documentation', color: '#F59E0B' },
  { icon: '🏆', label: 'Funding Decision', sub: 'Approval with clear terms', color: '#EC4899' },
];

function S9Ecosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="09 — Financing Ecosystem" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            The complete<br /><span style={{ color: ACCENT }}>financing lifecycle.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.75 }}>
            From the first question to final funding — a closed loop that keeps users informed, confident, and in control.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div ref={ref} style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 28, padding: '56px 48px' }}>
            <div className="flex items-start justify-between">
              {ECO_NODES.map((node, i) => (
                <div key={node.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: 70, height: 70, borderRadius: 20, background: `${node.color}14`, border: `1.5px solid ${node.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: `0 0 30px ${node.color}18` }}>
                      {node.icon}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
                      style={{ textAlign: 'center', maxWidth: 90 }}>
                      <div style={{ fontWeight: 700, color: TEXT, fontSize: 13 }}>{node.label}</div>
                      <div style={{ color: MUTED, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{node.sub}</div>
                    </motion.div>
                  </div>
                  {i < ECO_NODES.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                      style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${ECO_NODES[i].color}60, ${ECO_NODES[i+1].color}40)`, marginTop: 35, minWidth: 24, transformOrigin: 'left' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S10 — OUTCOME
══════════════════════════════════════════════════════════════════════════════ */
const OUTCOMES = [
  {
    icon: '💡', color: ACCENT, metric: 'Clarity First',
    title: 'Improved Financing Clarity',
    desc: 'Users enter the application flow with full cost transparency — monthly installment, total repayment, and fees visible before any commitment.',
  },
  {
    icon: '⚡', color: '#10B981', metric: 'Less Friction',
    title: 'Reduced Application Friction',
    desc: 'Guided application steps, inline validation, and upfront document requirements reduced errors and mid-flow abandonment.',
  },
  {
    icon: '📡', color: '#7C5CFC', metric: 'Full Visibility',
    title: 'Better Funding Visibility',
    desc: 'Real-time status tracking and push notifications kept applicants informed and confident throughout the entire review process.',
  },
];

function S10Outcome() {
  return (
    <section style={{ background: BG2, padding: '100px 0 120px' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <Label text="10 — Outcome" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Impact that<br /><span style={{ color: ACCENT }}>builds trust.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.75 }}>
            Cash transformed an opaque, anxiety-driven process into a confident, transparent financing experience.
          </p>
        </FadeUp>
        <div className="grid grid-cols-3 gap-5">
          {OUTCOMES.map((o, i) => (
            <FadeUp key={o.title} delay={i * 0.1}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '40px 28px', height: '100%' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${o.color}16`, border: `1px solid ${o.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 24 }}>
                  {o.icon}
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', color: o.color, marginBottom: 10 }}>{o.metric}</div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 18, marginBottom: 14, lineHeight: 1.3 }}>{o.title}</div>
                <div style={{ color: TEXT2, fontSize: 14, lineHeight: 1.75 }}>{o.desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════════════════════ */
export default function CashCaseStudy() {
  return (
    <div style={{ background: BG, color: TEXT }}>
      <S1Hero />
      <S2DecisionJourney />
      <S3HowItWorks />
      <S4Calculator />
      <S5Application />
      <S6Tracking />
      <S7Profile />
      <S8Decisions />
      <S9Ecosystem />
      <S10Outcome />
    </div>
  );
}
