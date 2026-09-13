"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { CertificateFanCard } from './certificate-fan-card';
import type { CertificateFanItem } from './certificate-fan-card';

import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';

import certificateManifest from '@/data/certificates.json';
const certificates: CertificateFanItem[] = certificateManifest.certificates;
const SLOT_COUNT = 16;
const DURATION = 72000;
type FlipCardProps = { image: string; title: string; description: string; style: CSSProperties; active: boolean; onActivate: () => void; onDeactivate: () => void };

function FlipCard({ image, title, description, style, active, onActivate, onDeactivate }: FlipCardProps) {
  const { lang } = useLanguage();
  const [failed, setFailed] = useState(false);
  return (
    <div className="circular-card" style={style}
      onPointerEnter={event => { if (event.pointerType === 'mouse') onActivate(); }}>
     <button type="button" className="center-card-trigger"
      onFocus={event => { if (event.currentTarget.matches(':focus-visible')) onActivate(); }}
      aria-label={`${title}: ${description}`} aria-expanded={active}
      onClick={onActivate} />
      <span className="center-card-lift">
       <span className="circular-card-inner">
        <span className="circular-card-front" aria-hidden="true">
          {failed ? <span className="circular-card-fallback">{title}</span> :
            <Image src={image} alt="" fill sizes="340px" unoptimized
              className="object-cover" onError={() => setFailed(true)} />}
        </span>
       </span>
       {active && <button type="button" className="card-close" aria-label={INTERFACE[lang].closePortrait}
         onClick={event => { event.stopPropagation(); onDeactivate(); }}>×</button>}
      </span>
    </div>
  );
}

