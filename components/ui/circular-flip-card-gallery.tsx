"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CertificateFanCard } from './certificate-fan-card';
import { SpecializationBadge } from './specialization-badge';

import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';

import { movingCertificatesForFormat, certificateLayerCount, specializationAwards, CERTIFICATES_PER_RING } from '@/lib/certificate-layers';
const portraitScale = (layer:number) => layer === 0 ? 1 : 1.4 * Math.pow(.58,layer-1);
type FlipCardProps = { image: string; title: string; description: string; style: CSSProperties; active: boolean; interactive:boolean; onActivate: () => void; onDeactivate: () => void };

function FlipCard({ image, title, description, style, active, interactive, onActivate, onDeactivate }: FlipCardProps) {
  const { lang } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  return (
    <div className="circular-card" style={style}
      role={interactive?undefined:'img'} aria-label={interactive?undefined:title}
      onPointerEnter={event => { if (interactive && event.pointerType === 'mouse') onActivate(); }}>
     {interactive && <button type="button" className="center-card-trigger"
      onFocus={event => { if (event.currentTarget.matches(':focus-visible')) onActivate(); }}
      aria-label={`${title}: ${description}`} aria-expanded={active}
      onClick={onActivate} />}
      <span className="center-card-lift">
       <span className="circular-card-inner">
        <span className="circular-card-front" aria-hidden="true">
          {failed ? <span className="circular-card-fallback">{title}</span> :
            <Image src={image} alt="" fill sizes="340px" unoptimized
              className="object-cover" onError={() => setFailed(true)} />}
        </span>
       </span>
       <motion.span className="portrait-system-label"
         initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
         whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
         transition={{ duration: reducedMotion ? 0 : 0.4 }}>
         {lang === 'NL' ? 'VAN CONCEPT NAAR SYSTEEM' : lang === 'DE' ? 'VOM KONZEPT ZUM SYSTEM' : 'FROM CONCEPT TO SYSTEM'}
       </motion.span>
       {interactive && active && <button type="button" className="card-close" aria-label={INTERFACE[lang].closePortrait}
         onClick={event => { event.stopPropagation(); onDeactivate(); }}>×</button>}
      </span>
    </div>
  );
}

