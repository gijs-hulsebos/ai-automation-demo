"use client";

import {tarvosStack,tarvosWebsiteStack} from '@/data/special-project-stacks';
import { useLanguage } from '@/context/LanguageContext';

import {content} from '@/data/tarvos-content';

export function TarvosProjectInfo() {
 const { lang } = useLanguage();
 const text = content[lang];
 return <div className="bento-project-details tarvos-project-info" lang={lang.toLowerCase()}>
  <p className="bento-project-summary">{text.summary}</p>
  <section><h3>{text.problem}</h3><p>{text.problemText}</p></section>
  <section><h3>{text.implementation}</h3><p>{text.implementationText}</p></section>
  <section><h3>{text.highlights}</h3><ul>{text.items.map(item => <li key={item}>{item}</li>)}</ul></section>
  <section><h3>{text.hackathons}</h3>
   <p><strong>Tarvos x402 Paygate</strong><br />{text.x402Event}</p>
   <div className="bento-project-links"><a href="https://tarvos.tools/nodes/x402/" target="_blank" rel="noopener noreferrer">{text.x402Link} ↗</a></div>
   <p><strong>Tarvos Triton One</strong><br />{text.tritonEvent}</p>
   <div className="bento-project-links"><a href="https://tarvos.tools/nodes/triton-1/" target="_blank" rel="noopener noreferrer">{text.tritonLink} ↗</a></div>
  </section>
  <section><h3>{text.boundary}</h3><p>{text.boundaryText}</p></section>
  <section><h3>{text.stack}</h3><p>{tarvosStack.join(' · ')}</p></section>
  <section><h3>{text.websiteStack}</h3><p>{tarvosWebsiteStack.join(' · ')}</p></section>
  <div className="bento-project-links"><a href="https://github.com/TarvosTools/n8n-nodes-Tarvos-x402" target="_blank" rel="noopener noreferrer">{text.source} ↗</a><a href="https://tarvos.tools" target="_blank" rel="noopener noreferrer">tarvos.tools ↗</a></div>
 </div>;
}