export default function CircularGallery() {
  const { lang } = useLanguage();
  const ui = INTERFACE[lang];
  const [slotItems, setSlotItems] = useState(() => Array.from({ length: SLOT_COUNT }, (_, i) => i % certificates.length));
  const nextCertificate = useRef(SLOT_COUNT);
  const replacedCycles = useRef<number[]>(Array(SLOT_COUNT).fill(-1));
  const readyImages = useRef(new Set<string>());
  const [paused, setPaused] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const pausedRef = useRef(paused);
  const manualPausedRef = useRef(paused);
  const interactingRef = useRef(false);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selection, setSelection] = useState<{ index: number; angle: number; x: number; y: number; scale: number; touch: boolean; locked: boolean; returning: boolean } | null>(null);

  const activate = (index: number, touch: boolean, lock = false) => {
    if (selection?.index === index && !selection.returning && lock) {
      setSelection(previous => previous ? { ...previous, locked: true, touch } : null);
      return;
    }
    if (interactingRef.current && !selection?.returning && selection?.index === index) return;
    if (returnTimer.current) clearTimeout(returnTimer.current);
    interactingRef.current = true;
    pausedRef.current = true;
    animationsRef.current.forEach(animation => animation.pause());
    const orbit = index === -1
      ? galleryRef.current?.querySelector<HTMLElement>('.circular-gallery-center-card')
      : galleryRef.current?.querySelectorAll<HTMLElement>('.circular-gallery-orbit')[index];
    if (!orbit) return;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(orbit).transform);
    const angle = -Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    const card = orbit.querySelector<HTMLElement>('.circular-card');
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const header = document.querySelector('header')?.getBoundingClientRect();
    const scale = index === -1 ? Math.min(2.2, (window.innerWidth - 40) / card.offsetWidth, (window.innerHeight - (header?.bottom ?? 100) - 112) / card.offsetHeight) : 1.25;
    const halfWidth = card.offsetWidth * scale / 2;
    const halfHeight = card.offsetHeight * scale / 2;
    const topLimit = (header?.bottom ?? 100) + 64 + halfHeight;
    const bottomLimit = window.innerHeight - 24 - halfHeight;
    const targetY = Math.max(topLimit, Math.min(centerY - Math.max(48, card.offsetHeight * (index === -1 ? 1.3 : 0.65)), bottomLimit));
    const targetX = Math.max(20 + halfWidth, Math.min(centerX, window.innerWidth - 20 - halfWidth));
    setSelection({ index, angle, x: targetX - centerX, y: targetY - centerY, scale, touch, locked: index === -1 || lock, returning: false });
  };

  const deactivate = () => {
    if (!interactingRef.current) return;
    if ((document.activeElement as Element | null)?.closest('.card-close, .certificate-mobile-details')) {
      galleryRef.current?.querySelector<HTMLElement>('[data-selected="true"] .certificate-hit-link, [data-selected="true"] .center-card-trigger')?.focus({ preventScroll: true });
    }
    setSelection(previous => previous ? { ...previous, returning: true } : null);
    if (returnTimer.current) clearTimeout(returnTimer.current);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320;
    returnTimer.current = setTimeout(() => {
      interactingRef.current = false;
      pausedRef.current = manualPausedRef.current;
      setSelection(null);
      if (!manualPausedRef.current) animationsRef.current.forEach(animation => animation.play());
    }, duration);
  };

  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') deactivate(); };
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('keydown', escape);
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rebuild = () => {
      const elapsed = Number(animationsRef.current[0]?.currentTime ?? 0);
      animationsRef.current.forEach(animation => animation.cancel());
      animationsRef.current = [];
      const { width, height } = gallery.getBoundingClientRect();
      const radiusX = window.innerWidth > 700 ? width / 2 - height * 0.09 : width * 0.4;
      const radiusY = height * 0.4;
      const orbits = gallery.querySelectorAll<HTMLElement>('.circular-gallery-orbit');
      const sharedStart = document.timeline.currentTime;
      orbits.forEach((orbit, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const phase = Math.floor(index / 2) / (orbits.length / 2);
        const transformAt = (progress: number) => {
          const angle = direction * Math.PI * progress;
          return `translate3d(${radiusX * Math.sin(angle)}px, ${-radiusY * Math.cos(angle)}px, 0) rotate(${direction * progress * 180}deg)`;
        };
        if (reducedMotion.matches) {
          orbit.style.transform = transformAt((Math.floor(index / 2) + 1) / (orbits.length / 2) * 170 / 180);
          return;
        }
        // Sample the ellipse once. Only compositor-friendly properties animate.
        const keyframes = Array.from({ length: 181 }, (_, step) => {
          const progress = step / 180;
          return { offset: progress, transform: transformAt(progress), opacity: progress <= 0.92 ? 1 : Math.max(0, (0.98 - progress) / 0.06) };
        });
        const animation = orbit.animate(keyframes, { duration: 72000, delay: -phase * 72000, iterations: Infinity, easing: 'linear' });
        if (sharedStart !== null) animation.startTime = Number(sharedStart) - elapsed;
        if (pausedRef.current) { animation.pause(); animation.currentTime = elapsed; }
        animationsRef.current.push(animation);
      });
    };
    const observer = new ResizeObserver(rebuild);
    observer.observe(gallery);
    reducedMotion.addEventListener('change', rebuild);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', rebuild);
      animationsRef.current.forEach(animation => animation.cancel());
    };
  }, []);

  useEffect(() => {
    manualPausedRef.current = paused;
    pausedRef.current = paused || interactingRef.current;
    animationsRef.current.forEach(animation => pausedRef.current ? animation.pause() : animation.play());
  }, [paused]);
  useEffect(() => {
    certificates.forEach(card => {
      const preview = new window.Image();
      preview.onload = () => readyImages.current.add(card.image);
      preview.src = card.image;
    });
    const timer = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      const changes: [number, number][] = [];
      animationsRef.current.forEach((animation, index) => {
        const position = Number(animation.currentTime ?? 0) / DURATION + Math.floor(index / 2) / (SLOT_COUNT / 2);
        const cycle = Math.floor(position);
        // Fade reaches zero before this window. Replace only the invisible slot.
        if (position % 1 >= 0.985 && replacedCycles.current[index] !== cycle
          && readyImages.current.has(certificates[nextCertificate.current % certificates.length].image)) {
          replacedCycles.current[index] = cycle;
          changes.push([index, nextCertificate.current++ % certificates.length]);
        }
      });
      if (changes.length) setSlotItems(previous => {
        const next = [...previous];
        changes.forEach(([slot, item]) => { next[slot] = item; });
        return next;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selection?.touch || selection.returning) return;
    const outside = (event: PointerEvent) => {
      if (!(event.target as Element).closest('.certificate-mobile-details, [data-selected="true"]')) deactivate();
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [selection]);

  const centerCard = { image: '/gijs-hulsebos.png', title: 'Gijs Hulsebos', description: ui.portrait };
  const pairedCards = slotItems.map(index => certificates[index]);
  return (
    <div id="certificates" ref={galleryRef} className="circular-gallery" role="region" aria-label={ui.gallery} data-paused={paused}>
        <button type="button" className="gallery-next-certificates" onClick={() => {
          deactivate();
          setSlotItems(Array.from({ length: SLOT_COUNT }, () => nextCertificate.current++ % certificates.length));
        }}>{lang === 'NL' ? 'Volgende certificaten' : lang === 'DE' ? 'Weitere Zertifikate' : 'Next certificates'}</button>
        <h2 id="learning-trajectory" className="gallery-center-title font-display">{ui.theory}</h2>
        <button type="button" className="gallery-pause" aria-pressed={paused}
          onClick={() => setPaused(value => !value)}>
          {paused ? ui.resume : ui.pause}
        </button>
      <div className="circular-gallery-center-card" data-selected={selection?.index === -1}
        data-lifted={selection?.index === -1 && !selection.returning}
        style={{
          '--center-lift-x': `${selection?.index === -1 ? selection.x : 0}px`,
          '--center-lift-y': `${selection?.index === -1 ? selection.y : 0}px`,
          '--center-lift-scale': selection?.index === -1 ? selection.scale : 1,
        } as CSSProperties}>
        <FlipCard {...centerCard} style={{ left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }}
          active={selection?.index === -1 && !selection.returning}
          onActivate={() => activate(-1, false)} onDeactivate={deactivate} />
      </div>
      {pairedCards.map((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        return (
          <div key={index} className="circular-gallery-orbit" data-direction={direction === -1 ? 'left' : 'right'}
            data-selected={selection?.index === index}
            data-lifted={selection?.index === index && !selection.returning}
            style={{
              '--lift-angle': `${selection?.index === index ? selection.angle : 0}deg`,
              '--lift-x': `${selection?.index === index ? selection.x : 0}px`,
              '--lift-y': `${selection?.index === index ? selection.y : 0}px`,
            } as CSSProperties}>
            <CertificateFanCard card={card} active={selection?.index === index && !selection.returning}
              locked={selection?.index === index && selection.locked}
              onActivate={touch => activate(index, touch)} onLock={touch => activate(index, touch, true)} onClose={deactivate}
              onDeactivate={() => { if (selection?.index === index && !selection.locked) deactivate(); }} />
          </div>
        );
      })}
      {selection?.touch && !selection.returning && (
        <div className="certificate-mobile-details" role="region" aria-label={ui.selected}>
          <strong>{pairedCards[selection.index].title}</strong>
          <span>{pairedCards[selection.index].issuer || ui.issuer}</span>
          {pairedCards[selection.index].credential
            ? <a href={pairedCards[selection.index].credential} target="_blank" rel="noopener noreferrer">{ui.viewCertificate}</a>
            : <button type="button" disabled>{ui.viewCertificate}</button>}
          <button type="button" onClick={deactivate} aria-label={ui.closeCard}>×</button>
        </div>
      )}
    </div>
  );
}
