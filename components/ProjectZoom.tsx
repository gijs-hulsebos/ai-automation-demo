"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// A second asymmetric layer, ready to receive future project cards.
const ring = [
  [1, 1, 2, 2], [3, 1, 3, 1], [6, 1, 2, 2], [8, 1, 3, 2], [11, 1, 2, 1],
  [3, 2, 2, 1], [5, 2, 1, 1], [11, 2, 2, 2],
  [1, 3, 1, 3], [2, 3, 2, 2], [10, 3, 1, 2], [11, 4, 2, 2],
  [2, 5, 1, 2], [3, 5, 1, 2], [10, 5, 1, 2], [11, 6, 2, 1], [1, 6, 1, 2],
  [2, 7, 3, 2], [5, 7, 2, 1], [7, 7, 3, 2], [10, 7, 3, 1],
  [1, 8, 1, 1], [5, 8, 2, 1], [10, 8, 1, 1], [11, 8, 2, 1],
];
const copy = {
  NL: {hint:'Scroll om uit te zoomen',out:'Uitzoomen',back:'Terug naar laag 1',layer:'Laag',space:'Ruimte voor nieuwe projecten'},
  EN: {hint:'Scroll to zoom out',out:'Zoom out',back:'Return to layer 1',layer:'Layer',space:'Room for new projects'},
  DE: {hint:'Scrollen zum Herauszoomen',out:'Herauszoomen',back:'Zurück zu Ebene 1',layer:'Ebene',space:'Platz für neue Projekte'},
};
export function ProjectZoom({children, locked, onZoomChange, layerCount=2}: {children:ReactNode; locked:boolean; layerCount?:number; onZoomChange?: (zoom:number)=>void}) {
  const {lang}=useLanguage();
  const text=copy[lang];
  const frame=useRef<HTMLDivElement>(null);
  const position=useRef(0);
  const [zoom,setZoom]=useState(0);
  useEffect(()=>{onZoomChange?.(zoom);},[zoom,onZoomChange]);
  function change(value:number) {
    position.current=Math.max(0,Math.min(1,value));
    setZoom(position.current);
  }
  useEffect(()=>{
    const element=frame.current;
    if(!element)return;
    let lastEvent=0, switchedAt=0;
    const wheel=(event:WheelEvent)=>{
      if(layerCount<2 || locked || event.ctrlKey || event.metaKey || Math.abs(event.deltaX)>Math.abs(event.deltaY) || window.matchMedia('(pointer: coarse)').matches)return;
      if(event.target instanceof Element && event.target.closest('video,audio,input,textarea,.bento-detail-region'))return;
      const now=performance.now();
      const quiet=now-lastEvent>180;
      lastEvent=now;
      // Absorb the tail of this gesture so the page stays still during the zoom.
      if(switchedAt && (now-switchedAt<600 || (!quiet && now-switchedAt<1200))){event.preventDefault();return;}
      const current=position.current;
      if((current===0 && event.deltaY<=0)||(current===1 && event.deltaY>=0))return;
      event.preventDefault();
      change(current===0?1:0);
      switchedAt=now;

    };
    element.addEventListener('wheel',wheel,{passive:false});
    return ()=>element.removeEventListener('wheel',wheel);
  },[locked,layerCount]);
  const zoomed=zoom>0.02;
  return <div className="project-zoom" ref={frame} data-zoomed={zoomed} data-zoom={zoom.toFixed(3)} onKeyDown={event=>{if(event.key==='Escape' && zoomed){change(0);event.stopPropagation();}}}>
    <div className="project-zoom-core" inert={zoomed} style={{transform:`scale(${1-zoom*0.51})`,opacity:1-zoom*0.18}}>{children}</div>
    <div className="project-zoom-ring" aria-hidden="true" style={{opacity:zoom,transform:`scale(${1.08-zoom*0.08})`}}>
      {ring.map(([column,row,width,height],index)=><div key={index} className="project-ring-tile" style={{gridColumn:`${column} / span ${width}`,gridRow:`${row} / span ${height}`}} />)}
    </div>
    {zoomed && <button className="project-zoom-return" style={{width:`${(1-zoom*0.51)*100}%`,height:`${(1-zoom*0.51)*100}%`}} onClick={()=>change(0)} aria-label={text.back}></button>}

  </div>;
}
