"use client";
import Image from 'next/image';
import { Header } from './Header';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import projects from '@/data/bento-projects.json';
import { BentoProjectDetails, localizeProject } from './BentoProjectContent';
import { TarvosProjectInfo } from './TarvosProjectInfo';
import { AegixProjectInfo } from './AegixProjectInfo';
const categories = [
 { id: 'projects', names: { NL: 'Projecten', EN: 'Projects', DE: 'Projekte' }, ids: ['tarvos', 'aegix', 'portfolio', 'compliance'] },
 { id: 'apps', names: { NL: 'Losse Apps', EN: 'Standalone Apps', DE: 'Eigenständige Apps' }, ids: ['stayai', 'acquisition', 'insurance', 'donation'] },
 { id: 'workflows', names: { NL: 'Workflows', EN: 'Workflows', DE: 'Workflows' }, ids: ['calendar', 'newsletter', 'mediagen'] },
 { id: 'tools', names: { NL: 'Tools', EN: 'Tools', DE: 'Tools' }, ids: ['pr', 'security', 'audio', 'repo'] },
 { id: 'experiments', names: { NL: 'Experimenten', EN: 'Experiments', DE: 'Experimente' }, ids: ['registry', 'hermes'] },
];
const extra = {
 NL: { registry: 'Een gestructureerd register van AI-aanbieders en diensten, met documentatie voor integraties, mogelijkheden, prompts en praktijknotities.', hermes: 'Een websitegateway met een JSON-taak die Hermes-agents exact instrueerde hoe ze Discord konden joinen: een experiment met Moltbook op Discord.', previous: 'Vorig project', next: 'Volgend project' },
 EN: { registry: 'A structured registry of AI providers and services, documenting integrations, capabilities, prompts and practical notes.', hermes: 'A website gateway with a JSON task telling Hermes agents exactly how to join Discord: an experiment bringing Moltbook to Discord.', previous: 'Previous project', next: 'Next project' },
 DE: { registry: 'Ein strukturiertes Verzeichnis von KI-Anbietern und Diensten mit Dokumentation zu Integrationen, Funktionen, Prompts und Praxiserfahrungen.', hermes: 'Ein Website-Gateway mit einer JSON-Aufgabe, die Hermes-Agenten genaue Anweisungen zum Beitritt zu Discord gab: ein Experiment mit Moltbook auf Discord.', previous: 'Vorheriges Projekt', next: 'Nächstes Projekt' },
};
const copy = {
 NL: { intro: 'Ideeën vertaald naar werkende systemen. Een selectie van platforms, AI-applicaties en automatiseringen.', details: 'Bekijk projectdetails', tarvos: 'Solana-integraties voor n8n: een nodeplatform met x402-betalingen, documentatie en een publieke website.', aegix: 'Een x402-betaalgateway voor AI-agents op Solana, met tijdelijke wallets en een dashboard voor betaal- en auditinformatie.', private: 'Private broncode' },
 EN: { intro: 'Ideas turned into working systems. A selection of platforms, AI applications and automations.', details: 'View project details', tarvos: 'Solana integrations for n8n: a node platform with x402 payments, documentation and a public website.', aegix: 'An x402 payment gateway for AI agents on Solana, with temporary wallets and a dashboard for payment and audit information.', private: 'Private source code' },
 DE: { intro: 'Ideen, umgesetzt in funktionierende Systeme. Eine Auswahl an Plattformen, KI-Anwendungen und Automatisierungen.', details: 'Projektdetails ansehen', tarvos: 'Solana-Integrationen für n8n: eine Node-Plattform mit x402-Zahlungen, Dokumentation und einer öffentlichen Website.', aegix: 'Ein x402-Zahlungsgateway für KI-Agenten auf Solana mit temporären Wallets und einem Dashboard für Zahlungs- und Auditinformationen.', private: 'Privater Quellcode' },
};

