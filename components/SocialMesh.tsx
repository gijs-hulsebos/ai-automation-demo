'use client';
import {useEffect,useRef,useState} from 'react';
import Script from 'next/script';
import {useLanguage} from '@/context/LanguageContext';
import {PortfolioScrollGrid} from './ui/portfolio-scroll-grid';
import './social-mesh.css';
type Post={id:string;url:string;pinned:boolean;reply?:boolean};
type XWindow=Window&{twttr?:{widgets:{createTweet:(id:string,target:HTMLElement,options:Record<string,unknown>)=>Promise<HTMLElement|undefined>}}};
const copy={NL:{loading:'Posts laden…',error:'De posts zijn tijdelijk niet beschikbaar.',empty:'Binnenkort meer posts.',open:'Bekijk op X',more:'Meer posts',less:'Minder posts'},EN:{loading:'Loading posts…',error:'Posts are temporarily unavailable.',empty:'More posts coming soon.',open:'View on X',more:'More posts',less:'Fewer posts'},DE:{loading:'Beiträge werden geladen…',error:'Die Beiträge sind vorübergehend nicht verfügbar.',empty:'Weitere Beiträge folgen bald.',open:'Auf X ansehen',more:'Mehr Beiträge',less:'Weniger Beiträge'}};
// Limit widget initialization work so X cannot flood the main thread at once.
const embedQueue:Array<()=>Promise<void>>=[];let loadingEmbeds=0;
function drainEmbeds(){while(loadingEmbeds<3&&embedQueue.length){const job=embedQueue.shift()!;loadingEmbeds++;void job().finally(()=>{loadingEmbeds--;setTimeout(drainEmbeds,60)})}}
function Embed({post,ready}:{post:Post;ready:boolean}){
 const host=useRef<HTMLDivElement>(null);
 const [attempt,setAttempt]=useState(0),[status,setStatus]=useState<'loading'|'ready'|'failed'>('loading');
 useEffect(()=>{const retry=()=>{if(status==='failed')setAttempt(n=>n+1)};window.addEventListener('social-embeds-retry',retry);return()=>window.removeEventListener('social-embeds-retry',retry)},[status]);
 useEffect(()=>{
 if(!ready)return;const target=host.current;if(!target)return;
 let active=true;setStatus('loading');const mount=document.createElement('div');target.replaceChildren(mount);
 const job=async()=>{
 if(!active)return;
 let timeout:ReturnType<typeof setTimeout>|undefined;
 try{
 const widgets=(window as XWindow).twttr?.widgets;if(!widgets)throw Error('Widget unavailable');
 const result=await Promise.race([widgets.createTweet(post.id,mount,{theme:'dark',conversation:'none',dnt:true,align:'center'}),new Promise<undefined>(resolve=>{timeout=setTimeout(()=>resolve(undefined),15000)})]);
 if(active)setStatus(result?'ready':'failed');
 }catch{if(active)setStatus('failed')}finally{clearTimeout(timeout)}
 };
 embedQueue.push(job);drainEmbeds();
 return()=>{active=false;const index=embedQueue.indexOf(job);if(index>=0)embedQueue.splice(index,1);mount.remove()};
 },[post.id,attempt,ready]);
 return <article className="social-post-card" data-status={status}><div ref={host} className="social-embed"/>{status!=='ready'&&<div className="social-embed-status" role="status">{status==='loading'?'Loading X post…':<>X embed unavailable. <button onClick={()=>setAttempt(n=>n+1)}>Retry</button></>}</div>}</article>;
}
export default function SocialMesh(){
 const section=useRef<HTMLElement>(null);const [near,setNear]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{const el=section.current;if(!el)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setNear(true);observer.disconnect()}},{rootMargin:'1000px 0px'});observer.observe(el);return()=>observer.disconnect()},[]);
 const {lang}=useLanguage();const t=copy[lang];const [posts,setPosts]=useState<Post[]|null>(null),[failed,setFailed]=useState(false);
 useEffect(()=>{const controller=new AbortController();let busy=false;const update=async()=>{if(busy)return;busy=true;try{const r=await fetch('/api/social-mesh',{cache:'no-store',signal:controller.signal});if(!r.ok)throw Error();const data=await r.json();if(!controller.signal.aborted){setPosts(previous=>JSON.stringify(previous)===JSON.stringify(data.posts)?previous:data.posts);setFailed(false)}}catch{if(!controller.signal.aborted)setFailed(true)}finally{busy=false}};void update();const timer=setInterval(()=>{if(document.visibilityState==='visible')void update()},60000);return()=>{controller.abort();clearInterval(timer)}},[]);
 return <section ref={section} id="social-mesh" className="social-mesh-section" aria-labelledby="social-mesh-title"><h2 id="social-mesh-title" className="social-main-title font-display">Social Mesh</h2><div className="landing-project-section-label social-section-label font-display"><a href="https://x.com/Gijs_Hulsebos" target="_blank" rel="noopener noreferrer">{lang==='NL'?'Sociale updates':lang==='DE'?'Social-Media-Updates':'Social updates'}</a></div>{posts?.length?<>{near&&<Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" onReady={()=>setReady(true)}/>}<PortfolioScrollGrid title="@Gijs_Hulsebos" replies={posts.filter(post=>post.reply).map(post=><Embed key={post.id} post={post} ready={ready}/>)}>{posts.filter(post=>!post.reply).map(post=><Embed key={post.id} post={post} ready={ready}/>)}</PortfolioScrollGrid></>:<p className="social-placeholder" role="status">{failed?t.error:posts?t.empty:t.loading}</p>}</section>;
}
