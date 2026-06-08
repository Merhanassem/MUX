'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashIntroProps {
  onComplete: () => void;
}

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true); // Always show on every page load

  const dismiss = () => {
    if (videoRef.current) videoRef.current.pause();
    setVisible(false);
    setTimeout(onComplete, 850); // Wait for fade-out before revealing hero
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dopd3akqm/video/upload/mux/hero-video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={dismiss}
            className="w-full h-full object-cover"
          />

          {/* Skip — appears after 2s */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 2, duration: 0.6 }}
            onClick={dismiss}
            className="absolute bottom-10 right-10 text-xs font-body tracking-[0.15em] uppercase"
            style={{ color: 'rgba(247,245,241,0.85)' }}
            whileHover={{ opacity: 1 }}
          >
            Skip intro ↓
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
