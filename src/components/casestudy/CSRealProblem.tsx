'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

/* ─── Layout constants ──────────────────────────────── */
const VB_W = 640;
const VB_H = 580;
const CX = 320;
const CY = 295;
const R = 210; // orbit radius

function polar(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { cx: Math.round(CX + R * Math.sin(rad)), cy: Math.round(CY - R * Math.cos(rad)) };
}

/* ─── Nodes ─────────────────────────────────────────── */
const ALL_NODES = [
  { id: 'platform', label: 'Platform',   cx: CX, cy: CY, r: 42, stage: 0, isCenter: true },
  { id: 'learners', label: 'Learners',   ...polar(  0), r: 32, stage: 1 },
  { id: 'coaches',  label: 'Coaches',    ...polar( 40), r: 30, stage: 2 },
  { id: 'booking',  label: 'Booking',    ...polar( 80), r: 30, stage: 3 },
  { id: 'wallet',   label: 'Wallet',     ...polar(120), r: 30, stage: 4 },
  { id: 'feed',     label: 'Feed',       ...polar(160), r: 30, stage: 5 },
  { id: 'spaces',   label: 'Spaces',     ...polar(200), r: 30, stage: 5 },
  { id: 'ai',       label: 'AI',         ...polar(240), r: 32, stage: 6 },
  { id: 'live',     label: 'Live',       ...polar(280), r: 30, stage: 7 },
  { id: 'video',    label: 'Video',      ...polar(320), r: 30, stage: 7 },
];

const NODE_MAP = Object.fromEntries(ALL_NODES.map(n => [n.id, n]));

/* ─── Connections ───────────────────────────────────── */
const ALL_CONNECTIONS = [
  { id: 'p-l',    from: 'platform', to: 'learners', stage: 1 },
  { id: 'p-c',    from: 'platform', to: 'coaches',  stage: 2 },
  { id: 'l-c',    from: 'learners', to: 'coaches',  stage: 2 },
  { id: 'p-b',    from: 'platform', to: 'booking',  stage: 3 },
  { id: 'c-b',    from: 'coaches',  to: 'booking',  stage: 3 },
  { id: 'l-b',    from: 'learners', to: 'booking',  stage: 3 },
  { id: 'p-w',    from: 'platform', to: 'wallet',   stage: 4 },
  { id: 'b-w',    from: 'booking',  to: 'wallet',   stage: 4 },
  { id: 'p-f',    from: 'platform', to: 'feed',     stage: 5 },
  { id: 'p-s',    from: 'platform', to: 'spaces',   stage: 5 },
  { id: 'l-f',    from: 'learners', to: 'feed',     stage: 5 },
  { id: 'f-s',    from: 'feed',     to: 'spaces',   stage: 5 },
  { id: 'p-ai',   from: 'platform', to: 'ai',       stage: 6 },
  { id: 'ai-b',   from: 'ai',       to: 'booking',  stage: 6 },
  { id: 'ai-f',   from: 'ai',       to: 'feed',     stage: 6 },
  { id: 'ai-l',   from: 'ai',       to: 'learners', stage: 6 },
  { id: 'p-lv',   from: 'platform', to: 'live',     stage: 7 },
  { id: 'p-v',    from: 'platform', to: 'video',    stage: 7 },
  { id: 'c-lv',   from: 'coaches',  to: 'live',     stage: 7 },
  { id: 'c-v',    from: 'coaches',  to: 'video',    stage: 7 },
  { id: 'lv-s',   from: 'live',     to: 'spaces',   stage: 7 },
  { id: 'ai-w',   from: 'ai',       to: 'wallet',   stage: 8 },
  { id: 'w-f',    from: 'wallet',   to: 'feed',     stage: 8 },
  { id: 'v-l',    from: 'video',    to: 'learners', stage: 8 },
  { id: 'lv-ai',  from: 'live',     to: 'ai',       stage: 8 },
  { id: 'ai-s',   from: 'ai',       to: 'spaces',   stage: 8 },
];

