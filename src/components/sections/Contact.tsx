'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const topics = [
  'We have an idea',
  'We have users but low engagement',
  'We need an MVP',
  'We need design consistency',
  'We are scaling the product',
  'We need another perspective',
];

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="section-padding px-4 md:px-16 bg-primary-text overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body text-white/60 tracking-widest uppercase mb-6 block">
            Let&apos;s work together
          </span>
          <h2 className="font-display text-[2.2rem] md:text-[4.5rem] leading-tight text-background mb-6">
            Got something<br />
            <span style={{ color: '#F08CA6' }}>worth building?</span>
          </h2>
          <p className="font-body text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re building something from scratch, improving an existing product, or looking for an extra pair of hands on your team, I&apos;d love to hear what you&apos;re working on.
          </p>
        </motion.div>

        {/* Topic selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-sm font-body text-white/60 mb-4 text-center">Most conversations start with —</p>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic) => (
              <motion.button
                key={topic}
                onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
                className="text-sm font-body px-5 py-2.5 rounded-full border transition-all duration-300 cursor-none"
                animate={{
                  backgroundColor: selectedTopic === topic ? '#F08CA6' : 'rgba(0,0,0,0)',
                  borderColor: selectedTopic === topic ? '#F08CA6' : 'rgba(255,255,255,0.15)',
                  color: selectedTopic === topic ? '#fff' : 'rgba(255,255,255,0.6)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {topic}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-center space-y-4 mb-20"
        >
          <MagneticButton
            href={`/contact${selectedTopic ? `?topic=${encodeURIComponent(selectedTopic)}` : ''}`}
            variant="default"
            className="bg-pink-brand border-none text-white hover:bg-pink/90 text-base px-10 py-5"
          >
            Let&apos;s talk →
          </MagneticButton>

        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center border-t border-white/10 pt-16"
        >
          <p className="font-display text-3xl md:text-4xl text-white/30 leading-tight">
            &ldquo;The right question<br />
            is worth more than<br />
            a thousand screens.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
