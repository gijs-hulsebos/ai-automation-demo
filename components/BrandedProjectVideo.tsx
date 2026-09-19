"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export function BrandedProjectVideo({ brand, src, label }: { brand: 'Tarvos' | 'Aegix'; src: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const { lang } = useLanguage();
  const logo = brand === 'Tarvos'
    ? <span className="tarvos-expanded-logo" aria-hidden="true" />
    : <span className="aegix-expanded-logo"><Image src="https://gijshulsebos-media.ai-automation-workflow-demo.workers.dev/projects/aegix-shield.334e7ae2943644a5.png" alt="" fill sizes="160px" className="object-contain" /></span>;
  return <>
    {started && <div className="video-side-brand" aria-label={brand}>{logo}</div>}
    <div className="tarvos-project-media branded-project-media">
      <video ref={video} className="tarvos-project-video" src={src} controls playsInline preload="metadata" aria-label={label} onPlay={() => setStarted(true)} onEnded={() => setStarted(false)} />
      {!started && <button type="button" className="video-brand-play" aria-label={`${brand}: ${lang === 'NL' ? 'Video afspelen' : lang === 'DE' ? 'Video abspielen' : 'Play video'}`}
        onClick={event => { event.stopPropagation(); void video.current?.play().catch(() => setStarted(false)); }}>
        {logo}
      </button>}
    </div>
  </>;
}
