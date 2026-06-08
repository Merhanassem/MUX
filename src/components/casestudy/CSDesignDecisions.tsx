'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ─── Colour tokens ─────────────────────────────────────────────────── */
const C = {
  indigo:  '#4B63F7',
  blue:    '#6B8BF5',
  cyan:    '#22D3EE',
  mint:    '#6EE7B7',
  rose:    '#F472B6',
  bg:      '#F7F5F1',
  bg2:     '#EDE9E3',
  stroke:  '#D4CFC8',
  text:    '#1A1A1A',
  muted:   '#9CA3AF',
};

/* ─── Shared SVG primitives ─────────────────────────────────────────── */
const Node = ({ x, y, r = 20, fill = C.indigo, label = '', sub = '' }: {
  x: number; y: number; r?: number; fill?: string; label?: string; sub?: string;
}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={fill + '18'} stroke={fill} strokeWidth="1.2" />
    {label && <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill={fill} fontFamily="sans-serif" fontWeight="600">{label}</text>}
    {sub && <text x={x} y={y + 18 + r} textAnchor="middle" fontSize="7" fill={C.muted} fontFamily="sans-serif">{sub}</text>}
  </g>
);

const Box = ({ x, y, w, h, fill = C.indigo, label = '', radius = 6 }: {
  x: number; y: number; w: number; h: number; fill?: string; label?: string; radius?: number;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={radius} fill={fill + '12'} stroke={fill} strokeWidth="1" />
    {label && <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize="7.5" fill={fill} fontFamily="sans-serif" fontWeight="500">{label}</text>}
  </g>
);

const Arrow = ({ x1, y1, x2, y2, color = C.indigo }: {
  x1: number; y1: number; x2: number; y2: number; color?: string;
}) => {
  const dx = x2 - x1; const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len; const uy = dy / len;
  const ax = x2 - ux * 6; const ay = y2 - uy * 6;
  return (
    <g>
      <line x1={x1} y1={y1} x2={ax} y2={ay} stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <polygon
        points={`${x2},${y2} ${ax - uy * 3},${ay + ux * 3} ${ax + uy * 3},${ay - ux * 3}`}
        fill={color} fillOpacity="0.7"
      />
    </g>
  );
};

/* ─── Diagram 1: Instant Connections ───────────────────────────────── */
function DiagramInstant() {
  return (
    <svg viewBox="0 0 480 240" width="100%" className="block">
      {/* Flow nodes — vertical chain */}
      {[
        { x: 240, y: 28,  fill: C.indigo, label: 'Learner' },
        { x: 240, y: 80,  fill: C.blue,   label: 'Request' },
        { x: 240, y: 132, fill: C.cyan,   label: 'Availability' },
        { x: 240, y: 184, fill: C.mint,   label: 'Match' },
      ].map((n, i) => (
        <Node key={i} x={n.x} y={n.y} r={18} fill={n.fill} label={n.label} />
      ))}

      {/* Arrows */}
      <Arrow x1={240} y1={46}  x2={240} y2={62} color={C.indigo} />
      <Arrow x1={240} y1={98}  x2={240} y2={114} color={C.blue} />
      <Arrow x1={240} y1={150} x2={240} y2={166} color={C.cyan} />

      {/* Coach pool — right side */}
      <Box x={330} y={70} w={80} h={22} fill={C.blue} label="Coach A" radius={11} />
      <Box x={330} y={98} w={80} h={22} fill={C.blue} label="Coach B" radius={11} />
      <Box x={330} y={126} w={80} h={22} fill={C.blue} label="Coach C" radius={11} />
      <text x={370} y={60} textAnchor="middle" fontSize="6.5" fill={C.muted} fontFamily="sans-serif" letterSpacing="0.08em">AVAILABLE COACHES</text>

      {/* Connecting lines from pool to match */}
      <line x1={330} y1={81} x2={258} y2={155} stroke={C.mint} strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.7" />
      <line x1={330} y1={109} x2={258} y2={172} stroke={C.mint} strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.5" />

      {/* Notification badge */}
      <circle cx={266} cy={75} r={7} fill={C.rose} opacity="0.9" />
      <text x={266} y={78} textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif">!</text>

      {/* Live session output */}
      <Box x={176} y={208} w={128} h={24} fill={C.mint} label="Live Session" radius={12} />
      <Arrow x1={240} y1={202} x2={240} y2={208} color={C.mint} />

      {/* Pulse rings */}
      <circle cx={240} cy={132} r={26} fill="none" stroke={C.cyan} strokeWidth="0.6" strokeOpacity="0.3" />
      <circle cx={240} cy={132} r={32} fill="none" stroke={C.cyan} strokeWidth="0.4" strokeOpacity="0.15" />

      {/* Left label */}
      <text x={60} y={132} textAnchor="middle" fontSize="6.5" fill={C.muted} fontFamily="sans-serif" letterSpacing="0.06em">REAL-TIME</text>
      <text x={60} y={142} textAnchor="middle" fontSize="6.5" fill={C.muted} fontFamily="sans-serif" letterSpacing="0.06em">MATCHING</text>
      <line x1={90} y1={137} x2={160} y2={137} stroke={C.stroke} strokeWidth="0.6" strokeDasharray="3 2" />
    </svg>
  );
}

/* ─── Diagram 2: Language Spaces ───────────────────────────────────── */
function DiagramLanguageSpaces() {
  const spaces = [
    { x: 60,  label: 'Dutch',   color: C.indigo },
    { x: 175, label: 'English', color: C.blue },
    { x: 290, label: 'Arabic',  color: C.cyan },
    { x: 405, label: 'More…',   color: C.mint },
  ];
  const features = ['Learners', 'Coaches', 'Feed', 'Rooms'];
  return (
    <svg viewBox="0 0 480 240" width="100%" className="block">
      {/* Platform root */}
      <Box x={170} y={10} w={140} h={26} fill={C.indigo} label="Platform" radius={8} />

      {/* Branch lines */}
      {spaces.map((s, i) => (
        <g key={i}>
          <line x1={240} y1={36} x2={s.x + 50} y2={68} stroke={C.stroke} strokeWidth="0.8" />
        </g>
      ))}

      {/* Space containers */}
      {spaces.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={68} width={100} height={148} rx={8} fill={s.color + '08'} stroke={s.color} strokeWidth="0.9" />
          <text x={s.x + 50} y={81} textAnchor="middle" fontSize="7.5" fill={s.color} fontFamily="sans-serif" fontWeight="600">{s.label}</text>
          {features.map((f, fi) => (
            <Box key={fi} x={s.x + 8} y={90 + fi * 28} w={84} h={20} fill={s.color} label={f} radius={4} />
          ))}
        </g>
      ))}

      {/* Shared infrastructure */}
      <rect x={20} y={222} width={440} height={14} rx={4} fill={C.indigo + '10'} stroke={C.indigo} strokeWidth="0.7" strokeDasharray="4 3" />
      <text x={240} y={232} textAnchor="middle" fontSize="6.5" fill={C.indigo} fontFamily="sans-serif" letterSpacing="0.08em">SHARED INFRASTRUCTURE</text>
    </svg>
  );
}

