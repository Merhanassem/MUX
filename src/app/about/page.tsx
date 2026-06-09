'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import DomainMarquee from '@/components/ui/DomainMarquee';
import FunFacts from '@/components/sections/FunFacts';

/* ── Data ──────────────────────────────────────────────────────────────────── */

const experience = [
  {
    period: 'Sep 2024 – Present',
    shortPeriod: '2024 →',
    role: 'Senior Product Designer',
    roleDetail: 'UX/UI Lead',
    org: 'Taaly',
    type: 'EdTech · AI Coaching · Remote',
    highlight: 'Defined the IA and interaction model for a multi-role AI coaching platform — resolving structural ambiguity that had stalled planning for months.',
    accent: '#4B63F7',
    current: true,
  },
  {
    period: 'Jun 2024 – Mar 2025',
    shortPeriod: '2024',
    role: 'Product Designer',
    roleDetail: '',
    org: 'VST Software House',
    type: 'Multi-Sided Marketplace',
    highlight: 'Architected three fully distinct apps — client, specialist, and driver — for a three-sided on-demand wellness marketplace.',
    accent: '#8B4A4A',
    current: false,
  },
  {
    period: 'Dec 2023 – Jun 2024',
    shortPeriod: '2023–24',
    role: 'Product Designer',
    roleDetail: '0 → 1',
    org: 'Animap',
    type: 'Pet Care · Mobile Platform',
    highlight: 'Took Animap from zero to a fully designed product — booking, maps, and community consolidated into a cohesive mobile experience.',
    accent: '#E8601C',
    current: false,
  },
  {
    period: 'Jan 2023 – Dec 2023',
    shortPeriod: '2023',
    role: 'UX/UI Designer',
    roleDetail: '',
    org: 'Arab Coders',
    type: 'Digital Product Agency · B2B/B2C',
    highlight: 'Designed high-conversion e-commerce and SaaS interfaces; established a handoff process adopted across all concurrent client projects.',
    accent: '#718F6B',
    current: false,
  },
  {
    period: 'Jan 2022 – Jan 2023',
    shortPeriod: '2022–23',
    role: 'UX/UI Designer',
    roleDetail: 'Consulting',
    org: 'Independent Practice',
    type: 'Product Design Consulting',
    highlight: 'Sole designer on four client verticals: fintech, e-commerce, luxury real estate, and productivity — full discovery to delivery.',
    accent: '#C9922A',
    current: false,
  },
];

const skills = [
  'Product Strategy & Discovery',
  'UX Research',
  'Usability Testing',
  'Information Architecture',
  'Interaction Design',
  'User Flows & Wireframing',
  'High-Fidelity Prototyping',
  'Atomic Design Systems',
  'Accessibility (WCAG)',
  'Design-to-Dev Handoff',
  'Stakeholder Communication',
  'UX Writing & Microcopy',
  'Responsive & Mobile-First',
];

const tools = [
  { name: 'Figma', sub: '& FigJam' },
  { name: 'Figma Make', sub: 'AI prototyping' },
  { name: 'UserTesting', sub: 'Research' },
  { name: 'Notion', sub: 'Documentation' },
  { name: 'ClickUp', sub: 'Project mgmt' },
  { name: 'Wix Studio', sub: 'No-code' },
];


const values = [
  {
    n: '01',
    title: 'Clarity before creativity.',
    body: 'The best design decisions come from understanding the problem completely — not from jumping straight to solutions.',
  },
  {
    n: '02',
    title: 'Outcomes, not outputs.',
    body: 'Screens are a means, not the goal. I measure success by what changes for users and businesses.',
  },
  {
    n: '03',
    title: 'Make the invisible visible.',
    body: 'The best design work explains itself. If the people building it don\'t understand it, it won\'t ship right.',
  },
  {
    n: '04',
    title: 'Honest over comfortable.',
    body: 'I say what I see. If a direction is wrong, I say so — with evidence, with alternatives, and with respect.',
  },
];

