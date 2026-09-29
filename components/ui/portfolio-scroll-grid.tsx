'use client';
import {MorphingText} from './morphing-text';
import {Children,useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
/** Posts loop in the outer lanes; compact replies scroll over the background name. */
export function PortfolioScrollGrid({title,children,replies}:{title:string;children:ReactNode;replies?:ReactNode}){
 const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLAnchorElement>(null);const [revealed,setRevealed]=useState(false);
 const [loading,setLoading]=useState({ready:0,total:0,failed:0});
 useEffect(()=>{const el=root.current;if(!el)return;const check=()=>{const cards=Array.from(el.querySelectorAll<HTMLElement>('.social-post-card'));const next={ready:cards.filter(c=>c.dataset.status==='ready').length,total:cards.length,failed:cards.filter(c=>c.dataset.status==='failed').length};el.dataset.prepared=String(next.total>0&&next.ready===next.total);setLoading(previous=>previous.ready===next.ready&&previous.total===next.total&&previous.failed===next.failed?previous:next)};const observer=new MutationObserver(check);observer.observe(el,{subtree:true,childList:true,attributes:true,attributeFilter:['data-status']});check();return()=>observer.disconnect()},[]);
 useEffect(()=>{const el=root.current;if(!el)return;let visible=false;const sync=()=>{el.dataset.running=String(visible&&!document.hidden)};const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()});observer.observe(el);document.addEventListener('visibilitychange',sync);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync)}},[]);
 function reveal(active:boolean){setRevealed(active);const area=root.current,button=trigger.current;if(!area||!button)return;
 // Freeze the loop before measuring so all lanes share exact reveal edges.
 area.dataset.reveal=String(active);
 const name=button.getBoundingClientRect(),top=name.top-30,bottom=name.bottom+30,center=(top+bottom)/2;
 area.querySelectorAll<HTMLElement>('.social-columns>.social-loop-column,.social-reply-window').forEach(column=>{
 const slots=Array.from(column.querySelectorAll<HTMLElement>('.social-loop-slot'));if(!active){slots.forEach(slot=>slot.style.removeProperty('translate'));return;}
 const boxes=slots.map(slot=>{
 const box=slot.getBoundingClientRect();
 // Exclude an in-flight reveal translation on rapid re-entry.
 const offset=parseFloat(getComputedStyle(slot).translate.split(' ')[1])||0;
 return {slot,top:box.top-offset,bottom:box.bottom-offset,height:box.height};
 });
 const upper=boxes.filter(box=>box.top+box.height/2<center);
 const lower=boxes.filter(box=>box.top+box.height/2>=center);
 const upperShift=upper.length?top-Math.max(...upper.map(box=>box.bottom)):0;
 const lowerShift=lower.length?bottom-Math.min(...lower.map(box=>box.top)):0;
 for(const box of upper)box.slot.style.translate=`0 ${upperShift}px`;
 for(const box of lower)box.slot.style.translate=`0 ${lowerShift}px`;
 });
 }
 const cards=Children.toArray(children),replyCards=Children.toArray(replies);
 function track(items:ReactNode[],key:string){const sequence=items.length===1?[...items,...items]:items;return <div className="social-loop-track" style={{'--social-duration':`${sequence.length*(key==='replies'?318:598)/24}s`} as CSSProperties}>{[0,1].map(copy=><div className="social-loop-group" key={copy} data-repeat={copy===1}>{sequence.map((card,index)=><div className="social-loop-slot" key={key+index}>{card}</div>)}</div>)}</div>}
 return <div ref={root} className="social-scroll-grid social-infinite-grid" data-reveal={revealed}>{loading.ready<loading.total||!loading.total?<div className="social-preparing" role="status"><span>{loading.failed?'Some X posts could not load.':'Loading Social Mesh…'}</span><small>{loading.ready} / {loading.total}</small>{loading.failed>0&&<button type="button" onClick={()=>window.dispatchEvent(new Event('social-embeds-retry'))}>Retry loading</button>}</div>:null}<div className="social-title-layer" aria-hidden="true"><div className="font-display"><MorphingText active={revealed} title={title}/></div></div><a ref={trigger} href="https://x.com/Gijs_Hulsebos" target="_blank" rel="noopener noreferrer" className="social-name-trigger font-display" aria-label={`Open ${title} on X`} onPointerEnter={e=>{if(e.pointerType!=='touch')reveal(true)}} onPointerLeave={e=>{if(e.pointerType!=='touch'&&document.activeElement!==trigger.current)reveal(false)}} onFocus={()=>reveal(true)} onBlur={()=>reveal(false)}>{title}</a><div className="social-columns">{[0,1,2].map(column=>{
 if(column===1)return <div className="social-reply-column" key={column}>{replyCards.length>0&&<div className="social-loop-column social-reply-window" tabIndex={0} aria-label="Replies">{track(replyCards,'replies')}</div>}</div>;
 const selected=cards.filter((_,i)=>i%2===(column===0?0:1));const items=selected.length?selected:cards.slice(0,1);return <div className="social-loop-column" key={column} tabIndex={0} aria-label={`Social Mesh ${column+1}`}>{track(items,'posts-'+column)}</div>;
 })}</div></div>;
}
