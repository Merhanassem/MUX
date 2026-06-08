'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });

export default function CursorProvider() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Inject global cursor: none on desktop only
  useEffect(() => {
    if (isDesktop) {
      document.documentElement.style.cursor = 'none';
    } else {
      document.documentElement.style.cursor = '';
    }
  }, [isDesktop]);

  if (!isDesktop) return null;
  return <CustomCursor />;
}
