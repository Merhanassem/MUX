'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatHappens from '@/components/sections/WhatHappens';
import Projects from '@/components/sections/Projects';
import FunProjects from '@/components/sections/FunProjects';
import HowIWork from '@/components/sections/HowIThink';
import WhyTeams from '@/components/sections/WhyTeams';
import About from '@/components/sections/About';
import FunFacts from '@/components/sections/FunFacts';
import Manifesto from '@/components/sections/Manifesto';
import Contact from '@/components/sections/Contact';

const SmoothScroll      = dynamic(() => import('@/components/ui/SmoothScroll'),      { ssr: false });
const ScrollVideoIntro  = dynamic(() => import('@/components/ui/ScrollVideoIntro'),  { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <ScrollVideoIntro />
        <WhatHappens />
        <Projects />
        <FunProjects />
        <HowIWork />
        <WhyTeams />
        <About />
        <FunFacts />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
