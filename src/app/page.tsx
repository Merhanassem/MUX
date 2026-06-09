'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const SmoothScroll      = dynamic(() => import('@/components/ui/SmoothScroll'),      { ssr: false });
const ScrollVideoIntro  = dynamic(() => import('@/components/ui/ScrollVideoIntro'),  { ssr: false });
const WhatHappens       = dynamic(() => import('@/components/sections/WhatHappens'), { ssr: false });
const Projects          = dynamic(() => import('@/components/sections/Projects'),     { ssr: false });
const FunProjects       = dynamic(() => import('@/components/sections/FunProjects'), { ssr: false });
const HowIWork          = dynamic(() => import('@/components/sections/HowIThink'),   { ssr: false });
const WhyTeams          = dynamic(() => import('@/components/sections/WhyTeams'),    { ssr: false });
const About             = dynamic(() => import('@/components/sections/About'),       { ssr: false });
const Services          = dynamic(() => import('@/components/sections/Services'),   { ssr: false });
const DomainMarquee     = dynamic(() => import('@/components/ui/DomainMarquee'),    { ssr: false });
const Manifesto         = dynamic(() => import('@/components/sections/Manifesto'),  { ssr: false });
const Contact           = dynamic(() => import('@/components/sections/Contact'),     { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <ScrollVideoIntro />
        <WhatHappens />
        <Projects />
        <FunProjects />
        <Services />
        <HowIWork />
        <WhyTeams />
        <About />
        <DomainMarquee />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
