"use client";

import Image from 'next/image';
import { providerLogos } from '@/data/provider-logos';

import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';

export type CertificateFanItem = {
  id: string;
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

export function CertificateFanCard({ card, active, locked, onActivate, onClose, onDeactivate }: Props) {
  const { lang } = useLanguage();
  const ui = INTERFACE[lang];
  const destination = `/certificates?certificate=${encodeURIComponent(card.id)}`;
  const provider = providerLogos[card.issuer || ''];
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
      <a className="certificate-hit-link" href={destination}
        aria-label={`${card.title} — ${card.issuer || ''}`}
         />
      <div className="certificate-lift-surface">
        <a className="certificate-preview" href={destination}
          tabIndex={-1} aria-hidden="true" >
          <Image src={card.image} alt="" fill sizes="300px" unoptimized className="object-contain" />
        </a>
        <div className="certificate-provider">
          {provider?.src ? <Image src={provider.src} alt={card.issuer || ''} width={90} height={24} unoptimized />
            : <span>{provider?.name || card.issuer}</span>}
        </div>
        <div className="certificate-card-caption">
          <a href={destination} ><strong>{card.title}</strong></a>
          <span>{card.issuer || ui.issuer}</span>
          {card.credential && <a href={destination} onClick={event => event.stopPropagation()}>{ui.viewCertificate}</a>}
        </div>
        {active && locked && <button type="button" className="card-close" aria-label={ui.closeCard}
          onClick={event => { event.stopPropagation(); onClose(); }}>×</button>}
      </div>
    </div>
  );
}
