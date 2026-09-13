'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export function TarvosHackathonBadge({ open, onOpenChange: setOpen, project = 'Tarvos' }: { open: boolean; onOpenChange: (open: boolean) => void; project?: 'Tarvos' | 'Aegix' }) {
  const { lang } = useLanguage();
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest('.tarvos-hackathon-badge')) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [setOpen]);
  const description = lang === 'NL' ? `${project} is ontwikkeld als hackathonapplicatie.`
    : lang === 'DE' ? `${project} wurde als Hackathon-Anwendung entwickelt.`
    : `${project} was developed as a hackathon application.`;
  return <div className="tarvos-hackathon-badge" data-bento-interactive
    onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape' && open) { event.stopPropagation(); setOpen(false); } }}>
    <button type="button" aria-label="Hackathons" aria-expanded={open} aria-controls={`${project.toLowerCase()}-hackathon-info`}
      onFocus={() => setOpen(true)} onClick={() => setOpen(true)}>
      <Image src="/projects/hackathon.svg" alt="" width={24} height={24} />
    </button>
    {open && <div id={`${project.toLowerCase()}-hackathon-info`} role="note" className="tarvos-hackathon-info">
      <strong>Hackathon</strong>
      <p>{description}</p>
      <ul className="mt-3 border-t border-white/10 pt-3">
        {project === 'Aegix' ? <li><span className="font-medium">Colosseum Frontier Hackathon</span>
          <p className="text-xs">{lang === 'NL' ? '11 mei' : lang === 'DE' ? '11. Mai' : 'May 11'}</p>
        </li> : <><li><span className="font-medium">Common S3nse Best Pearls Hackathon</span>
          <p className="text-xs">{lang === 'NL' ? '4–5 september 2026' : lang === 'DE' ? '4.–5. September 2026' : 'September 4–5, 2026'}</p>
          <p>Tarvos x402 Paygate</p>
        </li>
        <li className="mt-3"><span className="font-medium">Colosseum Solana hackathon</span>
          <p className="text-xs">{lang === 'NL' ? 'Tot 12 oktober 2026' : lang === 'DE' ? 'Bis 12. Oktober 2026' : 'Until October 12, 2026'}</p>
          <p><a className="underline underline-offset-2 hover:text-white" href="https://tarvos.tools/nodes/triton-1/" target="_blank" rel="noopener noreferrer">Tarvos Triton One RPC node ↗</a></p>
        </li>
        </>}
      </ul>
    </div>}
  </div>;
}
