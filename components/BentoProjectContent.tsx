'use client';

import Image from 'next/image';
import { ChartNoAxesCombined, BedDouble, ShieldCheck, CalendarDays, Newspaper, ScanSearch, Wallet, Workflow, GitPullRequest, FileAudio, Scale, FolderTree, Globe, ArrowUpRight } from 'lucide-react';
import projects from '@/data/bento-projects.json';
import translations from '@/data/bento-translations.json';
import { useLanguage } from '@/context/LanguageContext';

export type BentoProject = { slot: string; id: string; name: string; displayName: string; size: string; tagline: string; summary: string; problem: string; implementation: string; highlights: string[]; stack: string[]; sources: string[]; repository: string | null; live: string | null; image: string | null; private: boolean };
export function localizeProject(project: BentoProject, lang: 'EN' | 'NL' | 'DE'): BentoProject {
  if (lang === 'EN') return project;
  return { ...project, ...translations[project.id as keyof typeof translations][lang], stack: project.stack.map(item => item === 'Curated regulatory sources' ? (lang === 'NL' ? 'Samengestelde regelgevingsbronnen' : 'Kuratierte regulatorische Quellen') : item) };
}
export const projectsBySlot = Object.fromEntries(projects.map(project => [project.slot, project]));
const marks = { events: CalendarDays, portfolio: Globe, acquisition: ChartNoAxesCombined, stayai: BedDouble, insurance: ShieldCheck, calendar: CalendarDays, newsletter: Newspaper, security: ScanSearch, donation: Wallet, mediagen: Workflow, pr: GitPullRequest, audio: FileAudio, compliance: Scale, repo: FolderTree };
export function ProjectMark({ project }: { project: BentoProject }) {
  const Icon = marks[project.id as keyof typeof marks];
  if (!Icon) return null;
  return <Icon className="bento-project-mark" size={22} strokeWidth={1.5} aria-hidden="true" />;
}
const labels = {
  NL: { problem: 'Het probleem', implementation: 'Mijn implementatie', highlights: 'Technische highlights', stack: 'Tech-Stack', demo: 'Website', private: 'privé', image: 'Projectpreview' },
  EN: { problem: 'The problem', implementation: 'My implementation', highlights: 'Technical highlights', stack: 'Tech-Stack', demo: 'Website', private: 'private', image: 'Project preview' },
  DE: { problem: 'Das Problem', implementation: 'Meine Umsetzung', highlights: 'Technische Highlights', stack: 'Tech-Stack', demo: 'Website', private: 'privat', image: 'Projektvorschau' },
};
export function BentoProjectDetails({ project }: { project: BentoProject }) {
  const { lang } = useLanguage();
  const text = labels[lang];
  project = localizeProject(project, lang);
  return <div className="bento-project-details">
    <header><h2 className="font-display">{project.name}</h2></header>
    <p lang={lang.toLowerCase()} className="bento-project-summary">{project.summary}</p>
    {(project.repository || project.live) && <div className="bento-project-links">
      {project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={14} aria-hidden="true" /></a>}
      {project.id === 'skillmax' && <a href="/learning-trajectory">{{NL:'Leertraject',EN:'Learning Trajectory',DE:'Lernpfad'}[lang]}<ArrowUpRight size={14} aria-hidden="true" /></a>}
      {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">{text.demo}<ArrowUpRight size={14} aria-hidden="true" /></a>}
    </div>}
    {project.id === 'fileprint' && <section>
      <h3>{{ NL: 'Hoe FilePrint werkt', EN: 'How FilePrint works', DE: 'So funktioniert FilePrint' }[lang]}</h3>
      <video controls playsInline preload="metadata" className="aspect-video w-full rounded-xl bg-black object-contain" aria-label="FilePrint" onClick={event => event.stopPropagation()}>
        <source src="https://gijshulsebos-media.ai-automation-workflow-demo.workers.dev/projects/fileprint-explainer.892f4017fd8804af.mp4" type="video/mp4" />
      </video>
    </section>}
    {project.id === 'genreel' && <section className="genreel-project-video">
      <h3>{{ NL: 'Liftveiligheid in 3D — Blender', EN: '3D elevator safety — Blender', DE: 'Aufzugsicherheit in 3D — Blender' }[lang]}</h3>
      <video controls playsInline preload="metadata" className="w-full rounded-xl" aria-label="GenReel: 3D Blender Elevator Safety" onClick={event => event.stopPropagation()}>
        <source src="https://gijshulsebos-media.ai-automation-workflow-demo.workers.dev/projects/genreel-blender-elevator.9e9e6de99bf664f9.mp4" type="video/mp4" />
      </video>
    </section>}
    {project.id === 'acquisition' && <section className="acquisition-origin-video">
      <h3>{{ NL: 'Hoe het idee ontstond', EN: 'How the idea started', DE: 'Wie die Idee entstand' }[lang]}</h3>
      <video controls playsInline preload="metadata" className="w-full rounded-xl" aria-label={{ NL: 'Hoe ik op het idee voor Acquisition Gap Analyzer kwam', EN: 'How I came up with Acquisition Gap Analyzer', DE: 'Wie ich auf die Idee für Acquisition Gap Analyzer kam' }[lang]} onClick={event => event.stopPropagation()}>
        <source src="https://gijshulsebos-media.ai-automation-workflow-demo.workers.dev/projects/acquisition-gap-analyzer-origin.ca0969f38375c3d0.mp4" type="video/mp4" />
      </video>
    </section>}
    {project.id === 'skillmax' && <a className="bento-project-visual" href="/learning-trajectory" aria-label="SkillMax+ Overview"><Image src="/projects/skillmax-overview.png" alt="SkillMax+ Overview — Learning Chart" width={1500} height={850} sizes="(max-width: 600px) 90vw, 600px" className="object-contain" /></a>}
    {project.image && project.id !== 'skillmax' && <a className="bento-project-visual" href={project.live || project.repository || undefined} target="_blank" rel="noopener noreferrer" aria-label={`${text.image}: ${project.name}`}>
      <Image src={project.image} alt={`${text.image}: ${project.name}`} width={1280} height={800} sizes="(max-width: 600px) 90vw, 500px" className="object-contain" />
    </a>}
    {project.problem && <section><h3>{text.problem}</h3><p lang={lang.toLowerCase()}>{project.problem}</p></section>}
    {project.implementation && <section><h3>{text.implementation}</h3><p lang={lang.toLowerCase()}>{project.implementation}</p></section>}
    {project.highlights.length > 0 && <section><h3>{text.highlights}</h3><ul lang={lang.toLowerCase()}>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></section>}
    {project.stack.length > 0 && <section><h3>{text.stack}</h3><p>{project.stack.join(' · ')}</p></section>}
  </div>;
}