/* ─── Stage narrative ───────────────────────────────── */
const STAGES = [
  { title: 'It starts with learners.',            body: 'Thousands looking for the right coach, at the right time, in the right language. The demand was clear. The experience was not.' },
  { title: 'Then there are coaches.',             body: 'Professional coaches with expertise but no efficient way to reach learners, manage availability, or grow their practice within the platform.' },
  { title: 'Every session starts with a booking.',body: 'Every booking is a negotiation. Time zones, availability windows, session types, pricing — all happening across fragmented, broken flows.' },
  { title: 'Money moves in every direction.',     body: 'Coach payouts, learner credits, refunds, karma tokens. The financial layer touched everything but was designed piecemeal.' },
  { title: 'Content should create retention.',    body: 'A personalised feed and community spaces were meant to keep users engaged. Instead they surfaced noise and drove users away.' },
  { title: 'AI was supposed to connect it all.',  body: 'AI matching existed in isolation, without connecting to the booking, wallet, or feed layers. Smart features. Zero coherence.' },
  { title: 'Live learning happens here.',         body: 'Group sessions and 1:1 video calls — two technical systems that had never been designed as part of the same product experience.' },
  { title: 'The ecosystem. As one.',              body: 'Seven systems. Zero coherence. Each piece designed independently. The ecosystem was the product — but it had never been designed as one.' },
];

/* ─── Node sub-component ────────────────────────────── */
const NodeEl = memo(function NodeEl({
  node, visible, accentColor, isFinal,
}: {
  node: typeof ALL_NODES[0];
  visible: boolean;
  accentColor: string;
  isFinal: boolean;
}) {
  const [hasAppeared, setHasAppeared] = useState(false);
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    if (visible && !hasAppeared) {
      setHasAppeared(true);
      if (!node.isCenter) {
        setShowPing(true);
        const t = setTimeout(() => setShowPing(false), 1600);
        return () => clearTimeout(t);
      }
    }
  }, [visible, hasAppeared, node.isCenter]);

  return (
    <g>
      {/* Ping ring */}
      {showPing && (
        <motion.circle
          cx={node.cx} cy={node.cy}
          fill="none"
          stroke={accentColor}
          strokeWidth={1.5}
          initial={{ r: node.r, opacity: 0.8 }}
          animate={{ r: node.r * 3.2, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      )}
      {/* Outer glow ring */}
      <motion.circle
        cx={node.cx} cy={node.cy}
        fill="none"
        stroke={accentColor}
        strokeWidth={node.isCenter ? 1.5 : 1}
        animate={{
          r: visible ? node.r + (isFinal ? 8 : 5) : 0,
          opacity: visible ? (isFinal ? 0.18 : 0.1) : 0,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Main fill circle */}
      <motion.circle
        cx={node.cx} cy={node.cy}
        fill={node.isCenter ? accentColor + '22' : accentColor + '10'}
        stroke={accentColor}
        strokeWidth={node.isCenter ? 2 : 1.5}
        animate={{
          r: visible ? node.r : 0,
          opacity: visible ? 1 : 0,
          fill: isFinal && node.isCenter ? accentColor + '35' : undefined,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Label */}
      <motion.text
        x={node.cx}
        y={node.cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={node.isCenter ? 13 : 10}
        fontWeight={node.isCenter ? 600 : 400}
        letterSpacing="0.03em"
        style={{ fill: accentColor, fontFamily: 'inherit' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: visible ? 0.28 : 0, duration: 0.35 }}
      >
        {node.label}
      </motion.text>
    </g>
  );
});

/* ─── Line sub-component ────────────────────────────── */
const LineEl = memo(function LineEl({
  conn, visible, accentColor, isFinal,
}: {
  conn: typeof ALL_CONNECTIONS[0];
  visible: boolean;
  accentColor: string;
  isFinal: boolean;
}) {
  // Once drawn, stay in DOM — only opacity changes on backward scroll
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (visible && !hasBeenVisible) setHasBeenVisible(true);
  }, [visible, hasBeenVisible]);

  if (!hasBeenVisible) return null;

  const from = NODE_MAP[conn.from];
  const to = NODE_MAP[conn.to];

  return (
    <motion.line
      x1={from.cx} y1={from.cy}
      x2={to.cx} y2={to.cy}
      stroke={accentColor}
      strokeDasharray={isFinal ? '0' : '4 3'}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        // Hide (opacity 0) when scrolled back before this stage
        opacity: visible ? (isFinal ? 0.45 : 0.18) : 0,
        strokeWidth: isFinal ? 1.5 : 1,
      }}
      transition={{
        pathLength: { duration: 0.85, ease: 'easeOut' },
        opacity: { duration: 0.3 },
        strokeWidth: { duration: 0.3 },
      }}
    />
  );
});

