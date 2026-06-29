import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies — product design projects across EdTech, FinTech, wellness, pet care, and more.',
  alternates: { canonical: 'https://www.merhanassem.com/work' },
  openGraph: {
    title: 'Work — Merhan Assem',
    description: 'Selected case studies across EdTech, FinTech, wellness, and more.',
    url: 'https://www.merhanassem.com/work',
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
