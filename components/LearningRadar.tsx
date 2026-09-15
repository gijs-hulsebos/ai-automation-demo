'use client';

import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage} from '@/context/LanguageContext';
import {type RadarData,type Series} from '@/lib/learning-radar';
import './learning-radar.css';

const copy={
  NL:{title:'Leertraject',headline:'Van kennis naar uitvoering.',intro:'Theorie, praktijk en oefenen — verbonden met mijn leertraject in SkillMax+.',labels:['Cloud','Hosting','Software','AI & data','Automatisering','Security','Overig'],series:['Theorie','Praktijk','Oefenen'],open:'Bekijk het leertraject',loading:'Leeractiviteit ophalen…',error:'Leerdata is tijdelijk niet beschikbaar.',stale:'Vernieuwen is niet gelukt. De laatst opgehaalde data blijft zichtbaar.',detail:'Geregistreerde activiteit',note:'Logaritmische schaal: 1, 10, 100… registraties. Dit toont activiteit, geen vaardigheidsniveau.',method:'Richtingen kunnen overlappen: een cloud-AI-cursus telt bij Cloud én AI, een deployment bij Hosting én de bewezen projectrichting. Totalen tellen iedere registratie één keer. Indeling gebruikt openbare cursustitels en bekende projectbeschrijvingen. Niet-ingedeelde activiteit staat onder Overig; planning telt niet mee.',zero:'Geen oefeningen geregistreerd in deze periode.',updated:'Bron opgehaald',unit:'registraties'},
  EN:{title:'Learning journey',headline:'From knowledge to execution.',intro:'Theory, practice and exercises — connected to my learning journey in SkillMax+.',labels:['Cloud','Hosting','Software','AI & data','Automation','Security','Other'],series:['Theory','Practice','Exercises'],open:'Explore the learning journey',loading:'Loading learning activity…',error:'Learning data is temporarily unavailable.',stale:'Refresh failed. Showing the last retrieved data.',detail:'Recorded activity',note:'Logarithmic scale: 1, 10, 100… records. This shows activity, not proficiency.',method:'Domains can overlap: a cloud AI course contributes to Cloud and AI; a deployment to Hosting and its documented project domain. Totals count each record once. Classification uses public course titles and known project descriptions. Unclassified activity remains Other; plans are excluded.',zero:'No exercises recorded in this period.',updated:'Source retrieved',unit:'records'},
  DE:{title:'Lernweg',headline:'Von Wissen zu Umsetzung.',intro:'Theorie, Praxis und Übungen — verbunden mit meinem Lernweg in SkillMax+.',labels:['Cloud','Hosting','Software','KI & Daten','Automation','Security','Sonstiges'],series:['Theorie','Praxis','Übungen'],open:'Lernweg ansehen',loading:'Lernaktivität wird geladen…',error:'Lerndaten sind vorübergehend nicht verfügbar.',stale:'Aktualisierung fehlgeschlagen. Die zuletzt geladenen Daten bleiben sichtbar.',detail:'Erfasste Aktivität',note:'Logarithmische Skala: 1, 10, 100… Einträge. Zeigt Aktivität, keine Kompetenzbewertung.',method:'Fachgebiete können sich überschneiden. Eine Cloud-KI-Schulung zählt zu Cloud und KI; ein Deployment zu Hosting und dem belegten Projektgebiet. Gesamtsummen zählen jeden Eintrag einmal. Grundlage sind öffentliche Kurstitel und Projektbeschreibungen. Planung zählt nicht mit.',zero:'Keine Übungen in diesem Zeitraum erfasst.',updated:'Quelle abgerufen',unit:'Einträge'},
};
const keys:Series[]=['theory','practice','exercises'];
const colors=['#b69af5','#5b91f5','#59d6ca'];
const point=(index:number,radius:number)=>{const a=index*2*Math.PI/7-Math.PI/2;return [300+Math.cos(a)*radius,275+Math.sin(a)*radius]};

