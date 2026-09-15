'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import manifest from '@/data/certificates.json';
import curriculum from '@/public/learning-catalog.json';
import { providerLogos } from '@/data/provider-logos';
import { groupCertificates, type Certificate } from '@/lib/certificate-groups';

const copy = {
  NL: { intro: 'Van theorie naar praktijk. Bekijk mijn behaalde cursus- en specialisatiecertificaten.', search: 'Zoek op cursus of aanbieder', provider: 'Aanbieder', all: 'Alle aanbieders', count: 'certificaten', of: 'van', empty: 'Geen certificaten gevonden.', reset: 'Wis filters', pdf: 'Opent de originele PDF in een nieuw tabblad' },
  EN: { intro: 'Theory into practice. Explore my course and specialization certificates.', search: 'Search by course or provider', provider: 'Provider', all: 'All providers', count: 'certificates', of: 'of', empty: 'No certificates found.', reset: 'Clear filters', pdf: 'Opens the original PDF in a new tab' },
  DE: { intro: 'Von der Theorie zur Praxis. Entdecke meine Kurs- und Spezialisierungszertifikate.', search: 'Nach Kurs oder Anbieter suchen', provider: 'Anbieter', all: 'Alle Anbieter', count: 'Zertifikate', of: 'von', empty: 'Keine Zertifikate gefunden.', reset: 'Filter zurücksetzen', pdf: 'Öffnet das Original-PDF in einem neuen Tab' },
};
const groupCopy = {
  NL: { specializations: 'Specialisaties', description: 'Samenhangende leerprogramma’s met meerdere cursussen.', award: 'Specialisatiecertificaat', courses: 'Cursuscertificaten binnen deze specialisatie', standalone: 'Losse cursussen', standaloneDescription: 'Afzonderlijke cursussen buiten de onderstaande specialisatiegroepen.', noAward: 'Nog geen specialisatiecertificaat beschikbaar', course: 'Cursus' },
  EN: { specializations: 'Specializations', description: 'Structured learning programs comprising multiple courses.', award: 'Specialization certificate', courses: 'Course certificates in this specialization', standalone: 'Standalone courses', standaloneDescription: 'Individual courses outside the specialization groups.', noAward: 'No specialization certificate available yet', course: 'Course' },
  DE: { specializations: 'Spezialisierungen', description: 'Zusammenhängende Lernprogramme aus mehreren Kursen.', award: 'Spezialisierungszertifikat', courses: 'Kurszertifikate dieser Spezialisierung', standalone: 'Einzelkurse', standaloneDescription: 'Einzelne Kurse außerhalb der Spezialisierungsgruppen.', noAward: 'Noch kein Spezialisierungszertifikat verfügbar', course: 'Kurs' },
};
const categoryCopy = {
  NL: { specializations: 'Specialisaties', courses: 'Cursussen', practical: 'Praktijk Cursussen', choose: 'Type certificaat', practicalEmpty: 'Er zijn nog geen certificaten als praktijkcursus ingedeeld.' },
  EN: { specializations: 'Specializations', courses: 'Courses', practical: 'Practical Courses', choose: 'Certificate type', practicalEmpty: 'No certificates have been classified as practical courses yet.' },
  DE: { specializations: 'Spezialisierungen', courses: 'Kurse', practical: 'Praxiskurse', choose: 'Zertifikattyp', practicalEmpty: 'Noch keine Zertifikate als Praxiskurse eingeordnet.' },
};
type Category = 'specializations' | 'courses' | 'practical';
// Only explicit source-folder labels establish practical-course membership.
const isPractical = (card: Certificate) => card.path.split('/').slice(1, -1).some(part => /^(practical courses?|praktijk[ -]?cursussen|praxiskurse|guided projects?)$/i.test(part.trim()));
const grouped = groupCertificates(manifest.certificates);
// Editorial priority requested by the portfolio owner; other groups keep their order.
const featuredProgram='University of Pennsylvania (Wharton)/AI For Business Specialization';
grouped.specializations.sort((a,b)=>Number(b.id===featuredProgram)-Number(a.id===featuredProgram));
const courseEntries = [
  ...grouped.standalone.map(card => ({ card, context: '' })),
  ...grouped.specializations.flatMap(group => group.courses.map(card => ({ card, context: group.title }))),
].sort((a, b) => a.card.issuer.localeCompare(b.card.issuer) || a.card.title.localeCompare(b.card.title));
const categoryTotals: Record<Category, number> = {
  specializations: grouped.specializations.length,
  courses: courseEntries.filter(({ card }) => !isPractical(card)).length,
  practical: courseEntries.filter(({ card }) => isPractical(card)).length,
};
const providers = [...new Set(manifest.certificates.map(card => card.issuer))].sort();
const normalize = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export function CertificateLibrary() {
  const { lang } = useLanguage();
  const text = copy[lang];
  const categories = categoryCopy[lang];
  const [category, setCategory] = useState<Category>('specializations');
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('');
  const [requestedId, setRequestedId] = useState('');
  useEffect(() => {
    const readDestination = () => {
      const id = new URLSearchParams(window.location.search).get('certificate');
      const card = manifest.certificates.find(item => item.id === id);
      if (!card) { setCategory('specializations'); setRequestedId(''); return; }
      const award = grouped.specializations.some(group => group.certificates.some(item => item.id === id));
      setCategory(award ? 'specializations' : isPractical(card) ? 'practical' : 'courses');
      setQuery('');
      setProvider('');
      setRequestedId(card.id);
    };
    readDestination();
    window.addEventListener('popstate', readDestination);
    return () => window.removeEventListener('popstate', readDestination);
  }, []);
  useEffect(() => {
    if (!requestedId) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(`certificate-${requestedId}`);
      target?.scrollIntoView({ block: 'center', behavior: 'instant' });
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [requestedId, category]);
  const terms = normalize(query).trim().split(/\s+/);
  const labels = groupCopy[lang];
  const matches = (card: Certificate, context = '') => (!provider || card.issuer === provider)
    && terms.every(term => normalize(`${card.title} ${card.issuer} ${context}`).includes(term));
  const specializations = grouped.specializations.map(group => ({
    ...group,
    visibleAwards: group.certificates.filter(card => matches(card, group.title)),
    visibleCourses: group.courses.filter(card => matches(card, group.title)),
  })).filter(group => group.visibleAwards.length || group.visibleCourses.length);
  const courses = courseEntries.filter(({ card, context }) => matches(card, context) && isPractical(card) === (category === 'practical'));
  const count = category === 'specializations' ? specializations.length : courses.length;
  const total = categoryTotals[category];
  const clear = () => { setQuery(''); setProvider(''); };

  function openCourse(card:Certificate) {
    const url=new URL(window.location.href);url.searchParams.set('certificate',card.id);
    window.history.pushState({},'',url);setQuery('');setProvider('');
    setCategory(isPractical(card)?'practical':'courses');setRequestedId(card.id);
  }
  function renderCourse(card: Certificate, context = '') {
    const entry=curriculum.entries.find(e=>e.kind==='course'&&e.id===card.path.split('/').slice(0,-1).join('/'));

    const branding = providerLogos[card.issuer];
    return <li key={card.id} id={`certificate-${card.id}`} tabIndex={-1} className="certificate-destination flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40">
      <a href={card.credential} target="_blank" rel="noopener noreferrer" aria-label={`${card.title} — ${card.issuer}. ${text.pdf}`}
        className="group flex flex-1 flex-col overflow-hidden transition-colors hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 motion-reduce:transition-none">
        <div className="relative aspect-[16/10] bg-[#f7f7f5]">
          <Image src={card.image} alt={card.title} fill unoptimized sizes="(max-width: 639px) 100vw, 400px" className="object-contain p-4" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 text-xs text-zinc-400">{branding?.src ? <Image src={branding.src} alt={card.issuer} width={96} height={24} className="max-h-6 object-contain" /> : card.issuer} · {labels.course}</div>
          <h3 className="font-display text-lg font-medium leading-snug break-words">{card.title}</h3>
          {context && <p className="mt-2 text-xs leading-relaxed text-zinc-500">{context}</p>}
          <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm text-zinc-300 group-hover:text-white">{INTERFACE[lang].viewCertificate}<ArrowUpRight aria-hidden="true" size={18} /></span>
        </div>
      </a>
      {entry?.modules.length ? <details className="border-t border-white/10" open={requestedId===card.id?true:undefined}>
        <summary className="cursor-pointer px-5 py-4 text-xs font-medium text-zinc-200 hover:bg-white/5">{lang==='NL'?'Onderliggende modules':lang==='DE'?'Kursmodule':'Course modules'} ({entry.modules.length})</summary>
        <div className="space-y-4 px-5 pb-5">
          {entry.completedAt&&<p className="text-xs text-zinc-400">{lang==='NL'?'Behaald':lang==='DE'?'Abgeschlossen':'Completed'}: {entry.completedAt.split('-').reverse().join('/')}</p>}
          {entry.modules.map(module=><details key={module.id} className="rounded-lg border border-white/10 p-3">
            <summary className="cursor-pointer text-sm text-zinc-200">{module.title}</summary>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-relaxed text-zinc-400">{module.topics.map((topic,i)=><li key={i}>{topic}</li>)}</ul>
            <a href={module.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-xs text-violet-300 hover:text-white">{lang==='NL'?'Modulebron':lang==='DE'?'Modulquelle':'Module source'} ↗</a>
          </details>)}
        </div>
      </details>:null}
    </li>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      <main className="max-w-[1328px] mx-auto pt-40 pb-28 px-6">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-center leading-[1.15]">{INTERFACE[lang].certificates}</h1>
        <p className="mx-auto mt-5 max-w-xl text-center text-zinc-400 leading-relaxed">{text.intro}</p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="certificate-search" className="mb-2 block text-sm text-zinc-300">{text.search}</label>
            <div className="relative">
              <Search aria-hidden="true" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input id="certificate-search" type="search" value={query} onChange={event => setQuery(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-11 pr-4 text-sm outline-none focus-visible:border-violet-400" />
            </div>
          </div>
          <div className="sm:w-72">
            <label htmlFor="certificate-provider" className="mb-2 block text-sm text-zinc-300">{text.provider}</label>
            <select id="certificate-provider" value={provider} onChange={event => setProvider(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 p-3 text-sm outline-none focus-visible:border-violet-400">
              <option value="">{text.all}</option>
              {providers.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
        </div>
        <div className="my-6 flex min-h-6 items-center justify-between gap-4 text-sm">
          <p role="status" className="text-zinc-400">{count} {text.of} {total} {categories[category].toLowerCase()}</p>
          {(query || provider) && <button type="button" onClick={clear} className="text-zinc-300 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400">{text.reset}</button>}
        </div>

        <div role="group" aria-label={categories.choose} className="mb-6 flex flex-wrap gap-2">
          {(['specializations', 'courses', 'practical'] as const).map(value => <button key={value} type="button" aria-pressed={category === value} aria-controls="certificate-category-results" onClick={() => setCategory(value)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${category === value ? 'border-violet-400/40 bg-violet-400/15 text-violet-100' : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/30 hover:text-white'}`}>
            {categories[value]} <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-white/10 px-1.5 py-0.5 text-xs tabular-nums">{categoryTotals[value]}</span>
          </button>)}
        </div>
        <div id="certificate-category-results">
        {category === 'specializations' && specializations.length > 0 && <section aria-labelledby="specialization-heading">
          <h2 id="specialization-heading" className="sr-only">{labels.specializations} <span className="text-zinc-500">({specializations.length})</span></h2>
          <ul className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map(group => {
              const award = group.certificates[0];
              return <li key={group.id} id={`certificate-${group.certificates.find(card => card.id === requestedId)?.id || award?.id}`} tabIndex={-1} className="certificate-destination specialization-group flex h-full flex-col overflow-hidden rounded-[22px] border border-violet-400/25 bg-zinc-900/60">
                <div className="flex flex-1 flex-col">
                  {award && <a href={award.credential} target="_blank" rel="noopener noreferrer" aria-label={`${group.title}. ${text.pdf}`}
                    className="relative block aspect-[16/10] shrink-0 bg-[#f7f7f5] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-violet-400">
                    <Image src={award.image} alt={award.title} fill unoptimized sizes="(max-width: 639px) 100vw, 420px" className="object-contain p-5" />
                  </a>}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-4 self-start rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-200">{labels.specializations}</span>
                    <p className="mb-3 text-sm text-zinc-400">{group.issuer}</p>
                    <h3 className="font-display text-lg font-medium leading-snug break-words">{group.title}</h3>
                    {group.certificates.length ? <div className="mt-auto flex flex-col items-start gap-3 pt-4">
                      {group.certificates.map(certificate => <a key={certificate.id} href={certificate.credential} target="_blank" rel="noopener noreferrer"
                        aria-label={`${certificate.title}. ${text.pdf}`} className="inline-flex items-center gap-3 rounded-full bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-950 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400">
                        {labels.award}<ArrowUpRight size={16} aria-hidden="true" />
                      </a>)}
                    </div> : <p className="mt-6 text-sm text-zinc-500">{labels.noAward}</p>}
                  </div>
                </div>
                {group.visibleCourses.length > 0 && <details key={`${group.id}-${query}-${provider}`} open={query.trim() ? true : undefined} className="border-t border-white/10">
                  <summary className="cursor-pointer px-5 py-4 text-xs font-medium text-zinc-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-violet-400">{labels.courses} ({group.visibleCourses.length})</summary>
                  <ul className="space-y-3 px-5 pb-5">
                    {group.visibleCourses.map(card => <li key={card.id}><a href={`?certificate=${card.id}`} onClick={event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();openCourse(card)}}} aria-label={card.title} className="flex items-start justify-between gap-3 text-sm leading-relaxed text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400">{card.title}<ArrowUpRight size={14} className="mt-1 shrink-0" aria-hidden="true" /></a></li>)}
                  </ul>
                </details>}
              </li>;
            })}
          </ul>
        </section>}
        {category !== 'specializations' && courses.length > 0 && <section aria-label={categories[category]}>
          <ul className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{courses.map(({ card, context }) => renderCourse(card, context))}</ul>
        </section>}
        {!count && <p role="status" className="rounded-[22px] border border-white/10 p-12 text-center text-zinc-400">{category === 'practical' && total === 0 ? categories.practicalEmpty : text.empty}</p>}
        </div>

      </main>
    </div>
  );
}
