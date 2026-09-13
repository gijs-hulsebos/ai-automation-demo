'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import CircularGallery from '@/components/ui/circular-flip-card-gallery';
import ProjectBento from '@/components/ProjectBento';

export function Hero() {
  const { lang } = useLanguage();
  return (
    <section id="overview" className="landing-gallery-section">
      <div className="landing-projects-intro">
        <h1 className="landing-gallery-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-white leading-[1.15]">
          {INTERFACE[lang].title}
        </h1>
        <div className="landing-project-grid-frame">
          <h2 className="landing-project-section-label font-display"><Link href="/projects">{INTERFACE[lang].projects}</Link></h2>
          <ProjectBento />
        </div>
      </div>
      <div id="demo" className="landing-gallery-position">
        <h2 className="landing-project-section-label landing-certificate-section-label font-display"><Link href="/certificates">{INTERFACE[lang].certificates}</Link></h2>
        <CircularGallery />
      </div>
    </section>
  );
}