/* ─── Diagram 3: Coach Availability Windows ─────────────────────────── */
function DiagramAvailability() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const slots: Record<number, { fill: string; label: string }[]> = {
    0: [{ fill: C.mint, label: '' }, { fill: C.mint, label: '' }],
    1: [{ fill: C.indigo, label: '' }],
    2: [{ fill: C.mint, label: '' }, { fill: C.mint, label: '' }, { fill: C.mint, label: '' }],
    3: [{ fill: C.indigo, label: '' }, { fill: C.mint, label: '' }],
    4: [{ fill: C.mint, label: '' }],
    5: [{ fill: C.cyan, label: '' }],
    6: [{ fill: C.cyan, label: '' }, { fill: C.mint, label: '' }],
  };
  return (
    <svg viewBox="0 0 480 240" width="100%" className="block">
      {/* Calendar grid */}
      {days.map((d, i) => (
        <g key={i}>
          <rect x={18 + i * 64} y={14} width={56} height={18} rx={4} fill={C.indigo + '10'} stroke={C.stroke} strokeWidth="0.7" />
          <text x={18 + i * 64 + 28} y={26} textAnchor="middle" fontSize="6.5" fill={C.indigo} fontFamily="sans-serif" fontWeight="600">{d}</text>
          {(slots[i] || []).map((slot, si) => (
            <rect key={si} x={22 + i * 64} y={40 + si * 28} width={48} height={22} rx={4}
              fill={slot.fill + '20'} stroke={slot.fill} strokeWidth="0.9" />
          ))}
        </g>
      ))}

      {/* Legend */}
      <circle cx={30} cy={148} r={4} fill={C.mint} />
      <text x={38} y={151} fontSize="7" fill={C.muted} fontFamily="sans-serif">Available</text>
      <circle cx={90} cy={148} r={4} fill={C.indigo} />
      <text x={98} y={151} fontSize="7" fill={C.muted} fontFamily="sans-serif">Booked</text>
      <circle cx={150} cy={148} r={4} fill={C.cyan} />
      <text x={158} y={151} fontSize="7" fill={C.muted} fontFamily="sans-serif">Pending</text>

      {/* Flow below */}
      {['Published Slots', 'Learner Discovery', 'Booking', 'Confirmed'].map((step, i) => (
        <g key={i}>
          <Box x={80 + i * 90} y={162} w={74} h={22} fill={i === 3 ? C.mint : C.indigo} label={step} radius={6} />
          {i < 3 && <Arrow x1={154 + i * 90} y1={173} x2={80 + (i + 1) * 90} y2={173} color={C.indigo} />}
        </g>
      ))}

      {/* Rolling window bracket */}
      <line x1={18} y1={208} x2={462} y2={208} stroke={C.indigo} strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="4 3" />
      <text x={240} y={220} textAnchor="middle" fontSize="6.5" fill={C.indigo} fontFamily="sans-serif" letterSpacing="0.08em">2-WEEK ROLLING WINDOW</text>
    </svg>
  );
}

