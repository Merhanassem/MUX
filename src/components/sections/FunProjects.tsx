'use client';

import { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { funProjects } from '@/lib/data/funProjects';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useVideoThumbnail } from '@/hooks/useVideoThumbnail';

/* ─── Card dimensions ─────────────────────────────────────── */
const CARD_HEIGHTS = [460, 380, 420, 400]; // varied but not extreme

/* ─── Cinematic placeholder — shows instead of the broken circle icon ─ */
function CardPlaceholder({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(145deg, ${accentColor}22 0%, ${accentColor}08 50%, #1a1a1a 100%)`,
      }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(${accentColor}30 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Centered play mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: accentColor + '18',
            border: `1px solid ${accentColor}35`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={accentColor} opacity="0.7">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Lightbox ─────────────────────────────────────────────── */
function VideoLightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const project = funProjects[index];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(Math.min(funProjects.length - 1, index + 1));
      if (e.key === 'ArrowLeft')  onNavigate(Math.max(0, index - 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, onClose, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — video preview`}
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(6,6,8,0.96)', backdropFilter: 'blur(20px)' }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        key={index}
        className="relative z-10 w-full max-w-5xl mx-4 md:mx-12"
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.thumbnail ?? undefined}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <CardPlaceholder accentColor={project.accentColor} />
          )}
        </div>

        <div className="flex items-start justify-between mt-5 px-1 gap-6">
          <div className="min-w-0">
            <h3 className="font-display text-xl mb-1.5 text-white">{project.title}</h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {project.description}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0 mt-0.5 flex-wrap justify-end">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-body px-3 py-1 rounded-full whitespace-nowrap"
                style={{
                  backgroundColor: project.accentColor + '22',
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}35`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Close */}
      <motion.button
        aria-label="Close video"
        onClick={onClose}
        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.28)' }}
        whileTap={{ scale: 0.93 }}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center cursor-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Prev */}
      <motion.button
        aria-label="Previous video"
        onClick={() => onNavigate(index - 1)}
        disabled={index === 0}
        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.25)' }}
        whileTap={{ scale: 0.93 }}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-none disabled:opacity-25 disabled:pointer-events-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </motion.button>

      {/* Next */}
      <motion.button
        aria-label="Next video"
        onClick={() => onNavigate(index + 1)}
        disabled={index === funProjects.length - 1}
        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.25)' }}
        whileTap={{ scale: 0.93 }}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-none disabled:opacity-25 disabled:pointer-events-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Dot indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2" aria-hidden="true">
        {funProjects.map((_, i) => (
          <button key={i} onClick={() => onNavigate(i)} className="cursor-none p-1">
            <motion.div
              className="h-1.5 rounded-full"
              animate={{
                width: i === index ? 22 : 6,
                backgroundColor: i === index ? project.accentColor : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.28 }}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Card ─────────────────────────────────────────────────── */
const ExperimentCard = memo(function ExperimentCard({
  project,
  height,
  index,
  activeIndex,
  cardRef,
  onOpen,
}: {
  project: typeof funProjects[0];
  height: number;
  index: number;
  activeIndex: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onOpen: (i: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered]     = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const isActive   = index === activeIndex;
  const distance   = Math.abs(index - activeIndex);

  // Auto-generated thumbnail at 4 s (skips logo/black intro frames)
  const autoThumb = useVideoThumbnail(project.video, 4);
  // Use explicit thumbnail if provided, otherwise fall back to auto-captured frame
  const poster = project.thumbnail ?? autoThumb ?? undefined;

  // Scale: active=1, adjacent=0.88, far=0.76
  const scale = isActive ? 1 : distance === 1 ? 0.88 : 0.76;

  // Play only active card, pause others
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive]);

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0"
      style={{ width: 'min(560px, 80vw)', transformOrigin: 'center center' }}
      animate={{ scale }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.35, 1] }}
    >
      {/* Card media */}
      <motion.div
        className="relative overflow-hidden rounded-2xl mb-5"
        style={{ height, position: 'relative' }}
        data-cursor={isActive ? 'Expand ↗' : ''}
        animate={{
          // Active: crisp; inactive: dim
          filter: isActive ? 'brightness(1) saturate(1)' : hovered ? 'brightness(0.78) saturate(0.9)' : 'brightness(0.6) saturate(0.8)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={() => isActive && onOpen(index)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video / thumbnail / placeholder */}
        {project.video ? (
          <>
            {/* Static thumbnail shown while video hasn't played yet */}
            {poster ? (
              <img
                src={poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: videoReady ? 0 : 1,
                  transition: 'opacity 0.5s ease',
                  transform: isActive ? 'scale(1)' : 'scale(1.06)',
                }}
              />
            ) : (
              /* Accent placeholder while thumb is being captured */
              !videoReady && <CardPlaceholder accentColor={project.accentColor} />
            )}

            <video
              ref={videoRef}
              src={project.video}
              poster={poster}
              loop
              muted
              playsInline
              preload={isActive ? 'auto' : 'none'}
              onCanPlay={() => setVideoReady(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: videoReady ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.06)',
                transition: 'transform 0.5s cubic-bezier(0.25,1,0.35,1), opacity 0.5s ease',
              }}
            />
          </>
        ) : (
          <CardPlaceholder accentColor={project.accentColor} />
        )}

        {/* Active ring */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ border: `2px solid ${project.accentColor}55` }}
            />
          )}
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-body px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: project.accentColor + '28',
              color: project.accentColor,
              border: `1px solid ${project.accentColor}40`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.tags[0]}
          </span>
        </div>

        {/* Expand CTA — active only, full overlay on hover */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="expand-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Expand pill — shown on hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85, y: hovered ? 0 : 6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full"
                style={{
                  backgroundColor: 'rgba(9,9,13,0.82)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${project.accentColor}55`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="2.5" aria-hidden="true">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span className="text-sm font-body font-semibold text-white whitespace-nowrap">
                  Watch experiment
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Card text — smooth fade in/out */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 8,
          pointerEvents: isActive ? 'auto' : 'none',
        } as any}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.35, 1] }}
      >
        <h3 className="font-display text-xl text-primary-text mb-2">{project.title}</h3>
        <p className="font-body text-secondary-text text-sm leading-relaxed mb-3 max-w-md">
          {project.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body text-secondary-text border border-border rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ─── Main section ──────────────────────────────────────────── */
export default function FunProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex]       = useState(0);
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);
  const activeIndexRef  = useRef(0);
  const settleTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnapping      = useRef(false);

  const getNearestIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;
    const centerX = container.getBoundingClientRect().left + container.clientWidth / 2;
    let closest = 0, minDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - centerX);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }, []);

  const snapToIndex = useCallback((i: number) => {
    const container = containerRef.current;
    const card      = cardRefs.current[i];
    if (!container || !card) return;
    isSnapping.current = true;
    const cRect = container.getBoundingClientRect();
    const kRect = card.getBoundingClientRect();
    const target = container.scrollLeft + (kRect.left + kRect.width / 2 - cRect.left) - container.clientWidth / 2;
    container.scrollTo({ left: target, behavior: 'smooth' });
    setTimeout(() => { isSnapping.current = false; }, 520);
  }, []);

  const handleScroll = useCallback(() => {
    if (isSnapping.current) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const idx = getNearestIndex();
      activeIndexRef.current = idx;
      setActiveIndex(idx);
      snapToIndex(idx);
    }, 130);
  }, [getNearestIndex, snapToIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [handleScroll]);

  const scrollTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(funProjects.length - 1, i));
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
    snapToIndex(clamped);
  }, [snapToIndex]);

  const openLightbox     = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox    = useCallback(() => setLightboxIndex(null), []);
  const navigateLightbox = useCallback((i: number) => {
    setLightboxIndex(Math.max(0, Math.min(funProjects.length - 1, i)));
  }, []);

  const accentColor = funProjects[activeIndex]?.accentColor ?? '#F72585';

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-10 md:mb-14">
        <ScrollReveal>
          <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
            Motion &amp; Interaction
          </span>
          <h2 className="font-display text-[2rem] md:text-[3.5rem] leading-tight text-primary-text">
            Designing beyond<br />
            <span className="text-pink-brand">static screens</span>
          </h2>
          <p className="font-body text-secondary-text mt-5 max-w-md leading-relaxed">
            Some of these are older. The skills got better. The curiosity stayed the same.
          </p>
        </ScrollReveal>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 items-center"
        style={{
          paddingLeft:  'max(2rem, calc((100vw - 80rem) / 2 + 4rem))',
          paddingRight: 'max(2rem, calc((100vw - 80rem) / 2 + 4rem))',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {funProjects.map((project, i) => (
          <ExperimentCard
            key={project.id}
            project={project}
            height={CARD_HEIGHTS[i % CARD_HEIGHTS.length]}
            index={i}
            activeIndex={activeIndex}
            cardRef={(el) => { cardRefs.current[i] = el; }}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {/* Controls */}
      <ScrollReveal>
        <div className="flex items-center justify-center gap-6 mt-10 px-8">
          <button
            aria-label="Previous experiment"
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-secondary-text hover:border-primary-text hover:text-primary-text transition-all duration-200 disabled:opacity-30 cursor-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Experiment navigation">
            {funProjects.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-label={`Go to experiment ${i + 1}`}
                aria-selected={i === activeIndex}
                onClick={() => scrollTo(i)}
                className="cursor-none p-0.5"
              >
                <motion.div
                  animate={{
                    width: i === activeIndex ? 22 : 6,
                    backgroundColor: i === activeIndex ? accentColor : '#E5E0D6',
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.35, 1] }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>

          <button
            aria-label="Next experiment"
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === funProjects.length - 1}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-secondary-text hover:border-primary-text hover:text-primary-text transition-all duration-200 disabled:opacity-30 cursor-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <span className="text-xs font-body text-secondary-text tabular-nums ml-2">
            {String(activeIndex + 1).padStart(2, '0')} / {String(funProjects.length).padStart(2, '0')}
          </span>
        </div>
      </ScrollReveal>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <VideoLightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
