'use client';

import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage} from '@/context/LanguageContext';
import {type RadarData,type Series} from '@/lib/learning-radar';
import './learning-radar.css';

const copy={
  NL:{title:'Leertraject',headline:'Kennis Radar',intro:'Theorie, praktijk en oefenen — verbonden met mijn leertraject in SkillMax+.',labels:['Cloud & delivery','Automatisering','AI & agents','API & integratie','Software','Data & onderzoek','Security & governance'],series:['Theorie','Praktijk','Oefenen'],open:'Bekijk het leertraject',loading:'Leeractiviteit ophalen…',error:'Leerdata is tijdelijk niet beschikbaar.',stale:'Vernieuwen is niet gelukt. De laatst opgehaalde data blijft zichtbaar.',detail:'Geregistreerde activiteit',note:'Logaritmische schaal: 1, 10, 100… registraties. Dit toont activiteit, geen vaardigheidsniveau.',method:'Theorie telt afgeronde cursusregistraties uit SkillMax+, inhoudelijk gekoppeld aan de gepubliceerde modules. Praktijk telt unieke gedocumenteerde portfolio-projecten per richting, aangevuld met bevestigde clouddeployments. Een project of cursus kan meerdere richtingen raken. Totalen zijn uniek. Projecten vallen binnen het jaar waarin ze zijn gedocumenteerd; dit is geen bouwdatum. Oefenen telt uitsluitend apart gelogde oefeningen. Iedere ring gebruikt dezelfde lineaire telling. Onbekende cursusinhoud wordt nog niet aan een richting toegewezen.',zero:'Geen oefeningen geregistreerd in deze periode.',updated:'Bron opgehaald',unit:'registraties'},
  EN:{title:'Learning journey',headline:'Knowledge Radar',intro:'Theory, practice and exercises — connected to my learning journey in SkillMax+.',labels:['Cloud & delivery','Automation','AI & agents','API & integration','Software','Data & research','Security & governance'],series:['Theory','Practice','Exercises'],open:'Explore the learning journey',loading:'Loading learning activity…',error:'Learning data is temporarily unavailable.',stale:'Refresh failed. Showing the last retrieved data.',detail:'Recorded activity',note:'Logarithmic scale: 1, 10, 100… records. This shows activity, not proficiency.',method:'Theory counts completed course records from SkillMax+, mapped using published module content. Practice counts unique documented portfolio projects per domain, enriched by confirmed cloud deployments. Domains can overlap; totals are unique. Projects belong to the year they were documented, not necessarily built. Exercises require separate logs. Rings use the same linear count. Unknown curricula remain unclassified.',zero:'No exercises recorded in this period.',updated:'Source retrieved',unit:'records'},
  DE:{title:'Lernweg',headline:'Wissensradar',intro:'Theorie, Praxis und Übungen — verbunden mit meinem Lernweg in SkillMax+.',labels:['Cloud & Delivery','Automation','KI & Agents','API & Integration','Software','Daten & Forschung','Security & Governance'],series:['Theorie','Praxis','Übungen'],open:'Lernweg ansehen',loading:'Lernaktivität wird geladen…',error:'Lerndaten sind vorübergehend nicht verfügbar.',stale:'Aktualisierung fehlgeschlagen. Die zuletzt geladenen Daten bleiben sichtbar.',detail:'Erfasste Aktivität',note:'Logarithmische Skala: 1, 10, 100… Einträge. Zeigt Aktivität, keine Kompetenzbewertung.',method:'Theorie zählt abgeschlossene Kurseinträge aus SkillMax+, anhand veröffentlichter Module eingeordnet. Praxis zählt dokumentierte Portfolioprojekte pro Gebiet, ergänzt durch bestätigte Cloud-Deployments. Gebiete können sich überschneiden; Gesamtsummen bleiben eindeutig. Das Projektjahr bezeichnet die Dokumentation, nicht das Baudatum. Übungen benötigen eigene Einträge. Die Skala ist linear. Unbekannte Kursinhalte bleiben unzugeordnet.',zero:'Keine Übungen in diesem Zeitraum erfasst.',updated:'Quelle abgerufen',unit:'Einträge'},
};
const keys:Series[]=['theory','practice','exercises'];
const colors=['#b69af5','#5b91f5','#59d6ca'];
const point=(index:number,radius:number)=>{const a=index*2*Math.PI/7-Math.PI/2;return [300+Math.cos(a)*radius,275+Math.sin(a)*radius]};

