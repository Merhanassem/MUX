'use client';

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { projects as allProjects } from '@/lib/data/projects';

// Only cycle through projects that have a real cover (same set shown on /work)
const projects = allProjects.filter(p => p.coverImage);
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CustomCursor      = dynamic(() => import('@/components/ui/CustomCursor'),              { ssr: false });
const CSHero            = dynamic(() => import('@/components/casestudy/CSHero'),              { ssr: false });
const CSBusinessGoals   = dynamic(() => import('@/components/casestudy/CSBusinessGoals'),    { ssr: false });
const CSRealProblem     = dynamic(() => import('@/components/casestudy/CSRealProblem'),      { ssr: false });
const CSEcosystem       = dynamic(() => import('@/components/casestudy/CSEcosystem'),        { ssr: false });
const CSFoundation      = dynamic(() => import('@/components/casestudy/CSFoundation'),       { ssr: false });
const CSFeatureStory    = dynamic(() => import('@/components/casestudy/CSFeatureStory'),     { ssr: false });
const CSDesignDecisions = dynamic(() => import('@/components/casestudy/CSDesignDecisions'),  { ssr: false });
const CSScreens         = dynamic(() => import('@/components/casestudy/CSScreens'),          { ssr: false });
const CSOutcomes        = dynamic(() => import('@/components/casestudy/CSOutcomes'),         { ssr: false });
const CSReflection      = dynamic(() => import('@/components/casestudy/CSReflection'),       { ssr: false });
const CSNextProject     = dynamic(() => import('@/components/casestudy/CSNextProject'),      { ssr: false });
const RelaxCaseStudy    = dynamic(() => import('@/components/casestudy/RelaxCaseStudy'),     { ssr: false });
const ParkPeaceCaseStudy  = dynamic(() => import('@/components/casestudy/ParkPeaceCaseStudy'),  { ssr: false });
const DreamCairoCaseStudy = dynamic(() => import('@/components/casestudy/DreamCairoCaseStudy'), { ssr: false });
const YouMatsCaseStudy  = dynamic(() => import('@/components/casestudy/YouMatsCaseStudy'),   { ssr: false });
const CashCaseStudy     = dynamic(() => import('@/components/casestudy/CashCaseStudy'),      { ssr: false });
const AnimapCaseStudy   = dynamic(() => import('@/components/casestudy/AnimapCaseStudy'),    { ssr: false });

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.indexOf(project);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const heroMeta = [
    { label: 'Role',            value: project.role },
    { label: 'Timeline',        value: project.duration },
    { label: 'Team',            value: 'Cross-functional' },
    { label: 'Platforms',       value: 'iOS · Android · Web' },
    { label: 'Responsibilities',value: project.tags.slice(0, 2).join(', ') },
  ];

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="bg-background">

        {/* 01 — Hero */}
        <CSHero
          title={project.title}
          summary={project.summary}
          accentColor={project.accentColor}
          category={project.category}
          meta={heroMeta}
          coverImage={project.coverImage}
        />

        {/* Custom case study sections per project */}
        {project.slug === 'relax-body' ? (
          <RelaxCaseStudy />
        ) : project.slug === 'park-peace' ? (
          <ParkPeaceCaseStudy />
        ) : project.slug === 'dream-cairo' ? (
          <DreamCairoCaseStudy />
        ) : project.slug === 'youmats' ? (
          <YouMatsCaseStudy />
        ) : project.slug === 'cash' ? (
          <CashCaseStudy />
        ) : project.slug === 'animap' ? (
          <AnimapCaseStudy />
        ) : (
          <>
            {/* 02 — Understanding the Business */}
            <CSBusinessGoals accentColor={project.accentColor} />

            {/* 03 — The Real Problem */}
            <CSRealProblem accentColor={project.accentColor} />

            {/* 04 — Product Ecosystem */}
            <CSEcosystem accentColor={project.accentColor} />

            {/* 05 — Designing the Foundation */}
            <CSFoundation accentColor={project.accentColor} />

            {/* 06 — Building the Product */}
            <CSFeatureStory accentColor={project.accentColor} />

            {/* 07 — Design Decisions */}
            <CSDesignDecisions accentColor={project.accentColor} />

            {/* 08 — Selected Screens */}
            <CSScreens accentColor={project.accentColor} />

            {/* 09 — Outcomes */}
            <CSOutcomes accentColor={project.accentColor} />

            {/* 10 — Reflection */}
            <CSReflection
              accentColor={project.accentColor}
              designerNote="The best design deliverable is not a screen — it is a team that understands the product well enough to make good decisions without you."
            />
          </>
        )}

        {/* 11 — Next Project */}
        <CSNextProject
          currentAccent={project.accentColor}
          next={{
            title: nextProject.title,
            subtitle: nextProject.subtitle,
            category: nextProject.category,
            href: `/work/${nextProject.slug}`,
            coverImage: nextProject.coverImage,
            accentColor: nextProject.accentColor,
            year: nextProject.year,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
