'use client';

import { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as allProjects } from '@/lib/data/projects';
const projects = allProjects.filter(p => p.coverImage);
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import ScrollReveal from '@/components/ui/ScrollReveal';

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  activeIndex,
  cardRef,
}: {
  project: typeof projects[0];
  index: number;
  activeIndex: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const isActive = index === activeIndex;
  const distance = Math.abs(index - activeIndex);
  const scale = isActive ? 1 : distance === 1 ? 0.84 : 0.74;
  const opacity = 1;

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 cursor-none"
      style={{ width: 'min(980px, 90vw)', zIndex: isActive ? 10 : 1, transformOrigin: 'center center', scrollSnapAlign: 'center' }}
      animate={{ scale, opacity }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.35, 1] }}
    >
      <a
        href={`/work/${project.slug}`}
        data-cursor={isActive ? 'View →' : ''}
        className="block"
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      >
        <div className="relative overflow-hidden rounded-3xl mb-6">
          {project.coverImage ? (
            <motion.img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover"
              animate={{ scale: isActive ? 1 : 1.04 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            />
          ) : (
            <MediaPlaceholder
              type="image"
              aspectRatio="unset"
              accentColor={project.accentColor}
              label={`→ Cover for "${project.title}"`}
              className="w-full h-full rounded-3xl"
            />
          )}

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-end p-8"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 40%, transparent 70%)' }}
              >
                <div className="flex gap-3 flex-wrap">
                  {project.metrics.slice(0, 3).map((m) => (
                    <motion.div
                      key={m.label}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 12, opacity: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                    >
                      <span className="text-white text-sm font-body font-medium">{m.value}</span>
                      <span className="text-white/60 text-xs font-body ml-1.5">{m.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-5 left-5">
            <span
              className="text-xs font-body px-3 py-1.5 rounded-full backdrop-blur-sm"
              style={{
                backgroundColor: project.accentColor + '22',
                color: project.accentColor,
                border: `1px solid ${project.accentColor}35`,
              }}
            >
              {project.category}
            </span>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: `2px solid ${project.accentColor}40` }}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-display text-2xl text-primary-text">{project.title}</h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-text flex-shrink-0 mt-1">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
          <p className="font-body text-secondary-text text-sm mb-4 leading-relaxed">{project.subtitle}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-body text-secondary-text border border-border rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
            <span className="text-xs font-body text-secondary-text ml-auto">{project.year}</span>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
});

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update active card after scroll settles — no programmatic snap, CSS handles that
  const getNearestIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;
    const centerX = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }, []);

  const handleScroll = useCallback(() => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      setActiveIndex(getNearestIndex());
    }, 80);
  }, [getNearestIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [handleScroll]);

  // Arrow / dot nav — scroll the card into view, CSS snap does the rest
  const scrollTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, i));
    setActiveIndex(clamped);
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center',
    });
  }, []);

  return (
    <section id="work" className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-10 md:mb-14">
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
                Selected work
              </span>
              <h2 className="font-display text-[1.6rem] md:text-[3rem] leading-tight text-primary-text">
                Products I&apos;ve<br />helped shape
              </h2>
            </div>
            <a
              href="/work"
              className="hidden md:flex items-center gap-2 text-sm font-body text-secondary-text hover:text-primary-text transition-colors duration-200 cursor-none group mb-2"
            >
              All projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 items-center"
        style={{
          paddingLeft: 'max(2rem, calc((100vw - 80rem) / 2 + 4rem))',
          paddingRight: 'max(2rem, calc((100vw - 80rem) / 2 + 4rem))',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
          touchAction: 'pan-x',
          scrollSnapType: 'x mandatory',
        } as React.CSSProperties}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            activeIndex={activeIndex}
            cardRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>

      <ScrollReveal>
        <div className="flex items-center justify-center gap-6 mt-10 px-8">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary-text hover:border-primary-text hover:text-primary-text transition-all duration-200 disabled:opacity-30 cursor-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className="cursor-none transition-all duration-300">
                <motion.div
                  animate={{
                    width: i === activeIndex ? 24 : 6,
                    backgroundColor: i === activeIndex ? '#F72585' : '#E5E0D6',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary-text hover:border-primary-text hover:text-primary-text transition-all duration-200 disabled:opacity-30 cursor-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <span className="text-xs font-body text-secondary-text tabular-nums ml-2">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
