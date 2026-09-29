"use client";
import {useEffect,useId,useRef} from 'react';

/** Hover-triggered adaptation of the supplied blur/threshold morph. Plays once. */
export function MorphingText({active,title}:{active:boolean;title:string}){
 const words=useRef<HTMLSpanElement>(null);
 const first=useRef<HTMLSpanElement>(null),second=useRef<HTMLSpanElement>(null);
 const filterId='morph-'+useId().replace(/:/g,'');
 useEffect(()=>{
 const a=first.current,b=second.current;if(!a||!b)return;
 const reset=(text:string)=>{if(words.current)words.current.style.filter='none';a.textContent=text;a.style.filter='none';a.style.opacity='1';b.textContent='';b.style.opacity='0';b.style.filter='none';};
 reset(title);
 if(!active||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const texts=['@Build','@Document','@Connect',title];
 reset(texts[0]);let frame=0;const start=performance.now();
 const animate=(now:number)=>{
 const elapsed=(now-start)/1000,index=Math.floor(elapsed/1.4);
 if(index>=texts.length-1){reset(title);return;}
 const fraction=Math.max(0,Math.min(1,(elapsed-index*1.4-.35)/1.05));
 if(words.current)words.current.style.filter=fraction>0&&fraction<1?`url(#${filterId})`:'none';
 a.textContent=texts[index];b.textContent=texts[index+1];
 a.style.filter=`blur(${Math.min(5/Math.max(1-fraction,.001)-5,40)}px)`;
 b.style.filter=`blur(${Math.min(5/Math.max(fraction,.001)-5,40)}px)`;
 a.style.opacity=String(Math.pow(1-fraction,.4));b.style.opacity=String(Math.pow(fraction,.4));
 frame=requestAnimationFrame(animate);
 };
 frame=requestAnimationFrame(animate);return()=>cancelAnimationFrame(frame);
 },[active,title,filterId]);
 return <span className="social-morph"><span className="social-morph-size">{title}</span><span className="social-morph-words" ref={words}><span ref={first}>{title}</span><span ref={second}/></span><svg width="0" height="0" aria-hidden="true" style={{position:'absolute'}}><defs><filter id={filterId}><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"/></filter></defs></svg></span>;
}
