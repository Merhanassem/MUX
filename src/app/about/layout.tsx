import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Senior Product Designer based in Cairo with 4+ years of experience in EdTech, FinTech, wellness, and more.',
  alternates: { canonical: 'https://merhan.design/about' },
  openGraph: {
    title: 'About Merhan Assem — Senior Product Designer',
    description: 'Senior Product Designer based in Cairo with 4+ years of experience across EdTech, FinTech, wellness, and more.',
    url: 'https://merhan.design/about',
    images: [{ url: '/about-hero.png', width: 800, height: 600, alt: 'Merhan Assem' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
