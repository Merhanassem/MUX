'use client';

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { projects as allProjects } from '@/lib/data/projects';

// Only cycle through projects that have a real cover (same set shown on /work)
const projects = allProjects.filter(p => p.coverImage);
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
import CSHero from '@/components/casestudy/CSHero';
import CSBusinessGoals from '@/components/casestudy/CSBusinessGoals';
import CSRealProblem from '@/components/casestudy/CSRealProblem';
import CSEcosystem from '@/components/casestudy/CSEcosystem';
import CSFoundation from '@/components/casestudy/CSFoundation';
import CSFeatureStory from '@/components/casestudy/CSFeatureStory';
import CSDesignDecisions from '@/components/casestudy/CSDesignDecisions';
import CSScreens from '@/components/casestudy/CSScreens';
import CSOutcomes from '@/components/casestudy/CSOutcomes';
import CSReflection from '@/components/casestudy/CSReflection';
import CSNextProject from '@/components/casestudy/CSNextProject';
import RelaxCaseStudy from '@/components/casestudy/RelaxCaseStudy';
import ParkPeaceCaseStudy from '@/components/casestudy/ParkPeaceCaseStudy';
import DreamCairoCaseStudy from '@/components/casestudy/DreamCairoCaseStudy';
import YouMatsCaseStudy from '@/components/casestudy/YouMatsCaseStudy';
import CashCaseStudy from '@/components/casestudy/CashCaseStudy';
import AnimapCaseStudy from '@/components/casestudy/AnimapCaseStudy';

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