/* ─── Diagram 4: Karma Economy ──────────────────────────────────────── */
function DiagramKarma() {
  return (
    <svg viewBox="0 0 480 240" width="100%" className="block">
      {/* Central wallet */}
      <circle cx={240} cy={120} r={36} fill={C.indigo + '15'} stroke={C.indigo} strokeWidth="1.4" />
      <text x={240} y={116} textAnchor="middle" fontSize="8" fill={C.indigo} fontFamily="sans-serif" fontWeight="700">WALLET</text>
      <text x={240} y={128} textAnchor="middle" fontSize="7" fill={C.indigo} fontFamily="sans-serif">Karma K</text>

      {/* Outer rings */}
      <circle cx={240} cy={120} r={50} fill="none" stroke={C.indigo} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4" />

      {/* Purchase → Wallet */}
      <Box x={60} y={40} w={80} h={24} fill={C.cyan} label="Purchase" radius={12} />
      <Arrow x1={140} y1={52} x2={205} y2={100} color={C.cyan} />
      <text x={158} y={72} fontSize="6.5" fill={C.cyan} fontFamily="sans-serif" fontStyle="italic">+K tokens</text>

      {/* Wallet → AI Sessions */}
      <Box x={340} y={40} w={80} h={24} fill={C.blue} label="AI Sessions" radius={12} />
      <Arrow x1={275} y1={100} x2={340} y2={58} color={C.blue} />
      <text x={323} y={82} fontSize="6.5" fill={C.blue} fontFamily="sans-serif" fontStyle="italic">−K</text>

      {/* Wallet → Coach Bookings */}
      <Box x={340} y={174} w={80} h={24} fill={C.indigo} label="Coach Booking" radius={12} />
      <Arrow x1={275} y1={140} x2={340} y2={182} color={C.indigo} />
      <text x={323} y={166} fontSize="6.5" fill={C.indigo} fontFamily="sans-serif" fontStyle="italic">−K</text>

      {/* Session → Coach Earnings */}
      <Box x={60} y={174} w={80} h={24} fill={C.mint} label="Coach Earnings" radius={12} />
      <Arrow x1={340} y1={192} x2={140} y2={192} color={C.mint} />
      <text x={240} y={205} textAnchor="middle" fontSize="6.5" fill={C.mint} fontFamily="sans-serif" fontStyle="italic">session payout</text>

      {/* Completion loop */}
      <Arrow x1={100} y1={174} x2={205} y2={140} color={C.mint} />
      <text x={138} y={160} fontSize="6.5" fill={C.mint} fontFamily="sans-serif" fontStyle="italic">replenish</text>
    </svg>
  );
}

