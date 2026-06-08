'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';

interface EcoNode {
  id: string;
  label: string;
  x: number; // % of container width
  y: number; // % of container height
  purpose: string;
  challenge: string;
  solution: string;
  connections: string[];
}

const DEFAULT_NODES: EcoNode[] = [
  { id: 'booking',    label: 'Booking',          x: 50, y: 12, purpose: 'Enable learners to book sessions with coaches seamlessly.', challenge: 'Time zone conflicts, availability mismatches, complex session types.', solution: 'A smart booking flow with real-time availability, conflict detection, and one-tap rescheduling.', connections: ['wallet', 'coach', 'notifications'] },
  { id: 'wallet',     label: 'Wallet',            x: 78, y: 30, purpose: 'Manage all financial flows: credits, payouts, and tokens.', challenge: 'Multiple currency types, refund complexity, coach payout timing.', solution: 'A unified wallet UI with clear transaction history and instant payout controls for coaches.', connections: ['booking', 'gamification'] },
  { id: 'feed',       label: 'Feed',              x: 82, y: 58, purpose: 'Surface relevant content and coaches to keep learners engaged.', challenge: 'Irrelevant recommendations eroding trust and reducing return visits.', solution: 'Personalised feed driven by language level, learning history, and coach affinity signals.', connections: ['ai', 'learner'] },
  { id: 'ai',         label: 'AI',                x: 62, y: 80, purpose: 'Intelligent matching and recommendation across the platform.', challenge: 'AI features existed in isolation with no shared data layer.', solution: 'A centralised AI layer feeding booking suggestions, feed curation, and progress insights.', connections: ['feed', 'booking', 'learner'] },
  { id: 'notifications', label: 'Notifications', x: 35, y: 80, purpose: 'Keep users informed without overwhelming them.', challenge: 'Notification fatigue caused high opt-out rates.', solution: 'Smart notification batching with user-controlled frequency and contextual relevance scoring.', connections: ['booking', 'liveroorm'] },
  { id: 'liveroom',   label: 'Live Rooms',        x: 18, y: 58, purpose: 'Host group learning sessions and community events.', challenge: 'Technical reliability and learner engagement in live group settings.', solution: 'Streamlined room entry, co-host tools, and post-session engagement flows.', connections: ['coach', 'gamification'] },
  { id: 'videocall',  label: 'Video Calls',       x: 14, y: 30, purpose: '1:1 sessions between coach and learner.', challenge: 'Drop-offs due to technical friction at session start.', solution: 'A pre-session checklist, in-call tools, and automated session notes.', connections: ['booking', 'coach'] },
  { id: 'coach',      label: 'Coach Experience',  x: 22, y: 12, purpose: 'Give coaches the tools to manage and grow their practice.', challenge: 'Coaches lacked visibility into earnings, upcoming sessions, and learner progress.', solution: 'A dedicated coach dashboard with revenue insights, schedule management, and learner context.', connections: ['booking', 'videocall', 'liveroom'] },
  { id: 'learner',    label: 'Learner Experience',x: 50, y: 46, purpose: 'The core end-to-end learner journey from discovery to progress.', challenge: 'Fragmented touchpoints made the experience feel stitched together.', solution: 'A cohesive learner home that surfaces progress, upcoming sessions, and personalised recommendations.', connections: ['booking', 'feed', 'ai', 'gamification'] },
  { id: 'gamification', label: 'Gamification',   x: 72, y: 12, purpose: 'Drive motivation and habit formation through reward mechanics.', challenge: 'Generic streaks and badges had no connection to actual learning progress.', solution: 'A Karma Economy tied to real learning behaviour: sessions completed, feedback given, goals reached.', connections: ['wallet', 'learner', 'liveroom'] },
];

interface CSSidePanel {
  node: EcoNode;
  accentColor: string;
  onClose: () => void;
}

