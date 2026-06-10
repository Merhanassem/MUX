'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const steps = [
  {
    id: 1,
    label: 'Discover',
    tagline: 'What is the actual problem?',
    description: 'Before anything gets designed, I get into the problem. User interviews, session recordings, competitive analysis, stakeholder mapping. The goal: make sure we\'re solving the right thing.',
    tools: ['User Interviews', 'Jobs To Be Done', 'Assumption Mapping', 'Competitive Analysis'],
    color: '#F08CA6',
  },
  {
    id: 2,
    label: 'Define',
    tagline: 'What are we actually building?',
    description: 'Most design problems are really definition problems. I work with teams to get specific about scope, success criteria, and what "done" actually means before screens are made.',
    tools: ['Design Briefs', 'Scope Definition', 'North Star Metrics', 'Jobs Stories'],
    color: '#718F6B',
  },
  {
    id: 3,
    label: 'Design',
    tagline: 'Make it make sense.',
    description: 'Wireframes, prototypes, interaction design, design systems. Built with intention and tested before being considered finished. The craft matters — so does knowing when to stop.',
    tools: ['Figma', 'Prototyping', 'Design Systems', 'Interaction Design'],
    color: '#F08CA6',
  },
  {
    id: 4,
    label: 'Deliver',
    tagline: 'Ship it. For real.',
    description: 'I stay through handoff. Dev specs, edge cases, QA review. A design that doesn\'t survive implementation was never finished in the first place.',
    tools: ['Dev Handoff', 'QA Review', 'Edge Cases', 'Documentation'],
    color: '#718F6B',
  },
  {
    id: 5,
    label: 'Improve',
    tagline: 'Now we learn.',
    description: 'After launch is when the real data arrives. I help teams read results, identify what worked, and feed insights back into the next cycle. The loop never really ends.',
    tools: ['Analytics Review', 'User Testing', 'Iteration Planning', 'Retrospectives'],
    color: '#F08CA6',
  },
];

export default function HowIWork() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding px-5 md:px-16 bg-primary-text overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-10 md:mb-16">
            <span className="text-xs font-body text-secondary-text tracking-widest uppercase mb-4 block">
              The process
            </span>
            <h2 className="font-display text-[2rem] md:text-[3.5rem] leading-tight text-background">
              How I work
            </h2>
          </div>
        </ScrollReveal>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />

            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-6 mb-6 cursor-none"
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-medium"
                    animate={{
                      backgroundColor: activeStep === i ? step.color : 'rgba(0,0,0,0)',
                      borderColor: activeStep === i ? step.color : 'rgba(255,255,255,0.2)',
                      color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}
                    style={{ border: '1.5px solid' }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.div>
                </div>

                <div className="pt-1.5 pb-6">
                  <motion.h3
                    className="font-display text-2xl mb-1"
                    animate={{ color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.5)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.label}
                  </motion.h3>
                  <motion.p
                    className="font-body text-sm"
                    animate={{ color: activeStep === i ? step.color : 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.tagline}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: steps[activeStep].color + '20' }}
              >
                <span className="font-display text-xl" style={{ color: steps[activeStep].color }}>
                  {String(activeStep + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-display text-3xl text-background mb-2">
                {steps[activeStep].label}
              </h3>
              <p className="font-body text-sm mb-6" style={{ color: steps[activeStep].color }}>
                {steps[activeStep].tagline}
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              <div>
                <p className="text-xs font-body text-white/30 uppercase tracking-wider mb-3">Methods</p>
                <div className="flex flex-wrap gap-2">
                  {steps[activeStep].tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-body px-3 py-1.5 rounded-full border"
                      style={{
                        borderColor: steps[activeStep].color + '40',
                        color: steps[activeStep].color,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
