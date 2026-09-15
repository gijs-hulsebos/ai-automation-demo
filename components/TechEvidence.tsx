'use client';
import {useMemo,useState} from 'react';
import type {EvidenceRecord,Series} from '@/lib/learning-radar';
import {aggregateTechnologies,aggregateTechnologyAreas,technologyArea,type TechnologyNode} from '@/lib/technology-evidence';
import './tech-evidence.css';
const keys:Series[]=['theory','practice','exercises'];
const colors=['#b69af5','#5b91f5','#59d6ca'];
const groups:Record<string,string>={ai:'AI & Agents',software:'Web & Apps',cloud:'Cloud & Deployment',automation:'No-code & Workflows',integration:'API & Integrations',data:'Data & Tooling'};
export default function TechEvidence({records,lang}:{records:EvidenceRecord[];lang:'NL'|'EN'|'DE'}){
 const technologies=useMemo(()=>aggregateTechnologies(records).map(t=>({...t,group:technologyArea(t.group,t.name)})),[records]);
 const nodes=useMemo(()=>aggregateTechnologyAreas(records).sort((a,b)=>Object.keys(groups).indexOf(a.group)-Object.keys(groups).indexOf(b.group)).map(n=>({...n,name:groups[n.group]||n.group})),[records]);
 const [selected,setSelected]=useState<string|null>(null);
 const nl=lang==='NL',de=lang==='DE';const series=nl?['Theorie','Praktijk','Oefenen']:de?['Theorie','Praxis','Übungen']:['Theory','Practice','Exercises'];
 const axes=nodes;
 const limit=Math.max(5,Math.ceil(Math.max(0,...axes.flatMap(n=>keys.map(k=>n.counts[k])))/5)*5);
 const point=(i:number,r:number)=>{const a=i*2*Math.PI/Math.max(3,axes.length)-Math.PI/2;return [300+Math.cos(a)*r,275+Math.sin(a)*r]};
 const active=nodes.find(n=>n.id===selected)||axes[0];
 const evidence=active?records.filter(e=>active.evidenceIds.includes(e.id)):[];
 const counts=(node:TechnologyNode)=><div className="tech-counts">{keys.map((key,i)=><span key={key}><i style={{background:colors[i]}}/>{series[i]} <b>{node.counts[key]}</b></span>)}</div>;
 return <div className="tech-view">
  <div className="tech-layout"><div className="tech-radar-map">
   <svg viewBox="0 0 600 550" role="img" aria-label="Tech Stack radar">
    {[1,2,3,4,5].map(step=><g key={step}><polygon points={Array.from({length:Math.max(3,axes.length)},(_,i)=>point(i,195*step/5).join(',')).join(' ')} fill="none" stroke="#ffffff20" strokeDasharray="3 5"/><text x="308" y={275-195*step/5+12} fill="#777780" fontSize="10">{limit*step/5}</text></g>)}
    {axes.map((node,i)=>{const [x,y]=point(i,195),[lx,ly]=point(i,242);return <g key={node.id}><line x1="300" y1="275" x2={x} y2={y} stroke="#ffffff12"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={active?.id===node.id?'#fff':'#94949e'} fontSize="12">{node.name.split(' & ').map((part,j)=><tspan key={j} x={lx} dy={j?15:0}>{j?'& ':''}{part}</tspan>)}</text></g>})}
    {keys.map((key,i)=><g key={key}><polygon points={Array.from({length:Math.max(3,axes.length)},(_,j)=>point(j,195*(axes[j]?.counts[key]||0)/limit).join(',')).join(' ')} fill={colors[i]} fillOpacity=".17" stroke={colors[i]} strokeWidth="2.5" strokeLinejoin="round"/>{axes.map((node,j)=>node.counts[key]>0&&<circle key={node.id} cx={point(j,195*node.counts[key]/limit)[0]} cy={point(j,195*node.counts[key]/limit)[1]} r="4" fill={colors[i]} stroke="#101013" strokeWidth="2"/>)}</g>)}
    {axes.map((node,i)=><polygon key={node.id} points={[[300,275],point(i-.5,265),point(i,265),point(i+.5,265)].map(p=>p.join(',')).join(' ')} fill="transparent" onMouseEnter={()=>{setSelected(node.id)}} onClick={()=>{setSelected(node.id)}}><title>{node.name}: {keys.map((k,j)=>`${series[j]} ${node.counts[k]}`).join(', ')}</title></polygon>)}
   </svg>
   <div className="tech-counts tech-radar-legend">{series.map((label,i)=><span key={label}><i style={{background:colors[i]}}/>{label}</span>)}</div>
   <div className="tech-axis-buttons">{axes.map(node=><button key={node.id} aria-pressed={active?.id===node.id} onFocus={()=>setSelected(node.id)} onClick={()=>{setSelected(node.id)}}>{node.name}</button>)}</div>
  </div><aside id="tech-evidence-details" className="tech-inspector" aria-label={nl?'Technologie-evidence':'Technology evidence'}>{active?<><h3>{active.name}</h3>{counts(active)}<p className="tech-meta">{active.strength} evidence records · {active.moduleIds.length} {nl?'gekoppelde modules':de?'verknüpfte Module':'linked modules'}</p>{active.versions.length>0&&<p>{nl?'Versies':'Versions'}: {active.versions.join(', ')}</p>}<div className="tech-area-tools">{technologies.filter(t=>t.group===active.group).map(t=><span key={t.id}>{t.name}</span>)}</div><div className="tech-sources">{keys.map((key,i)=>evidence.some(e=>e.series===key)&&<section key={key}><h4 style={{color:colors[i]}}>{series[i]}</h4>{evidence.filter(e=>e.series===key).map(e=><article key={e.id}><a href={e.url}>{e.title} ↗</a>{e.date&&<small>{e.dateKind==='completed'?(nl?'Behaald':de?'Abgeschlossen':'Completed'):(nl?'Gedocumenteerd':de?'Dokumentiert':'Documented')}: {e.date.split('-').reverse().join('/')}</small>}{e.issuer&&<small>{e.issuer}</small>}<details><summary>{nl?'Brononderbouwing':de?'Quellendetails':'Source details'}</summary><p>{e.detail}</p>{e.credential&&<a href={e.credential}>{nl?'Certificaat':'Certificate'} ↗</a>}{e.technologies.filter(m=>technologies.some(t=>t.group===active.group&&t.name===m.name)&&m.moduleId).map(m=><p key={m.moduleId}><a href={m.url}>{m.moduleTitle} ↗</a></p>)}</details></article>)}</section>)}</div></>:<p>{nl?'Geen technologie-evidence beschikbaar.':'No technology evidence available.'}</p>}</aside></div>
  <p className="tech-method">{nl?'Elke as is een technologiegebied. Een project of cursus telt per gebied één keer, ook als het meerdere tools gebruikt.':'Each axis is a technology area. Each project or course counts once per area, even when it uses several tools.'}</p>
 </div>;
}
