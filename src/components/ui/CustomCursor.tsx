'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // Only show custom cursor on real pointer (non-touch) devices
  const [enabled, setEnabled] = useState(false);

  // Snappier main dot — feels responsive, not laggy
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Slightly lazier ring gives depth without excessive trail
  const trailConfig = { damping: 36, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    // Only enable on devices that have a fine pointer (mouse/trackpad)
    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointer) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]';

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const dataCursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveEl = target.closest(INTERACTIVE);

      if (dataCursorEl) {
        setIsHovering(true);
        setCursorText(dataCursorEl.dataset.cursor || '');
      } else if (interactiveEl) {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const onLeave = () => {
      cursorX.set(-200);
      cursorY.set(-200);
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, cursorX, cursorY, isVisible]);

  if (!enabled) return null;

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed z-[9998] rounded-full pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
          border: '1.5px solid white',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isVisible ? (isHovering ? 0.45 : 0.75) : 0,
        }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Main dot */}
      <motion.div
        className="fixed z-[9999] rounded-full pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: cursorText ? 'normal' : 'difference',
          backgroundColor: cursorText ? '#F72585' : 'white',
        }}
        animate={{
          width:  isHovering && cursorText ? 72 : isHovering ? 14 : 8,
          height: isHovering && cursorText ? 72 : isHovering ? 14 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        {cursorText && (
          <motion.span
            key={cursorText}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-white text-[9px] font-body font-semibold text-center leading-tight px-1 whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
