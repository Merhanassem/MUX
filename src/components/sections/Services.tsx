'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const services = [
  {
    num: '01',
    title: 'Product Strategy',
    tagline: 'Turning ideas into clear product directions.',
    description: 'Before any screen gets designed, we figure out what\'s actually worth building. I help teams move from ambiguity to a confident direction.',
    bullets: ['Product discovery', 'Feature prioritization', 'User flows', 'Information architecture', 'MVP definition', 'Heuristic evaluation'],
    accent: '#F72585',
    dark: true,
  },
  {
    num: '02',
    title: 'Product Design',
    tagline: 'Designing scalable experiences users can actually use.',
    description: 'End-to-end design for mobile apps, SaaS platforms, marketplaces, and dashboards. Craft that holds up under real usage.',
    bullets: ['Mobile apps', 'SaaS platforms', 'Marketplaces', 'Dashboards', 'Design systems'],
    accent: '#4B63F7',
    dark: false,
  },
  {
    num: '03',
    title: 'Design Systems',
    tagline: 'Creating consistency that scales.',
    description: 'A solid component library isn\'t just Figma files — it\'s the shared language between design and engineering. I build systems that teams actually use.',
    bullets: ['Component libraries', 'Design tokens', 'Documentation', 'Design foundations'],
    accent: '#718F6B',
    dark: true,
  },
  {
    num: '04',
    title: 'Product Validation',
    tagline: 'Testing assumptions before development.',
    description: 'Prototypes that feel real enough to test, structured sessions that surface the right insights, and clear recommendations that teams can act on.',
    bullets: ['Interactive prototypes', 'User journeys', 'Usability testing', 'Concept validation'],
    accent: '#E8601C',
    dark: false,
  },
  {
    num: '05',
    title: 'Developer Handoff',
    tagline: 'Bridging design and implementation.',
    description: 'Clean specs, thorough documentation, and being available during build. I stay involved until the product actually ships.',
    bullets: ['Annotated specs', 'Documentation', 'Design QA', 'Launch support'],
    accent: '#C9922A',
    dark: true,
  },
  {
    num: '06',
    title: 'From Zero → MVP',
    tagline: 'From idea to launch-ready product.',
    description: 'My strongest differentiator. I\'ve taken Taaly, Park Peace, Relax, Cash, Dream Cairo, and Animap from concept to fully designed product. I know what it takes.',
    bullets: ['Full discovery', 'Architecture & flows', 'High-fidelity design', 'Handoff & launch'],
    accent: '#F72585',
    dark: false,
    featured: true,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl md:rounded-3xl p-5 md:p-10 cursor-none overflow-hidden transition-all duration-500"
      style={{
        background: service.dark
          ? hovered ? '#111111' : '#0D0D0D'
          : hovered ? '#F7F5F1' : '#FAFAF8',
        border: `1px solid ${hovered ? service.accent + '55' : service.dark ? '#1F1F1F' : '#E5E0D6'}`,
        boxShadow: hovered ? `0 20px 60px ${service.accent}15` : 'none',
      }}
      data-cursor={service.featured ? '⭐ Best fit' : ''}
    >
      {/* Featured badge */}
      {service.featured && (
        <div
          className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] md:text-xs font-body px-2.5 py-1 md:px-3 md:py-1.5 rounded-full whitespace-nowrap"
          style={{ background: service.accent + '20', color: service.accent, border: `1px solid ${service.accent}40` }}
        >
          Most requested
        </div>
      )}

      {/* Accent glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${service.accent}08 0%, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-5 md:gap-8">

        {/* Number + title */}
        <div className="md:w-64 flex-shrink-0">
          <span
            className="font-mono text-xs tracking-widest mb-3 block"
            style={{ color: service.accent }}
          >
            {service.num}
          </span>
          <h3
            className="font-display text-2xl md:text-3xl leading-tight mb-3"
            style={{ color: service.dark ? '#F7F5F1' : '#09090D' }}
          >
            {service.title}
          </h3>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: service.dark ? 'rgba(247,245,241,0.5)' : 'rgba(9,9,13,0.5)' }}
          >
            {service.tagline}
          </p>
        </div>

        {/* Description + bullets */}
        <div className="flex-1">
          <p
            className="font-body leading-relaxed mb-6 text-sm md:text-base"
            style={{ color: service.dark ? 'rgba(247,245,241,0.72)' : 'rgba(9,9,13,0.68)' }}
          >
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.bullets.map((b) => (
              <span
                key={b}
                className="text-xs font-body px-3 py-1.5 rounded-full transition-colors duration-300"
                style={{
                  background: hovered ? service.accent + '18' : service.dark ? 'rgba(255,255,255,0.06)' : 'rgba(9,9,13,0.06)',
                  color: hovered ? service.accent : service.dark ? 'rgba(247,245,241,0.65)' : 'rgba(9,9,13,0.55)',
                  border: `1px solid ${hovered ? service.accent + '35' : service.dark ? 'rgba(255,255,255,0.08)' : 'rgba(9,9,13,0.08)'}`,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding px-5 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div>
            <ScrollReveal>
              <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
                What I do
              </span>
              <h2 className="font-display text-[2rem] md:text-[3.5rem] leading-tight text-primary-text">
                Services built for<br />
                <span className="text-pink-brand">real product work</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-secondary-text max-w-sm leading-relaxed">
              Not just deliverables. I work alongside teams to move from confusion to clarity — and from clarity to something people actually ship.
            </p>
          </ScrollReveal>
        </div>

        {/* Service cards */}
        <div className="flex flex-col gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-16 border-t border-border">
            <p className="font-body text-secondary-text text-center sm:text-left">
              See how these services look in practice.
            </p>
            <MagneticButton href="#work" variant="default">
              View the work
            </MagneticButton>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
