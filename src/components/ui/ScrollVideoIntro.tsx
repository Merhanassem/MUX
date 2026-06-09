'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';

/**
 * Scroll-driven cinematic intro.
 *
 * Layout:
 *   • A tall section (SCROLL_VH × 100vh) gives the scroll runway.
 *   • Inside: a sticky full-viewport container that never moves.
 *   • The video is paused at frame 0 on load.
 *   • A rAF loop reads window.scrollY and maps it to video.currentTime.
 *   • When scroll passes VIDEO_END_AT (80 % of runway), video freezes on
 *     the last frame and hero content fades in staggered.
 *   • All DOM mutations happen via refs — zero React re-renders in the hot path.
 */

const SCROLL_VH = 4;          // total height of the section  (4 × 100vh)
const VIDEO_END_AT = 0.80;    // scroll progress at which video reaches its last frame
const HERO_START_AT = 0.80;   // hero starts fading in at this progress
const HERO_END_AT   = 0.95;   // hero fully visible at this progress

export default function ScrollVideoIntro() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);
  const availRef     = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Autoplay the video as background — more reliable than scrubbing on production
    video.currentTime = 0;
    video.play().catch(() => {});

    // Inline easing: ease-out cubic
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    // Stagger offsets for each hero element  (0 → 1 scale within hero window)
    const STAGGER = [0, 0.12, 0.22, 0.34, 0.46];

    const applyEl = (
      el: HTMLDivElement | null,
      globalP: number,        // 0–1 over the whole hero window
      stagger: number,        // 0–1 stagger offset
      yAmt = 22,
    ) => {
      if (!el) return;
      const local = Math.max(0, Math.min(1, (globalP - stagger) / (1 - stagger)));
      const eased = easeOut(local);
      el.style.opacity = String(eased);
      el.style.transform = `translateY(${(1 - eased) * yAmt}px)`;
    };

    let lastScrollY = -1;

    const tick = () => {
      const scrollY = window.scrollY;

      // Skip if nothing changed
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;

        const sectionTop    = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const vh            = window.innerHeight;
        const scrollable    = sectionHeight - vh;
        const within        = Math.max(0, scrollY - sectionTop);
        const progress      = Math.min(1, within / scrollable);

        // ── Video scrubbing ─────────────────────────────────────────
        if (video.readyState >= 2 && video.duration && isFinite(video.duration)) {
          const videoP = Math.min(1, progress / VIDEO_END_AT);
          video.currentTime = videoP * video.duration;
        }

        // ── Dark overlay (fades in as hero reveals) ──────────────────
        if (overlayRef.current) {
          const op = Math.max(0, Math.min(1, (progress - HERO_START_AT) / (HERO_END_AT - HERO_START_AT)));
          overlayRef.current.style.opacity = String(op * 0.45);
        }

        // ── Hero content ─────────────────────────────────────────────
        const heroP = Math.max(0, Math.min(1,
          (progress - HERO_START_AT) / (HERO_END_AT - HERO_START_AT)
        ));

        applyEl(logoRef.current,     heroP, STAGGER[0], 20);
        applyEl(headlineRef.current, heroP, STAGGER[1], 24);
        applyEl(subtitleRef.current, heroP, STAGGER[2], 18);
        applyEl(ctasRef.current,     heroP, STAGGER[3], 14);
        applyEl(availRef.current,    heroP, STAGGER[4], 10);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: `${SCROLL_VH * 100}vh` }}>

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video — covers full screen, paused, scrubbed by scroll */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          autoPlay
          loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'auto' }}
        />

        {/* Subtle dark overlay — softens final frame for text legibility */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* ── Hero Content ── */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8"
        >
          {/* Logo */}
          <div
            ref={logoRef}
            className="mb-12 md:mb-14 flex justify-center"
            style={{ opacity: 0, transform: 'translateY(20px)', willChange: 'opacity, transform' }}
            data-cursor="Hey 👋"
          >
            <Image
              src="/mux-logo.svg"
              alt="MUX"
              width={280}
              height={110}
              priority
              className="w-[150px] md:w-[210px] lg:w-[250px] drop-shadow-lg"
            />
          </div>

          {/* Headline */}
          <div
            ref={headlineRef}
            style={{ opacity: 0, transform: 'translateY(24px)', willChange: 'opacity, transform', textAlign: 'center', maxWidth: '56rem' }}
          >
            <h1
              className="font-display text-[2.5rem] md:text-[3.6rem] lg:text-[4.6rem] leading-[1.08] mb-8"
              style={{ color: '#F7F5F1', fontWeight: 600, textShadow: '0 2px 24px rgba(0,0,0,0.25)' }}
            >
              Helping teams{' '}
              <span className="relative inline-block">
                find clarity
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 260 10"
                  style={{ overflow: 'visible' }}
                >
                  <path
                    d="M2 6 Q65 2 130 6 Q195 10 258 5"
                    stroke="#F08CA6"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              before building the wrong thing.
            </h1>
          </div>

          {/* Supporting copy */}
          <div
            ref={subtitleRef}
            style={{ opacity: 0, transform: 'translateY(18px)', willChange: 'opacity, transform', textAlign: 'center', maxWidth: '36rem', marginBottom: '3rem' }}
          >
            <p
              className="font-body text-lg md:text-xl leading-relaxed"
              style={{ color: 'rgba(247,245,241,0.82)', fontWeight: 500, textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
            >
              Got an idea, a messy product, or a feature that&apos;s not landing?{' '}
              Let&apos;s find what&apos;s actually getting in the way.
            </p>
          </div>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: 0, transform: 'translateY(14px)', willChange: 'opacity, transform' }}
          >
            <MagneticButton href="#work" variant="default">
              See the work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline-light">
              Start a conversation
            </MagneticButton>
          </div>
        </div>

        {/* ── Availability pill ── */}
        <div
          ref={availRef}
          className="absolute bottom-10 right-8 md:right-16 hidden md:flex items-center gap-2 z-10"
          style={{ opacity: 0, transform: 'translateY(10px)', willChange: 'opacity, transform' }}
        >
          <div
            className="w-2 h-2 rounded-full bg-olive"
            style={{ animation: 'pulse-dot 2.2s ease-in-out infinite' }}
          />
          <span
            className="text-xs font-body"
            style={{ color: 'rgba(247,245,241,0.75)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            Available for projects
          </span>
        </div>

        {/* ── Scroll hint (fades out as user scrolls) ── */}
        <ScrollHint />

      </div>
    </div>
  );
}

/** Tiny "scroll to explore" hint that disappears as soon as user scrolls */
function ScrollHint() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const p = Math.max(0, 1 - window.scrollY / 120);
      el.style.opacity = String(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      style={{ transition: 'opacity 0.3s ease' }}
    >
      <span className="text-xs font-body tracking-[0.18em] uppercase" style={{ color: 'rgba(247,245,241,0.5)' }}>
        Scroll to explore
      </span>
      <div style={{ width: 1, height: 32, background: 'rgba(247,245,241,0.25)', animation: 'scroll-line 2s ease-in-out infinite' }} />
    </div>
  );
}