/* ─── Diagram 5: Dual Role Experience ──────────────────────────────── */
function DiagramDualRole() {
  const learnerItems = ['AI Practice', 'Book Sessions', 'Wallet'];
  const coachItems   = ['Availability', 'Earnings', 'Learners'];
  const shared       = ['Chats', 'Notifications', 'Profile', 'Settings'];
  return (
    <svg viewBox="0 0 480 240" width="100%" className="block">
      {/* User root */}
      <Node x={240} y={22} r={16} fill={C.indigo} label="User" />

      {/* Split lines */}
      <line x1={240} y1={38} x2={130} y2={68} stroke={C.stroke} strokeWidth="1" />
      <line x1={240} y1={38} x2={350} y2={68} stroke={C.stroke} strokeWidth="1" />

      {/* Learner side */}
      <rect x={50} y={68} width={154} height={120} rx={8} fill={C.blue + '08'} stroke={C.blue} strokeWidth="1" />
      <text x={127} y={82} textAnchor="middle" fontSize="8" fill={C.blue} fontFamily="sans-serif" fontWeight="600">Learner</text>
      {learnerItems.map((item, i) => (
        <Box key={i} x={62} y={90 + i * 28} w={130} h={20} fill={C.blue} label={item} radius={5} />
      ))}

      {/* Coach side */}
      <rect x={276} y={68} width={154} height={120} rx={8} fill={C.indigo + '08'} stroke={C.indigo} strokeWidth="1" />
      <text x={353} y={82} textAnchor="middle" fontSize="8" fill={C.indigo} fontFamily="sans-serif" fontWeight="600">Coach</text>
      {coachItems.map((item, i) => (
        <Box key={i} x={288} y={90 + i * 28} w={130} h={20} fill={C.indigo} label={item} radius={5} />
      ))}

      {/* Role switch arrow */}
      <path d="M 204 110 Q 240 96 276 110" fill="none" stroke={C.cyan} strokeWidth="1" strokeDasharray="3 2" />
      <polygon points="276,110 268,106 268,114" fill={C.cyan} fillOpacity="0.8" />
      <text x={240} y={106} textAnchor="middle" fontSize="6" fill={C.cyan} fontFamily="sans-serif">switch</text>

      {/* Shared layer */}
      <rect x={40} y={198} width={400} height={28} rx={6} fill={C.mint + '12'} stroke={C.mint} strokeWidth="0.9" />
      <text x={240} y={207} textAnchor="middle" fontSize="6.5" fill={C.mint} fontFamily="sans-serif" letterSpacing="0.08em" fontWeight="600">SHARED LAYER</text>
      {shared.map((s, i) => (
        <text key={i} x={90 + i * 100} y={220} textAnchor="middle" fontSize="7" fill={C.muted} fontFamily="sans-serif">{s}</text>
      ))}

      {/* Connecting lines to shared */}
      <line x1={127} y1={188} x2={127} y2={198} stroke={C.stroke} strokeWidth="0.7" />
      <line x1={353} y1={188} x2={353} y2={198} stroke={C.stroke} strokeWidth="0.7" />
    </svg>
  );
}

/* ─── Diagram switcher ──────────────────────────────────────────────── */
function DecisionDiagram({ id }: { id: string }) {
  const map: Record<string, React.ReactNode> = {
    'instant':         <DiagramInstant />,
    'language-spaces': <DiagramLanguageSpaces />,
    'availability':    <DiagramAvailability />,
    'karma':           <DiagramKarma />,
    'role-switching':  <DiagramDualRole />,
  };
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ background: '#FAFAF8', border: '1px solid #E8E4DF' }}>
      {map[id] ?? null}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */
interface Decision {
  id: string;
  title: string;
  category: string;
  summary: string;
  rationale: string;
  tradeoffs: string[];
  accentColor?: string;
}