export default function CircularGallery({format='all',onLayerChange}:{format?:string;onLayerChange?:(layer:number)=>void}) {
  const { lang } = useLanguage();
  const ui = INTERFACE[lang];
  const [certificates] = useState(()=>movingCertificatesForFormat(format));
  const [layer,setLayer]=useState(0);
  const layerRef=useRef(0);
  const zoomingUntil=useRef(0);
  const layerCount=certificateLayerCount(format);
  const fixedAwards=format==='all'||format==='specializations'?specializationAwards:[];
  const awardLayer=format==='all'?layerCount-1:0;
  const [awardSelection,setAwardSelection]=useState<{id:string;angle:number;x:number;y:number}|null>(null);
  const awardTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const selectAward=(id:string)=>{
    if(awardTimer.current)clearTimeout(awardTimer.current);
    const anchor=Array.from(galleryRef.current?.querySelectorAll<HTMLElement>('[data-award]')??[]).find(el=>el.dataset.award===id);
    if(!anchor)return;
    if(returnTimer.current)clearTimeout(returnTimer.current);
    setSelection(null);
    interactingRef.current=false;
    animationsRef.current.forEach(animation=>animation.pause());
    pausedRef.current=true;
    const matrix=new DOMMatrixReadOnly(getComputedStyle(anchor).transform);
    setAwardSelection({id,angle:-Math.atan2(matrix.b,matrix.a)*180/Math.PI,x:format==='all'?-matrix.e:0,y:format==='all'?-matrix.f:-48});
  };
  const releaseAward=()=>{
    setAwardSelection(null);
    if(awardTimer.current)clearTimeout(awardTimer.current);
    awardTimer.current=setTimeout(()=>{pausedRef.current=false;animationsRef.current.forEach(animation=>animation.play());},350);
  };
  useEffect(()=>()=>{if(awardTimer.current)clearTimeout(awardTimer.current);},[]);
  const paused=false;
  const galleryRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const pausedRef = useRef(paused);
  const manualPausedRef = useRef(paused);
  const interactingRef = useRef(false);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selection, setSelection] = useState<{ index: number; angle: number; x: number; y: number; scale: number; touch: boolean; locked: boolean; returning: boolean } | null>(null);
  useEffect(()=>{onLayerChange?.(layer);},[layer,onLayerChange]);
  useEffect(()=>{
    const gallery=galleryRef.current;
    if(!gallery)return;
    let lastEvent=0,switchedAt=0;
    const change=(next:number)=>{
      if(next===layerRef.current)return;
      zoomingUntil.current=performance.now()+650;
      if(returnTimer.current)clearTimeout(returnTimer.current);
      layerRef.current=next;
      setLayer(next);
      setAwardSelection(null);
      if(awardTimer.current)clearTimeout(awardTimer.current);
      setSelection(null);
      interactingRef.current=false;
      pausedRef.current=false;
      animationsRef.current.forEach(animation=>animation.play());
    };
    const wheel=(event:WheelEvent)=>{
      if(event.ctrlKey||event.metaKey||!event.deltaY||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
      if((event.target as Element).closest('.certificate-card-caption,.certificate-mobile-details,[data-lifted="true"] .card-close'))return;
      const now=performance.now(),quiet=now-lastEvent>180;
      lastEvent=now;
      if(switchedAt&&(now-switchedAt<650||(!quiet&&now-switchedAt<1200))){event.preventDefault();return;}
      const next=Math.max(0,Math.min(layerCount-1,layerRef.current+(event.deltaY>0?1:-1)));
      if(next===layerRef.current)return;
      event.preventDefault();switchedAt=now;change(next);
    };
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key!=='PageDown'&&event.key!=='PageUp')return;
      event.preventDefault();change(Math.max(0,Math.min(layerCount-1,layerRef.current+(event.key==='PageDown'?1:-1))));
    };
    gallery.addEventListener('wheel',wheel,{passive:false});
    gallery.addEventListener('keydown',keyboard);
    return ()=>{gallery.removeEventListener('wheel',wheel);gallery.removeEventListener('keydown',keyboard);};
  },[layerCount]);

  const activate = (index: number, touch: boolean, lock = false) => {
    if(performance.now()<zoomingUntil.current)return;
    if(index===-1 && layerRef.current>0)return;
    if(awardSelection)return;
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
    const ringScale=index===-1?portraitScale(layerRef.current):Math.pow(.58,layerRef.current-(index<CERTIFICATES_PER_RING?0:1));
    setSelection({ index, angle, x: (targetX - centerX)/ringScale, y: (targetY - centerY)/ringScale, scale, touch, locked: index === -1 || lock, returning: false });
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
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { deactivate(); releaseAward(); } };
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
      gallery.querySelectorAll<HTMLElement>('.specialization-anchor').forEach((anchor,index)=>{
        const angle=index*Math.PI/2;
        anchor.style.transform=`translate3d(${radiusX*Math.sin(angle)}px,${-radiusY*Math.cos(angle)}px,0) rotate(${index*90}deg)`;
        if(format==='specializations' && !reducedMotion.matches){
          const frames=Array.from({length:361},(_,step)=>{
            const rotation=angle+step*Math.PI/180;
            return {offset:step/360,transform:`translate3d(${radiusX*Math.sin(rotation)}px,${-radiusY*Math.cos(rotation)}px,0) rotate(${rotation*180/Math.PI}deg)`};
          });
          const animation=anchor.animate(frames,{duration:144000,iterations:Infinity,easing:'linear'});
          if(sharedStart!==null)animation.startTime=Number(sharedStart)-elapsed;
          if(pausedRef.current){animation.pause();animation.currentTime=elapsed;}
          animationsRef.current.push(animation);
        }
      });
      orbits.forEach((orbit, index) => {
        const ringIndex=index<CERTIFICATES_PER_RING?0:1;
        const ringSize=ringIndex===0?Math.min(CERTIFICATES_PER_RING,certificates.length):certificates.length-CERTIFICATES_PER_RING;
        const localIndex=index-ringIndex*CERTIFICATES_PER_RING;
        const direction = localIndex % 2 === 0 ? -1 : 1;
        // An odd ring has one fewer card on one side. Space each half
        // independently so that neither side contains an empty slot.
        const sideCount=localIndex%2===0?Math.ceil(ringSize/2):Math.floor(ringSize/2);
        const phase = Math.floor(localIndex / 2) / sideCount;
        const transformAt = (progress: number) => {
          const angle = direction * Math.PI * progress + (ringIndex % 2 === 1 ? Math.PI : 0);
          return `translate3d(${radiusX * Math.sin(angle)}px, ${-radiusY * Math.cos(angle)}px, 0) rotate(${angle * 180 / Math.PI}deg)`;
        };
        if (reducedMotion.matches) {
          orbit.style.transform = transformAt((Math.floor(localIndex / 2) + .5) / sideCount);
          return;
        }
        // Sample the ellipse once. Only compositor-friendly properties animate.
        const keyframes = Array.from({ length: 181 }, (_, step) => {
          const progress = step / 180;
          return { offset: progress, transform: transformAt(progress), opacity: Math.min(1,progress/.04,(1-progress)/.04) };
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
    if (!selection?.touch || selection.returning) return;
    const outside = (event: PointerEvent) => {
      if (!(event.target as Element).closest('.certificate-mobile-details, [data-selected="true"]')) deactivate();
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [selection]);

  const centerCard = { image: '/gijs-hulsebos.png', title: 'Gijs Hulsebos', description: ui.portrait };
  const pairedCards = certificates;
  return (
    <div id="certificates" ref={galleryRef} className="circular-gallery" role="region" tabIndex={0} aria-label={ui.gallery} data-format={format} data-layer={layer+1} data-paused={paused}>
      <div className="certificate-ring certificate-ring-center" style={{transform:`scale(${portraitScale(layer)})`,opacity:awardSelection && format==='all'?0:1}}>
        <h2 id="learning-trajectory" className="gallery-center-title font-display" style={{opacity:layer>0?0:1}} aria-hidden={layer>0}>{certificates.length||fixedAwards.length?ui.theory:({NL:'Nog geen certificaten voor deze leervorm',EN:'No certificates for this learning format yet',DE:'Noch keine Zertifikate für dieses Lernformat'}[lang])}</h2>
      <div className="circular-gallery-center-card" data-selected={selection?.index === -1}
        data-lifted={selection?.index === -1 && !selection.returning}
        style={{
          '--center-lift-x': `${selection?.index === -1 ? selection.x : 0}px`,
          '--center-lift-y': `${selection?.index === -1 ? selection.y : 0}px`,
          '--center-lift-scale': selection?.index === -1 ? selection.scale : 1,
        } as CSSProperties}>
        <FlipCard {...centerCard} interactive={layer===0 && format!=='specializations'} style={{ left: '50%', top: layer>0||format==='specializations'?'50%':'10%', transform: 'translate(-50%, -50%)' }}
          active={selection?.index === -1 && !selection.returning}
          onActivate={() => activate(-1, false)} onDeactivate={deactivate} />
      </div>
      </div>
      {Array.from({length:layerCount},(_,ring)=><div key={ring} className="certificate-ring certificate-orbit-ring" data-visible={ring<=layer} aria-hidden={ring>layer} inert={ring>layer} style={{transform:`scale(${ring>layer?1.12:Math.pow(.58,layer-ring)})`,opacity:ring>layer?0:1,visibility:ring>layer?'hidden':'visible'}}>
      {pairedCards.slice(ring*CERTIFICATES_PER_RING,ring===0?CERTIFICATES_PER_RING:undefined).map((card, localIndex) => {
        const index=ring*CERTIFICATES_PER_RING+localIndex;
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
      {ring===awardLayer && fixedAwards.map(card=>{
        const active=awardSelection?.id===card.id;
        return <div key={card.id} className="specialization-anchor" data-award={card.id} data-selected={active} style={{zIndex:active?30:20}}>
        <div className="specialization-adjust" style={{transform:active?'rotate('+awardSelection.angle+'deg) translate('+awardSelection.x+'px,'+awardSelection.y+'px) scale(1.4)':'rotate(0deg) translate(0px,0px) scale(1)'}}>
        <div className="specialization-card-shell"
          onPointerEnter={event=>{if(format==='specializations' && event.pointerType==='mouse')selectAward(card.id);}}
          onPointerLeave={()=>{if(format==='specializations' && active)releaseAward();}}
          onFocus={event=>{if(format==='specializations' && event.target.matches(':focus-visible'))selectAward(card.id);}}
          onBlur={event=>{if(format==='specializations' && !event.currentTarget.contains(event.relatedTarget))releaseAward();}}>
        <div className="specialization-fixed-card">
          <button type="button" className="certificate-preview specialization-preview" aria-label={card.title} aria-pressed={active}
            onClick={()=>{if(active)releaseAward();else selectAward(card.id);}}>
            <Image src={card.image} alt={card.title} fill sizes="250px" unoptimized />
          </button>
          <a className="certificate-provider specialization-provider" href={'/certificates?certificate='+encodeURIComponent(card.id)}><span>{card.issuer}</span></a>
        </div>
        <SpecializationBadge />
        </div>
        </div>
      </div>;
      })}
      </div>)}
      {selection?.touch && selection.index>=0 && !selection.returning && (
        <div className="certificate-mobile-details" role="region" aria-label={ui.selected}>
          <strong>{pairedCards[selection.index].title}</strong>
          <span>{pairedCards[selection.index].issuer || ui.issuer}</span>
          {pairedCards[selection.index].credential
            ? <a href={`/certificates?certificate=${encodeURIComponent(pairedCards[selection.index].id)}`}>{ui.viewCertificate}</a>
            : <button type="button" disabled>{ui.viewCertificate}</button>}
          <button type="button" onClick={deactivate} aria-label={ui.closeCard}>×</button>
        </div>
      )}
    </div>
  );
}
