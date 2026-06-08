import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected case studies — product design projects across EdTech, FinTech, wellness, pet care, and more.',
  alternates: { canonical: 'https://merhan.design/work' },
  openGraph: {
    title: 'Work — Merhan Assem',
    description: 'Selected case studies across EdTech, FinTech, wellness, and more.',
    url: 'https://merhan.design/work',
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
