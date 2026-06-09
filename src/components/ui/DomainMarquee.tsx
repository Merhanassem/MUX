'use client';

const domains = [
  'EdTech', 'AI Platforms', 'Fintech', 'Payments', 'B2B SaaS',
  'B2C SaaS', 'E-commerce', 'Retail', 'Health & Wellness',
  'Multi-Sided Marketplaces', 'On-Demand Services', 'Pet Care',
];

export default function DomainMarquee() {
  return (
    <section className="border-y border-border py-6 overflow-hidden bg-background">
      <div
        className="flex gap-8 items-center"
        style={{ animation: 'marquee 22s linear infinite', width: 'max-content' }}
        aria-hidden="true"
      >
        {[...domains, ...domains].map((d, i) => (
          <span key={i} className="flex items-center gap-8 flex-shrink-0">
            <span className="font-display text-xl md:text-2xl text-primary-text whitespace-nowrap">{d}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-brand flex-shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}
