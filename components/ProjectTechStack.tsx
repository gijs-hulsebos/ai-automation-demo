'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Compact brand marks without the padding of the header wordmarks.
const icons: Record<string, string> = {
  'Hermes (Nous Research)': '/tech/hermes.svg',
  Motion: '/tech/framer.svg', Python: '/tech/python.svg',
  Astro: '/tech/astro.svg', 'Framer Motion': '/tech/framer.svg', 'Three.js': '/tech/threedotjs.svg', D3: '/tech/d3.svg',
  'React Flow': '/tech/reactflow.svg', Firecrawl: '/tech/firecrawl.svg', Xotelo: '/tech/xotelo.svg', MailerLite: '/tech/mailerlite.svg',
  'Next.js': '/tech/nextdotjs.svg', n8n: '/tech/n8n.svg', OpenAI: '/tech/openai.svg',
  'Google Gemini': '/tech/googlegemini.svg', Supabase: '/tech/supabase.svg',
  'GitHub REST API': '/tech/github.svg', TypeScript: '/tech/typescript.svg',
  React: '/tech/react.svg', 'Tailwind CSS': '/tech/tailwindcss.svg',
  OpenRouter: '/tech/openrouter.svg', 'Google Sheets': '/tech/googlesheets.svg',
  Gmail: '/tech/gmail.svg', 'Google Calendar': '/tech/googlecalendar.svg',
  'Google Docs': '/tech/googledocs.svg', 'Google Drive': '/tech/googledrive.svg',
  Express: '/tech/express.svg', 'Solana web3.js': '/tech/solana.svg', Solana: '/tech/solana.svg',
  Vite: '/tech/vite.svg', Cheerio: '/tech/cheerio.svg', 'FFmpeg.wasm': '/tech/ffmpeg.svg',
  'Google OAuth': '/tech/google.svg', NotebookLM: '/tech/notebooklm.svg',
};

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
    <span className="bento-tech-title">{lang === 'NL' ? 'Technologieën' : lang === 'DE' ? 'Technologien' : 'Technologies'}</span>
    <ul>{stack.map(name => {
      const label = name === 'Curated regulatory sources' ? (lang === 'NL' ? 'Regelgevingsbronnen' : lang === 'DE' ? 'Regulatorische Quellen' : 'Regulatory sources') : name;
      return <li key={name}>{icons[name] && <span className="bento-tech-logo"><Image src={icons[name]} width={24} height={24} alt="" className={name === 'React Flow' || name === 'MailerLite' ? 'bento-tech-multitone' : undefined} unoptimized /></span>}<span>{label}</span></li>;
    })}</ul>
  </div>, document.body);
}
