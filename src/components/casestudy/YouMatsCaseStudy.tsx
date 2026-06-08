'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';

/* ── Brand tokens ─────────────────────────────────────────────────────────── */
const BG      = '#070B14';
const BG2     = '#0C1120';
const BG3     = '#111828';
const ACCENT  = '#2563EB';
const ORANGE  = '#E8700D';
const GREEN   = '#10B981';
const PURPLE  = '#8B5CF6';
const YELLOW  = '#F59E0B';
const STROKE  = '#1A2535';
const MUTED   = '#5A6880';
const TEXT    = '#E2E8F0';
const TEXT2   = '#94A3B8';

/* ── Shared helpers ───────────────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ width: 24, height: 1.5, background: ACCENT }} />
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: ACCENT, fontFamily: 'monospace', textTransform: 'uppercase' }}>
        {text}
      </span>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function BrowserFrame({ src, label, className = '', objectPosition = 'top', objectFit = 'cover', aspectRatio = '16/9', url = 'youmats.com' }: {
  src?: string | null; label?: string; className?: string; objectPosition?: string; objectFit?: string; aspectRatio?: string; url?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${STROKE}`, boxShadow: `0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px ${ACCENT}12` }}>
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#090D16', borderBottom: `1px solid ${STROKE}` }}>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E2A3A' }} />
            ))}
          </div>
          <div className="flex-1 ml-2 rounded px-3 py-1 flex items-center gap-1.5" style={{ background: BG, border: `1px solid ${STROKE}` }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke={MUTED} strokeWidth="1.2" />
              <path d="M4 6h4M6 4v4" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 9, color: MUTED, fontFamily: 'monospace' }}>{url}</span>
          </div>
        </div>
        <div style={{ aspectRatio, background: BG2, overflow: 'hidden', position: 'relative' }}>
          {src ? (
            <img src={src} alt="YouMats screen" className="w-full h-full" style={{ objectFit, objectPosition } as React.CSSProperties} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}14`, border: `1px solid ${ACCENT}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity={0.6}>
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.2em' }}>SCREEN</span>
            </div>
          )}
        </div>
      </div>
      {label && (
        <p className="text-center mt-3" style={{ fontSize: 10, color: MUTED, fontFamily: 'monospace', letterSpacing: '0.16em' }}>
          {label}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S1 — THE ECOSYSTEM
══════════════════════════════════════════════════════════════════════════════ */
function S1Ecosystem() {
  return (
    <section style={{ background: BG, padding: '120px 0 100px' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="01 — Platform Ecosystem" />
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: TEXT, lineHeight: 1.08, marginBottom: 20 }}>
            One platform.<br />
            <span style={{ color: ACCENT }}>Entire construction supply chain.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 16, maxWidth: 560, marginBottom: 80, lineHeight: 1.75 }}>
            YouMats unifies construction material sourcing, vendor management, quotation workflows, and service coordination
            inside a single commerce ecosystem.
          </p>
        </FadeUp>

        {/* Architecture diagram */}
        <FadeUp delay={0.15}>
          <div className="flex flex-col items-center">
            {/* Customers */}
            <div style={{ background: BG3, border: `1.5px solid ${ACCENT}40`, borderRadius: 18, padding: '22px 48px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>👥</div>
              <div style={{ fontWeight: 700, color: TEXT, fontSize: 15 }}>Customers</div>
              <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>Browse · Compare · Order</div>
            </div>
            {/* Connector */}
            <div style={{ width: 1.5, height: 44, background: `linear-gradient(to bottom, ${ACCENT}50, ${ACCENT})` }} />

            {/* Platform core */}
            <div style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #1D4ED8 100%)`, borderRadius: 24, padding: '32px 56px', textAlign: 'center', minWidth: 360, boxShadow: `0 0 80px ${ACCENT}30, 0 24px 60px rgba(0,0,0,0.45)` }}>
              <div style={{ fontSize: 38, marginBottom: 12 }}>🏗️</div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.01em' }}>YouMats Platform</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 6, marginBottom: 20 }}>
                Unified Construction Commerce Engine
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Customer Web', 'Vendor Web', 'Dashboard', 'Orders', 'Quotations', 'Services', 'Revenue', 'Catalog'].map(t => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, padding: '3px 10px', fontSize: 10, color: '#fff', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Branch connectors */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 700, height: 60 }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1.5, height: 30, background: ACCENT }} />
              <div style={{ position: 'absolute', top: 30, left: '14%', right: '14%', height: 1.5, background: ACCENT }} />
              <div style={{ position: 'absolute', top: 30, left: '14%', width: 1.5, height: 30, background: ACCENT }} />
              <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', width: 1.5, height: 30, background: ACCENT }} />
              <div style={{ position: 'absolute', top: 30, right: '14%', width: 1.5, height: 30, background: ACCENT }} />
            </div>

            {/* Bottom 3 */}
            <div className="grid grid-cols-3 gap-6" style={{ maxWidth: 700, width: '100%' }}>
              {[
                { icon: '🏢', label: 'Vendors', desc: 'List · Manage · Fulfill', c: ORANGE },
                { icon: '📦', label: 'Products', desc: 'Catalog · Pricing · Stock', c: GREEN },
                { icon: '🔧', label: 'Services', desc: 'Install · Build · Consult', c: PURPLE },
              ].map(n => (
                <div key={n.label} style={{ background: BG3, border: `1.5px solid ${n.c}35`, borderRadius: 18, padding: '22px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{n.icon}</div>
                  <div style={{ fontWeight: 700, color: TEXT, fontSize: 14 }}>{n.label}</div>
                  <div style={{ color: MUTED, fontSize: 11, marginTop: 5 }}>{n.desc}</div>
                  <div style={{ marginTop: 14, height: 2, background: n.c, borderRadius: 999, opacity: 0.7 }} />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-4 gap-5 mt-20">
            {[
              { n: '15k+', label: 'Products in Catalog' },
              { n: '2,500+', label: 'Trusted Suppliers' },
              { n: '8,000+', label: 'Orders Processed' },
              { n: '8', label: 'Platform Modules' },
            ].map(s => (
              <div key={s.label} style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 16, padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 10, letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S2 — THE CHALLENGE
══════════════════════════════════════════════════════════════════════════════ */
const CHALLENGES = [
  {
    n: '01', icon: '🏗️', color: ACCENT,
    title: 'Construction Procurement',
    desc: 'Fragmented sourcing across dozens of disconnected suppliers with no unified interface for pricing, availability, or ordering.',
  },
  {
    n: '02', icon: '🔍', color: ORANGE,
    title: 'Supplier Discovery',
    desc: 'No structured way to find, evaluate, or compare verified vendors with real product catalogs and transparent pricing.',
  },
  {
    n: '03', icon: '📋', color: GREEN,
    title: 'Quotation Management',
    desc: 'Quotation workflows were manual, inconsistent, and slow — creating friction between customers and suppliers at every step.',
  },
  {
    n: '04', icon: '🔧', color: PURPLE,
    title: 'Service Coordination',
    desc: 'No platform linking construction material purchases with installation and service providers in a single seamless workflow.',
  },
];

function S2Challenge() {
  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="02 — The Challenge" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Construction commerce<br /><span style={{ color: ACCENT }}>was broken.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 500, marginBottom: 60, lineHeight: 1.7 }}>
            The construction industry relied on fragmented, manual, analog processes. Four critical problems demanded a product solution.
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 gap-5">
          {CHALLENGES.map((c, i) => (
            <FadeUp key={c.n} delay={i * 0.08}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '36px 32px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: -8, right: 20, fontSize: 90, fontWeight: 900, color: `${c.color}07`, fontFamily: 'monospace', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {c.n}
                </div>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${c.color}16`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 22 }}>
                  {c.icon}
                </div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 18, marginBottom: 12 }}>{c.title}</div>
                <div style={{ color: TEXT2, fontSize: 14, lineHeight: 1.7 }}>{c.desc}</div>
                <div style={{ marginTop: 24, height: 2, width: 40, background: c.color, borderRadius: 999 }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S3 — COMMERCE ARCHITECTURE
══════════════════════════════════════════════════════════════════════════════ */
const ARCH_MODULES = [
  { icon: '🌐', label: 'Customer Website', sub: 'Browse · Search · Cart · Checkout', color: ACCENT },
  { icon: '🏪', label: 'Vendor Website', sub: 'Profile · Catalog · Inquiries', color: ORANGE },
  { icon: '📊', label: 'Vendor Dashboard', sub: 'Orders · Quotes · Revenue · Analytics', color: GREEN },
  { icon: '📦', label: 'Order Management', sub: 'Track · Fulfill · History · Invoices', color: PURPLE },
  { icon: '💬', label: 'Quotations System', sub: 'Request · Negotiate · Approve · Close', color: YELLOW },
  { icon: '🔧', label: 'Service Marketplace', sub: 'Browse · Book · Complete · Review', color: '#EC4899' },
  { icon: '💰', label: 'Revenue Tracking', sub: 'Payments · Reports · Commissions', color: '#14B8A6' },
];

function S3Architecture() {
  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="03 — Commerce Architecture" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Built for complexity.<br /><span style={{ color: ACCENT }}>Designed for simplicity.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 520, marginBottom: 60, lineHeight: 1.7 }}>
            A modular platform where every actor, transaction, and workflow is connected through a unified commerce layer.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          {/* Bento-style architecture map */}
          <div className="grid grid-cols-3 gap-4">
            {/* Top row */}
            <div style={{ background: BG3, border: `1px solid ${ACCENT}35`, borderRadius: 20, padding: '28px 24px', gridColumn: '1' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>🌐</div>
              <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 6 }}>Customer Website</div>
              <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>Product discovery, categories, filters, search, cart, and checkout.</div>
              <div style={{ marginTop: 16, height: 2, background: ACCENT, borderRadius: 999, opacity: 0.7 }} />
            </div>

            {/* Center — Platform core (spans 1 col, 2 rows) */}
            <div style={{ background: `linear-gradient(160deg, ${ACCENT}20 0%, ${ACCENT}08 100%)`, border: `1px solid ${ACCENT}40`, borderRadius: 20, padding: '32px 28px', gridRow: '1 / 3', gridColumn: '2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, boxShadow: `inset 0 0 60px ${ACCENT}08` }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: `0 0 40px ${ACCENT}40` }}>🏗️</div>
              <div>
                <div style={{ fontWeight: 800, color: TEXT, fontSize: 18 }}>YouMats</div>
                <div style={{ color: ACCENT, fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.1em', marginTop: 4 }}>COMMERCE ENGINE</div>
              </div>
              <div style={{ height: 1, width: '80%', background: `${ACCENT}30` }} />
              <div style={{ color: TEXT2, fontSize: 12, lineHeight: 1.7 }}>
                Connects customers, vendors, products, services, quotations, and revenue in one unified platform.
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['B2B', 'Commerce', 'SaaS', 'Multi-vendor'].map(t => (
                  <span key={t} style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`, borderRadius: 999, padding: '2px 8px', fontSize: 9, color: ACCENT, fontFamily: 'monospace' }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ background: BG3, border: `1px solid ${ORANGE}35`, borderRadius: 20, padding: '28px 24px', gridColumn: '3' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>🏪</div>
              <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 6 }}>Vendor Website</div>
              <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>Vendor profile pages, product listings, and customer inquiry handling.</div>
              <div style={{ marginTop: 16, height: 2, background: ORANGE, borderRadius: 999, opacity: 0.7 }} />
            </div>

            {/* Second row left */}
            <div style={{ background: BG3, border: `1px solid ${GREEN}35`, borderRadius: 20, padding: '28px 24px', gridColumn: '1' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>📊</div>
              <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 6 }}>Vendor Dashboard</div>
              <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>Order management, revenue analytics, product control, and quotation tools.</div>
              <div style={{ marginTop: 16, height: 2, background: GREEN, borderRadius: 999, opacity: 0.7 }} />
            </div>

            {/* Second row right */}
            <div style={{ background: BG3, border: `1px solid ${PURPLE}35`, borderRadius: 20, padding: '28px 24px', gridColumn: '3' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>📦</div>
              <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 6 }}>Order Management</div>
              <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>End-to-end order tracking, fulfillment status, invoices, and history.</div>
              <div style={{ marginTop: 16, height: 2, background: PURPLE, borderRadius: 999, opacity: 0.7 }} />
            </div>

            {/* Bottom row — 3 small */}
            {[
              { icon: '💬', label: 'Quotations', sub: 'Request · Respond · Approve', c: YELLOW },
              { icon: '🔧', label: 'Services', sub: 'Browse · Book · Complete', c: '#EC4899' },
              { icon: '💰', label: 'Revenue', sub: 'Payments · Reports · Analytics', c: '#14B8A6' },
            ].map(m => (
              <div key={m.label} style={{ background: BG3, border: `1px solid ${m.c}35`, borderRadius: 20, padding: '24px 20px' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{m.icon}</div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 13, marginBottom: 5 }}>{m.label}</div>
                <div style={{ color: MUTED, fontSize: 11 }}>{m.sub}</div>
                <div style={{ marginTop: 14, height: 2, background: m.c, borderRadius: 999, opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S4 — CUSTOMER EXPERIENCE
══════════════════════════════════════════════════════════════════════════════ */
const CUSTOMER_SCREENS = [
  { src: null, label: 'HOMEPAGE' },
  { src: null, label: 'CATEGORIES' },
  { src: null, label: 'PRODUCT LISTING' },
  { src: null, label: 'PRODUCT DETAIL' },
  { src: null, label: 'SEARCH & FILTERS' },
  { src: null, label: 'CART & CHECKOUT' },
];

const FEATURES_CUSTOMER = [
  { icon: '🔍', label: 'Smart Search', desc: 'Search across 15,000+ construction materials with filter-driven discovery.' },
  { icon: '📂', label: 'Deep Categories', desc: 'Hierarchical product categories across all construction material types.' },
  { icon: '⚖️', label: 'Compare Products', desc: 'Side-by-side spec comparison for materials, prices, and suppliers.' },
  { icon: '🛒', label: 'Frictionless Cart', desc: 'Multi-vendor cart with consolidated checkout and order placement.' },
];

function S4CustomerExperience() {
  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="04 — Customer Experience" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Procurement made<br /><span style={{ color: ACCENT }}>effortless.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 520, marginBottom: 60, lineHeight: 1.7 }}>
            A consumer-grade shopping experience built for B2B construction procurement — with the depth professionals demand.
          </p>
        </FadeUp>

        {/* Feature pills */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-4 gap-4 mb-12">
            {FEATURES_CUSTOMER.map(f => (
              <div key={f.label} style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 16, padding: '20px 18px' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 600, color: TEXT, fontSize: 13, marginBottom: 6 }}>{f.label}</div>
                <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Large hero screen */}
        <FadeUp delay={0.15}>
          <BrowserFrame src="/ym-homepage.png" label="HOMEPAGE · PRODUCT DISCOVERY" className="w-full mb-6" />
        </FadeUp>

        {/* 3-col gallery */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { src: '/ym-categories.png',      label: 'CATEGORIES' },
            { src: '/ym-product-listing.png', label: 'PRODUCT LISTING' },
            { src: '/ym-product-detail.png',  label: 'PRODUCT DETAIL' },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={0.05 * i}>
              <BrowserFrame src={s.src} label={s.label} />
            </FadeUp>
          ))}
        </div>

        {/* 2-col gallery */}
        <div className="grid grid-cols-2 gap-5 mt-5">
          {[
            { src: '/ym-cart.png',     label: 'CART' },
            { src: '/ym-checkout.png', label: 'CHECKOUT' },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={0.05 * i}>
              <BrowserFrame src={s.src} label={s.label} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S5 — QUOTATION EXPERIENCE
══════════════════════════════════════════════════════════════════════════════ */
const QUOTE_STEPS = [
  { n: '01', icon: '🛍️', label: 'Browse Product', desc: 'Customer finds materials across the catalog' },
  { n: '02', icon: '📝', label: 'Request Quote', desc: 'Sends quotation request with specs & quantity' },
  { n: '03', icon: '💬', label: 'Vendor Response', desc: 'Vendor reviews and submits a competitive bid' },
  { n: '04', icon: '✅', label: 'Approval', desc: 'Customer reviews offers and approves the best' },
  { n: '05', icon: '📦', label: 'Order Placed', desc: 'Approved quote converts to a confirmed order' },
];

function S5QuotationExperience() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ['start start', 'end end'] });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setActiveStep(Math.min(QUOTE_STEPS.length - 1, Math.floor(v * QUOTE_STEPS.length)));
  });

  return (
    <div ref={stickyRef} style={{ height: `${QUOTE_STEPS.length * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: BG, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="max-w-6xl mx-auto px-8 w-full">
          <FadeUp>
            <SectionLabel text="05 — Quotation Experience" />
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 8 }}>
              The heart of the platform.
            </h2>
            <p style={{ color: TEXT2, fontSize: 14, maxWidth: 440, marginBottom: 48, lineHeight: 1.7 }}>
              A structured, transparent quotation workflow that converts procurement complexity into a repeatable, scalable process.
            </p>
          </FadeUp>

          <div className="flex gap-4 items-stretch">
            {/* Step list */}
            <div className="flex flex-col gap-3" style={{ minWidth: 280 }}>
              {QUOTE_STEPS.map((s, i) => (
                <motion.div key={s.n}
                  animate={{ opacity: i === activeStep ? 1 : 0.35, x: i === activeStep ? 0 : -4 }}
                  transition={{ duration: 0.35 }}
                  style={{ background: i === activeStep ? `${ACCENT}16` : BG3, border: `1px solid ${i === activeStep ? ACCENT : STROKE}`, borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'default' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: i === activeStep ? ACCENT : BG2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, transition: 'background 0.3s' }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: i === activeStep ? TEXT : TEXT2, fontSize: 13 }}>{s.label}</div>
                    <div style={{ color: MUTED, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step detail */}
            <div className="flex-1">
              <motion.div key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{QUOTE_STEPS[activeStep].icon}</div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', color: ACCENT, marginBottom: 12 }}>
                  STEP {QUOTE_STEPS[activeStep].n} / {QUOTE_STEPS.length}
                </div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 28, marginBottom: 16, lineHeight: 1.2 }}>
                  {QUOTE_STEPS[activeStep].label}
                </div>
                <div style={{ color: TEXT2, fontSize: 15, lineHeight: 1.75, maxWidth: 360 }}>
                  {QUOTE_STEPS[activeStep].desc}
                </div>
                {/* Progress bar */}
                <div style={{ marginTop: 40, height: 3, background: STROKE, borderRadius: 999 }}>
                  <motion.div
                    animate={{ width: `${((activeStep + 1) / QUOTE_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    style={{ height: '100%', background: ACCENT, borderRadius: 999 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Quotation Screen Gallery (after sticky section) */
function S5Gallery() {
  return (
    <section style={{ background: BG, padding: '80px 0 100px' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <p style={{ fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.16em', color: MUTED, marginBottom: 40 }}>
            — QUOTATION SCREENS
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <BrowserFrame src="/ym-quotation-request.png" label="QUOTATION REQUEST FORM" className="w-full mb-5" aspectRatio="5760/5204" objectFit="cover" />
        </FadeUp>
        <div className="grid grid-cols-2 gap-5">
          {[
            { src: '/ym-vendor-response.png', label: 'VENDOR RESPONSE VIEW' },
            { src: '/ym-quote-approval.png',  label: 'QUOTE APPROVAL SCREEN' },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={0.05 * i}>
              <BrowserFrame src={s.src} label={s.label} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S6 — SERVICE MARKETPLACE
══════════════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  { icon: '🍳', label: 'Kitchen Installation', desc: 'Full kitchen fit-out with verified installation specialists.', color: ORANGE },
  { icon: '🚿', label: 'Bathroom Installation', desc: 'Bathroom renovation and plumbing installation services.', color: ACCENT },
  { icon: '🛋️', label: 'Furniture Services', desc: 'Furniture assembly, installation, and room setup.', color: PURPLE },
  { icon: '🏗️', label: 'Construction Services', desc: 'Structural, finishing, and specialized construction trades.', color: GREEN },
];

const SERVICE_FLOW = [
  { icon: '📦', label: 'Buy Material' },
  { icon: '➕', label: 'Add Service' },
  { icon: '📅', label: 'Book Slot' },
  { icon: '👷', label: 'Installation' },
  { icon: '✅', label: 'Completed' },
];

function S6ServiceMarketplace() {
  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="06 — Service Marketplace" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Products meet<br /><span style={{ color: ACCENT }}>professional services.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 520, marginBottom: 60, lineHeight: 1.7 }}>
            YouMats connects material purchases with certified service providers — turning a product catalog into a complete procurement and installation solution.
          </p>
        </FadeUp>

        {/* Service cards */}
        <div className="grid grid-cols-4 gap-5 mb-14">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '28px 22px', height: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}16`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>
                  {s.icon}
                </div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 8 }}>{s.label}</div>
                <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.65 }}>{s.desc}</div>
                <div style={{ marginTop: 20, height: 2, background: s.color, borderRadius: 999, opacity: 0.6 }} />
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Service flow */}
        <FadeUp delay={0.2}>
          <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 24, padding: '40px 48px', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.2em', color: MUTED, marginBottom: 32 }}>
              — SERVICE PURCHASE FLOW
            </p>
            <div className="flex items-center justify-between">
              {SERVICE_FLOW.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ACCENT}14`, border: `1px solid ${ACCENT}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                      {step.icon}
                    </div>
                    <span style={{ fontSize: 11, color: TEXT2, fontWeight: 500, textAlign: 'center', maxWidth: 80 }}>{step.label}</span>
                  </div>
                  {i < SERVICE_FLOW.length - 1 && (
                    <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${ACCENT}60, ${ACCENT}20)`, marginBottom: 24, minWidth: 32 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Screen gallery */}
        <FadeUp delay={0.25}>
          <div className="grid grid-cols-3 gap-5 mt-10">
            {['SERVICE MARKETPLACE', 'SERVICE DETAIL', 'BOOKING FLOW'].map((l, i) => (
              <BrowserFrame key={l} src={null} label={l} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S7 — VENDOR EXPERIENCE
══════════════════════════════════════════════════════════════════════════════ */
const VENDOR_MODULES = [
  { icon: '📦', label: 'Orders', desc: 'Manage incoming orders, track fulfillment, update status.', color: ACCENT },
  { icon: '💬', label: 'Quotations', desc: 'Receive RFQs, submit competitive bids, track responses.', color: ORANGE },
  { icon: '💰', label: 'Revenue', desc: 'View earnings, commissions, payment history, and reports.', color: GREEN },
  { icon: '🗂️', label: 'Products', desc: 'Manage your entire catalog — add, edit, price, and stock.', color: PURPLE },
  { icon: '🔧', label: 'Services', desc: 'List your services, manage bookings and completions.', color: YELLOW },
  { icon: '👥', label: 'Customers', desc: 'View customer history, contacts, and purchase patterns.', color: '#EC4899' },
];

function S7VendorExperience() {
  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="07 — Vendor Experience" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Complete vendor<br /><span style={{ color: ACCENT }}>self-service.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 520, marginBottom: 60, lineHeight: 1.7 }}>
            Vendors get a dedicated dashboard to manage their entire operations — from products to payments — without any manual coordination.
          </p>
        </FadeUp>

        {/* Module grid */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {VENDOR_MODULES.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.07}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 18, padding: '24px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${m.color}16`, border: `1px solid ${m.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: TEXT, fontSize: 14, marginBottom: 5 }}>{m.label}</div>
                  <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6 }}>{m.desc}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Dashboard screenshots */}
        <FadeUp delay={0.1}>
          <BrowserFrame src="/ym-vendor-dashboard.png" label="VENDOR DASHBOARD — OVERVIEW" className="w-full mb-5" url="vendor.youmats.com/dashboard" />
        </FadeUp>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {[
            { src: '/ym-order-management.png',  label: 'ORDER MANAGEMENT' },
            { src: '/ym-quotation-center.png',  label: 'QUOTATION CENTER' },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={0.05 * i}>
              <BrowserFrame src={s.src} label={s.label} url="vendor.youmats.com" />
            </FadeUp>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { src: '/ym-product-catalog.png',    label: 'PRODUCT CATALOG MANAGER' },
            { src: '/ym-revenue-analytics.png',  label: 'REVENUE ANALYTICS' },
            { src: '/ym-services.png',           label: 'SERVICES' },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={0.05 * i}>
              <BrowserFrame src={s.src} label={s.label} url="vendor.youmats.com" />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S8 — KEY PRODUCT DECISIONS
══════════════════════════════════════════════════════════════════════════════ */
const DECISIONS = [
  {
    n: '01', color: ACCENT,
    title: 'Large Product Catalogs',
    challenge: 'Displaying 15,000+ SKUs without overwhelming users or degrading search performance.',
    decision: 'Built a deep category hierarchy with faceted filtering, smart search ranking, and progressive loading.',
    impact: 'Buyers locate the right product in under 3 interactions regardless of catalog size.',
  },
  {
    n: '02', color: ORANGE,
    title: 'Quotation Workflows',
    challenge: 'Manual back-and-forth between customers and vendors created delays and lost opportunities.',
    decision: 'Designed a structured RFQ system with defined states, notifications, and approval gates for both parties.',
    impact: 'Quotation cycle time reduced significantly. Clear accountability at every workflow stage.',
  },
  {
    n: '03', color: GREEN,
    title: 'Vendor Self-Service',
    challenge: 'Vendors needed to manage complex operations without support overhead on every action.',
    decision: 'Built a comprehensive vendor dashboard covering orders, products, quotations, services, and revenue in one interface.',
    impact: 'Vendors operate independently end-to-end. Support workload reduced across the board.',
  },
  {
    n: '04', color: PURPLE,
    title: 'Services Integration',
    challenge: 'Services felt disconnected from the product purchase experience, reducing adoption.',
    decision: 'Integrated services directly into the product purchase flow — buy a material, add the installation in the same transaction.',
    impact: 'Service bookings increased significantly by reducing the friction of a separate purchase decision.',
  },
];

function S8ProductDecisions() {
  return (
    <section style={{ background: BG2, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="08 — Key Product Decisions" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Every choice<br /><span style={{ color: ACCENT }}>had a reason.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.7 }}>
            Four critical design and product decisions that shaped the YouMats platform's architecture and experience.
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 gap-5">
          {DECISIONS.map((d, i) => (
            <FadeUp key={d.n} delay={i * 0.08}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '36px 32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -8, right: 20, fontSize: 90, fontWeight: 900, color: `${d.color}07`, fontFamily: 'monospace', lineHeight: 1, userSelect: 'none' }}>
                  {d.n}
                </div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 18, marginBottom: 24 }}>{d.title}</div>
                {[
                  { tag: 'CHALLENGE', val: d.challenge, c: '#F87171' },
                  { tag: 'DECISION', val: d.decision, c: ACCENT },
                  { tag: 'IMPACT', val: d.impact, c: GREEN },
                ].map(row => (
                  <div key={row.tag} style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.2em', color: row.c, fontWeight: 600 }}>
                      {row.tag}
                    </span>
                    <div style={{ color: TEXT2, fontSize: 13, lineHeight: 1.65, marginTop: 4 }}>{row.val}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S9 — END-TO-END COMMERCE FLOW
══════════════════════════════════════════════════════════════════════════════ */
const COMMERCE_FLOW = [
  { icon: '🔍', label: 'Discover', desc: 'Browse catalog' },
  { icon: '⚖️', label: 'Compare', desc: 'Evaluate options' },
  { icon: '💬', label: 'Request Quote', desc: 'RFQ to vendors' },
  { icon: '✅', label: 'Approve', desc: 'Select best bid' },
  { icon: '🛒', label: 'Order', desc: 'Place & confirm' },
  { icon: '📦', label: 'Fulfill', desc: 'Deliver & complete' },
];

function S9CommerceFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: BG, padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="09 — End-to-End Commerce Flow" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            From discovery<br /><span style={{ color: ACCENT }}>to delivery.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.7 }}>
            A complete, digitized procurement journey — every step connected, every actor accounted for.
          </p>
        </FadeUp>

        <div ref={ref} style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 28, padding: '56px 48px' }}>
          <div className="flex items-start justify-between">
            {COMMERCE_FLOW.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: 64, height: 64, borderRadius: 18, background: `${ACCENT}16`, border: `1.5px solid ${ACCENT}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                    {step.icon}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                    style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: TEXT, fontSize: 13 }}>{step.label}</div>
                    <div style={{ color: MUTED, fontSize: 11, marginTop: 3 }}>{step.desc}</div>
                  </motion.div>
                </div>
                {i < COMMERCE_FLOW.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${ACCENT}70, ${ACCENT}30)`, marginTop: 32, minWidth: 20, transformOrigin: 'left' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   S10 — OUTCOME
══════════════════════════════════════════════════════════════════════════════ */
const OUTCOMES = [
  {
    icon: '🔗', color: ACCENT,
    metric: 'Unified Access',
    title: 'Improved Supplier Accessibility',
    desc: 'Construction buyers can discover, compare, and connect with verified suppliers across all material categories from a single platform.',
  },
  {
    icon: '⚡', color: GREEN,
    metric: 'Faster Cycles',
    title: 'Streamlined Procurement',
    desc: 'Quotation requests, approvals, and order placements that previously took days of back-and-forth now complete within a structured, trackable workflow.',
  },
  {
    icon: '📊', color: ORANGE,
    metric: 'Full Control',
    title: 'Centralized Vendor Operations',
    desc: 'Vendors manage their entire business — products, orders, quotations, services, and revenue — from one self-service dashboard.',
  },
];

function S10Outcome() {
  return (
    <section style={{ background: BG2, padding: '100px 0 120px' }}>
      <div className="max-w-6xl mx-auto px-8">
        <FadeUp>
          <SectionLabel text="10 — Outcome" />
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Numbers that<br /><span style={{ color: ACCENT }}>tell the story.</span>
          </h2>
          <p style={{ color: TEXT2, fontSize: 15, maxWidth: 480, marginBottom: 60, lineHeight: 1.7 }}>
            YouMats transformed fragmented construction commerce into a structured, scalable, digital ecosystem.
          </p>
        </FadeUp>
        <div className="grid grid-cols-3 gap-5">
          {OUTCOMES.map((o, i) => (
            <FadeUp key={o.title} delay={i * 0.1}>
              <div style={{ background: BG3, border: `1px solid ${STROKE}`, borderRadius: 20, padding: '36px 28px', height: '100%' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${o.color}16`, border: `1px solid ${o.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  {o.icon}
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', color: o.color, marginBottom: 10 }}>
                  {o.metric}
                </div>
                <div style={{ fontWeight: 700, color: TEXT, fontSize: 18, marginBottom: 12, lineHeight: 1.3 }}>{o.title}</div>
                <div style={{ color: TEXT2, fontSize: 14, lineHeight: 1.7 }}>{o.desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════════════════════ */
export default function YouMatsCaseStudy() {
  return (
    <div style={{ background: BG, color: TEXT }}>
      <S1Ecosystem />
      <S2Challenge />
      <S3Architecture />
      <S4CustomerExperience />
      <S5QuotationExperience />
      <S5Gallery />
      <S6ServiceMarketplace />
      <S7VendorExperience />
      <S8ProductDecisions />
      <S9CommerceFlow />
      <S10Outcome />
    </div>
  );
}
