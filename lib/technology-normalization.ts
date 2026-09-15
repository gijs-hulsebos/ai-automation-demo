import {techIcons,techAliases} from '@/data/tech-stack';
export type TechnologyMention={name:string;version?:string;moduleId?:string;moduleTitle?:string;url?:string;raw:string};
const aliases:Record<string,string>={...techAliases,NextJS:'Next.js',nextjs:'Next.js','Next JS':'Next.js',ReactJS:'React','React.js':'React',TS:'TypeScript',Firestore:'Cloud Firestore','Firebase Auth':'Firebase Authentication','Cloud Run':'Google Cloud Run',GCP:'Google Cloud','Google Cloud Platform':'Google Cloud','REST APIs':'REST API','REST API':'REST API','Model Context Protocol':'MCP',MCP:'MCP','Google Gemini':'Gemini',Gemini:'Gemini','GitHub Actions':'GitHub Actions','Vertex AI':'Vertex AI','Google Workspace':'Google Workspace','Google Meet':'Google Meet','Google Slides':'Google Slides','Google Vids':'Google Vids','Google Cloud':'Google Cloud',Firebase:'Firebase'};
const key=(s:string)=>s.toLocaleLowerCase().replace(/[^a-z0-9]/g,'');
const names=[...Object.keys(techIcons),...Object.keys(aliases)];
const lookup=new Map(names.map(n=>[key(n),aliases[n]||n]));
export function normalizeTechnology(raw:string):TechnologyMention|null{
 if(raw==='Curated regulatory sources')return null;
 const match=raw.trim().match(/^(.*?)\s+v?(\d+(?:\.\d+)*(?:\.x)?)$/i);
 const base=match?.[1]||raw.trim();
 return {name:lookup.get(key(base))||base,...(match?{version:match[2]}:{}),raw};
}
const patterns=[...new Set(names)].filter(n=>n.length>2).sort((a,b)=>b.length-a.length).map(name=>({name,pattern:new RegExp('(^|[^a-z0-9])('+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![a-z0-9])','gi')}));
// Match named technologies only; longest overlapping phrase wins.
export function technologiesInText(text:string):TechnologyMention[]{
 const ranges:[number,number][]=[];const result:TechnologyMention[]=[];
 for(const {name,pattern} of patterns){pattern.lastIndex=0;for(const m of text.matchAll(pattern)){const start=m.index!+m[1].length,end=start+m[2].length;if(ranges.some(([a,b])=>start<b&&end>a))continue;ranges.push([start,end]);const normalized=normalizeTechnology(name);if(normalized&&!result.some(r=>r.name===normalized.name))result.push(normalized);}}
 return result;
}
export const technologyGroups:Record<string,string>={
 'Next.js':'software',React:'software',TypeScript:'software',Astro:'software',Python:'software','Tailwind CSS':'software',Motion:'software',Vite:'software','Three.js':'software',
 OpenAI:'ai',Claude:'ai',Gemini:'ai',OpenRouter:'ai',NotebookLM:'ai','Hermes (Nous Research)':'ai','Vertex AI':'ai',
 'Google Cloud':'cloud','Google Cloud Run':'cloud',Firebase:'cloud','Cloud Firestore':'cloud',Supabase:'cloud','Google Workspace':'cloud','Google Meet':'cloud','Google Slides':'cloud','Google Vids':'cloud','Google Drive':'cloud','Google Docs':'cloud',
 'Firebase Authentication':'security','Google OAuth':'security',
 n8n:'automation',MCP:'integration','REST API':'integration','React Flow':'automation','Cloud Scheduler':'automation','Google Calendar':'automation',Gmail:'automation',MailerLite:'automation',Discord:'integration',Express:'integration',Solana:'integration',
 'Google Sheets':'data',D3:'data',Cheerio:'data',Firecrawl:'data',Xotelo:'data',
 GitHub:'delivery','GitHub Actions':'delivery',Vercel:'delivery',Markdown:'software','FFmpeg.wasm':'software'
};
