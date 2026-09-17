'use client';

import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/context/LanguageContext';

export function SpecializationBadge() {
  const {lang}=useLanguage();
  const id=useId();
  const [point,setPoint]=useState<{x:number;y:number}|null>(null);
  const title={NL:'Specialisatie',EN:'Specialization',DE:'Spezialisierung'}[lang];
  const description={NL:'Een afgerond leertraject met meerdere samenhangende cursussen rond één onderwerp.',EN:'A completed learning program combining several related courses on one subject.',DE:'Ein abgeschlossenes Lernprogramm mit mehreren zusammenhängenden Kursen zu einem Thema.'}[lang];
  const show=(element:HTMLButtonElement)=>{
    const rect=element.getBoundingClientRect();
    setPoint({x:Math.max(132,Math.min(window.innerWidth-132,rect.left+rect.width/2)),y:Math.max(12,Math.min(window.innerHeight-120,rect.bottom+10))});
  };
  return <>
    <button type="button" className="specialization-badge" aria-label={title} aria-describedby={point?id:undefined}
      onPointerEnter={e=>show(e.currentTarget)} onPointerLeave={()=>setPoint(null)} onFocus={e=>show(e.currentTarget)} onBlur={()=>setPoint(null)}
      onClick={e=>{e.stopPropagation();point?setPoint(null):show(e.currentTarget);}} onKeyDown={e=>{if(e.key==='Escape'){setPoint(null);e.stopPropagation();}}}>
      <svg viewBox="0 0 64 76" aria-hidden="true">
        <defs><linearGradient id={`${id}-gold`} x2="1" y2="1"><stop stopColor="#ffdf80"/><stop offset="1" stopColor="#c98b18"/></linearGradient></defs>
        <path fill="#ad1729" d="m15 44-9 29 13-5 7 8 8-27m15-5 9 29-13-5-7 8-8-27"/>
        <path fill={`url(#${id}-gold)`} stroke="#d8a334" d="M32 2c6 0 8 6 13 7s10 1 12 7 0 9 3 14 1 10-3 14-4 9-10 11-10 0-15 4-9-3-15-4-6-7-10-11-6-9-3-14 1-9 3-14 7-6 12-7S26 2 32 2Z"/>
        <circle cx="32" cy="30" r="21" fill="none" stroke="#ac7415" strokeWidth="1.5"/>
        <path d="m15 26 17-8 17 8-17 8-17-8Zm7 5v10l10 5 10-5V31M32 34v12" fill="none" stroke="#151519" strokeWidth="3.5" strokeLinejoin="round"/>
      </svg>
    </button>
    {point && createPortal(<div id={id} role="tooltip" className="specialization-tooltip" style={{left:point.x,top:point.y}}><strong>{title}</strong><p>{description}</p></div>,document.body)}
  </>;
}