function ProjectCategory({ category }: { category: typeof categories[number] }) {
 const { lang } = useLanguage();
 const text = copy[lang];
 const entries = category.ids.map(id => {
  const source = projects.find(project => project.id === id);
  const project = source ? localizeProject(source, lang) : undefined;
  const name = project?.name ?? ({ tarvos: 'Tarvos', aegix: 'Aegix', registry: 'AI Integration Registry', hermes: 'Hermes Oracle' }[id] ?? id);
  return { id, project, name,
   summary: project?.summary ?? (id === 'tarvos' ? text.tarvos : id === 'aegix' ? text.aegix : id === 'registry' ? extra[lang].registry : extra[lang].hermes),
   image: project?.image ?? (id === 'tarvos' ? '/projects/tarvos-brand.png' : id === 'aegix' ? '/projects/aegix-wordmark-cat.png' : undefined),
   website: project?.live ?? (id === 'tarvos' ? 'https://tarvos.tools/' : id === 'aegix' ? 'https://aegix-restored-dashboard.vercel.app/' : id === 'hermes' ? 'https://oracle-gateway-ten.vercel.app/' : undefined),
   repository: project?.repository ?? (id === 'tarvos' ? 'https://github.com/TarvosTools/n8n-nodes-Tarvos-x402' : id === 'aegix' ? 'https://github.com/gijs-hulsebos/aegix-restored' : id === 'registry' ? 'https://github.com/gijs-hulsebos/Integration-Registry' : undefined),
  };
 });
 return <section id={category.id} className="project-category">
  <header className="category-heading"><h2 className="font-display">{category.names[lang]}</h2><span>{String(entries.length).padStart(2, '0')}</span></header>
  <div className="category-card-grid">{entries.map(active => <article className="category-static-card" key={active.id} id={`project-${active.id}`}>
   <div className="static-card-heading">
    <h3 className="font-display">{active.name}</h3>
    {active.id === 'tarvos' && <span className="tarvos-collapsed-logo static-brand-logo" aria-hidden="true" />}
    {active.id === 'aegix' && <Image src="/projects/aegix-wordmark-cat.png" alt="" width={116} height={44} className="static-aegix-logo" />}
   </div>
   <p className="static-card-description">{active.summary}</p>
   <div className="catalog-actions">
    {active.website && <a href={active.website} target="_blank" rel="noopener noreferrer">Website ↗</a>}
    {active.repository && <a href={active.repository} target="_blank" rel="noopener noreferrer">GitHub{active.id === 'aegix' ? ` · ${text.private}` : ''} ↗</a>}
   </div>
   {(active.project || active.id === 'tarvos' || active.id === 'aegix') && <details className="category-project-details"><summary>{text.details}</summary><div className="catalog-details-content">
    {(active.id === 'tarvos' || active.id === 'aegix') && <video className="mb-6 w-full max-w-2xl rounded-xl bg-black" src={active.id === 'tarvos' ? '/projects/tarvos-introduction.mp4' : '/projects/aegix-explainer-1080p.mp4'} controls playsInline preload="none" aria-label={active.name} />}
    {active.project ? <BentoProjectDetails project={active.project} /> : active.id === 'tarvos' ? <TarvosProjectInfo /> : <AegixProjectInfo />}
   </div></details>}
  </article>)}</div>
 </section>;
}
export function ProjectsOverview() {
 const { lang } = useLanguage();
 return <div className="min-h-screen bg-zinc-950 text-zinc-50"><Header />
  <main className="projects-overview mx-auto max-w-[1280px] px-6 pb-24 pt-40" lang={lang.toLowerCase()}>
   <header className="projects-page-heading"><h1 className="font-display font-medium">{INTERFACE[lang].projects}</h1><p className="mt-5 text-zinc-400 leading-relaxed">{copy[lang].intro}</p></header>
   <nav className="category-nav" aria-label={INTERFACE[lang].projects}>{categories.map(category => <a key={category.id} href={`#${category.id}`}>{category.names[lang]}</a>)}</nav>
   {categories.map(category => <ProjectCategory key={category.id} category={category} />)}
  </main>
 </div>;
}
