"use client";
import {useEffect,useRef,useState} from 'react';
const origin='https://skillmax-135087328412.europe-west4.run.app';
export function SkillMaxOverviewEmbed(){const frame=useRef<HTMLIFrameElement>(null);const [height,setHeight]=useState(1800);
 useEffect(()=>{const viewport=()=>{const box=frame.current?.getBoundingClientRect();if(box)frame.current?.contentWindow?.postMessage({type:'skillmax-viewport',center:Math.max(180,Math.min(box.height-180,window.innerHeight/2-box.top))},origin)};const receive=(e:MessageEvent)=>{if(e.origin!==origin||e.source!==frame.current?.contentWindow||e.data?.type!=='skillmax-overview-height'||!Number.isFinite(e.data.height))return;setHeight(Math.max(300,Math.min(20000,Math.ceil(e.data.height)+4)));viewport()};window.addEventListener('message',receive);window.addEventListener('scroll',viewport,{passive:true});window.addEventListener('resize',viewport);return()=>{window.removeEventListener('message',receive);window.removeEventListener('scroll',viewport);window.removeEventListener('resize',viewport)}},[]);
 return <iframe ref={frame} src={origin+'/skillmax/overview-embed'} title="SkillMax+ Overview — live leeractiviteit" style={{width:'100%',height,border:0,display:'block',colorScheme:'dark'}} allow="clipboard-write" />;
}
