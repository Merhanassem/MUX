import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.merhanassem.com' },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