export default function LearningRadar(){
  const {lang}=useLanguage();const t=copy[lang];
  const [data,setData]=useState<RadarData|null>(null);const [failed,setFailed]=useState(false);
  const [retrieval,setRetrieval]=useState<{time:Date;ms:number}|null>(null);
  const [selected,setSelected]=useState(0);const [enabled,setEnabled]=useState([true,true,true]);
  useEffect(()=>{const controller=new AbortController();let busy=false;
    const update=async()=>{if(busy)return;busy=true;const started=performance.now();try{const r=await fetch('/api/learning-radar',{signal:controller.signal});if(!r.ok)throw Error();const value=await r.json();if(!controller.signal.aborted){setData(value);setRetrieval({time:new Date(),ms:Math.round(performance.now()-started)});setFailed(false)}}catch{if(!controller.signal.aborted)setFailed(true)}finally{busy=false}};
    void update();const timer=setInterval(()=>{if(document.visibilityState==='visible')void update()},60000);
    return()=>{controller.abort();clearInterval(timer)};
  },[]);
  const max=Math.max(10,...(data?.axes.flatMap(a=>keys.map(k=>a[k]))||[]));
  const limit=Math.ceil(max/5)*5;const radius=(v:number)=>195*v/limit;
  const rings=Array.from({length:5},(_,i)=>(i+1)*limit/5);
  const locale=lang==='NL'?'nl-NL':lang==='DE'?'de-DE':'en-GB';
  const units=lang==='NL'?['cursusregistraties','portfolio-projecten','oefenregistraties']:lang==='DE'?['Kurseinträge','Portfolioprojekte','Übungseinträge']:['course records','portfolio projects','exercise records'];
  return <section id="learning-journey" className="learning-radar-section" aria-labelledby="learning-radar-title">
    <div className="learning-radar-heading"><h2 id="learning-radar-title">{t.headline}</h2></div>
    <div className="learning-radar-frame">
      <h3 className="landing-project-section-label learning-radar-section-label font-display"><Link href="/learning-trajectory">{lang==='NL'?'Leerradar':lang==='DE'?'Lernradar':'Learning radar'}</Link></h3>
    <div className="learning-radar-panel">
      {!data?<p role="status" className="learning-radar-placeholder">{failed?t.error:t.loading}</p>:<>
        <div className="learning-radar-top"><span title={lang==='NL'?'Laatste geslaagde dashboardverzoek; latency is de gemeten ophaalduur, geen vertraging van GitHub/Vercel-sync.':'Last successful dashboard request; latency measures retrieval, not GitHub/Vercel sync delay.'}>{lang==='NL'?'Opgehaald':lang==='DE'?'Abgerufen':'Fetched'} {retrieval?.time.toLocaleTimeString(locale)} <span className="learning-radar-latency">· {retrieval?.ms} ms</span></span><Link href="/learning-trajectory" className="learning-radar-connected">{t.title}<ArrowUpRight size={13}/></Link></div>
        <div className="learning-radar-summary">{keys.map((k,s)=><div key={k}><span style={{color:colors[s]}}>{t.series[s]}</span><strong>{data.totals[k].toLocaleString(locale)}</strong><small>{units[s]}</small></div>)}</div><div className="learning-radar-body"><div className="learning-radar-plot">
          <svg viewBox="0 0 600 550" role="img" aria-label={`${t.title}: ${t.detail}`}>
            {rings.map(n=><g key={n}><polygon points={data.axes.map((_,i)=>point(i,radius(n)).join(',')).join(' ')} fill="none" stroke="#ffffff20" strokeDasharray="3 5"/><text x={308} y={275-radius(n)+12} fill="#777780" fontSize="10">{n}</text></g>)}
            {data.axes.map((a,i)=>{const [x,y]=point(i,195);const [lx,ly]=point(i,236);return <g key={a.key}><line x1="300" y1="275" x2={x} y2={y} stroke="#ffffff12"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={selected===i?'#fff':'#94949e'} fontSize="13">{t.labels[i].split(' & ').map((line,j)=><tspan key={j} x={lx} dy={j?16:0}>{j?'& ':''}{line}</tspan>)}</text></g>})}
            {keys.map((key,s)=>enabled[s]&&<g key={key}><polygon points={data.axes.map((a,i)=>point(i,radius(a[key])).join(',')).join(' ')} fill={colors[s]} fillOpacity=".17" stroke={colors[s]} strokeWidth="2.5" strokeLinejoin="round"/>{data.axes.map((a,i)=>a[key]>0&&<circle key={i} cx={point(i,radius(a[key]))[0]} cy={point(i,radius(a[key]))[1]} r="4" fill={colors[s]} stroke="#101013" strokeWidth="2"/>)}</g>)}
            {data.axes.map((a,i)=><polygon key={a.key} points={[[300,275],point(i-.5,260),point(i,260),point(i+.5,260)].map(p=>p.join(',')).join(' ')} fill="transparent" onMouseEnter={()=>setSelected(i)} onClick={()=>setSelected(i)}><title>{t.labels[i]}: {keys.map((k,s)=>`${t.series[s]} ${a[k]}`).join(', ')}</title></polygon>)}
          </svg>
        </div><aside className="learning-radar-inspector"><div className="learning-radar-domain-buttons">{data.axes.map((a,i)=><button key={a.key} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)} onClick={()=>setSelected(i)} aria-pressed={selected===i}>{t.labels[i]}</button>)}</div><h3>{t.labels[selected]}</h3>{keys.map((k,s)=><div className="learning-radar-value" key={k}><span><i style={{background:colors[s]}}/>{t.series[s]}</span><strong>{data.axes[selected][k].toLocaleString(locale)}</strong></div>)}<small>{t.unit}</small><div className="learning-radar-evidence">{data.axes[selected].evidence.map((e,i)=><div key={i}><i style={{background:colors[keys.indexOf(e.series)]}}/><span><a href={e.url}>{e.title} ↗</a><small>{e.detail}</small></span><b>{e.count}</b></div>)}{!data.axes[selected].evidence.length&&<p>{lang==='NL'?'Nog geen ingedeelde registraties.':lang==='DE'?'Noch keine zugeordneten Einträge.':'No classified records yet.'}</p>}</div></aside></div>
        <div className="learning-radar-legend">{keys.map((k,s)=><button key={k} aria-pressed={enabled[s]} onClick={()=>setEnabled(v=>v.map((b,i)=>i===s?!b:b))}><i style={{background:colors[s]}}/>{t.series[s]}<span>{data.totals[k].toLocaleString(locale)}</span></button>)}</div>
        <div className="learning-radar-foot"><details><summary>{lang==='NL'?'Hoe wordt dit ingedeeld?':lang==='DE'?'Wie wird dies eingeordnet?':'How is this classified?'}</summary><p>{t.method}</p></details>{failed&&<p role="status">{t.stale}</p>}</div>
      </>}
    </div>
    </div>
  </section>;
}
