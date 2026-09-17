'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RulerCarousel } from './ui/ruler-carousel';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import CircularGallery from '@/components/ui/circular-flip-card-gallery';
import ProjectBento from '@/components/ProjectBento';
import LearningRadar from '@/components/LearningRadar';
import { certificateLayerCount } from '@/lib/certificate-layers';

export function Hero() {
  const { lang } = useLanguage();
  const [gridZoom, setGridZoom] = useState(0);
  const [category,setCategory]=useState('all');
  const [learningFormat,setLearningFormat]=useState('all');
  const [certificateLayer,setCertificateLayer]=useState(0);
  const certificateLayers=certificateLayerCount(learningFormat);
  return (
    <section id="overview" className="landing-gallery-section">
      <div className="landing-projects-intro">
        <h1 className="landing-gallery-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-white leading-[1.15]">
          {INTERFACE[lang].title}
        </h1>
        <div className="landing-project-grid-frame">
          <h2 className="landing-project-section-label font-display"><Link href="/projects">{INTERFACE[lang].projects}</Link></h2>
          <aside className="landing-category-ruler">
            <RulerCarousel layerCount={1} lockLabel={{NL:'Zoomen tijdelijk vergrendeld',EN:'Zoom temporarily locked',DE:'Zoom vorübergehend gesperrt'}[lang]} onCategoryChange={setCategory} zoom={gridZoom} label={{NL:'Projectcategorieën',EN:'Project categories',DE:'Projektkategorien'}[lang]} previous={{NL:'Vorige categorie',EN:'Previous category',DE:'Vorherige Kategorie'}[lang]} next={{NL:'Volgende categorie',EN:'Next category',DE:'Nächste Kategorie'}[lang]} originalItems={[
              {id:'all',title:'ALL'},
              {id:'projects',title:{NL:'Projecten',EN:'Projects',DE:'Projekte'}[lang]},
              {id:'apps',title:'Apps'},
              {id:'workflows',title:'Workflows'},
              {id:'tools',title:'Tools'},
              {id:'experiments',title:{NL:'Experimenten',EN:'Experiments',DE:'Experimente'}[lang]},
            ]}/>
          </aside>
          <ProjectBento key={category} category={category} onZoomChange={setGridZoom} />
        </div>
      </div>
      <div id="demo" className="landing-gallery-position">
        <h2 className="landing-project-section-label landing-certificate-section-label font-display"><Link href="/certificates">{INTERFACE[lang].certificates}</Link></h2>
        <CircularGallery key={learningFormat} format={learningFormat} onLayerChange={setCertificateLayer} />
        <aside className="landing-category-ruler certificate-provider-ruler">
          <RulerCarousel key="learning-formats-curved" curved visibleItems={3} onCategoryChange={setLearningFormat} layerCount={certificateLayers} currentLayer={certificateLayer+1} zoom={certificateLayers>1?certificateLayer/(certificateLayers-1):0}
            label={{NL:'Leervormen',EN:'Learning formats',DE:'Lernformate'}[lang]}
            previous={{NL:'Vorige leervorm',EN:'Previous learning format',DE:'Vorherige Lernform'}[lang]}
            next={{NL:'Volgende leervorm',EN:'Next learning format',DE:'Nächste Lernform'}[lang]}
            originalItems={[
              {id:'all',title:'ALL'},
              {id:'specializations',title:{NL:'Specialisaties',EN:'Specializations',DE:'Spezialisierungen'}[lang]},
              {id:'courses',title:{NL:'Cursussen',EN:'Courses',DE:'Kurse'}[lang]},
            ]}
          />
        </aside>
      </div>
      <LearningRadar />
    </section>
  );
}
