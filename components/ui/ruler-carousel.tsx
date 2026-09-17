"use client";

import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
export interface CarouselItem { id:string; title:string }

function RulerLabel({item,distance,visible,active,height,spacing,onSelect}:{item:CarouselItem;distance:number;visible:boolean;active:boolean;height:number;spacing:number;onSelect:()=>void}) {
  const pathId=useId();
  const reduced=useReducedMotion();
  const target=useMotionValue(distance);
  const position=useSpring(target,{stiffness:180,damping:28});
  const h=useMotionValue(height);
  const gap=useMotionValue(spacing);
  useEffect(()=>{h.set(height);gap.set(spacing);},[height,spacing,h,gap]);
  useEffect(()=>{target.set(distance);if(reduced)position.jump(distance);},[distance,reduced,target,position]);
  const angle=()=>Math.max(-1,Math.min(1,position.get()*2/3))*Math.asin(.8);
  // Offset the actual ruler ellipse along its normal; a rotated circular
  // approximation changes the letter-to-ruler distance at either end.
  const point=(theta:number)=>{
    const normal=Math.atan2(.62*Math.sin(theta),.625*Math.cos(theta));
    return {x:h.get()*.62*(Math.cos(theta)-1)+58*Math.cos(normal),y:h.get()*.625*Math.sin(theta)+58*Math.sin(normal)};
  };
  const x=useTransform(()=>h.get()?point(angle()).x-58:0);
  const y=useTransform(()=>h.get()?point(angle()).y:position.get()*gap.get());
  const textPath=useTransform(()=>{
    const center=point(angle());
    const extent=150/Math.max(260,h.get()*.625+58);
    return Array.from({length:81},(_,i)=>{
      const p=point(angle()+(i/80-.5)*extent*2);
      return `${i?'L':'M'} ${p.x-center.x} ${p.y-center.y}`;
    }).join(' ');
  });
  return <motion.button className="ruler-category" aria-label={item.title} aria-pressed={active} aria-hidden={!visible} tabIndex={visible?0:-1}
    style={{x,y,pointerEvents:visible?'auto':'none'}} onClick={onSelect}
    animate={{opacity:visible?(active?1:.32):0,scale:height?1:active?1:.86}}
    transition={reduced?{duration:0}:{duration:.35,ease:'easeOut'}}>
      {height>0?<svg className="ruler-curved-label" viewBox="-50 -130 100 260" aria-hidden="true">
        <defs><motion.path id={pathId} d={textPath}/></defs>
        <text><textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">{item.title.toUpperCase()}</textPath></text>
      </svg>:<span>{item.title}</span>}
    </motion.button>;
}

