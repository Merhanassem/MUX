'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const topics = [
  'Validate an idea',
  'Product audit',
  'Full product design',
  'UX Research',
  'Design system',
  'Just to chat',
];

const budgets = ['< $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Let\'s discuss'];

export default function ContactPage() {
  const [topic, setTopic]     = useState<string | null>(null);
  const [budget, setBudget]   = useState<string | null>(null);
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: '', topic, budget, message, website: '' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setSent(true);
      }
    } catch {
      setFormError('Network error. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = `w-full bg-transparent border-b font-body text-base text-primary-text placeholder:text-secondary-text/50 py-4 outline-none transition-colors duration-200`;

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">

        {/* ── Hero ── */}
        <section ref={heroRef} className="pt-40 pb-20 px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase mb-8 block">
              Get in touch
            </span>
            <h1 className="font-display text-[3.5rem] md:text-[6rem] leading-[0.92] text-primary-text mb-8">
              Got something<br />worth{' '}
              <span className="text-pink-brand">building?</span>
            </h1>
            <p className="font-body text-secondary-text text-lg md:text-xl max-w-xl leading-relaxed">
              Tell me what you&apos;re working on. Even if it&apos;s half-formed — that&apos;s usually when the conversation helps most.
            </p>
          </motion.div>
        </section>

        {/* ── Form + Info ── */}
        <section className="px-8 md:px-16 pb-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20">

            {/* ── Form ── */}
            <motion.div ref={formRef}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="py-20"
                  >
                    <div className="w-14 h-14 rounded-full bg-olive/20 border border-olive flex items-center justify-center mb-8">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#718F6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h2 className="font-display text-[2.5rem] text-primary-text mb-4">Message sent.</h2>
                    <p className="font-body text-secondary-text text-lg leading-relaxed max-w-md">
                      I&apos;ll get back to you within 48 hours. In the meantime, feel free to look through the work.
                    </p>
                    <a href="/work" className="inline-flex items-center gap-2 mt-8 text-sm font-body text-secondary-text hover:text-pink-brand transition-colors cursor-none group">
                      Browse the work
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-12"
                  >
                    {/* Topic */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7 }}
                    >
                      <p className="text-xs font-body text-secondary-text tracking-widest uppercase mb-5">I&apos;m reaching out because —</p>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTopic(t === topic ? null : t)}
                            className={`text-sm font-body px-5 py-2.5 rounded-full border transition-all duration-200 cursor-none ${
                              topic === t
                                ? 'bg-primary-text text-background border-primary-text'
                                : 'border-border text-secondary-text hover:border-primary-text hover:text-primary-text'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Name + Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div>
                        <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-1">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          placeholder="Your name"
                          required
                          className={`${inputBase} border-b-2`}
                          style={{ borderColor: focused === 'name' ? '#F72585' : '#E5E0D6' }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-1">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          placeholder="your@email.com"
                          required
                          className={`${inputBase} border-b-2`}
                          style={{ borderColor: focused === 'email' ? '#F72585' : '#E5E0D6' }}
                        />
                      </div>
                    </motion.div>

                    {/* Budget */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.15 }}
                    >
                      <p className="text-[10px] font-body text-secondary-text tracking-widest uppercase mb-5">Budget range</p>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b === budget ? null : b)}
                            className={`text-sm font-body px-4 py-2 rounded-full border transition-all duration-200 cursor-none ${
                              budget === b
                                ? 'bg-primary-text text-background border-primary-text'
                                : 'border-border text-secondary-text hover:border-primary-text hover:text-primary-text'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    >
                      <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-1">Tell me about it</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        placeholder="What are you building? Where are you stuck? What would a win look like?"
                        required
                        rows={5}
                        className={`${inputBase} border-b-2 resize-none`}
                        style={{ borderColor: focused === 'message' ? '#F72585' : '#E5E0D6' }}
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.25 }}
                    >
                      <button
                        type="submit"
                        disabled={loading || !name || !email || !message}
                        className="inline-flex items-center gap-3 bg-primary-text text-background font-body font-medium px-10 py-5 rounded-full hover:bg-pink-brand transition-all duration-300 cursor-none disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      {formError && (
                        <motion.p
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-body text-sm text-red-500 mt-3"
                        >
                          {formError}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Info sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:pt-2"
            >
              <div className="sticky top-32 space-y-12">

                {/* Availability */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-olive"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                    <span className="text-xs font-body text-secondary-text">Available for new projects</span>
                  </div>
                  <p className="font-body text-sm text-secondary-text leading-relaxed">
                    Currently taking on select projects for Q3 2025. Prefer long-term embedded work over short one-off deliverables.
                  </p>
                </div>

                {/* Response time */}
                <div className="border-t border-border pt-10">
                  <p className="text-[10px] font-body text-secondary-text tracking-widest uppercase mb-3">Response time</p>
                  <p className="font-display text-3xl text-primary-text mb-2">48 hours</p>
                  <p className="font-body text-sm text-secondary-text">Usually much faster. I check messages daily.</p>
                </div>

                {/* Direct links */}
                <div className="border-t border-border pt-10">
                  <p className="text-[10px] font-body text-secondary-text tracking-widest uppercase mb-5">Or reach out directly</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Email', href: 'mailto:merhanassem22@gmail.com', value: 'merhanassem22@gmail.com' },
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/merhan-assem-53040a231/', value: 'linkedin.com/in/merhan-assem' },
                      { label: 'Behance', href: 'https://www.behance.net/merhanassem2', value: 'behance.net/merhanassem2' },
                      { label: 'Instagram', href: 'https://www.instagram.com/merhanassim?igsh=aGZwNnVzNjZhMnJn&utm_source=qr', value: '@merhanassim' },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group cursor-none"
                      >
                        <span className="text-xs font-body text-secondary-text">{link.label}</span>
                        <span className="text-xs font-body text-secondary-text group-hover:text-pink-brand transition-colors duration-200">
                          {link.value} →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="border-t border-border pt-10">
                  <p className="font-display text-xl text-primary-text/40 leading-snug">
                    &ldquo;The right question<br />is worth more than<br />a thousand screens.&rdquo;
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
