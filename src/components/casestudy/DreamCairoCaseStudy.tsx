'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

/* ── Brand tokens ── */
const GOLD   = '#C9922A';
const GOLD2  = '#E8B84B';
const GOLD3  = '#8B6015';
const BG     = '#0A0804';
const BG2    = '#120F08';
const BG3    = '#1A1508';
const CARD   = '#161209';
const TEXT   = '#F5EDD8';
const MUTED  = '#7A6A4A';
const STROKE = '#2A2010';

/* ── Helpers ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function GoldLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
      <span style={{ fontSize: 10, color: GOLD, fontFamily: 'monospace', letterSpacing: '0.28em', textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

/* ── Browser Frame (desktop placeholder) ── */
function BrowserFrame({ src, className = '', objectPosition = 'top' }: { src?: string | null; className?: string; objectPosition?: string }) {
  return (
    <div className={`rounded-2xl overflow-hidden flex-shrink-0 ${className}`}
      style={{ background: BG3, border: `1px solid ${STROKE}`, boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${GOLD}10` }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: '#0D0B06', borderColor: STROKE }}>
        <div className="flex gap-1.5">
          {['#3a3a3a', '#3a3a3a', '#3a3a3a'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 mx-4 rounded-md px-3 py-1 flex items-center gap-2"
          style={{ background: '#0A0804', border: `1px solid ${STROKE}` }}>
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M6 2a4 4 0 0 1 0 8" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 9, color: MUTED, fontFamily: 'monospace' }}>dreamcairo.com</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ aspectRatio: '16/9', position: 'relative', background: BG2, minHeight: 200 }}>
        {src ? (
          <Image src={src} alt="Dream Cairo screen" fill sizes="(max-width: 768px) 90vw, 900px" className="object-cover" style={{ objectPosition }} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: GOLD + '18', border: `1px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2" opacity={0.7}>
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <p style={{ fontSize: 9, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.2em' }}>SCREEN</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Mobile Frame ── */
function MobileFrame({ src }: { src?: string | null }) {
  return (
    <div className="relative flex-shrink-0" style={{
      width: 120,
      borderRadius: 22,
      border: '1.5px solid #2a2010',
      boxShadow: `0 0 0 1px ${GOLD}15, 0 16px 40px rgba(0,0,0,0.5)`,
      background: '#0D0B06',
      overflow: 'hidden',
    }}>
      <div style={{ aspectRatio: '9/19.5', borderRadius: 20, overflow: 'hidden', background: BG2, position: 'relative' }}>
        {src ? (
          <Image src={src} alt="Mobile" fill sizes="(max-width: 768px) 80vw, 420px" className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(160deg, ${GOLD}10 0%, #050300 100%)` }}>
            <p style={{ fontSize: 7, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.15em' }}>SCREEN</p>
          </div>
        )}
        {/* Dynamic island */}
        <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 32, height: 7, background: '#000', borderRadius: 999, zIndex: 10 }} />
      </div>
    </div>
  );
}

/* ── Countdown element ── */
function CountdownPill({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 rounded-2xl"
      style={{ background: BG3, border: `1px solid ${GOLD}25` }}>
      <span className="font-display" style={{ fontSize: '1.8rem', color: GOLD, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.18em', marginTop: 4 }}>{unit}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S1 — THE EXPERIENCE
══════════════════════════════════════════════════════════════════════ */
function S1TheExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-5 md:px-16 py-28 md:py-36 overflow-hidden" style={{ background: BG }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${GOLD}0A, transparent 70%)`,
      }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Hero headline */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <GoldLabel text="The Experience" />
          <h2 className="font-display mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: TEXT, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            More Than A Purchase.<br />
            <span style={{ background: `linear-gradient(135deg, ${GOLD2}, ${GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              A Chance To Win.
            </span>
          </h2>
          <p className="font-body mx-auto" style={{ fontSize: '1.1rem', color: MUTED, maxWidth: 540, lineHeight: 1.7 }}>
            Dream Cairo transforms every ticket purchase into a premium experience —
            anticipation, transparency, and the thrill of a luxury reward.
          </p>
        </motion.div>

        {/* Countdown strip */}
        <motion.div className="flex items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <CountdownPill value="02" unit="DAYS" />
          <span style={{ color: GOLD, fontSize: '1.5rem', opacity: 0.5 }}>:</span>
          <CountdownPill value="14" unit="HRS" />
          <span style={{ color: GOLD, fontSize: '1.5rem', opacity: 0.5 }}>:</span>
          <CountdownPill value="37" unit="MIN" />
          <span style={{ color: GOLD, fontSize: '1.5rem', opacity: 0.5 }}>:</span>
          <CountdownPill value="09" unit="SEC" />
          <div className="ml-4 px-4 py-2 rounded-full" style={{ background: GOLD + '18', border: `1px solid ${GOLD}40` }}>
            <span style={{ fontSize: 10, color: GOLD, fontFamily: 'monospace', letterSpacing: '0.14em' }}>SUPERCAR DRAW</span>
          </div>
        </motion.div>

        {/* Large browser showcase — homepage */}
        <FadeUp delay={0.2}>
          <BrowserFrame src="/dc-homepage.png" className="w-full" />
        </FadeUp>

        {/* Three pillars below */}
        <div className="grid grid-cols-3 gap-5 mt-8">
          {[
            { icon: '🎟', title: 'Purchase Tickets', desc: 'Seamless checkout in seconds' },
            { icon: '⏳', title: 'Countdown Begins', desc: 'Real-time draw transparency' },
            { icon: '🏆', title: 'Win Luxury Prizes', desc: 'Cars, iPhones, gold, and more' },
          ].map((p, i) => (
            <FadeUp key={i} delay={0.35 + i * 0.08}>
              <div className="rounded-2xl p-5 flex items-center gap-4"
                style={{ background: BG2, border: `1px solid ${STROKE}` }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div>
                  <p className="font-display text-sm mb-0.5" style={{ color: TEXT }}>{p.title}</p>
                  <p style={{ fontSize: 11, color: MUTED }}>{p.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S2 — HOW IT WORKS (sticky scroll)
══════════════════════════════════════════════════════════════════════ */
const HOW_STEPS = [
  { icon: '🔍', n: '01', title: 'Browse Campaign', desc: 'Discover live prize campaigns — from supercars to iPhones. Each campaign shows real-time ticket counts and countdown.' },
  { icon: '🏆', n: '02', title: 'Choose Your Prize', desc: 'Select the prize you want to win. Every campaign is transparent with prize value, ticket price, and draw date.' },
  { icon: '🎟', n: '03', title: 'Purchase Tickets', desc: 'Buy one or more tickets in a seamless, secure checkout. Multiple payment methods supported.' },
  { icon: '⏳', n: '04', title: 'Countdown Begins', desc: 'Watch the live countdown to draw day. Track your tickets and see total entries in real time.' },
  { icon: '🎲', n: '05', title: 'Winner Selection', desc: 'A transparent, verifiable draw selects the winner when the campaign closes.' },
  { icon: '✨', n: '06', title: 'Reward Fulfillment', desc: 'The winner receives their prize. Dream Cairo handles verification and delivery end-to-end.' },
];

function S2HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(HOW_STEPS.length - 1, Math.floor(v * HOW_STEPS.length)));
  });

  return (
    <div ref={containerRef} style={{ height: '420vh', position: 'relative', background: BG2 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 60% at 30% 50%, ${GOLD}06, transparent)`,
        }} />

        <div className="max-w-7xl mx-auto px-5 md:px-16 w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            {/* Left — active step */}
            <div>
              <GoldLabel text="How It Works" />
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="text-5xl mb-6">{HOW_STEPS[active].icon}</div>
                  <p style={{ fontSize: 11, color: GOLD, fontFamily: 'monospace', letterSpacing: '0.22em', marginBottom: 16 }}>
                    {HOW_STEPS[active].n} / 06
                  </p>
                  <h2 className="font-display mb-5"
                    style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: TEXT, letterSpacing: '-0.02em', lineHeight: 1.08 }}>
                    {HOW_STEPS[active].title}
                  </h2>
                  <p className="font-body leading-relaxed" style={{ fontSize: '1.05rem', color: MUTED, maxWidth: 400 }}>
                    {HOW_STEPS[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — vertical timeline */}
            <div className="relative flex flex-col gap-0">
              <div className="absolute left-5 top-3 bottom-3 w-px" style={{ background: STROKE }} />
              <motion.div className="absolute left-5 top-3 w-px origin-top" style={{ background: `linear-gradient(180deg, ${GOLD}, ${GOLD}44)` }}
                animate={{ height: `${((active + 1) / HOW_STEPS.length) * 100}%` }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} />

              {HOW_STEPS.map((s, i) => {
                const done = i < active;
                const cur  = i === active;
                return (
                  <div key={i} className="flex items-center gap-5 py-3.5 relative">
                    <motion.div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      animate={{
                        background: cur ? GOLD : done ? GOLD3 : 'rgba(255,255,255,0.03)',
                        boxShadow: cur ? `0 0 20px ${GOLD}50` : 'none',
                      }}
                      style={{ border: `1px solid ${cur ? GOLD : done ? GOLD3 : STROKE}` }}>
                      {done ? (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <span style={{ fontSize: 9, color: cur ? BG : MUTED, fontFamily: 'monospace' }}>{s.n}</span>
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <motion.p className="font-display text-sm"
                        animate={{ color: cur ? TEXT : done ? MUTED : '#3A3020' }}>
                        {s.title}
                      </motion.p>
                    </div>
                    {cur && (
                      <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }}
                        layoutId="goldDot" transition={{ duration: 0.3 }} />
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
   S3 — REWARD ECOSYSTEM DIAGRAM
══════════════════════════════════════════════════════════════════════ */
const ECO_NODES = [
  { label: 'Users', sub: 'Buyers & participants', icon: '👤' },
  { label: 'Campaigns', sub: 'Active prize draws', icon: '🎯' },
  { label: 'Tickets', sub: 'Digital entry tokens', icon: '🎟' },
  { label: 'Prize Pool', sub: 'Curated luxury rewards', icon: '💎' },
  { label: 'Winner Selection', sub: 'Transparent & verified', icon: '🏆' },
];

function S3Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="px-5 md:px-16 py-24 md:py-32 relative" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 50% 60% at 50% 50%, ${GOLD}06, transparent)`,
      }} />
      <div className="max-w-5xl mx-auto relative">
        <FadeUp>
          <GoldLabel text="Reward Ecosystem" />
          <h2 className="font-display mb-16 text-center"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Transparent by design.<br />
            <span style={{ color: GOLD }}>Rewarding by nature.</span>
          </h2>
        </FadeUp>

        {/* Vertical node chain */}
        <div className="flex flex-col items-center gap-0">
          {ECO_NODES.map((node, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                className="flex items-center gap-5 rounded-2xl px-8 py-5 w-full max-w-md"
                style={{ background: BG3, border: `1px solid ${i === ECO_NODES.length - 1 ? GOLD + '60' : STROKE}` }}
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ borderColor: GOLD + '40', background: BG2 }}
              >
                <span style={{ fontSize: 28 }}>{node.icon}</span>
                <div>
                  <p className="font-display text-base" style={{ color: i === ECO_NODES.length - 1 ? GOLD : TEXT }}>{node.label}</p>
                  <p style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{node.sub}</p>
                </div>
                {i === ECO_NODES.length - 1 && (
                  <div className="ml-auto px-3 py-1 rounded-full" style={{ background: GOLD + '18', border: `1px solid ${GOLD}40` }}>
                    <span style={{ fontSize: 9, color: GOLD, fontFamily: 'monospace', letterSpacing: '0.12em' }}>VERIFIED</span>
                  </div>
                )}
              </motion.div>

              {i < ECO_NODES.length - 1 && (
                <motion.div className="flex flex-col items-center py-2 gap-1"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.4 }}>
                  <div className="w-px h-5" style={{ background: `linear-gradient(180deg, ${GOLD}40, ${GOLD}10)` }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, opacity: 0.4 }} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S4 — DISCOVERY & CAMPAIGNS
══════════════════════════════════════════════════════════════════════ */
function S4Discovery() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG2 }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <GoldLabel text="Discovery & Campaigns" />
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
              Every campaign,<br /><span style={{ color: GOLD }}>designed to captivate.</span>
            </h2>
            <div className="flex flex-col gap-1 text-right">
              {['Campaign Discovery', 'Prize Visibility', 'Urgency', 'Trust Signals'].map((t, i) => (
                <p key={i} style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em' }}>— {t}</p>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Large desktop — homepage */}
        <FadeUp delay={0.1}>
          <BrowserFrame src="/dc-homepage.png" className="w-full mb-6" objectPosition="center 75%" />
        </FadeUp>

        {/* Secondary desktop + mobile row */}
        <div className="grid grid-cols-3 gap-5 items-start">
          <FadeUp delay={0.15} className="col-span-2">
            <BrowserFrame src="/dc-about.png" className="w-full" />
          </FadeUp>
          <FadeUp delay={0.2} className="flex items-center justify-center pt-6">
            <MobileFrame src="/dc-login.png" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S5 — PURCHASE EXPERIENCE
══════════════════════════════════════════════════════════════════════ */
const FLOW_STEPS = [
  { label: 'Campaign', icon: '🎯' },
  { label: 'Select Tickets', icon: '🎟' },
  { label: 'Cart', icon: '🛒' },
  { label: 'Checkout', icon: '📋' },
  { label: 'Payment', icon: '💳' },
  { label: 'Confirmation', icon: '✅' },
];

function S5PurchaseExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-5 md:px-16 py-24 md:py-32 relative" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${GOLD}06, transparent)`,
      }} />
      <div className="max-w-7xl mx-auto relative">
        <FadeUp>
          <GoldLabel text="Purchase Experience" />
          <h2 className="font-display mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Frictionless checkout.<br /><span style={{ color: GOLD }}>Thrilling outcome.</span>
          </h2>
        </FadeUp>

        {/* Flow diagram */}
        <div className="flex items-center justify-between mb-14 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-8 right-8 h-px" style={{ background: STROKE }} />
          <motion.div className="absolute top-8 left-8 h-px origin-left" style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD}44)` }}
            initial={{ width: '0%' }}
            animate={inView ? { width: 'calc(100% - 64px)' } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} />

          {FLOW_STEPS.map((s, i) => (
            <motion.div key={i} className="flex flex-col items-center gap-3 relative z-10"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
              <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: BG3, border: `1px solid ${i === 4 ? GOLD + '60' : STROKE}`, boxShadow: i === 4 ? `0 0 20px ${GOLD}25` : 'none' }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
              </div>
              <p style={{ fontSize: 10, color: i === 4 ? GOLD : MUTED, fontFamily: 'monospace', letterSpacing: '0.1em', textAlign: 'center', whiteSpace: 'nowrap' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Screen grid — real screens */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: 'Cart & Summary',      src: '/dc-cart.png' },
            { label: 'Wallet · Payment',    src: '/dc-wallet.png' },
            { label: 'Confirmation',        src: '/dc-payment-confirmation.png' },
          ].map((item, i) => (
            <FadeUp key={i} delay={0.3 + i * 0.1}>
              <BrowserFrame src={item.src} className="w-full" />
              <p className="text-center mt-3" style={{ fontSize: 9, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.16em' }}>{item.label.toUpperCase()}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S6 — BUILDING TRUST
══════════════════════════════════════════════════════════════════════ */
const TRUST_CARDS = [
  { icon: '🏆', title: 'Winner Transparency', desc: 'Every winner is publicly announced with verifiable proof of selection.' },
  { icon: '📜', title: 'Campaign Rules', desc: 'Clear terms, ticket limits, and draw conditions visible on every campaign.' },
  { icon: '✅', title: 'Purchase Confirmation', desc: 'Instant ticket confirmation with unique entry codes per purchase.' },
  { icon: '⏱', title: 'Countdown Visibility', desc: 'Live countdown timers create accountability and excitement simultaneously.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'PCI-compliant payment processing with multiple trusted gateway options.' },
  { icon: '📊', title: 'Live Ticket Counts', desc: 'Real-time sold ticket numbers build confidence in campaign activity.' },
];

function S6BuildingTrust() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG2 }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <GoldLabel text="Building Trust" />
          <h2 className="font-display mb-14"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em', maxWidth: 540 }}>
            Excitement needs<br /><span style={{ color: GOLD }}>trust to thrive.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRUST_CARDS.map((c, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <motion.div className="rounded-3xl p-7 h-full flex flex-col gap-4"
                style={{ background: CARD, border: `1px solid ${STROKE}` }}
                whileHover={{ borderColor: GOLD + '35', background: BG3 }}
                transition={{ duration: 0.3 }}>
                <span style={{ fontSize: 28 }}>{c.icon}</span>
                <div>
                  <h4 className="font-display mb-2" style={{ fontSize: '1.05rem', color: TEXT }}>{c.title}</h4>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.85rem', color: MUTED }}>{c.desc}</p>
                </div>
                <div className="mt-auto h-px" style={{ background: `linear-gradient(90deg, ${GOLD}20, transparent)` }} />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S7 — RESPONSIVE EXPERIENCE
══════════════════════════════════════════════════════════════════════ */
function S7Responsive() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32 relative" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 40% at 50% 50%, ${GOLD}05, transparent)`,
      }} />
      <div className="max-w-7xl mx-auto relative">
        <FadeUp>
          <GoldLabel text="Responsive Experience" />
          <h2 className="font-display mb-14"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Every device.<br /><span style={{ color: GOLD }}>Same luxury feel.</span>
          </h2>
        </FadeUp>

        <div className="flex items-end gap-8">
          {/* Desktop */}
          <FadeUp delay={0.1} className="flex-1">
            <BrowserFrame src="/dc-homepage.png" className="w-full" />
            <p className="text-center mt-4" style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.16em' }}>DESKTOP</p>
          </FadeUp>

          {/* Mobile stack */}
          <FadeUp delay={0.2} className="flex gap-4 pb-6">
            <div className="flex flex-col items-center gap-4">
              <div style={{
                width: 120,
                borderRadius: 22,
                border: `1.5px solid ${STROKE}`,
                boxShadow: `0 0 0 1px ${GOLD}12, 0 20px 50px rgba(0,0,0,0.5)`,
                background: BG3,
                overflow: 'hidden',
              }}>
                <div style={{ aspectRatio: '9/19.5', background: BG2, position: 'relative', overflow: 'hidden' }}>
                  <Image src="/dc-homepage-mobile.png" alt="Mobile view" fill sizes="(max-width: 768px) 80vw, 420px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 32, height: 7, background: '#000', borderRadius: 999 }} />
                </div>
              </div>
              <p style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.16em' }}>MOBILE</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S8 — KEY PRODUCT DECISIONS
══════════════════════════════════════════════════════════════════════ */
const DECISIONS = [
  {
    n: '01',
    title: 'Countdown Visibility',
    challenge: 'Users needed urgency without feeling pressured into purchases.',
    decision: 'Placed real-time countdowns on campaign cards and detail pages — always visible, never intrusive.',
    impact: 'Increased campaign engagement and reduced cart abandonment.',
  },
  {
    n: '02',
    title: 'Ticket Purchase Simplicity',
    challenge: 'Complex ticket selection was creating friction at the most critical moment.',
    decision: 'Redesigned to a single-tap quantity selector with instant cart preview.',
    impact: '+44% improvement in payment conversion rate.',
  },
  {
    n: '03',
    title: 'Trust & Transparency',
    challenge: 'New users were skeptical about draw fairness and winner legitimacy.',
    decision: 'Added verified winner badges, public draw records, and live ticket count displays.',
    impact: 'Repeat purchase rate increased significantly after winner transparency launch.',
  },
  {
    n: '04',
    title: 'Luxury Visual Language',
    challenge: 'Generic e-commerce patterns felt misaligned with premium prize offerings.',
    decision: 'Designed a dark, gold-accented visual system inspired by luxury brand aesthetics.',
    impact: '6.2 minute average session time — users browse as an experience, not just a transaction.',
  },
];

function S8ProductDecisions() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG2 }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <GoldLabel text="Key Product Decisions" />
          <h2 className="font-display mb-14"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Every choice<br /><span style={{ color: GOLD }}>had a reason.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DECISIONS.map((d, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div className="rounded-3xl p-8 h-full flex flex-col gap-6"
                style={{ background: CARD, border: `1px solid ${STROKE}` }}
                whileHover={{ borderColor: GOLD + '30' }}
                transition={{ duration: 0.3 }}>
                <div className="flex items-start justify-between">
                  <p style={{ fontSize: 10, color: GOLD, fontFamily: 'monospace', letterSpacing: '0.2em' }}>{d.n}</p>
                </div>
                <h3 className="font-display text-xl" style={{ color: TEXT }}>{d.title}</h3>

                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Challenge', text: d.challenge, color: '#6B5555' },
                    { label: 'Decision', text: d.decision, color: GOLD3 },
                    { label: 'Impact', text: d.impact, color: GOLD },
                  ].map((row) => (
                    <div key={row.label}>
                      <p style={{ fontSize: 9, color: row.color, fontFamily: 'monospace', letterSpacing: '0.16em', marginBottom: 5 }}>
                        {row.label.toUpperCase()}
                      </p>
                      <p className="font-body leading-relaxed" style={{ fontSize: '0.85rem', color: MUTED }}>{row.text}</p>
                    </div>
                  ))}
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
   S9 — BUSINESS MODEL
══════════════════════════════════════════════════════════════════════ */
const BIZ_NODES = [
  { label: 'Campaign Launch', icon: '🚀', sub: 'Prize defined & campaign goes live' },
  { label: 'Ticket Sales', icon: '🎟', sub: 'Users purchase entries at scale' },
  { label: 'Prize Pool', icon: '💰', sub: 'Revenue funds prizes & operations' },
  { label: 'Winner Selected', icon: '🏆', sub: 'Transparent draw selects one winner' },
  { label: 'Platform Growth', icon: '📈', sub: 'Trust builds. Next campaign launches.' },
];

function S9BusinessModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-5 md:px-16 py-24 md:py-32 relative" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${GOLD}06, transparent)`,
      }} />
      <div className="max-w-4xl mx-auto relative">
        <FadeUp>
          <GoldLabel text="Business Model" />
          <h2 className="font-display mb-14 text-center"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            A flywheel of<br /><span style={{ color: GOLD }}>trust and excitement.</span>
          </h2>
        </FadeUp>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {BIZ_NODES.map((node, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-0">
              <motion.div className="flex flex-col items-center gap-3 p-6 rounded-2xl"
                style={{ background: BG3, border: `1px solid ${i === BIZ_NODES.length - 1 ? GOLD + '50' : STROKE}`, minWidth: 130, textAlign: 'center' }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: GOLD + '40' }}>
                <span style={{ fontSize: 26 }}>{node.icon}</span>
                <p className="font-display text-xs" style={{ color: i === BIZ_NODES.length - 1 ? GOLD : TEXT }}>{node.label}</p>
                <p style={{ fontSize: 9, color: MUTED, lineHeight: 1.5 }}>{node.sub}</p>
              </motion.div>

              {i < BIZ_NODES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.35 }}
                  className="flex items-center justify-center w-8 md:w-10 py-3 md:py-0 flex-shrink-0">
                  <span style={{ color: GOLD, opacity: 0.4, fontSize: 12 }}>→</span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   S10 — OUTCOME
══════════════════════════════════════════════════════════════════════ */
const OUTCOMES = [
  { metric: '50k+', label: 'Tickets Sold', title: 'Engaging Purchase Experience', desc: 'In the first campaign alone — driven by a frictionless checkout and compelling prize presentation.', icon: '🎟' },
  { metric: '+44%', label: 'Conversion Rate', title: 'Clear Reward Journey', desc: 'Payment conversion after checkout redesign — the biggest single improvement in the MVP.', icon: '📈' },
  { metric: '6.2m', label: 'Avg. Session', title: 'Trust-Driven Participation', desc: 'Minutes per session — users browse prizes as an aspirational experience, not just a transaction.', icon: '⏱' },
];

function S10Outcome() {
  return (
    <section className="px-5 md:px-16 py-24 md:py-32" style={{ background: BG2 }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <GoldLabel text="Outcome" />
          <h2 className="font-display mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Numbers that<br /><span style={{ color: GOLD }}>tell the story.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OUTCOMES.map((o, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div className="rounded-3xl p-8 h-full flex flex-col gap-5 relative overflow-hidden"
                style={{ background: CARD, border: `1px solid ${STROKE}` }}
                whileHover={{ borderColor: GOLD + '40' }}
                transition={{ duration: 0.3 }}>
                {/* Gold corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{
                  background: `radial-gradient(circle at 100% 0%, ${GOLD}12, transparent 70%)`,
                }} />
                <span style={{ fontSize: 30 }}>{o.icon}</span>
                <div>
                  <p style={{ fontSize: 9, color: GOLD, fontFamily: 'monospace', letterSpacing: '0.18em', marginBottom: 6 }}>{o.label}</p>
                  <p className="font-display" style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', color: GOLD, lineHeight: 1 }}>{o.metric}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2" style={{ color: TEXT }}>{o.title}</h3>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.875rem', color: MUTED }}>{o.desc}</p>
                </div>
                <div className="mt-auto h-px" style={{ background: `linear-gradient(90deg, ${GOLD}30, transparent)` }} />
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
export default function DreamCairoCaseStudy() {
  return (
    <>
      <S1TheExperience />
      <S2HowItWorks />
      <S3Ecosystem />
      <S4Discovery />
      <S5PurchaseExperience />
      <S6BuildingTrust />
      <S7Responsive />
      <S8ProductDecisions />
      <S9BusinessModel />
      <S10Outcome />
    </>
  );
}
