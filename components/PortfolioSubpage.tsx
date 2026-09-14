'use client';

import { Header } from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';

export function PortfolioSubpage({ section }: { section: 'projects' | 'certificates' | 'learning' }) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      <main className="max-w-[1328px] mx-auto pt-40 pb-20 px-6">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white text-center leading-[1.15]">
          {INTERFACE[lang][section]}
        </h1>
        {section === 'learning' && <p className="mt-6 text-center text-lg text-zinc-400" lang={lang.toLowerCase()}>
          {lang === 'NL' ? 'Binnenkort beschikbaar' : lang === 'DE' ? 'Demnächst verfügbar' : 'Coming soon'}
        </p>}
      </main>
    </div>
  );
}
