'use client';
import {useMemo,useState} from 'react';
import type {EvidenceRecord,Series} from '@/lib/learning-radar';
import {aggregateTechnologies,type TechnologyNode} from '@/lib/technology-evidence';
import './tech-evidence.css';
const keys:Series[]=['theory','practice','exercises'];
const colors=['#b69af5','#5b91f5','#59d6ca'];
const groups:Record<string,string>={software:'Web & Software',ai:'AI & LLM',cloud:'Cloud & Backend',automation:'Automation',integration:'Integration',data:'Data',security:'Security',delivery:'DevOps / Delivery',other:'Other'};
export default function TechEvidence({records,lang}:{records:EvidenceRecord[];lang:'NL'|'EN'|'DE'}){
 const nodes=useMemo(()=>aggregateTechnologies(records),[records]);
 const [selected,setSelected]=useState<string|null>(null),[hover,setHover]=useState<string|null>(null),[query,setQuery]=useState(''),[group,setGroup]=useState('all');
 const [page,setPage]=useState(0);
 const nl=lang==='NL',de=lang==='DE';const series=nl?['Theorie','Praktijk','Oefenen']:de?['Theorie','Praxis','Übungen']:['Theory','Practice','Exercises'];
 const available=[...new Set(nodes.map(n=>n.group))];
 const filtered=nodes.filter(n=>(group==='all'||n.group===group)&&n.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 const pageCount=Math.max(1,Math.ceil(filtered.length/10));const currentPage=Math.min(page,pageCount-1);const axes=filtered.slice(currentPage*10,currentPage*10+10);
 const limit=Math.max(5,Math.ceil(Math.max(0,...axes.flatMap(n=>keys.map(k=>n.counts[k])))/5)*5);
 const point=(i:number,r:number)=>{const a=i*2*Math.PI/Math.max(3,axes.length)-Math.PI/2;return [300+Math.cos(a)*r,275+Math.sin(a)*r]};
 const active=nodes.find(n=>n.id===selected)||axes[0];const preview=nodes.find(n=>n.id===hover);
 const evidence=active?records.filter(e=>active.evidenceIds.includes(e.id)):[];
 const counts=(node:TechnologyNode)=><div className="tech-counts">{keys.map((key,i)=><span key={key}><i style={{background:colors[i]}}/>{series[i]} <b>{node.counts[key]}</b></span>)}</div>;
 return <div className="tech-view">
  <div className="tech-toolbar"><label><span className="sr-only">{nl?'Zoek technologie':de?'Technologie suchen':'Search technology'}</span><input type="search" value={query} onChange={e=>{setQuery(e.target.value);setPage(0);setSelected(null);setHover(null)}} placeholder={nl?'Zoek technologie…':de?'Technologie suchen…':'Search technology…'}/></label><select aria-label={nl?'Technologiegroep':'Technology group'} value={group} onChange={e=>{setGroup(e.target.value);setPage(0);setSelected(null);setHover(null)}}><option value="all">{nl?'Alle groepen':de?'Alle Gruppen':'All groups'}</option>{available.map(g=><option key={g} value={g}>{groups[g]||g}</option>)}</select><small>{filtered.length} {nl?'technologieën':de?'Technologien':'technologies'}</small></div>
  <div className="tech-layout"><div className="tech-radar-map">
   <svg viewBox="0 0 600 550" role="img" aria-label="Tech Stack radar">
    {[1,2,3,4,5].map(step=><g key={step}><polygon points={Array.from({length:Math.max(3,axes.length)},(_,i)=>point(i,195*step/5).join(',')).join(' ')} fill="none" stroke="#ffffff20" strokeDasharray="3 5"/><text x="308" y={275-195*step/5+12} fill="#777780" fontSize="10">{limit*step/5}</text></g>)}
    {axes.map((node,i)=>{const [x,y]=point(i,195),[lx,ly]=point(i,242);return <g key={node.id}><line x1="300" y1="275" x2={x} y2={y} stroke="#ffffff12"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={active?.id===node.id?'#fff':'#94949e'} fontSize="12">{node.name.length>19?node.name.slice(0,18)+'…':node.name}</text></g>})}
    {keys.map((key,i)=><g key={key}><polygon points={Array.from({length:Math.max(3,axes.length)},(_,j)=>point(j,195*(axes[j]?.counts[key]||0)/limit).join(',')).join(' ')} fill={colors[i]} fillOpacity=".17" stroke={colors[i]} strokeWidth="2.5" strokeLinejoin="round"/>{axes.map((node,j)=>node.counts[key]>0&&<circle key={node.id} cx={point(j,195*node.counts[key]/limit)[0]} cy={point(j,195*node.counts[key]/limit)[1]} r="4" fill={colors[i]} stroke="#101013" strokeWidth="2"/>)}</g>)}
    {axes.map((node,i)=><polygon key={node.id} points={[[300,275],point(i-.5,265),point(i,265),point(i+.5,265)].map(p=>p.join(',')).join(' ')} fill="transparent" onMouseEnter={()=>{setHover(node.id);setSelected(node.id)}} onClick={()=>{setSelected(node.id);setHover(node.id)}}><title>{node.name}: {keys.map((k,j)=>`${series[j]} ${node.counts[k]}`).join(', ')}</title></polygon>)}
   </svg>
   <div className="tech-counts tech-radar-legend">{series.map((label,i)=><span key={label}><i style={{background:colors[i]}}/>{label}</span>)}</div>
   <div className="tech-axis-buttons">{axes.map(node=><button key={node.id} aria-pressed={active?.id===node.id} onFocus={()=>setHover(node.id)} onClick={()=>{setSelected(node.id);setHover(node.id)}}>{node.name}</button>)}</div>
   {pageCount>1&&<div className="tech-pagination"><button disabled={currentPage===0} onClick={()=>{setPage(currentPage-1);setSelected(null)}}>←</button><span>{currentPage+1} / {pageCount}</span><button disabled={currentPage===pageCount-1} onClick={()=>{setPage(currentPage+1);setSelected(null)}}>→</button></div>}
   {!filtered.length&&<p>{nl?'Geen technologieën gevonden.':'No technologies found.'}</p>}
  </div><aside id="tech-evidence-details" className="tech-inspector" aria-label={nl?'Technologie-evidence':'Technology evidence'}>{active?<><p className="tech-kicker">TECH STACK / {groups[active.group]}</p><h3>{active.name}</h3>{counts(active)}<p className="tech-meta">{active.strength} evidence records · {active.moduleIds.length} {nl?'gekoppelde modules':de?'verknüpfte Module':'linked modules'}</p>{active.versions.length>0&&<p>{nl?'Versies':'Versions'}: {active.versions.join(', ')}</p>}<div className="tech-sources">{keys.map((key,i)=>evidence.some(e=>e.series===key)&&<section key={key}><h4 style={{color:colors[i]}}>{series[i]}</h4>{evidence.filter(e=>e.series===key).map(e=><article key={e.id}><a href={e.url}>{e.title} ↗</a>{e.date&&<small>{e.dateKind==='completed'?(nl?'Behaald':de?'Abgeschlossen':'Completed'):(nl?'Gedocumenteerd':de?'Dokumentiert':'Documented')}: {e.date.split('-').reverse().join('/')}</small>}{e.issuer&&<small>{e.issuer}</small>}<details><summary>{nl?'Brononderbouwing':de?'Quellendetails':'Source details'}</summary><p>{e.detail}</p>{e.credential&&<a href={e.credential}>{nl?'Certificaat':'Certificate'} ↗</a>}{e.technologies.filter(m=>m.name===active.name&&m.moduleId).map(m=><p key={m.moduleId}><a href={m.url}>{m.moduleTitle} ↗</a></p>)}</details></article>)}</section>)}</div></>:<p>{nl?'Geen technologie-evidence beschikbaar.':'No technology evidence available.'}</p>}</aside></div>
  <p className="tech-method">{nl?'Elke as telt unieke projecten, cursussen en gelogde oefeningen. Maximaal tien technologieën per radar; kies een groep of blader verder.':'Each axis counts unique projects, courses and logged exercises. Up to ten technologies per radar; filter by group or browse the next page.'}</p>
 </div>;
}
