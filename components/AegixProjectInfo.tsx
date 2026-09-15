"use client";
import { useLanguage } from '@/context/LanguageContext';

import {copy} from '@/data/aegix-content';

export function AegixProjectInfo() {
 const { lang } = useLanguage();
 const text = copy[lang];
 return <div className="bento-project-details aegix-project-info" lang={lang.toLowerCase()}>
  <p className="bento-project-summary">{text.summary}</p>
  <div className="bento-project-links"><a href="https://aegix-restored-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer">{text.website} ↗</a></div>
  <section><h3>{text.problem}</h3><p>{text.problemText}</p></section>
  <section><h3>{text.features}</h3><ul>{text.items.map(item => <li key={item}>{item}</li>)}</ul></section>
  <section><h3>Hackathon</h3><p>{text.event}</p></section>
  <section><h3>{text.access}</h3><p>{text.accessText}</p></section>
 </div>;
}
