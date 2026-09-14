"use client";

import { Header } from './Header';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import projects from '@/data/bento-projects.json';
import { BentoProjectDetails, localizeProject, ProjectMark } from './BentoProjectContent';
import { TarvosProjectInfo } from './TarvosProjectInfo';
import { AegixProjectInfo } from './AegixProjectInfo';

// Editorial order by functional scope: platforms, complete apps, workflows, utilities.
const order = ['tarvos', 'aegix', 'acquisition', 'stayai', 'portfolio', 'insurance', 'calendar', 'newsletter', 'security', 'donation', 'mediagen', 'pr', 'audio', 'compliance', 'repo'];
const copy = {
 NL: { intro: 'Van uitgebreide platforms en applicaties tot gerichte automatiseringen en kleine tools. De projecten staan op volgorde van functionele omvang.', details: 'Bekijk projectdetails', tarvos: 'Solana-integraties voor n8n: een nodeplatform met x402-betalingen, documentatie en een publieke website.', aegix: 'Een x402-betaalgateway voor AI-agents op Solana, met tijdelijke wallets en een dashboard voor betaal- en auditinformatie.', private: 'Private broncode' },
 EN: { intro: 'From extensive platforms and applications to focused automations and small tools. Projects are ordered by functional scope.', details: 'View project details', tarvos: 'Solana integrations for n8n: a node platform with x402 payments, documentation and a public website.', aegix: 'An x402 payment gateway for AI agents on Solana, with temporary wallets and a dashboard for payment and audit information.', private: 'Private source code' },
 DE: { intro: 'Von umfangreichen Plattformen und Anwendungen bis zu gezielten Automatisierungen und kleinen Tools. Die Projekte sind nach Funktionsumfang geordnet.', details: 'Projektdetails ansehen', tarvos: 'Solana-Integrationen für n8n: eine Node-Plattform mit x402-Zahlungen, Dokumentation und einer öffentlichen Website.', aegix: 'Ein x402-Zahlungsgateway für KI-Agenten auf Solana mit temporären Wallets und einem Dashboard für Zahlungs- und Auditinformationen.', private: 'Privater Quellcode' },
};
export function ProjectsOverview() {
 const { lang } = useLanguage();
 const text = copy[lang];
 return <div className="min-h-screen bg-zinc-950 text-zinc-50">
  <Header />
  <main className="projects-overview mx-auto max-w-5xl px-6 pb-24 pt-40" lang={lang.toLowerCase()}>
   <header className="mb-12 max-w-2xl"><h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight">{INTERFACE[lang].projects}</h1><p className="mt-5 text-zinc-400 leading-relaxed">{text.intro}</p></header>
   <div className="space-y-5">{order.map((id, index) => {
    const source = projects.find(project => project.id === id);
    const project = source ? localizeProject(source, lang) : undefined;
    const special = id === 'tarvos' || id === 'aegix';
    if (!project && !special) return null;
    const name = project?.name ?? (id === 'tarvos' ? 'Tarvos' : 'Aegix');
    return <article key={id} id={id} className="rounded-[22px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 scroll-mt-32">
     <div className="flex items-start gap-5"><span className="pt-1 text-xs tabular-nums text-zinc-500">{String(index + 1).padStart(2, '0')}</span><div className="min-w-0 flex-1">
      <div className="flex items-center gap-3">{project && <ProjectMark project={project} />}<h2 className="font-display text-xl sm:text-2xl font-medium">{name}</h2></div>
      <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-400">{project?.summary ?? (id === 'tarvos' ? text.tarvos : text.aegix)}</p>
      {id === 'aegix' && <p className="mt-3 text-xs text-zinc-500">{text.private}</p>}
      <details className="mt-5"><summary className="w-fit cursor-pointer text-sm text-zinc-200 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400">{text.details}</summary>
       <div className="mt-6 border-t border-white/10 pt-6">
        {special && <video className="mb-6 w-full max-w-2xl rounded-xl bg-black" src={id === 'tarvos' ? '/projects/tarvos-introduction.mp4' : '/projects/aegix-explainer-1080p.mp4'} controls playsInline preload="none" aria-label={name} />}
        {project ? <BentoProjectDetails project={project} /> : id === 'tarvos' ? <TarvosProjectInfo /> : <AegixProjectInfo />}
       </div>
      </details>
     </div></div>
    </article>;
   })}</div>
  </main>
 </div>;
}