function SidePanel({ node, accentColor, onClose }: CSSidePanel) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="p-8 pt-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary-text hover:border-primary-text hover:text-primary-text transition-colors cursor-none"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Node label */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body mb-6"
          style={{ backgroundColor: accentColor + '15', color: accentColor, border: `1px solid ${accentColor}30` }}
        >
          {node.label}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {[
            { label: 'Purpose', text: node.purpose },
            { label: 'Challenge', text: node.challenge },
            { label: 'Solution', text: node.solution },
          ].map(({ label, text }) => (
            <div key={label}>
              <p className="text-[10px] font-body text-secondary-text uppercase tracking-[0.12em] mb-2">{label}</p>
              <p className="font-body text-primary-text text-sm leading-relaxed">{text}</p>
            </div>
          ))}

          {/* Placeholder screens */}
          <div>
            <p className="text-[10px] font-body text-secondary-text uppercase tracking-[0.12em] mb-4">Related Screens</p>
            <div className="space-y-3">
              <MediaPlaceholder type="image" aspectRatio="16/9" accentColor={accentColor} label={`→ ${node.label} screen 1`} className="rounded-xl" />
              <MediaPlaceholder type="image" aspectRatio="16/9" accentColor={accentColor} label={`→ ${node.label} screen 2`} className="rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CSEcosystemProps {
  accentColor?: string;
  nodes?: EcoNode[];
}

export default function CSEcosystem({ accentColor = '#718F6B', nodes = DEFAULT_NODES }: CSEcosystemProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 520 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.clientWidth, h: containerRef.current.clientHeight });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const activeNode = nodes.find((n) => n.id === activeId) ?? null;

  const getHighlighted = (nodeId: string) => {
    if (!hoveredId) return true;
    if (nodeId === hoveredId) return true;
    const hovered = nodes.find((n) => n.id === hoveredId);
    return hovered?.connections.includes(nodeId) ?? false;
  };

  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-[0.14em] uppercase mb-5 block">
            04 — Product Ecosystem
          </span>
          <h2 className="font-display text-[2.4rem] md:text-[3.8rem] leading-[1.05] text-primary-text mb-4 max-w-xl">
            Ten systems.<br />One product.
          </h2>
          <p className="font-body text-secondary-text mb-14 max-w-lg leading-relaxed">
            Hover any node to see connections. Click to explore the design decisions behind each feature.
          </p>
        </ScrollReveal>

        {/* Map canvas */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl border border-border overflow-hidden"
          style={{ height: 540 }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          {/* SVG lines */}
          <svg className="absolute inset-0 pointer-events-none" width={dims.w} height={dims.h}>
            {nodes.map((node) =>
              node.connections.map((targetId) => {
                const target = nodes.find((n) => n.id === targetId);
                if (!target) return null;
                const x1 = (node.x / 100) * dims.w;
                const y1 = (node.y / 100) * dims.h;
                const x2 = (target.x / 100) * dims.w;
                const y2 = (target.y / 100) * dims.h;
                const isHighlighted = hoveredId === node.id || hoveredId === targetId;
                return (
                  <motion.line
                    key={`${node.id}-${targetId}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={accentColor}
                    animate={{
                      strokeOpacity: isHighlighted ? 0.45 : 0.08,
                      strokeWidth: isHighlighted ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const x = (node.x / 100) * dims.w;
            const y = (node.y / 100) * dims.h;
            const highlighted = getHighlighted(node.id);
            const isActive = activeId === node.id;

            return (
              <motion.div
                key={node.id}
                className="absolute cursor-none"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveId(isActive ? null : node.id)}
                animate={{ opacity: highlighted ? 1 : 0.28 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="relative flex flex-col items-center gap-1.5"
                  animate={{ scale: hoveredId === node.id ? 1.12 : isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    animate={{
                      backgroundColor: isActive ? accentColor + '30' : hoveredId === node.id ? accentColor + '20' : accentColor + '10',
                      borderColor: isActive || hoveredId === node.id ? accentColor + '70' : accentColor + '30',
                    }}
                    style={{ border: '1.5px solid' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ color: accentColor }} className="font-display text-[8px] font-medium text-center leading-tight px-1">
                      {node.label.split(' ')[0]}
                    </span>
                  </motion.div>
                  <span className="text-[10px] font-body text-secondary-text whitespace-nowrap">{node.label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Side panel */}
      <AnimatePresence>
        {activeNode && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
            />
            <SidePanel node={activeNode} accentColor={accentColor} onClose={() => setActiveId(null)} />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
