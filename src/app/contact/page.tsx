'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const topics = [
  {
    id: 'idea',
    label: 'We have an idea',
    hint: 'Early stage — need help validating and shaping it',
  },
  {
    id: 'engagement',
    label: 'Low engagement',
    hint: 'Users exist but aren\'t converting or staying',
  },
  {
    id: 'mvp',
    label: 'We need an MVP',
    hint: 'Ready to build — need it designed fast and right',
  },
  {
    id: 'consistency',
    label: 'Design consistency',
    hint: 'Product feels patchy — need a system behind it',
  },
  {
    id: 'scaling',
    label: 'Scaling the product',
    hint: 'Growing fast — design needs to keep up',
  },
  {
    id: 'perspective',
    label: 'Another perspective',
    hint: 'Internal team wants a fresh set of eyes',
  },
];

const budgets = ['< $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Let\'s discuss'];

export default function ContactPage() {
  const [topic, setTopic]       = useState<string | null>(null);
  const [budget, setBudget]     = useState<string | null>(null);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [message, setMessage]   = useState('');
  const [focused, setFocused]   = useState<string | null>(null);
  const [files, setFiles]       = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formRef    = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const allowed = Array.from(incoming).filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...allowed.filter((f) => !names.has(f.name))].slice(0, 5);
    });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormError(null);
    setLoading(true);
    try {
      const selectedTopic = topics.find((t) => t.id === topic)?.label ?? topic ?? '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: '', topic: selectedTopic, budget, message, website: '' }),
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

  const inputClass = (field: string) =>
    `w-full bg-[#F7F5F1] border rounded-xl font-body text-base text-primary-text placeholder:text-secondary-text/50 px-5 py-4 outline-none transition-all duration-200 ${
      focused === field ? 'border-pink-brand ring-2 ring-pink-brand/10' : 'border-border'
    }`;

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-5 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-xs font-body text-secondary-text tracking-[0.18em] uppercase mb-6 block">
              Let&apos;s work together
            </span>
            <h1 className="font-display text-[2.4rem] md:text-[5.5rem] leading-[0.94] text-primary-text mb-6 md:mb-8">
              Got something<br />
              worth{' '}
              <span className="text-pink-brand">building?</span>
            </h1>
            <p className="font-body text-secondary-text text-lg md:text-xl max-w-2xl leading-relaxed">
              Whether you&apos;re building something from scratch, improving an existing product,
              or looking for an extra pair of hands on your team — I&apos;d love to hear what
              you&apos;re working on.
            </p>
          </motion.div>
        </section>

        {/* ── Form + Sidebar ── */}
        <section className="px-5 md:px-16 pb-20 md:pb-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">

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
                    className="space-y-8"
                  >

                    {/* ── Step 1: Reason ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6 }}
                      className="bg-[#F7F5F1] border border-border rounded-2xl p-6 md:p-7"
                    >
                      <p className="text-xs font-body text-secondary-text tracking-widest uppercase mb-1">Step 01</p>
                      <p className="font-display text-xl text-primary-text mb-5">What best describes your situation?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {topics.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTopic(t.id === topic ? null : t.id)}
                            className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-none ${
                              topic === t.id
                                ? 'bg-primary-text text-background border-primary-text'
                                : 'bg-background border-border hover:border-primary-text'
                            }`}
                          >
                            <p className={`font-body text-sm font-medium mb-0.5 ${topic === t.id ? 'text-background' : 'text-primary-text'}`}>
                              {t.label}
                            </p>
                            <p className={`font-body text-xs leading-snug ${topic === t.id ? 'text-background/65' : 'text-secondary-text'}`}>
                              {t.hint}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* ── Step 2: Details ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="bg-[#F7F5F1] border border-border rounded-2xl p-6 md:p-7 space-y-6"
                    >
                      <div>
                        <p className="text-xs font-body text-secondary-text tracking-widest uppercase mb-1">Step 02</p>
                        <p className="font-display text-xl text-primary-text mb-5">Tell me about you</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-2">Name *</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            placeholder="Your name"
                            required
                            className={inputClass('name')}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-2">Email *</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            placeholder="your@email.com"
                            required
                            className={inputClass('email')}
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-3">Budget range</label>
                        <div className="flex flex-wrap gap-2">
                          {budgets.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setBudget(b === budget ? null : b)}
                              className={`text-sm font-body px-4 py-2 rounded-full border transition-all duration-200 cursor-none ${
                                budget === b
                                  ? 'bg-primary-text text-background border-primary-text'
                                  : 'bg-background border-border text-secondary-text hover:border-primary-text hover:text-primary-text'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* ── Step 3: Message ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.18 }}
                      className="bg-[#F7F5F1] border border-border rounded-2xl p-6 md:p-7 space-y-6"
                    >
                      <div>
                        <p className="text-xs font-body text-secondary-text tracking-widest uppercase mb-1">Step 03</p>
                        <p className="font-display text-xl text-primary-text mb-5">Tell me what you&apos;re working on</p>
                      </div>

                      <div>
                        <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-2">Your message *</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          placeholder="What are you building? Where are you stuck? What would a win look like for you?"
                          required
                          rows={5}
                          className={`${inputClass('message')} resize-none`}
                        />
                      </div>

                      {/* File upload */}
                      <div>
                        <label className="text-[10px] font-body text-secondary-text tracking-widest uppercase block mb-2">
                          Attach files <span className="normal-case tracking-normal ml-1 opacity-60">(optional — briefs, screens, references · max 10MB each · up to 5)</span>
                        </label>
                        <div
                          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-all duration-200 ${
                            dragging ? 'border-pink-brand bg-pink-brand/5' : 'border-border bg-background hover:border-primary-text/40'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-text">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="font-body text-sm text-primary-text font-medium">
                              {dragging ? 'Drop it here' : 'Drag & drop or click to browse'}
                            </p>
                            <p className="font-body text-xs text-secondary-text mt-0.5">PDF, PNG, JPG, Figma links welcome</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.fig,.zip"
                            className="hidden"
                            onChange={(e) => addFiles(e.target.files)}
                          />
                        </div>

                        {/* File list */}
                        <AnimatePresence>
                          {files.length > 0 && (
                            <motion.ul
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 space-y-2"
                            >
                              {files.map((f, i) => (
                                <motion.li
                                  key={f.name}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 8 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-center justify-between bg-background border border-border rounded-lg px-4 py-2.5"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-text flex-shrink-0">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    <span className="font-body text-xs text-primary-text truncate">{f.name}</span>
                                    <span className="font-body text-xs text-secondary-text flex-shrink-0">
                                      {(f.size / 1024).toFixed(0)} KB
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                                    className="text-secondary-text hover:text-primary-text transition-colors cursor-none ml-3 flex-shrink-0"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                  </button>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* ── Submit ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.26 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <button
                        type="submit"
                        disabled={loading || !name || !email || !message}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary-text text-background font-body font-medium px-10 py-5 rounded-full hover:bg-pink-brand transition-all duration-300 cursor-none disabled:opacity-40 disabled:cursor-not-allowed group text-base"
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
                            Let&apos;s talk
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="font-body text-xs text-secondary-text hidden sm:block">
                        I&apos;ll reply within 48 hours.
                      </p>
                    </motion.div>

                    {formError && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-body text-sm text-red-500"
                      >
                        {formError}
                      </motion.p>
                    )}

                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 space-y-6">

                {/* Availability card */}
                <div className="bg-primary-text text-background rounded-2xl p-6 md:p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-[#A8D5A2]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                    <span className="text-xs font-body text-background/70 tracking-wider uppercase">Available now</span>
                  </div>
                  <p className="font-display text-2xl text-background mb-3 leading-snug">
                    Taking on select projects for Q3 2025
                  </p>
                  <p className="font-body text-sm text-background/65 leading-relaxed">
                    I prefer embedded, long-term work over one-off deliverables — but happy to start with a focused sprint.
                  </p>
                </div>

                {/* Response time */}
                <div className="bg-[#F7F5F1] border border-border rounded-2xl p-6 md:p-7">
                  <p className="text-[10px] font-body text-secondary-text tracking-widest uppercase mb-3">Response time</p>
                  <p className="font-display text-4xl text-primary-text mb-2">48 hrs</p>
                  <p className="font-body text-sm text-secondary-text leading-relaxed">Usually much faster. I check messages every day.</p>
                </div>

                {/* Direct links */}
                <div className="bg-[#F7F5F1] border border-border rounded-2xl p-6 md:p-7">
                  <p className="text-[10px] font-body text-secondary-text tracking-widest uppercase mb-5">Or reach out directly</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Email', href: 'mailto:merhanassem22@gmail.com', value: 'merhanassem22@gmail.com' },
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/merhan-assem-53040a231/', value: 'linkedin.com/in/merhan-assem' },
                      { label: 'Behance', href: 'https://www.behance.net/merhanassem2', value: 'behance.net/merhanassem2' },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 group cursor-none py-1.5"
                      >
                        <span className="text-[10px] sm:text-xs font-body text-secondary-text tracking-wider uppercase sm:normal-case sm:tracking-normal flex-shrink-0">{link.label}</span>
                        <span className="text-xs font-body text-primary-text sm:text-secondary-text group-hover:text-pink-brand transition-colors duration-200 truncate">
                          {link.value} →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="px-2">
                  <p className="font-display text-xl text-primary-text/30 leading-snug">
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
