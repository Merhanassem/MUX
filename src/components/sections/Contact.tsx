'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const topics = [
  'Validate an idea',
  'Product audit',
  'UX Research',
  'Full product design',
  'Design system',
  'Just to chat',
];

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="section-padding px-8 md:px-16 bg-primary-text overflow-hidden">
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
          <h2 className="font-display text-[3rem] md:text-[4.5rem] leading-tight text-background mb-6">
            Got something<br />
            <span style={{ color: '#F08CA6' }}>worth building?</span>
          </h2>
          <p className="font-body text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Tell me what you&apos;re working on. Even if it&apos;s half-formed — that&apos;s usually when a conversation helps most.
          </p>
        </motion.div>

        {/* Topic selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-sm font-body text-white/60 mb-4 text-center">I&apos;m reaching out because —</p>
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
            href={`mailto:merhanassem22@gmail.com${selectedTopic ? `?subject=${encodeURIComponent(selectedTopic)}` : ''}`}
            variant="default"
            className="bg-pink-brand border-none text-white hover:bg-pink/90 text-base px-10 py-5"
          >
            Send a message →
          </MagneticButton>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/merhan-assem-53040a231/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-white/55 hover:text-white transition-colors duration-200 cursor-none"
            >
              LinkedIn
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://www.behance.net/merhanassem2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-white/55 hover:text-white transition-colors duration-200 cursor-none"
            >
              Behance
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://www.instagram.com/merhanassim?igsh=aGZwNnVzNjZhMnJn&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-white/55 hover:text-white transition-colors duration-200 cursor-none"
            >
              Instagram
            </a>
          </div>
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