/* ─── Main export ───────────────────────────────────── */
interface CSRealProblemProps {
  accentColor?: string;
  sectionTitle?: string;
}

export default function CSRealProblem({
  accentColor = '#718F6B',
  sectionTitle = 'The Real Problem',
}: CSRealProblemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setStep(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)));
    });
    return unsub;
  }, [scrollYProgress]);

  const currentStage = step + 1;
  const isFinal = currentStage >= 8;
  const data = STAGES[step];

  return (
    <div ref={containerRef} style={{ height: `${STAGES.length * 45}vh`, backgroundColor: '#111111' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex" style={{ backgroundColor: '#111111' }}>

        {/* Ambient radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isFinal ? 1 : 0.4 }}
          transition={{ duration: 1 }}
          style={{
            background: `radial-gradient(ellipse 70% 70% at 65% 50%, ${accentColor}12 0%, transparent 70%)`,
          }}
        />

        {/* ── Left: narrative ── */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 py-12 w-[40%] flex-shrink-0">
          <div className="flex items-center justify-between mb-10">
            <span className="text-[9px] font-body tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>
              03 — {sectionTitle}
            </span>
            <motion.span
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] font-body tabular-nums"
              style={{ color: 'rgba(255,255,255,0.22)' }}
            >
              {String(step + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
            </motion.span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3
                className="font-display leading-[1.07] mb-5"
                style={{ fontSize: 'clamp(1.7rem, 2.8vw, 3.2rem)', color: '#FFFFFF' }}
              >
                {data.title}
              </h3>
              <p className="font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'clamp(0.875rem, 1.1vw, 1.05rem)', maxWidth: '28ch' }}>
                {data.body}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress segments */}
          <div className="flex gap-1.5 mt-12">
            {STAGES.map((_, i) => (
              <motion.div
                key={i}
                className="h-[2px] rounded-full flex-1"
                animate={{
                  backgroundColor:
                    i === step ? accentColor
                    : i < step ? accentColor + '55'
                    : 'rgba(255,255,255,0.08)',
                }}
                transition={{ duration: 0.28 }}
              />
            ))}
          </div>

          {/* Node legend — appears from step 2 */}
          <motion.div
            className="mt-10 space-y-2"
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {ALL_NODES.filter(n => n.stage > 0 && n.stage <= currentStage && !n.isCenter).map(n => (
              <motion.div
                key={n.id}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                <span className="text-[10px] font-body" style={{ color: 'rgba(255,255,255,0.35)' }}>{n.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: ecosystem diagram ── */}
        <div className="relative flex-1 h-full flex items-center justify-center overflow-visible py-8 pr-6">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full h-full"
            style={{ overflow: 'visible' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Subtle orbit ring */}
            <motion.circle
              cx={CX} cy={CY}
              r={R}
              fill="none"
              stroke="white"
              strokeWidth={0.5}
              strokeDasharray="3 8"
              animate={{ opacity: step >= 1 ? 0.06 : 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Connection lines */}
            {ALL_CONNECTIONS.map(conn => (
              <LineEl
                key={conn.id}
                conn={conn}
                visible={conn.stage <= currentStage}
                accentColor={accentColor}
                isFinal={isFinal}
              />
            ))}

            {/* Nodes */}
            {ALL_NODES.map(node => (
              <NodeEl
                key={node.id}
                node={node}
                visible={node.stage <= currentStage || !!node.isCenter}
                accentColor={accentColor}
                isFinal={isFinal}
              />
            ))}
          </svg>
        </div>

      </div>
    </div>
  );
}
