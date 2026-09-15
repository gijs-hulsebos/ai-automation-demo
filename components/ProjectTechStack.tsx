'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {Braces,BookOpen} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import {techIcons as icons} from '@/data/tech-stack';

export function ProjectTechStack({ stack, tileId, id }: { stack: string[]; tileId: string; id: string }) {
  const { lang } = useLanguage();
  const [position, setPosition] = useState<{ left: number; top: number; width: number } | null>(null);
  useEffect(() => {
    const anchor = document.querySelector(`[data-tile-id="${tileId}"]`);
    if (!anchor) return;
    const update = () => {
      const rect = anchor.getBoundingClientRect();
      const width = Math.min(320, window.innerWidth - 24);
      setPosition({ width, left: Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12)), top: Math.max(12, Math.min(rect.bottom + 8, window.innerHeight - (stack.length > 6 ? 220 : 160))) });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(anchor);
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
  }, [tileId, stack.length]);
  if (!position) return null;
  return createPortal(<div id={id} role="tooltip" className="bento-tech-tooltip" style={position}>
    <span className="bento-tech-title">Tech-Stack</span>
    <ul>{stack.map(name => {
      const label = name === 'Curated regulatory sources' ? (lang === 'NL' ? 'Regelgevingsbronnen' : lang === 'DE' ? 'Regulatorische Quellen' : 'Regulatory sources') : name;
      return <li key={name}>{icons[name] ? <span className="bento-tech-logo"><Image src={icons[name]} width={24} height={24} alt="" className={name === 'React Flow' || name === 'MailerLite' ? 'bento-tech-multitone' : undefined} unoptimized /></span> : <span className="bento-tech-logo" aria-hidden="true">{name === 'Curated regulatory sources' ? <BookOpen size={24}/> : <Braces size={24}/>}</span>}<span>{label}</span></li>;
    })}</ul>
  </div>, document.body);
}