// Category selection is independent; the tick scale reflects the bento layer.
export function RulerCarousel({originalItems,label,previous,next,zoom=0,layerCount=1,currentLayer,showPagination=true,visibleItems=5,curved=false,lockLabel,onCategoryChange}:{originalItems:CarouselItem[];label:string;previous:string;next:string;zoom?:number;layerCount?:number;currentLayer?:number;showPagination?:boolean;visibleItems?:3|5;curved?:boolean;lockLabel?:string;onCategoryChange?:(id:string)=>void}) {
  const [active,setActive]=useState(0);
  const [spacing,setSpacing]=useState(210);
  const [curveHeight,setCurveHeight]=useState(0);
  const windowRef=useRef<HTMLDivElement>(null);
  const root=useRef<HTMLDivElement>(null);
  const reduced=useReducedMotion();
  const count=originalItems.length;
  const displayedLayer=Math.min(layerCount,currentLayer ?? (zoom>0?2:1));
  const selectedId=originalItems[active]?.id;
  useEffect(()=>{
    const element=windowRef.current;
    if(!element || visibleItems!==3)return;
    const measure=()=>{
      const desktop=window.matchMedia('(min-width:1501px)').matches;
      const height=desktop?Math.max(0,(root.current?.getBoundingClientRect().height ?? 0)-32):0;
      setSpacing(height>0?height/3:210);
      setCurveHeight(curved && desktop?height:0);
    };
    measure();
    const observer=new ResizeObserver(measure);
    if(root.current)observer.observe(root.current);
    observer.observe(element);
    window.addEventListener('resize',measure);
    return ()=>{observer.disconnect();window.removeEventListener('resize',measure);};
  },[visibleItems,curved]);
  const arcAngle=(fraction:number)=>Math.max(-1,Math.min(1,fraction))*Math.asin(.8);
  const curveX=(fraction:number)=>curveHeight*.62*(Math.cos(arcAngle(fraction))-1);
  const curveY=(fraction:number)=>curveHeight?Math.sin(arcAngle(fraction))/.8:fraction;
  const curveAngle=(fraction:number)=>curveHeight?Math.atan2(.62*Math.sin(arcAngle(fraction)),.625*Math.cos(arcAngle(fraction)))*180/Math.PI:0;
  useEffect(()=>{if(selectedId)onCategoryChange?.(selectedId);},[selectedId,onCategoryChange]);
  const move=(direction:number)=>setActive(index=>(index+direction+count)%count);
  useEffect(()=>{
    const element=root.current;
    if(!element || !count)return;
    let last=0;
    const wheel=(event:WheelEvent)=>{
      if(window.matchMedia('(max-width:1500px)').matches || event.ctrlKey || event.metaKey || !event.deltaY)return;
      event.preventDefault();event.stopPropagation();
      const now=performance.now();
      if(now-last>250)setActive(index=>(index+(event.deltaY>0?1:-1)+count)%count);
      last=now;
    };
    element.addEventListener('wheel',wheel,{passive:false});
    return ()=>element.removeEventListener('wheel',wheel);
  },[count]);
  if(!count)return null;
  return <div ref={root} className={`category-ruler${curveHeight?' category-ruler-curved':''}`} data-layer={zoom>0?2:1} role="group" aria-label={label} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();move(event.key==='ArrowDown'?1:-1);}}}>
    <div className="ruler-mobile-options" aria-label={label}>
      {originalItems.map((item,index)=><button key={item.id} type="button" aria-pressed={index===active} onClick={event=>{
        setActive(index);
        const button=event.currentTarget;
        const list=button.parentElement;
        if(list)list.scrollTo({left:button.offsetLeft-(list.clientWidth-button.offsetWidth)/2,behavior:reduced?'instant':'smooth'});
      }}>{item.title}</button>)}
    </div>
    <button className="ruler-arrow ruler-arrow-previous" style={{transform:`translateX(${curveX(-1)}px) rotate(${curveAngle(-1)}deg)`}} aria-label={previous} onClick={()=>move(-1)}><ChevronUp size={16}/></button>
    <div ref={windowRef} className="ruler-window">
      <div className="ruler-ticks" aria-hidden="true">{Array.from({length:81},(_,index)=>{
        const major=(index-40)%5===0;
        const fraction=(index-40)*.05*(1-zoom*.5);
        return <motion.i key={index} className={major?'major':''} initial={false}
          animate={{top:`${50+curveY(fraction)*50}%`,x:curveX(fraction),rotate:curveAngle(fraction),opacity:curveHeight?Math.max(0,Math.min(1,(1-Math.abs(fraction))/.08)):1,width:(major?16:8)*(1-zoom*.25),height:2-zoom*.5}}
          transition={reduced?{duration:0}:{duration:.55,ease:[.22,1,.36,1]}}/>;
      })}</div>
      <div className="ruler-focus" aria-hidden="true"/>
      {originalItems.map((item,index)=>{
        let distance=(index-active+count)%count;
        if(distance>count/2)distance-=count;
        const visible=Math.abs(distance)<=Math.floor(visibleItems/2);
        return <RulerLabel key={item.id} item={item} distance={distance} visible={visible} active={index===active} height={curveHeight} spacing={spacing} onSelect={()=>setActive(index)}/>;
      })}
    </div>
    {showPagination && <div className="ruler-pagination" style={{translate:`${curveX(1)}px 0`}} aria-label={lockLabel || `${label}: ${displayedLayer} / ${layerCount}`} aria-live="polite">
      {lockLabel?<span className="ruler-locked-layer"><span className="ruler-locked-count">1/2</span><svg width="16" height="18" viewBox="0 0 24 28" role="img" aria-label={lockLabel} className="text-red-600"><title>{lockLabel}</title><path fill="currentColor" fillRule="evenodd" d="M5 11V8a7 7 0 0 1 14 0v3h2a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3h2Zm3 0h8V8a4 4 0 0 0-8 0v3Zm4 5a2.5 2.5 0 0 0-1 4.79V24h2v-3.21A2.5 2.5 0 0 0 12 16Z"/></svg></span>:<>{displayedLayer}<span>/{layerCount}</span></>}
    </div>}
    <button className="ruler-arrow ruler-arrow-next" style={{transform:`translateX(${curveX(1)}px) rotate(${curveAngle(1)}deg)`}} aria-label={next} onClick={()=>move(1)}><ChevronDown size={16}/></button>
  </div>;
}
