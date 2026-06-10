import type { Metadata } from 'next';
import './globals.css';
import CursorProvider from '@/components/ui/CursorProvider';
import ScrollToTop from '@/components/ui/ScrollToTop';

const BASE_URL = 'https://merhan.design';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Merhan Assem — Senior Product Designer',
    template: '%s | Merhan Assem',
  },
  description: 'Senior Product Designer based in Cairo. 4+ years turning complex systems into clear, scalable products through research, architecture, and design.',
  keywords: ['product designer', 'UX designer', 'UI designer', 'Cairo', 'remote', 'Merhan Assem', 'MUX'],
  authors: [{ name: 'Merhan Assem', url: BASE_URL }],
  creator: 'Merhan Assem',
  openGraph: {
    title: 'Merhan Assem — Senior Product Designer',
    description: 'Senior Product Designer based in Cairo. 4+ years turning complex systems into clear, scalable products.',
    url: BASE_URL,
    siteName: 'Merhan Assem Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/about-hero.png', width: 1536, height: 1024, alt: 'Merhan Assem — Senior Product Designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merhan Assem — Senior Product Designer',
    description: 'Senior Product Designer based in Cairo. 4+ years turning complex systems into clear, scalable products.',
    images: ['/about-hero.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        {/* Preload the font CSS so it starts fetching ASAP */}
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
        />
        {/* Non-render-blocking: load as print, swap to all once loaded */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          media="print"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onLoad={"this.media='all'" as any}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          />
        </noscript>
      </head>
      <body className="bg-background text-primary-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Merhan Assem',
            jobTitle: 'Senior Product Designer',
            url: 'https://merhan.design',
            email: 'merhanassem22@gmail.com',
            sameAs: [
              'https://www.linkedin.com/in/merhan-assem-53040a231/',
              'https://www.behance.net/merhanassem2',
              'https://www.instagram.com/merhanassim',
            ],
            address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
          }) }}
        />
        {/* Skip-to-content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-pink-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-body focus:font-medium"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <CursorProvider />
        {children}
      </body>
    </html>
  );
}
