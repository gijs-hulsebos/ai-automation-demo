"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { providerLogos } from '@/data/provider-logos';

import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';

export type CertificateFanItem = {
  image: string;
  title: string;
  issuer?: string;
  credential?: string;
};

type Props = {
  card: CertificateFanItem;
  active: boolean;
  locked: boolean;
  onActivate: (touch: boolean) => void;
  onLock: (touch: boolean) => void;
  onClose: () => void;
  onDeactivate: () => void;
};

export function CertificateFanCard({ card, active, locked, onActivate, onLock, onClose, onDeactivate }: Props) {
  const pointerType = useRef('mouse');
  const { lang } = useLanguage();
  const ui = INTERFACE[lang];
  const provider = providerLogos[card.issuer || ''];
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pointerType.current === 'touch' || window.matchMedia('(hover: none)').matches) {
      event.preventDefault();
      onLock(true);
    }
  };
  return (
    <div className="circular-card certificate-hit-area"
      onPointerEnter={event => { if (event.pointerType === 'mouse') onActivate(false); }}
      onPointerLeave={event => {
        if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible')) onDeactivate();
      }}
      onFocus={() => onActivate(false)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && !(event.relatedTarget as Element | null)?.closest('.certificate-mobile-details')) onDeactivate();
      }}>
      <a className="certificate-hit-link" href={card.credential} target="_blank" rel="noopener noreferrer"
        aria-label={`${card.title} — ${card.issuer || ''}`}
        onPointerDown={event => { pointerType.current = event.pointerType; }}
        onClick={handleClick} />
      <div className="certificate-lift-surface">
        <a className="certificate-preview" href={card.credential} target="_blank" rel="noopener noreferrer"
          tabIndex={-1} aria-hidden="true"
          onPointerDown={event => { pointerType.current = event.pointerType; }} onClick={handleClick}>
          <Image src={card.image} alt="" fill sizes="300px" unoptimized className="object-contain" />
        </a>
        <div className="certificate-provider">
          {provider?.src ? <Image src={provider.src} alt={card.issuer || ''} width={90} height={24} unoptimized />
            : <span>{provider?.name || card.issuer}</span>}
        </div>
        <div className="certificate-card-caption">
          <a href={card.credential} target="_blank" rel="noopener noreferrer"
            onPointerDown={event => { pointerType.current = event.pointerType; }} onClick={handleClick}><strong>{card.title}</strong></a>
          <span>{card.issuer || ui.issuer}</span>
          {card.credential && <a href={card.credential} target="_blank" rel="noopener noreferrer" onClick={event => event.stopPropagation()}>{ui.viewCertificate}</a>}
        </div>
        {active && locked && <button type="button" className="card-close" aria-label={ui.closeCard}
          onClick={event => { event.stopPropagation(); onClose(); }}>×</button>}
      </div>
    </div>
  );
}
