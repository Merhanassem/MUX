import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a product challenge worth solving? Let\'s talk.',
  alternates: { canonical: 'https://merhan.design/contact' },
  openGraph: {
    title: 'Contact Merhan Assem',
    description: 'Have a product challenge worth solving? Let\'s talk.',
    url: 'https://merhan.design/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
