'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home',    href: '/' },
  { label: 'Work',    href: '/work' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrollY, setScrollY]       = useState(0);
  const [hidden, setHidden]         = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setMobileOpen(false);
    setHidden(false); // always show nav on page change
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    let last = window.scrollY;
    setScrollY(last);

    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - last;

      // Ignore micro-jitter — only react to intentional scrolls (>4px)
      if (Math.abs(delta) < 4) return;

      // Hide on scroll down (past 80px), show on scroll up
      if (current > 80) {
        setHidden(delta > 0);
      } else {
        setHidden(false);
      }

      setScrollY(current);
      last = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On the home page, the hero video section is dark — use light text while over it.
  // The scroll-video intro is 4×100vh tall. The sticky hero content appears around 80% through.
  // We switch to dark text once the user has scrolled past the entire intro section.
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const introHeight = 4 * vh;   // SCROLL_VH = 4
  const overDarkSection = isHome && scrollY < introHeight;

  // Frosted glass once scrolled; transparent at very top
  const atTop = scrollY < 20;
  const bgStyle = mobileOpen
    ? 'rgba(247,245,241,0.97)'
    : overDarkSection
      ? atTop ? 'transparent' : 'rgba(9,9,13,0.55)'
      : atTop
        ? 'rgba(247,245,241,0)'
        : 'rgba(247,245,241,0.92)';

  const borderStyle = overDarkSection
    ? atTop ? 'none' : '1px solid rgba(255,255,255,0.08)'
    : atTop && !mobileOpen ? 'none' : '1px solid #E5E0D6';

  const textColor    = overDarkSection ? 'rgba(255,255,255,0.85)' : 'var(--color-primary-text)';
  const subTextColor = overDarkSection ? 'rgba(255,255,255,0.55)' : 'var(--color-secondary-text)';
  const ctaBorder    = overDarkSection ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--color-border)';

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-5 md:py-6 flex items-center justify-between"
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: bgStyle,
          backdropFilter: (atTop && !mobileOpen && overDarkSection) ? 'none' : 'blur(20px)',
          borderBottom: borderStyle,
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center cursor-none" aria-label="MUX — home">
          <Image
            src="/mux-logo.svg"
            alt="MUX"
            width={64}
            height={26}
            priority
            style={{
              filter: overDarkSection ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 0.3s ease',
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="text-sm font-body transition-colors duration-300 cursor-none relative group"
                style={{ color: isActive ? textColor : subTextColor }}
              >
                {item.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-pink-brand transition-all duration-300"
                  style={{ width: isActive ? '100%' : '0%' }}
                />
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-pink-brand group-hover:w-full transition-all duration-300" />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/contact"
          className="hidden md:flex items-center gap-2 text-sm font-body font-medium rounded-full px-5 py-2.5 hover:bg-pink-brand hover:text-white hover:border-pink-brand transition-all duration-250 cursor-none"
          style={{ color: textColor, border: ctaBorder }}
        >
          Let&apos;s talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 cursor-none rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            transition={{ duration: 0.22 }}
            className="block w-5 h-px bg-primary-text origin-center"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.18 }}
            className="block w-5 h-px bg-primary-text"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            transition={{ duration: 0.22 }}
            className="block w-5 h-px bg-primary-text origin-center"
          />
        </button>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: 'rgba(247,245,241,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="h-[73px] flex-shrink-0" />
            <nav className="flex flex-col gap-1 px-6 py-8 flex-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[2.2rem] font-semibold py-3 border-b border-border last:border-0 flex items-center justify-between"
                    style={{ color: isActive ? 'var(--color-pink-brand)' : 'var(--color-primary-text)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    {isActive && <span className="w-2 h-2 rounded-full bg-pink-brand" aria-hidden="true" />}
                  </motion.a>
                );
              })}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.28 }}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-primary-text text-background text-sm font-body font-medium rounded-full px-8 py-4 self-start"
                onClick={() => setMobileOpen(false)}
              >
                Let&apos;s talk
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
