'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Contextual back navigation for internal pages.
 * - Case study (/work/[slug]) → "All work" → /work
 * - Any other internal page    → "Home"     → /
 * Fixed bottom-left, thumb-reachable on mobile. Fades in once the user has
 * scrolled a little so it never covers hero content on first paint.
 */
export default function BackLink() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Don't render on the home page
  if (pathname === '/') return null;

  // A case study is /work/<slug> — deeper than /work itself
  const isCaseStudy = pathname.startsWith('/work/') && pathname !== '/work';
  const target = isCaseStudy ? { href: '/work', label: 'All work' } : { href: '/', label: 'Home' };

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={target.href}
          aria-label={`Back to ${target.label}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-4 md:bottom-8 md:left-6 z-50 flex items-center gap-2 bg-background/90 border border-border text-primary-text text-sm font-body font-medium px-4 py-2.5 rounded-full shadow-sm hover:bg-primary-text hover:text-background hover:border-primary-text transition-colors duration-200 cursor-none backdrop-blur-sm min-h-[44px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {target.label}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