export default function LearningRadar(){
  const {lang}=useLanguage();const t=copy[lang];
  const [data,setData]=useState<RadarData|null>(null);const [failed,setFailed]=useState(false);
  const [selected,setSelected]=useState(0);const [enabled,setEnabled]=useState([true,true,true]);
  useEffect(()=>{const controller=new AbortController();let busy=false;
    const update=async()=>{if(busy)return;busy=true;try{const r=await fetch('/api/learning-radar',{signal:controller.signal});if(!r.ok)throw Error();const value=await r.json();if(!controller.signal.aborted){setData(value);setFailed(false)}}catch{if(!controller.signal.aborted)setFailed(true)}finally{busy=false}};
    void update();const timer=setInterval(()=>{if(document.visibilityState==='visible')void update()},60000);
    return()=>{controller.abort();clearInterval(timer)};
  },[]);
  const max=Math.max(10,...(data?.axes.flatMap(a=>keys.map(k=>a[k]))||[]));
  const limit=10**Math.ceil(Math.log10(max));const radius=(v:number)=>195*Math.log10(1+v)/Math.log10(1+limit);
  const rings=Array.from({length:Math.log10(limit)+1},(_,i)=>10**i);
  const locale=lang==='NL'?'nl-NL':lang==='DE'?'de-DE':'en-GB';
  const date=(value:string)=>new Date(value).toLocaleDateString(locale,{day:'2-digit',month:'short',year:'numeric'});
  return <section id="learning-journey" className="learning-radar-section" aria-labelledby="learning-radar-title">
    <div className="learning-radar-heading"><p className="learning-radar-eyebrow">SKILLMAX+ / {t.title}</p><h2 id="learning-radar-title">{t.headline}</h2><p>{t.intro}</p><Link href="/learning-trajectory">{t.open}<ArrowUpRight size={17}/></Link></div>
    <div className="learning-radar-panel">
      {!data?<p role="status" className="learning-radar-placeholder">{failed?t.error:t.loading}</p>:<>
        <div className="learning-radar-top"><span><b className="learning-radar-year">1Y</b>{date(data.from)} — {date(data.to)}</span><span className="learning-radar-connected">SkillMax+ · Cloud</span></div>
        <div className="learning-radar-summary">{keys.map((k,s)=><div key={k}><span style={{color:colors[s]}}>{t.series[s]}</span><strong>{data.totals[k].toLocaleString(locale)}</strong><small>{t.unit}</small></div>)}</div><div className="learning-radar-body"><div className="learning-radar-plot">
          <svg viewBox="0 0 600 550" role="img" aria-label={`${t.title}: ${t.note}`}>
            {rings.map(n=><g key={n}><polygon points={data.axes.map((_,i)=>point(i,radius(n)).join(',')).join(' ')} fill="none" stroke="#ffffff20" strokeDasharray="3 5"/><text x={308} y={275-radius(n)+12} fill="#777780" fontSize="10">{n}</text></g>)}
            {data.axes.map((a,i)=>{const [x,y]=point(i,195);const [lx,ly]=point(i,236);return <g key={a.key}><line x1="300" y1="275" x2={x} y2={y} stroke="#ffffff12"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={selected===i?'#fff':'#94949e'} fontSize="13">{t.labels[i]}</text></g>})}
            {keys.map((key,s)=>enabled[s]&&<g key={key}><polygon points={data.axes.map((a,i)=>point(i,radius(a[key])).join(',')).join(' ')} fill={colors[s]} fillOpacity=".17" stroke={colors[s]} strokeWidth="2.5" strokeLinejoin="round"/>{data.axes.map((a,i)=>a[key]>0&&<circle key={i} cx={point(i,radius(a[key]))[0]} cy={point(i,radius(a[key]))[1]} r="4" fill={colors[s]} stroke="#101013" strokeWidth="2"/>)}</g>)}
            {data.axes.map((a,i)=><polygon key={a.key} points={[[300,275],point(i-.5,260),point(i,260),point(i+.5,260)].map(p=>p.join(',')).join(' ')} fill="transparent" onMouseEnter={()=>setSelected(i)} onClick={()=>setSelected(i)}><title>{t.labels[i]}: {keys.map((k,s)=>`${t.series[s]} ${a[k]}`).join(', ')}</title></polygon>)}
          </svg>
        </div><aside className="learning-radar-inspector"><p className="learning-radar-eyebrow">{t.detail}</p><div className="learning-radar-domain-buttons">{data.axes.map((a,i)=><button key={a.key} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)} onClick={()=>setSelected(i)} aria-pressed={selected===i}>{t.labels[i]}</button>)}</div><h3>{t.labels[selected]}</h3>{keys.map((k,s)=><div className="learning-radar-value" key={k}><span><i style={{background:colors[s]}}/>{t.series[s]}</span><strong>{data.axes[selected][k].toLocaleString(locale)}</strong></div>)}<small>{t.unit}</small><div className="learning-radar-evidence">{data.axes[selected].evidence.map((e,i)=><div key={i}><i style={{background:colors[keys.indexOf(e.series)]}}/><span>{e.title}</span><b>{e.count}</b></div>)}{!data.axes[selected].evidence.length&&<p>{lang==='NL'?'Nog geen ingedeelde registraties.':lang==='DE'?'Noch keine zugeordneten Einträge.':'No classified records yet.'}</p>}</div></aside></div>
        <div className="learning-radar-legend">{keys.map((k,s)=><button key={k} aria-pressed={enabled[s]} onClick={()=>setEnabled(v=>v.map((b,i)=>i===s?!b:b))}><i style={{background:colors[s]}}/>{t.series[s]}<span>{data.totals[k].toLocaleString(locale)}</span></button>)}</div>
        <div className="learning-radar-foot"><p>{t.note}</p><details><summary>{lang==='NL'?'Hoe wordt dit ingedeeld?':lang==='DE'?'Wie wird dies eingeordnet?':'How is this classified?'}</summary><p>{t.method}</p></details>{data.axes.every(a=>a.exercises===0)&&<p>{t.zero}</p>}<small>{t.updated}: {date(data.generatedAt)} · {new Date(data.generatedAt).toLocaleTimeString(locale,{hour:'2-digit',minute:'2-digit'})}</small>{failed&&<p role="status">{t.stale}</p>}</div>
      </>}
    </div>
  </section>;
}