/* ── Experience card ──────────────────────────────────────────────────────── */
function ExperienceRow({ e, i }: { e: typeof experience[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-t border-border group cursor-none"
    >
      {/* Accent line on hover */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 bottom-0 w-0.5 origin-top"
        style={{ background: e.accent }}
      />

      <div className="py-8 pl-6 md:pl-8 grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-4 md:gap-10 items-start">

        {/* Left: period + tags */}
        <div className="flex md:flex-col gap-3 md:gap-2">
          <span className="text-xs font-body text-secondary-text tabular-nums leading-none pt-0.5">
            {e.period}
          </span>
          <span
            className="text-[10px] font-body px-2.5 py-1 rounded-full self-start"
            style={{
              backgroundColor: e.accent + '18',
              color: e.accent,
              border: `1px solid ${e.accent}30`,
            }}
          >
            {e.type}
          </span>
          {e.current && (
            <span className="text-[10px] font-body px-2.5 py-1 rounded-full bg-pink-brand/10 text-pink-brand border border-pink-brand/20 self-start">
              Now
            </span>
          )}
        </div>

        {/* Center: role + highlight */}
        <div>
          <div className="flex items-baseline gap-2.5 flex-wrap mb-2">
            <h3 className="font-display text-xl md:text-2xl text-primary-text leading-tight">{e.role}</h3>
            {e.roleDetail && (
              <span className="text-sm font-body text-secondary-text">{e.roleDetail}</span>
            )}
          </div>
          <p
            className="text-sm font-body font-semibold mb-3 tracking-wide"
            style={{ color: e.accent }}
          >
            {e.org}
          </p>
          <motion.p
            animate={{ opacity: hovered ? 1 : 0.55, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
            className="font-body text-sm text-secondary-text leading-relaxed max-w-lg"
          >
            {e.highlight}
          </motion.p>
        </div>

        {/* Right: number */}
        <span
          className="font-display text-[3rem] md:text-[4rem] leading-none select-none hidden md:block transition-all duration-500"
          style={{ color: hovered ? e.accent : 'transparent', WebkitTextStroke: `1px ${hovered ? 'transparent' : '#E5E0D6'}` }}
        >
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Value card ───────────────────────────────────────────────────────────── */
function ValueCard({ v, i }: { v: typeof values[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="py-9 border-t border-border grid grid-cols-[48px_1fr] gap-6"
    >
      <span className="font-display text-[2rem] leading-none select-none" style={{ color: '#E5E0D6' }}>{v.n}</span>
      <div>
        <h3 className="font-display text-lg md:text-xl text-primary-text mb-2">{v.title}</h3>
        <p className="font-body text-secondary-text leading-relaxed text-sm">{v.body}</p>
      </div>
    </motion.div>
  );
}

/* ── Animated counter ─────────────────────────────────────────────────────── */
function Counter({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  const start = () => {
    let v = 0;
    const step = to / 50;
    const id = setInterval(() => {
      v += step;
      if (v >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(v));
    }, 24);
  };

  return (
    <div ref={ref} onAnimationStart={() => inView && start()} className="text-center">
      {inView && <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onAnimationComplete={start}
        style={{ display: 'none' }}
      />}
      <div className="font-display text-[3.5rem] md:text-[5rem] leading-none font-bold text-primary-text tracking-tight">
        {val}{suffix}
      </div>
      <div className="text-xs font-body text-secondary-text tracking-widest uppercase mt-2">{label}</div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-background">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="min-h-screen flex flex-col justify-center overflow-hidden relative">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto w-full pt-24 pb-16 px-4 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-12 items-center">

              {/* ─ Text ─ */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center gap-3 mb-10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-brand" />
                  <span className="text-xs font-body text-secondary-text tracking-[0.2em] uppercase">
                    Senior Product Designer · Cairo, Egypt · Open to Remote
                  </span>
                </motion.div>

                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[3rem] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] leading-[0.88] text-primary-text"
                  >
                    Merhan
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-10">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[3rem] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] leading-[0.88] text-pink-brand"
                  >
                    Assem.
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.35 }}
                  className="font-body text-secondary-text text-lg md:text-xl max-w-lg leading-relaxed"
                >
                  4+ years turning complex systems into clear, scalable products — through research, architecture, and design that doesn&apos;t just look good, but actually works.
                </motion.p>
              </div>

              {/* ─ Illustration ─ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex justify-center items-end relative"
              >
                {/* Soft blurred halo behind image */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-25"
                  style={{ background: 'radial-gradient(ellipse at 60% 80%, #57A9F7 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <Image
                    src="/about-hero.png"
                    alt="Illustrated portrait — Merhan"
                    width={480}
                    height={600}
                    priority
                    className="rounded-2xl object-cover object-top"
                    style={{ maxHeight: '72vh', width: 'auto' }}
                  />
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="text-[10px] font-body text-secondary-text tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-secondary-text/40 origin-top"
            />
          </motion.div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════════════════════ */}
        <section className="border-y border-border bg-background">
          <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
            <Counter to={4} suffix="+" label="Years designing" />
            <Counter to={5}  label="Companies" />
            <Counter to={6}  label="Domains" />
            <Counter to={10} suffix="+" label="Products shipped" />
          </div>
        </section>

        {/* ══ INTRO ═════════════════════════════════════════════════════════ */}
        <section className="px-4 md:px-16 py-16 md:py-28 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <ScrollReveal>
                <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase mb-5 block">
                  Background
                </span>
                <h2 className="font-display text-[2rem] md:text-[2.8rem] leading-tight text-primary-text mb-8">
                  I design products that work before they ship — and keep working after they do.
                </h2>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body text-sm text-secondary-text hover:text-pink-brand transition-colors duration-200 cursor-none group"
                >
                  Work together
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </ScrollReveal>
            </div>

            <div className="space-y-6 font-body text-secondary-text leading-relaxed">
              <ScrollReveal>
                <p>
                  I started designing products in 2022 and haven&apos;t stopped since. Across five companies — from a one-person consulting practice to a remote AI startup — I&apos;ve worked on fintech, edtech, wellness, pet care, and agency work. The common thread: complexity that needed to become clarity.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p>
                  My process starts with questions, not screens. Before I open Figma, I want to understand the user&apos;s mental model, the business constraint, and the gap between what exists and what should. That phase is where most of the real design happens.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p>
                  I&apos;m most energised when I&apos;m embedded with a team that actually argues about the right decisions — and I&apos;m comfortable being the person who names what everyone else is dancing around.
                </p>
              </ScrollReveal>

              {/* Education + cert inline */}
              <ScrollReveal delay={0.2}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-border">
                  <div>
                    <p className="text-xs font-body text-secondary-text tracking-widest uppercase mb-2">Education</p>
                    <p className="font-display text-base text-primary-text leading-snug">B.Sc. Physiotherapy</p>
                    <p className="font-body text-xs text-secondary-text mt-1">Modern University for Technology & Information · 2016–2022</p>
                  </div>
                  <div>
                    <p className="text-xs font-body text-secondary-text tracking-widest uppercase mb-2">Certification</p>
                    <p className="font-display text-base text-primary-text leading-snug">Google UX Design</p>
                    <p className="font-body text-xs text-secondary-text mt-1">Professional Certificate · Google / Coursera · 2024</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══ EXPERIENCE ════════════════════════════════════════════════════ */}
        <section className="border-t border-border px-4 md:px-16 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-4">
                <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase">
                  Experience
                </span>
                <span className="text-xs font-body text-secondary-text">
                  2022 → Present
                </span>
              </div>
              <h2 className="font-display text-[2.4rem] md:text-[3.5rem] leading-tight text-primary-text mb-16 max-w-2xl">
                Where the work<br />
                <span className="text-pink-brand">actually happened.</span>
              </h2>
            </ScrollReveal>

            <div>
              {experience.map((e, i) => (
                <ExperienceRow key={e.org} e={e} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS + TOOLS ════════════════════════════════════════════════ */}
        <section className="border-t border-border px-4 md:px-16 py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase mb-12 block">
                Craft & Tools
              </span>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

              {/* Skills — animated tag cloud */}
              <div>
                <ScrollReveal>
                  <p className="font-body text-sm text-secondary-text mb-6">Core skills</p>
                </ScrollReveal>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, i) => (
                    <ScrollReveal key={skill} delay={i * 0.03}>
                      <motion.span
                        whileHover={{ scale: 1.04, backgroundColor: 'var(--color-pink-brand)', color: '#fff', borderColor: 'var(--color-pink-brand)' }}
                        transition={{ duration: 0.18 }}
                        className="inline-flex font-body text-sm text-primary-text border border-border rounded-full px-4 py-2 cursor-none"
                        style={{ backgroundColor: 'var(--color-background)' }}
                      >
                        {skill}
                      </motion.span>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <ScrollReveal>
                  <p className="font-body text-sm text-secondary-text mb-6">Tools</p>
                </ScrollReveal>
                <div className="grid grid-cols-2 gap-3">
                  {tools.map((t, i) => (
                    <ScrollReveal key={t.name} delay={i * 0.05}>
                      <div className="border border-border rounded-2xl p-4 hover:border-pink-brand/40 transition-colors duration-200 cursor-none group">
                        <p className="font-display text-base text-primary-text group-hover:text-pink-brand transition-colors duration-200">{t.name}</p>
                        <p className="font-body text-xs text-secondary-text mt-0.5">{t.sub}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DOMAINS MARQUEE ═══════════════════════════════════════════════ */}
        <DomainMarquee />

        {/* ══ VALUES ════════════════════════════════════════════════════════ */}
        <section className="px-4 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase mb-4 block">
              How I work
            </span>
            <h2 className="font-display text-[2.4rem] md:text-[3.5rem] leading-tight text-primary-text mb-16 max-w-2xl">
              Principles I refuse<br />to compromise on.
            </h2>
          </ScrollReveal>
          <div>
            {values.map((v, i) => <ValueCard key={v.n} v={v} i={i} />)}
          </div>
        </section>

        {/* ══ COMPETENCIES ══════════════════════════════════════════════════ */}
        <section className="border-t border-border px-4 md:px-16 py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase mb-12 block">
                Core Competencies
              </span>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {[
                { title: 'End-to-End Product Ownership', sub: 'Discovery → research → design → handoff', icon: '→' },
                { title: 'Complex Systems Thinking',      sub: 'Multi-role platforms · Synchronized UX flows', icon: '⊗' },
                { title: 'Scalable Design Systems',       sub: 'Atomic systems that reduce engineering friction', icon: '⊞' },
                { title: 'Remote-First Collaboration',    sub: 'Async-ready · Agile sprints · Distributed teams', icon: '◎' },
              ].map((c, i) => (
                <ScrollReveal key={c.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ backgroundColor: '#F0EDE8' }}
                    transition={{ duration: 0.2 }}
                    className="bg-background p-8 md:p-10 cursor-none"
                  >
                    <span className="text-2xl mb-4 block" aria-hidden="true">{c.icon}</span>
                    <h3 className="font-display text-lg md:text-xl text-primary-text mb-2">{c.title}</h3>
                    <p className="font-body text-sm text-secondary-text leading-relaxed">{c.sub}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FUN FACTS ═════════════════════════════════════════════════════ */}
        <FunFacts />

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section className="bg-primary-text px-4 md:px-16 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-xs font-body text-white/40 tracking-widest uppercase mb-8 block">
                Open to new projects
              </span>
              <h2 className="font-display text-[3rem] md:text-[5rem] leading-tight text-background mb-6">
                Let&apos;s build something<br />
                <span style={{ color: '#F08CA6' }}>worth using.</span>
              </h2>
              <p className="font-body text-white/55 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                Open to select projects, collaborations, and conversations about hard product problems.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-background text-primary-text font-body font-medium px-10 py-5 rounded-full hover:bg-pink-brand hover:text-white transition-all duration-300 cursor-none group"
              >
                Start a conversation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
