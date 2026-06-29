import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://merhanassem.com' },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