const DEFAULT_DECISIONS: Decision[] = [
  {
    id: 'instant',
    title: 'Instant Connections',
    category: 'Interaction Pattern',
    summary: 'Allow learners to connect with available coaches in real-time, not just through scheduled booking.',
    rationale: 'Research showed 38% of learners wanted a more spontaneous way to access coaching. Instant connections created a new usage mode without replacing scheduled bookings.',
    tradeoffs: ['Required a real-time availability signal from coaches', 'Needed careful UX to avoid creating anxiety for coaches', 'Introduced a new notification pattern to manage'],
  },
  {
    id: 'language-spaces',
    title: 'Language Spaces',
    category: 'Community Architecture',
    summary: 'Organised community spaces by language and proficiency level rather than by topic.',
    rationale: 'Topic-based communities had failed in V1 because users self-selected by interest but ended up in mismatched skill levels. Language + level created natural peer groups.',
    tradeoffs: ['More complex content moderation model', 'Required coaches to opt into specific spaces', 'Reduced content surface area per space initially'],
  },
  {
    id: 'availability',
    title: 'Coach Availability Windows',
    category: 'Scheduling UX',
    summary: 'Coaches define rolling 2-week availability windows instead of setting availability day by day.',
    rationale: 'Day-by-day scheduling created repetitive work for coaches and led to sparse availability calendars. Rolling windows increased visible availability by 3×.',
    tradeoffs: ['Less granular control for coaches with irregular schedules', 'Required exception handling for one-off unavailability'],
  },
  {
    id: 'karma',
    title: 'Karma Economy',
    category: 'Engagement System',
    summary: 'A reward currency tied to real learning behaviour rather than generic engagement metrics.',
    rationale: 'Generic streaks and badges were being gamed. Karma tokens are earned through session completion, feedback submission, and goal achievement — behaviours that correlate with actual learning.',
    tradeoffs: ['More complex backend logic to track qualifying events', 'Required clear communication to avoid user confusion with real currency'],
  },
  {
    id: 'role-switching',
    title: 'Dual Role Experience',
    category: 'User Model',
    summary: 'Some users are both learners and coaches. The platform needed to support seamless role switching.',
    rationale: 'Forcing a single identity created friction for expert users who wanted to teach what they\'d recently learned. Role switching drove a new segment of power users.',
    tradeoffs: ['Significantly more complex navigation model', 'Required two complete sets of home screen context', 'Data model changes to support dual-role accounts'],
  },
];

interface CSDesignDecisionsProps {
  accentColor?: string;
  decisions?: Decision[];
}

export default function CSDesignDecisions({ accentColor = '#718F6B', decisions = DEFAULT_DECISIONS }: CSDesignDecisionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(decisions.length - 1, Math.floor(v * decisions.length));
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress, decisions.length]);

  return (
    <section className="bg-background">
      <div className="px-8 md:px-16 pt-24 pb-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            07 — Design Decisions
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text mb-4 max-w-2xl">
            The decisions that<br />defined the product.
          </h2>
          <p className="font-body text-secondary-text max-w-lg leading-relaxed">
            Every significant design choice had a reason. Here are the five that changed the direction.
          </p>
        </ScrollReveal>
      </div>

      <div
        ref={containerRef}
        style={{ height: `${decisions.length * 50}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-5xl mx-auto px-8 md:px-16 w-full">
            <div className="flex flex-col gap-2">
              {decisions.map((decision, i) => {
                const isActive = i === activeIndex;
                const color = decision.accentColor ?? (i % 2 === 0 ? accentColor : '#F08CA6');

                return (
                  <motion.div
                    key={decision.id}
                    className="rounded-2xl overflow-hidden border"
                    animate={{
                      backgroundColor: isActive ? '#FFFFFF' : '#FAF8F5',
                      borderColor: isActive ? color + '40' : '#E5E0D6',
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 h-[52px]">
                      <div className="flex items-center gap-4">
                        <span
                          className="text-[10px] font-body px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: color + '15', color }}
                        >
                          {decision.category}
                        </span>
                        <span className="font-display text-sm text-primary-text">{decision.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-secondary-text"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-6 pb-6 pt-1 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/40">
                            {/* Left — text */}
                            <div className="pt-5">
                              <p className="font-body text-secondary-text text-sm leading-relaxed mb-5">{decision.summary}</p>
                              <div className="border-t border-border pt-5">
                                <p className="text-[10px] font-body uppercase tracking-widest text-secondary-text mb-3">Rationale</p>
                                <p className="font-body text-primary-text text-sm leading-relaxed">{decision.rationale}</p>
                              </div>
                            </div>
                            {/* Right — diagram + tradeoffs */}
                            <div className="pt-5">
                              <p className="text-[10px] font-body uppercase tracking-widest text-secondary-text mb-3">Trade-offs considered</p>
                              <div className="space-y-2 mb-5">
                                {decision.tradeoffs.map((t, ti) => (
                                  <div key={ti} className="flex items-start gap-2.5">
                                    <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
                                    <p className="font-body text-xs text-secondary-text leading-relaxed">{t}</p>
                                  </div>
                                ))}
                              </div>
                              <DecisionDiagram id={decision.id} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
