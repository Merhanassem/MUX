'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ── Brand tokens ──────────────────────────────────────────────────── */
const A   = '#8B4A4A';   // dusty rose  — customer
const A2  = '#C4896B';   // terracotta  — specialist
const A3  = '#6B8B7A';   // sage        — driver
const A4  = '#7A6B9A';   // lavender    — platform
const BG  = '#F7F5F1';
const BG2 = '#F0EDE8';
const BG3 = '#EDE8E2';
const DARK = '#1A1A1A';
const MUTED = '#9CA3AF';
const STROKE = '#DDD8D0';
const TEXT  = '#1A1A1A';

/* ── Primitives ────────────────────────────────────────────────────── */
function Tag({ label, color = A }: { label: string; color?: string }) {
  return (
    <span
      className="inline-block text-[10px] font-body px-3 py-1.5 rounded-full tracking-[0.14em] uppercase"
      style={{ background: color + '14', color, border: `1px solid ${color}28` }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  const base = light ? 'rgba(247,245,241,0.35)' : MUTED;
  const text = light ? 'rgba(247,245,241,0.55)' : MUTED;
  return (
    <ScrollReveal>
      <div className="flex items-center gap-3 mb-14">
        <span className="font-body text-[10px] tabular-nums" style={{ color: base }}>{n}</span>
        <div className="w-8 h-px" style={{ background: light ? 'rgba(247,245,241,0.15)' : STROKE }} />
        <span className="text-[10px] font-body tracking-[0.2em] uppercase" style={{ color: text }}>{label}</span>
      </div>
    </ScrollReveal>
  );
}

/* ── Phone frame ───────────────────────────────────────────────────── */
function Phone({
  src, alt = 'App screen', accent = A, label,
  scale = 1, shadow,
}: {
  src?: string | null;
  alt?: string;
  accent?: string;
  label?: string;
  scale?: number;
  shadow?: string;
}) {
  const w = 210 * scale;
  // Very thin premium frame — 2px border like real titanium iPhone
  const borderW = Math.max(1.5, w * 0.012); // ~2px at full size, stays thin at small
  const r  = w * 0.188;                      // outer corner radius
  const ri = r - borderW;                    // inner (screen) corner radius

  return (
    <div className="flex flex-col items-center" style={{ gap: label ? 12 : 0 }}>
      {/* ── Thin premium iPhone frame ── */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: w,
          borderRadius: r,
          border: `${borderW}px solid #1c1c1e`,
          /* subtle inner highlight on top edge simulates titanium sheen */
          boxShadow: shadow ?? [
            `inset 0 1px 0 rgba(255,255,255,0.08)`,
            `0 2px 4px rgba(0,0,0,0.12)`,
            `0 12px 32px rgba(0,0,0,0.18)`,
            `0 32px 64px rgba(0,0,0,0.10)`,
          ].join(', '),
          background: '#1c1c1e',
          overflow: 'hidden',
        }}
      >
        {/* Screen — fills the frame, inset only the border width */}
        <div style={{
          aspectRatio: '9 / 19.5',
          borderRadius: ri,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}>
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center"
              style={{ background: `linear-gradient(160deg, ${accent}12 0%, #0a0a0a 100%)` }}>
              <svg width={w * 0.12} height={w * 0.12} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" opacity={0.5}>
                <rect x="3" y="3" width="18" height="18" rx="2.5" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}

          {/* Dynamic island pill, overlaid on screen */}
          <div style={{
            position: 'absolute',
            top: Math.max(5, w * 0.038),
            left: '50%',
            transform: 'translateX(-50%)',
            width: Math.max(24, w * 0.265),
            height: Math.max(5, w * 0.058),
            background: '#000',
            borderRadius: 999,
            zIndex: 10,
          }} />
        </div>
      </div>

      {label && (
        <p className="text-[10px] font-body tracking-wider text-center uppercase" style={{ color: MUTED }}>
          {label}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S1 — PRODUCT OVERVIEW                                              */
/* ═══════════════════════════════════════════════════════════════════ */
function S1Overview() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="01" label="Product Overview" />

        {/* Headline */}
        <ScrollReveal>
          <h2
            className="font-display leading-[1.02] mb-20"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              color: TEXT,
              letterSpacing: '-0.02em',
            }}
          >
            One platform.<br />
            <span style={{ color: A }}>Three</span> distinct experiences.
          </h2>
        </ScrollReveal>

        {/* Ecosystem diagram */}
        <ScrollReveal delay={0.12}>
          <div className="relative w-full overflow-hidden rounded-3xl py-16 px-8" style={{ background: BG2, border: `1px solid ${STROKE}` }}>
            <svg viewBox="0 0 900 440" width="100%" className="block">

              {/* ── Pulse rings behind center ── */}
              <circle cx={450} cy={210} r={110} fill="none" stroke={A4} strokeWidth="0.6" strokeOpacity="0.12" />
              <circle cx={450} cy={210} r={145} fill="none" stroke={A4} strokeWidth="0.4" strokeOpacity="0.07" />
              <circle cx={450} cy={210} r={180} fill="none" stroke={A4} strokeWidth="0.3" strokeOpacity="0.04" />

              {/* ── Center: Relax Platform ── */}
              <rect x={368} y={176} width={164} height={68} rx={16} fill={A4 + '14'} stroke={A4} strokeWidth="1.6" />
              <text x={450} y={204} textAnchor="middle" fontSize="11" fill={A4} fontFamily="sans-serif" fontWeight="800" letterSpacing="0.1em">RELAX</text>
              <text x={450} y={220} textAnchor="middle" fontSize="8.5" fill={A4} fontFamily="sans-serif" opacity="0.6">Platform Core</text>
              <text x={450} y={233} textAnchor="middle" fontSize="7" fill={A4} fontFamily="sans-serif" opacity="0.35">Booking · Payments · Realtime</text>

              {/* ── Customer (top) ── */}
              <rect x={350} y={32} width={200} height={60} rx={12} fill={A + '0C'} stroke={A} strokeWidth="1.2" />
              <text x={450} y={57} textAnchor="middle" fontSize="10.5" fill={A} fontFamily="sans-serif" fontWeight="700">Customer App</text>
              <text x={450} y={72} textAnchor="middle" fontSize="8" fill={MUTED} fontFamily="sans-serif">Browse · Book · Track · Complete</text>
              {/* Arrow down to platform */}
              <line x1={450} y1={92} x2={450} y2={176} stroke={A} strokeWidth="1.2" strokeDasharray="5 4" />
              <polygon points="450,176 445,165 455,165" fill={A} opacity="0.8" />
              <text x={465} y={138} fontSize="7.5" fill={A} fontFamily="sans-serif" opacity="0.6">Booking Request</text>

              {/* ── Specialist (bottom-left) ── */}
              <rect x={80} y={310} width={200} height={60} rx={12} fill={A2 + '0C'} stroke={A2} strokeWidth="1.2" />
              <text x={180} y={335} textAnchor="middle" fontSize="10.5" fill={A2} fontFamily="sans-serif" fontWeight="700">Specialist App</text>
              <text x={180} y={350} textAnchor="middle" fontSize="8" fill={MUTED} fontFamily="sans-serif">Availability · Calendar · Appointments</text>
              {/* Arrow up to platform */}
              <line x1={240} y1={310} x2={395} y2={244} stroke={A2} strokeWidth="1.2" strokeDasharray="5 4" />
              <polygon points="395,244 387,238 392,249" fill={A2} opacity="0.8" />
              <text x={285} y={286} fontSize="7.5" fill={A2} fontFamily="sans-serif" opacity="0.6">Assignment</text>

              {/* ── Driver (bottom-right) ── */}
              <rect x={620} y={310} width={200} height={60} rx={12} fill={A3 + '0C'} stroke={A3} strokeWidth="1.2" />
              <text x={720} y={335} textAnchor="middle" fontSize="10.5" fill={A3} fontFamily="sans-serif" fontWeight="700">Driver App</text>
              <text x={720} y={350} textAnchor="middle" fontSize="8" fill={MUTED} fontFamily="sans-serif">Pickup · Navigate · Deliver · Complete</text>
              {/* Arrow up to platform */}
              <line x1={660} y1={310} x2={505} y2={244} stroke={A3} strokeWidth="1.2" strokeDasharray="5 4" />
              <polygon points="505,244 500,249 505,236" fill={A3} opacity="0.8" />
              <text x={555} y={286} fontSize="7.5" fill={A3} fontFamily="sans-serif" opacity="0.6">Dispatch</text>

              {/* ── Shared service chips at bottom ── */}
              {['Auth & Identity', 'Booking Engine', 'Realtime GPS', 'Payments', 'Notifications'].map((s, i) => (
                <g key={i}>
                  <rect x={72 + i * 156} y={398} width={136} height={16} rx={4} fill={BG} stroke={STROKE} strokeWidth="0.8" />
                  <text x={140 + i * 156} y={410} textAnchor="middle" fontSize="6.5" fill={MUTED} fontFamily="sans-serif">{s}</text>
                </g>
              ))}
              <text x={450} y={393} textAnchor="middle" fontSize="6.5" fill={MUTED} fontFamily="sans-serif" letterSpacing="0.1em" opacity="0.5">SHARED SERVICES LAYER</text>
            </svg>
          </div>
        </ScrollReveal>

        {/* 3-col summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { color: A,  label: 'Customer App',    body: 'Browse services, book treatments, track driver arrival, manage sessions.' },
            { color: A2, label: 'Specialist App',  body: 'Set availability, manage bookings, view appointments, track earnings.' },
            { color: A3, label: 'Driver App',      body: 'Receive assignments, navigate to pickup, deliver specialists, log completion.' },
          ].map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl p-6" style={{ background: BG2, border: `1px solid ${c.color}18` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span className="font-display text-sm" style={{ color: c.color }}>{c.label}</span>
                </div>
                <p className="font-body text-sm text-secondary-text leading-relaxed">{c.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S2 — THE CHALLENGE                                                 */
/* ═══════════════════════════════════════════════════════════════════ */
const CHALLENGES = [
  {
    n: '01', title: 'Booking Friction',
    metric: '68%', unit: 'drop-off',
    body: 'Users abandoned checkout before confirming — too many steps, unclear pricing.',
    color: A,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    n: '02', title: 'Availability Visibility',
    metric: '3×', unit: 'missed sessions',
    body: 'Specialists had no real-time schedule tool. Double-bookings were routine.',
    color: A2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    n: '03', title: 'Service Coordination',
    metric: '40min', unit: 'avg. wait',
    body: 'No structured handoff between booking, specialist dispatch, and driver assignment.',
    color: A3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
  {
    n: '04', title: 'Operational Complexity',
    metric: '3', unit: 'disconnected apps',
    body: 'Three user groups with conflicting needs and no shared operational layer.',
    color: A4,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
];

function S2Challenge() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: BG2, borderTop: `1px solid ${STROKE}` }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="02" label="The Challenge" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <ScrollReveal>
            <h2
              className="font-display leading-[1.04]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: TEXT, letterSpacing: '-0.02em' }}
            >
              Four problems.<br />
              <span style={{ color: A }}>One product</span><br />
              to solve them.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHALLENGES.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.09}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: BG, border: `1px solid ${c.color}22` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: c.color + '12', color: c.color }}
                    >
                      {c.icon}
                    </div>
                    <span
                      className="font-body text-[10px] tracking-widest uppercase"
                      style={{ color: c.color, opacity: 0.5 }}
                    >{c.n}</span>
                  </div>
                  <div className="mb-5">
                    <div
                      className="font-display leading-none mb-1"
                      style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', color: c.color }}
                    >{c.metric}</div>
                    <div className="text-[10px] font-body uppercase tracking-wider" style={{ color: MUTED }}>{c.unit}</div>
                  </div>
                  <h3 className="font-display text-base mb-2" style={{ color: TEXT }}>{c.title}</h3>
                  <p className="font-body text-xs text-secondary-text leading-relaxed mt-auto">{c.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S3 — SYSTEM ARCHITECTURE                                           */
/* ═══════════════════════════════════════════════════════════════════ */
function S3Architecture() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="03" label="System Architecture" light />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <h2
              className="font-display leading-[1.04] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: '#F7F5F1', letterSpacing: '-0.02em' }}
            >
              Three apps.<br />
              <span style={{ color: A }}>One</span> shared core.
            </h2>
            <p className="font-body leading-relaxed max-w-md" style={{ color: 'rgba(247,245,241,0.55)' }}>
              Each app is purpose-built for its user's mental model — but they all connect to the same booking engine, notification layer, GPS infrastructure, and payment system.
            </p>

            {/* Layer legend */}
            <div className="mt-10 space-y-3">
              {[
                { label: 'Customer Layer',   color: A,  sub: 'Discovery, booking, tracking' },
                { label: 'Specialist Layer', color: A2, sub: 'Calendar, assignments, profile' },
                { label: 'Driver Layer',     color: A3, sub: 'Navigation, dispatch, completion' },
                { label: 'Platform Core',    color: A4, sub: 'Booking engine, payments, realtime' },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                  <span className="font-body text-sm" style={{ color: 'rgba(247,245,241,0.8)' }}>{l.label}</span>
                  <span className="font-body text-xs" style={{ color: 'rgba(247,245,241,0.3)' }}>{l.sub}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Architecture SVG */}
          <ScrollReveal delay={0.15}>
            <div
              className="rounded-3xl p-10"
              style={{ background: 'rgba(247,245,241,0.03)', border: '1px solid rgba(247,245,241,0.08)' }}
            >
              <svg viewBox="0 0 480 500" width="100%" className="block">
                {/* Layer backgrounds */}
                <rect x={0} y={0}   width={480} height={88}  rx={12} fill={A  + '08'} />
                <rect x={0} y={100} width={480} height={88}  rx={12} fill={A2 + '08'} />
                <rect x={0} y={200} width={480} height={88}  rx={12} fill={A3 + '08'} />
                <rect x={0} y={300} width={480} height={88}  rx={12} fill={A4 + '10'} />
                <rect x={0} y={400} width={480} height={88}  rx={12} fill={'rgba(247,245,241,0.04)'} />

                {/* Layer labels */}
                {[
                  { y: 30, label: 'CUSTOMER LAYER',   color: A  },
                  { y: 130, label: 'SPECIALIST LAYER', color: A2 },
                  { y: 230, label: 'DRIVER LAYER',     color: A3 },
                  { y: 330, label: 'PLATFORM CORE',    color: A4 },
                  { y: 430, label: 'SHARED SERVICES',  color: MUTED },
                ].map((l, i) => (
                  <text key={i} x={16} y={l.y} fontSize="7" fill={l.color} fontFamily="sans-serif" fontWeight="700" letterSpacing="0.12em" opacity="0.7">{l.label}</text>
                ))}

                {/* Customer layer chips */}
                {['Discover', 'Browse Services', 'Book', 'Confirm', 'Track', 'Complete'].map((s, i) => (
                  <g key={i}>
                    <rect x={16 + i * 75} y={42} width={66} height={34} rx={6} fill={A + '15'} stroke={A} strokeWidth="0.8" />
                    <text x={49 + i * 75} y={60} textAnchor="middle" fontSize="7" fill={A} fontFamily="sans-serif" fontWeight="600">{s}</text>
                    <text x={49 + i * 75} y={70} textAnchor="middle" fontSize="6" fill={MUTED} fontFamily="sans-serif" opacity="0.6">{['iOS','iOS','iOS','iOS','iOS','iOS'][i]}</text>
                  </g>
                ))}

                {/* Specialist layer chips */}
                {['Availability', 'Requests', 'Calendar', 'Appointments', 'Profile', 'Earnings'].map((s, i) => (
                  <g key={i}>
                    <rect x={16 + i * 75} y={142} width={66} height={34} rx={6} fill={A2 + '15'} stroke={A2} strokeWidth="0.8" />
                    <text x={49 + i * 75} y={164} textAnchor="middle" fontSize="7" fill={A2} fontFamily="sans-serif" fontWeight="600">{s}</text>
                  </g>
                ))}

                {/* Driver layer chips */}
                {['Assignment', 'Pickup', 'Navigate', 'Arrival', 'Complete', 'History'].map((s, i) => (
                  <g key={i}>
                    <rect x={16 + i * 75} y={242} width={66} height={34} rx={6} fill={A3 + '15'} stroke={A3} strokeWidth="0.8" />
                    <text x={49 + i * 75} y={264} textAnchor="middle" fontSize="7" fill={A3} fontFamily="sans-serif" fontWeight="600">{s}</text>
                  </g>
                ))}

                {/* Platform core */}
                {['Booking Engine', 'Real-time Sync', 'Notifications', 'GPS & Maps', 'Payments', 'Auth'].map((s, i) => (
                  <g key={i}>
                    <rect x={16 + i * 75} y={342} width={66} height={34} rx={6} fill={A4 + '20'} stroke={A4} strokeWidth="1" />
                    <text x={49 + i * 75} y={363} textAnchor="middle" fontSize="7" fill={A4} fontFamily="sans-serif" fontWeight="600">{s.split(' ')[0]}</text>
                    <text x={49 + i * 75} y={373} textAnchor="middle" fontSize="6" fill={A4} fontFamily="sans-serif" opacity="0.5">{s.split(' ').slice(1).join(' ')}</text>
                  </g>
                ))}

                {/* Shared services */}
                {['Database', 'CDN', 'Analytics', 'Admin Panel', 'API Gateway', 'Monitoring'].map((s, i) => (
                  <g key={i}>
                    <rect x={16 + i * 75} y={442} width={66} height={34} rx={6} fill={'rgba(247,245,241,0.06)'} stroke={'rgba(247,245,241,0.1)'} strokeWidth="0.8" />
                    <text x={49 + i * 75} y={463} textAnchor="middle" fontSize="6.5" fill={MUTED} fontFamily="sans-serif" opacity="0.6">{s}</text>
                  </g>
                ))}

                {/* Vertical connectors between layers */}
                {[88, 188, 288, 388].map((y, i) => (
                  <line key={i} x1={240} y1={y} x2={240} y2={y + 12} stroke={'rgba(247,245,241,0.08)'} strokeWidth="1" />
                ))}
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S4 — CUSTOMER EXPERIENCE                                           */
/* ═══════════════════════════════════════════════════════════════════ */
const CUSTOMER_STEPS = [
  { label: 'Discover',  sub: 'Browse services' },
  { label: 'Browse',    sub: 'Filter & compare' },
  { label: 'Book',      sub: 'Select time slot' },
  { label: 'Confirm',   sub: 'Review & pay' },
  { label: 'Track',     sub: 'Live driver map' },
  { label: 'Complete',  sub: 'Rate & rebook' },
];

const CUSTOMER_SCREENS: { src: string | null; label: string }[] = [
  { src: '/relax-customer-home.png',         label: 'Home · Discovery' },
  { src: '/relax-customer-detail.png',       label: 'Service Listing' },
  { src: '/relax-customer-booking.png',      label: 'Booking Flow' },
  { src: '/relax-customer-checkout.png',     label: 'Checkout' },
  { src: '/relax-customer-confirmation.png', label: 'Confirmation' },
  { src: '/relax-customer-tracking.png',     label: 'Live Tracking' },
];

/* S4 size tokens */
/* S4 size tokens — tuned to fit header + timeline + showcase + thumbs in 100vh */
/* S4 carousel — phones at a good reading size, active one lifts */
const S4_SCALE  = 0.85;
const S4_PHONE_W = 210 * S4_SCALE;   // 178.5 px
const S4_GAP     = 24;
const S4_STRIDE  = S4_PHONE_W + S4_GAP;

function S4Customer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [carouselW,  setCarouselW]  = useState(900);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveStep(Math.min(5, Math.floor(v * 6)));
  });

  useEffect(() => {
    const measure = () => { if (carouselRef.current) setCarouselW(carouselRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Shift so the active phone is always horizontally centred
  const trackX = carouselW / 2 - (activeStep * S4_STRIDE + S4_PHONE_W / 2);

  return (
    <div ref={containerRef} style={{ height: '330vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: BG,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">

          <SectionLabel n="04" label="Customer Experience" />

          {/* Title + tag */}
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display leading-[1.04]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', color: TEXT, letterSpacing: '-0.02em' }}>
              From discovery<br />to <span style={{ color: A }}>doorstep.</span>
            </h2>
            <Tag label="Customer App" color={A} />
          </div>

          {/* Timeline */}
          <div className="relative mb-8">
            <div className="absolute top-7 left-[4%] right-[4%] h-px" style={{ background: STROKE }} />
            <motion.div className="absolute top-7 left-[4%] h-px origin-left" style={{ background: A }}
              animate={{ width: activeStep === 0 ? '0%' : `${(activeStep / 5) * 92}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />
            <div className="grid grid-cols-6">
              {CUSTOMER_STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <motion.div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
                    animate={{
                      background: i <= activeStep ? A : BG2,
                      boxShadow: i === activeStep ? `0 8px 24px ${A}40` : 'none',
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ border: `1.5px solid ${STROKE}` }}
                  >
                    <motion.span className="font-display text-sm"
                      animate={{ color: i <= activeStep ? 'white' : MUTED }}>
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                  </motion.div>
                  <div>
                    <motion.p className="font-display text-sm"
                      animate={{ color: i === activeStep ? A : i < activeStep ? TEXT : MUTED }}>
                      {step.label}
                    </motion.p>
                    <motion.p className="font-body text-[10px] mt-0.5"
                      animate={{ opacity: i === activeStep ? 1 : 0.4 }} style={{ color: MUTED }}>
                      {step.sub}
                    </motion.p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal carousel — mask fades edges, track slides to centre active phone */}
          <div ref={carouselRef} style={{
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage:        'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}>
            {/* paddingTop gives headroom for the active phone's -12px lift without clipping */}
            <motion.div className="flex items-end" style={{ gap: S4_GAP, paddingTop: 24, paddingBottom: 16 }}
              animate={{ x: trackX }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              {CUSTOMER_SCREENS.map((s, i) => {
                const isActive = i === activeStep;
                const dist     = Math.abs(i - activeStep);
                return (
                  <motion.div key={i}
                    animate={{
                      y:       isActive ? -12 : Math.min(dist * 6, 18),
                      opacity: isActive ? 1   : Math.max(0.22, 1 - dist * 0.2),
                      filter:  isActive ? 'blur(0px)' : `blur(${Math.min(dist, 2) * 0.7}px)`,
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ flexShrink: 0 }}>
                    <Phone src={s.src} label={s.label} accent={A} scale={S4_SCALE} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S5 — SPECIALIST EXPERIENCE                                         */
/* ═══════════════════════════════════════════════════════════════════ */
const SPECIALIST_WORKFLOW = [
  { label: 'Set Availability',  icon: '🗓', desc: 'Mark open slots' },
  { label: 'Receive Request',   icon: '🔔', desc: 'Booking notification' },
  { label: 'Accept / Decline',  icon: '✓',  desc: 'Confirm or pass' },
  { label: 'View Calendar',     icon: '📅', desc: 'Full week view' },
  { label: 'Manage Profile',    icon: '👤', desc: 'Bio & services' },
];

const SPECIALIST_SCREENS = [
  { src: '/relax-specialist-home.png',    label: 'Home Dashboard' },
  { src: '/relax-specialist-calendar.png', label: 'Calendar View' },
  { src: '/relax-specialist-active.png',  label: 'Active Appointment' },
  { src: '/relax-specialist-chats.png',   label: 'Chats' },
  { src: '/relax-specialist-stock.png',   label: 'Stock & Services' },
];

function S5Specialist() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: '#F5EDE8' }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="05" label="Specialist Experience" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24 items-center">
          <ScrollReveal>
            <h2
              className="font-display leading-[1.04] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: TEXT, letterSpacing: '-0.02em' }}
            >
              Designed for<br />
              the <span style={{ color: A2 }}>expert.</span>
            </h2>
            <p className="font-body text-secondary-text leading-relaxed max-w-md mb-10">
              Specialists needed clarity: who's coming, when, and how to manage their schedule without calling anyone. We built a complete practice management tool.
            </p>

            {/* Workflow list */}
            <div className="space-y-3">
              {SPECIALIST_WORKFLOW.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: A2 + (i === 0 ? '22' : '0E'), border: `1px solid ${A2}${i === 0 ? '40' : '18'}` }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium" style={{ color: TEXT }}>{step.label}</p>
                    <p className="font-body text-xs" style={{ color: MUTED }}>{step.desc}</p>
                  </div>
                  {i < SPECIALIST_WORKFLOW.length - 1 && (
                    <div className="ml-auto w-5 flex-shrink-0">
                      <svg width="20" height="12" viewBox="0 0 20 12">
                        <path d="M0 6h16M12 2l4 4-4 4" stroke={A2} strokeWidth="1" fill="none" strokeOpacity="0.4" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Workflow SVG diagram */}
          <ScrollReveal delay={0.1}>
            <div
              className="rounded-3xl p-8"
              style={{ background: BG, border: `1px solid ${A2}18` }}
            >
              {/* viewBox sized to keep all nodes fully inside */}
              <svg viewBox="0 0 420 320" width="100%" className="block">
                {/* Central hub */}
                <circle cx={210} cy={160} r={56} fill={A2 + '14'} stroke={A2} strokeWidth="1.5" />
                <text x={210} y={155} textAnchor="middle" fontSize="9.5" fill={A2} fontFamily="sans-serif" fontWeight="800" letterSpacing="0.06em">SPECIALIST</text>
                <text x={210} y={170} textAnchor="middle" fontSize="7.5" fill={A2} fontFamily="sans-serif" opacity="0.55">WORKFLOW</text>

                {/* 5 spoke nodes — label centered inside each circle */}
                {[
                  { angle: -90, label: 'Availability' },
                  { angle: -18, label: 'Requests'     },
                  { angle:  54, label: 'Calendar'     },
                  { angle: 126, label: 'Appointments' },
                  { angle: 198, label: 'Profile'      },
                ].map((s, i) => {
                  const rad   = (s.angle * Math.PI) / 180;
                  // hub edge → node line
                  const lx1   = 210 + 56  * Math.cos(rad);
                  const ly1   = 160 + 56  * Math.sin(rad);
                  // node center at radius 120
                  const ncx   = 210 + 120 * Math.cos(rad);
                  const ncy   = 160 + 120 * Math.sin(rad);
                  // line stops 28px before node center
                  const lx2   = 210 + 92  * Math.cos(rad);
                  const ly2   = 160 + 92  * Math.sin(rad);
                  return (
                    <g key={i}>
                      {/* dashed spoke line */}
                      <line x1={lx1} y1={ly1} x2={lx2} y2={ly2}
                        stroke={A2} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
                      {/* node circle */}
                      <circle cx={ncx} cy={ncy} r={28}
                        fill={A2 + '12'} stroke={A2} strokeWidth="1" />
                      {/* label centered inside node */}
                      <text x={ncx} y={ncy + 3}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="7" fill={A2} fontFamily="sans-serif" fontWeight="700"
                      >{s.label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </ScrollReveal>
        </div>

        {/* Screen gallery — staggered */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center pb-8">
          {SPECIALIST_SCREENS.map((s, i) => {
            const offsets = [-12, 20, -8, 16, -20];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div style={{ transform: `translateY(${offsets[i]}px)` }}>
                  <Phone src={s.src} label={s.label} accent={A2} scale={0.88} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S6 — DRIVER EXPERIENCE                                             */
/* ═══════════════════════════════════════════════════════════════════ */
const DRIVER_FLOW = [
  { label: 'Assignment',  sub: 'New job alert',       n: '01' },
  { label: 'Pickup',      sub: 'Navigate to specialist', n: '02' },
  { label: 'Navigation',  sub: 'En route to customer', n: '03' },
  { label: 'Arrival',     sub: 'Reached destination', n: '04' },
  { label: 'Completion',  sub: 'Log & confirm done',  n: '05' },
];

const DRIVER_SCREENS = [
  { src: '/relax-driver-home.png',     label: 'Home · Start Trip' },
  { src: '/relax-driver-upcoming.png', label: 'Upcoming Jobs' },
  { src: '/relax-driver-calendar.png', label: 'Calendar View' },
  { src: '/relax-driver-maps.png',     label: 'Navigation' },
  { src: '/relax-driver-feedback.png', label: 'Feedback' },
];

function S6Driver() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="06" label="Driver Experience" />

        {/* Top: headline + hero phone */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16 mb-24 items-end">
          <ScrollReveal>
            <h2
              className="font-display leading-[1.04] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.8rem)', color: TEXT, letterSpacing: '-0.02em' }}
            >
              Last mile,<br />
              <span style={{ color: A3 }}>first</span> priority.
            </h2>
            <p className="font-body text-secondary-text leading-relaxed max-w-md mb-12">
              Drivers are the operational backbone of Relax. We built a minimal, GPS-integrated app focused on one thing: getting to the right place at the right time.
            </p>

            {/* Horizontal flow */}
            <div className="relative">
              <div
                className="hidden md:block absolute top-[22px] left-[20px] right-[20px] h-px"
                style={{ background: `linear-gradient(to right, ${A3}50, ${A3}20)` }}
              />
              <div className="grid grid-cols-5 gap-2">
                {DRIVER_FLOW.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div
                      className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center text-xs font-display flex-shrink-0"
                      style={{
                        background: i === 0 ? A3 : BG2,
                        border: `1.5px solid ${i === 0 ? A3 : STROKE}`,
                        color: i === 0 ? 'white' : MUTED,
                        boxShadow: i === 0 ? `0 6px 18px ${A3}40` : 'none',
                      }}
                    >{step.n}</div>
                    <div>
                      <p className="font-display text-xs" style={{ color: i === 0 ? A3 : TEXT }}>{step.label}</p>
                      <p className="font-body text-[9px] mt-0.5 leading-tight" style={{ color: MUTED }}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Phone src={null} alt="Driver app main" accent={A3} label="Driver Home" scale={1.1} />
          </ScrollReveal>
        </div>

        {/* Bottom: secondary screens strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center pb-4">
          {DRIVER_SCREENS.map((s, i) => {
            const offsets = [12, -18, 18, -12];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div style={{ transform: `translateY(${offsets[i]}px)` }}>
                  <Phone src={s.src} label={s.label} accent={A3} scale={0.9} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S7 — KEY PRODUCT DECISIONS                                         */
/* ═══════════════════════════════════════════════════════════════════ */
const DECISIONS = [
  {
    n: '01', topic: 'Availability Management', color: A,
    problem: 'Specialists managed schedules via DM — double bookings were constant.',
    decision: 'Built a rolling 2-week availability grid with real-time slot locking.',
    impact: 'Double bookings → zero. Calendar fill rate +3×.',
  },
  {
    n: '02', topic: 'Booking Confidence', color: A2,
    problem: 'Users abandoned checkout because pricing and cancellation were unclear.',
    decision: 'Full pricing breakdown and cancellation policy surfaced before payment.',
    impact: 'Booking completion rate: 32% → 74%.',
  },
  {
    n: '03', topic: 'Provider Operations', color: A3,
    problem: 'Specialists had no visibility across upcoming appointments.',
    decision: 'Daily/weekly digest view with appointment status indicators.',
    impact: 'No-show rate −58%. Specialist satisfaction 4.6/5.',
  },
  {
    n: '04', topic: 'Service Fulfillment', color: A4,
    problem: 'Customers had zero visibility into driver status between booking and arrival.',
    decision: 'Real-time GPS tracking with ETA and push notification milestones.',
    impact: 'Support tickets about driver status −71%.',
  },
];

function S7Decisions() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: BG3 }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="07" label="Key Product Decisions" />
        <ScrollReveal>
          <h2
            className="font-display leading-[1.04] mb-16 max-w-2xl"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: TEXT, letterSpacing: '-0.02em' }}
          >
            Four decisions<br />that <span style={{ color: A }}>shaped</span> the product.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DECISIONS.map((d, i) => (
            <ScrollReveal key={i} delay={i * 0.09}>
              <div
                className="rounded-2xl p-8 h-full relative overflow-hidden"
                style={{ background: BG, border: `1px solid ${d.color}1A` }}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: `linear-gradient(to right, ${d.color}, ${d.color}40)` }}
                />

                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-[10px] font-body tracking-widest uppercase"
                    style={{ color: d.color, opacity: 0.55 }}
                  >{d.n}</span>
                  <span className="font-display text-sm" style={{ color: d.color }}>{d.topic}</span>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Problem',  text: d.problem },
                    { label: 'Decision', text: d.decision },
                    { label: 'Impact',   text: d.impact },
                  ].map((row, ri) => (
                    <div key={ri} className="grid grid-cols-[76px_1fr] gap-4 items-start">
                      <span
                        className="text-[9px] font-body uppercase tracking-widest pt-0.5 flex-shrink-0"
                        style={{ color: d.color, opacity: 0.6 }}
                      >{row.label}</span>
                      <p className="font-body text-sm text-secondary-text leading-relaxed">{row.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S8 — DESIGN SYSTEM                                                 */
/* ═══════════════════════════════════════════════════════════════════ */
const PALETTE = [
  { name: 'Dusty Rose',   hex: '#8B4A4A', role: 'Customer · Primary' },
  { name: 'Terracotta',   hex: '#C4896B', role: 'Specialist · Secondary' },
  { name: 'Sage',         hex: '#6B8B7A', role: 'Driver · Tertiary' },
  { name: 'Lavender',     hex: '#7A6B9A', role: 'Platform · Accent' },
  { name: 'Cream',        hex: '#F7F5F1', role: 'Background' },
  { name: 'Ink',          hex: '#1A1A1A', role: 'Text · Primary' },
  { name: 'Warm Gray',    hex: '#9CA3AF', role: 'Text · Muted' },
  { name: 'Soft Border',  hex: '#DDD8D0', role: 'Dividers · Borders' },
];

function S8DesignSystem() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="08" label="Design System" />

        <ScrollReveal>
          <h2
            className="font-display leading-[1.04] mb-20 max-w-2xl"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: TEXT, letterSpacing: '-0.02em' }}
          >
            Built to scale<br />across <span style={{ color: A }}>three</span> apps.
          </h2>
        </ScrollReveal>

        {/* Colour palette */}
        <ScrollReveal>
          <p className="text-[10px] font-body tracking-[0.2em] uppercase mb-8" style={{ color: MUTED }}>Colour Palette</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-24">
            {PALETTE.map((c) => (
              <div key={c.hex} className="flex flex-col gap-2">
                <div
                  className="w-full aspect-square rounded-2xl shadow-sm"
                  style={{ background: c.hex, border: '1px solid rgba(0,0,0,0.06)' }}
                />
                <p className="text-[10px] font-display" style={{ color: TEXT }}>{c.name}</p>
                <p className="text-[9px] font-body leading-tight" style={{ color: MUTED }}>{c.role}</p>
                <p className="text-[9px] font-body" style={{ color: c.hex, opacity: 0.7 }}>{c.hex}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Typography */}
        <ScrollReveal>
          <p className="text-[10px] font-body tracking-[0.2em] uppercase mb-8" style={{ color: MUTED }}>Typography Scale</p>
          <div
            className="space-y-6 mb-24 pl-8 border-l-2"
            style={{ borderColor: A + '22' }}
          >
            {[
              { size: 'clamp(3rem,5vw,5rem)', weight: '700', label: 'Display / 80px', text: 'Relax' },
              { size: 'clamp(2rem,3.5vw,3rem)', weight: '700', label: 'Heading / 48px', text: 'Book a session' },
              { size: '1.25rem', weight: '600', label: 'Subheading / 20px', text: 'Swedish Massage · 60 min' },
              { size: '0.9rem', weight: '400', label: 'Body / 14px', text: 'Your specialist will arrive within 30 minutes of the confirmed booking time.' },
              { size: '0.75rem', weight: '400', label: 'Caption / 12px', text: '★ 4.9 · 136 reviews · Dubai Marina' },
            ].map((t, i) => (
              <div key={i} className="flex items-baseline gap-8 flex-wrap">
                <span
                  className="font-body flex-shrink-0"
                  style={{ fontSize: '9px', color: MUTED, width: '7rem', letterSpacing: '0.06em' }}
                >{t.label}</span>
                <span
                  className="font-display"
                  style={{ fontSize: t.size, fontWeight: t.weight, color: TEXT, lineHeight: 1.1 }}
                >{t.text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Components */}
        <ScrollReveal>
          <p className="text-[10px] font-body tracking-[0.2em] uppercase mb-8" style={{ color: MUTED }}>UI Components</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Buttons */}
            <div className="rounded-2xl p-6" style={{ background: BG2, border: `1px solid ${STROKE}` }}>
              <p className="text-[10px] font-body tracking-widest uppercase mb-5" style={{ color: MUTED }}>Buttons</p>
              <div className="space-y-3">
                <button className="w-full py-3 rounded-full font-body text-sm font-medium text-white" style={{ background: A }}>Book Now</button>
                <button className="w-full py-3 rounded-full font-body text-sm border" style={{ borderColor: A, color: A }}>View Details</button>
                <button className="w-full py-3 rounded-full font-body text-sm" style={{ background: BG, color: MUTED, border: `1px solid ${STROKE}` }}>Cancel</button>
                <button className="w-full py-3 rounded-full font-body text-sm font-medium text-white" style={{ background: A3 }}>Accept Job</button>
              </div>
            </div>

            {/* Inputs */}
            <div className="rounded-2xl p-6" style={{ background: BG2, border: `1px solid ${STROKE}` }}>
              <p className="text-[10px] font-body tracking-widest uppercase mb-5" style={{ color: MUTED }}>Inputs</p>
              <div className="space-y-3">
                <div className="rounded-xl px-4 py-3" style={{ background: BG, border: `1px solid ${STROKE}` }}>
                  <p className="text-[9px] mb-1" style={{ color: MUTED }}>Location</p>
                  <p className="text-sm font-body" style={{ color: TEXT }}>Dubai Marina, UAE</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ background: BG, border: `1.5px solid ${A}` }}>
                  <p className="text-[9px] mb-1" style={{ color: A }}>Date & Time</p>
                  <p className="text-sm font-body" style={{ color: TEXT }}>Sat, 14 Jun · 11:00 AM</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ background: '#FFF3F3', border: `1px solid #FFBBBB` }}>
                  <p className="text-[9px] mb-1" style={{ color: '#E05050' }}>Error</p>
                  <p className="text-sm font-body" style={{ color: '#E05050' }}>Please select a time slot</p>
                </div>
              </div>
            </div>

            {/* Service card */}
            <div className="rounded-2xl p-6" style={{ background: BG2, border: `1px solid ${STROKE}` }}>
              <p className="text-[10px] font-body tracking-widest uppercase mb-5" style={{ color: MUTED }}>Service Card</p>
              <div className="rounded-2xl overflow-hidden" style={{ background: BG, border: `1px solid ${STROKE}` }}>
                <div className="h-24 flex items-center justify-center" style={{ background: A + '10' }}>
                  <span className="text-3xl">💆‍♀️</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-display text-sm">Swedish Massage</p>
                    <p className="font-body text-sm font-semibold" style={{ color: A }}>SAR 250</p>
                  </div>
                  <p className="text-xs mb-3" style={{ color: MUTED }}>60 min · Full body relaxation</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs" style={{ color: '#F5A623' }}>★</span>
                    <span className="text-xs font-body">4.9</span>
                    <span className="text-xs ml-1" style={{ color: MUTED }}>· 136 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-2xl p-6" style={{ background: BG2, border: `1px solid ${STROKE}` }}>
              <p className="text-[10px] font-body tracking-widest uppercase mb-5" style={{ color: MUTED }}>Navigation</p>
              {/* Bottom nav mock */}
              <div className="rounded-2xl overflow-hidden" style={{ background: BG, border: `1px solid ${STROKE}` }}>
                <div className="h-32 flex items-center justify-center" style={{ background: BG2 }}>
                  <p className="text-[10px]" style={{ color: MUTED }}>App screen</p>
                </div>
                <div className="flex items-center justify-around py-4 px-2" style={{ borderTop: `1px solid ${STROKE}` }}>
                  {['Home', 'Explore', 'Bookings', 'Profile'].map((nav, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-md" style={{ background: i === 0 ? A + '20' : STROKE + '60' }} />
                      <span className="text-[8px] font-body" style={{ color: i === 0 ? A : MUTED }}>{nav}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S9 — END-TO-END TIMELINE                                           */
/* ═══════════════════════════════════════════════════════════════════ */
const TIMELINE_STEPS = [
  { label: 'Discover', sub: 'Browse services',        icon: '🔍', color: A,   who: 'Customer' },
  { label: 'Book',     sub: 'Select, confirm & pay',  icon: '📅', color: A2,  who: 'Customer' },
  { label: 'Assign',   sub: 'Driver & specialist set', icon: '👤', color: A3,  who: 'Platform' },
  { label: 'Deliver',  sub: 'Specialist en route',    icon: '🚗', color: A4,  who: 'Driver' },
  { label: 'Complete', sub: 'Session performed',      icon: '✓',  color: A,   who: 'Specialist' },
  { label: 'Review',   sub: 'Rate & rebook',          icon: '⭐', color: A2,  who: 'Customer' },
];

function S9Timeline() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36 overflow-hidden" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="09" label="End-to-End Experience" light />

        <ScrollReveal>
          <h2
            className="font-display leading-[1.04] mb-24"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.8rem)', color: '#F7F5F1', letterSpacing: '-0.02em' }}
          >
            The full arc,<br />
            in <span style={{ color: A }}>six steps.</span>
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient connector line */}
          <div
            className="hidden md:block absolute top-[40px] left-[6.5%] right-[6.5%] h-[1px]"
            style={{ background: `linear-gradient(to right, ${A}, ${A2}, ${A3}, ${A4}, ${A}, ${A2})` }}
          />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {TIMELINE_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.09}>
                <div className="flex flex-col items-center text-center gap-5">
                  {/* Icon tile */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1"
                    style={{
                      background: step.color + '18',
                      border: `1.5px solid ${step.color}45`,
                      boxShadow: `0 0 32px ${step.color}18`,
                    }}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-[8px] font-body tracking-wider" style={{ color: step.color, opacity: 0.7 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <p className="font-display text-base mb-1" style={{ color: '#F7F5F1' }}>{step.label}</p>
                    <p className="font-body text-xs mb-2" style={{ color: 'rgba(247,245,241,0.4)' }}>{step.sub}</p>
                    <span
                      className="inline-block text-[9px] font-body px-2 py-1 rounded-full tracking-wider uppercase"
                      style={{ background: step.color + '18', color: step.color, border: `1px solid ${step.color}30` }}
                    >{step.who}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Divider + supporting note */}
        <ScrollReveal delay={0.3}>
          <div
            className="mt-24 pt-12 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ borderColor: 'rgba(247,245,241,0.08)' }}
          >
            <p className="font-body text-sm max-w-lg" style={{ color: 'rgba(247,245,241,0.4)' }}>
              Every step is orchestrated in real-time across all three apps — customer, specialist, and driver — with no manual coordination required.
            </p>
            <div className="flex gap-3">
              {[{ c: A, l: 'Customer' }, { c: A2, l: 'Specialist' }, { c: A3, l: 'Driver' }].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: t.c }} />
                  <span className="font-body text-xs" style={{ color: 'rgba(247,245,241,0.45)' }}>{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* S10 — OUTCOME                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
const OUTCOMES = [
  {
    stat: '3',     unit: 'Apps',
    label: 'Multi-user Design',
    body: 'Three distinct experiences — customer, specialist, driver — sharing one coherent system.',
    color: A,
  },
  {
    stat: '+62%',  unit: '',
    label: 'Operational Efficiency',
    body: 'Booking-to-completion flow reduced from 9 steps to 4. Ops team handling time cut in half.',
    color: A2,
  },
  {
    stat: '4.8',   unit: '/5',
    label: 'Service Accessibility',
    body: 'At-home wellness made frictionless. Tier-2 cities accounted for 38% of early bookings.',
    color: A3,
  },
  {
    stat: '∞',     unit: '',
    label: 'Scalable Foundation',
    body: 'Design system supports new service verticals — hair, nail, beauty — with zero structural changes.',
    color: A4,
  },
];

function S10Outcome() {
  return (
    <section className="px-8 md:px-16 py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel n="10" label="Outcome" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16 items-end">
          <ScrollReveal>
            <h2
              className="font-display leading-[1.04]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: TEXT, letterSpacing: '-0.02em' }}
            >
              A wellness platform<br />
              <span style={{ color: A }}>built to last.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-secondary-text leading-relaxed max-w-xl">
              Relax launched as a complete ecosystem — three apps, one design language, zero operational gaps. Designing for multiple user groups simultaneously taught me to hold complexity lightly.
            </p>
          </ScrollReveal>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden"
          style={{ background: STROKE, border: `1px solid ${STROKE}` }}
        >
          {OUTCOMES.map((o, i) => (
            <ScrollReveal key={i} delay={i * 0.09}>
              <div className="p-10 h-full flex flex-col" style={{ background: BG }}>
                <div className="mb-6">
                  <span
                    className="font-display leading-none"
                    style={{ fontSize: 'clamp(2.8rem,4vw,3.6rem)', color: o.color }}
                  >{o.stat}</span>
                  {o.unit && (
                    <span className="font-display text-xl ml-1" style={{ color: o.color }}>{o.unit}</span>
                  )}
                </div>
                <div className="w-8 h-[2px] mb-5 rounded-full" style={{ background: o.color }} />
                <h3 className="font-display text-base mb-3" style={{ color: TEXT }}>{o.label}</h3>
                <p className="font-body text-xs text-secondary-text leading-relaxed mt-auto">{o.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* ROOT                                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export default function RelaxCaseStudy() {
  return (
    <>
      <S1Overview />
      <S2Challenge />
      <S3Architecture />
      <S4Customer />
      <S5Specialist />
      <S6Driver />
      <S7Decisions />
      <S8DesignSystem />
      <S9Timeline />
      <S10Outcome />
    </>
  );
}
