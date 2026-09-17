import {portfolioProjects,type PortfolioProject} from '@/lib/portfolio-projects';
import {normalizeTechnology,technologiesInText,type TechnologyMention} from '@/lib/technology-normalization';
import {tarvosStack,tarvosWebsiteStack} from '@/data/special-project-stacks';
import type {LearningCatalog} from './learning-catalog';
import projects from '@/data/bento-projects.json';
import {profileDomains,projectProfile,profileReviewedOn,curriculumFor,type ProfileDomain} from '@/data/learning-profile';
export const domains=profileDomains;
export type Domain=ProfileDomain;
export type Series='theory'|'practice'|'exercises';
type Activity={title:string;contributions?:number};
type Period={practice:{commits?:number;segments:Record<string,{events:Activity[]}>};theory:{activities:Activity[]};exercises:{count:number}};
export type DiscoveredProject={key:string;name:string;url:string;createdAt:string;description:string;topics:string[];language:string|null;readme?:string;dependencies?:string[];pushedAt?:string};
export type PublicChart={radarExercises?:{id:string;title:string;date:string;topics:string[];url:string}[];historicalOverview?:{kind:string;title:string}[];portfolioProjects?:PortfolioProject[];sourceSync?:{lastSuccess?:string;lastVercelSuccess?:string;lastCloudSuccess?:string};activityTotals?:{exercises:number};publicProjects?:DiscoveredProject[];schemaVersion:number;audience:string;generatedAt:string;windows:{'1Y':{from:string;to:string;periods:Period[]}}};
export type Evidence={title:string;series:Series;count:number;detail:string;url:string};
export type EvidenceRecord=Evidence & {id:string;domains:Domain[];technologies:TechnologyMention[];sourceKind:'project'|'course'|'activity';date?:string;dateKind?:'documented'|'completed';issuer?:string;credential?:string|null;parentId?:string|null};
export type RadarData={scope?:"lifetime";sourceSync?:PublicChart["sourceSync"];evidence:EvidenceRecord[];generatedAt:string;from:string;to:string;totals:Record<Series,number>;unclassifiedTheory:number;axes:{key:Domain;theory:number;practice:number;exercises:number;evidence:Evidence[]}[]};
export const theoryDomains=(title:string):Domain[]=>curriculumFor(title)?.domains||[];
const count=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)&&n>=0?n:0;
const deploymentProject:Record<string,string>={'ai-automation-demo':'portfolio','repo-explorer':'repo','video-audio-extractor':'audio','insurance-demo-website-and-backend-workflow':'insurance','git-hub-pr-changes-extractor':'pr','security-audit-checker':'security','acquisition-gap-analyzer':'acquisition','stayai-demo':'stayai','tarvos-website':'tarvos','tarvos-website-lju1':'tarvos','aegix-restored-dashboard':'aegix','oracle-gateway':'hermes'};
const infer=(content:string):Domain[]=>domains.filter(d=>({cloud:/cloud|vercel|firebase|supabase|serverless|hosting|deployment/i,automation:/automat|workflow|orchestrat|n8n|procedural/i,ai:/\bAI\b|LLM|agents?|generative (?:AI|models?|images?|video)|machine learning|prompt/i,integration:/\bAPI\b|MCP|SDK|integration|webhook|plugin/i,software:/TypeScript|JavaScript|Python|React|Next\.js|application|website|plugin|software|frontend|HTML|CSS/i,data:/data|analysis|analytics|research|fingerprint|tags|metadata/i,security:/security|privacy|authentication|governance|compliance/i}[d].test(content)));
export function buildRadar(input:PublicChart,catalog?:LearningCatalog):RadarData{
 if(input.schemaVersion!==1||input.audience!=='public'||!Array.isArray(input.windows?.['1Y']?.periods))throw Error('Invalid public learning source');
 const evidence:EvidenceRecord[]=[];
 const window=input.windows['1Y'],totals={theory:0,practice:0,exercises:0};
 const axes:RadarData['axes']=domains.map(key=>({key,theory:0,practice:0,exercises:0,evidence:[]}));
 const deploymentNames=new Set((input.historicalOverview||[]).filter(e=>e.kind==='deployment').map(e=>e.title.toLowerCase()));
 const deployed=new Set(window.periods.flatMap(p=>(p.practice.segments.hosting?.events||[]).map(e=>deploymentProject[e.title]).filter(Boolean)));
 const add=(targets:Domain[],e:Evidence,metadata:Partial<EvidenceRecord>={})=>{evidence.push({...e,id:e.series+':'+e.title,domains:targets,technologies:[],sourceKind:'activity',...metadata});for(const key of new Set(targets)){const axis=axes.find(a=>a.key===key)!;axis[e.series]+=e.count;axis.evidence.push(e)}};
 // Portfolio evidence is counted once per project, never per commit or deployment.
 // The review date means documented in this annual window, not completion date.
 {
   const normalized=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]/g,'');
   const portfolio=input.portfolioProjects||portfolioProjects();
   const knownRepositories=new Set(portfolio.flatMap(p=>[p.id,p.repository?.split('/').pop()||'',...p.aliases]).map(normalized));
   for(const p of portfolio){
    const repos=(input.publicProjects||[]).filter(r=>[p.id,p.repository?.split('/').pop()||'',...p.aliases].map(normalized).includes(normalized(r.name)));
    const content=[p.description,...p.stack,...repos.flatMap(r=>[r.description,r.readme||'',...r.topics,r.language||'',...(r.dependencies||[])])].join(' ');
    const withheld=p.detailStatus==='withheld';const targets=withheld?[]:[...new Set([...p.domains.filter((d):d is Domain=>domains.includes(d as Domain)),...infer(content)])];totals.practice++;
    const hosted=deployed.has(p.id)||[...p.aliases,p.live?.replace(/^https?:\/\//,'').replace(/\.vercel\.app\/?$/,'')||''].some(n=>deploymentNames.has(n.toLowerCase()));
    const dates=repos.map(r=>r.createdAt).filter(Boolean).sort();
    add([...targets,...(!withheld&&hosted?['cloud' as Domain]:[])],{title:p.title,series:'practice',count:1,detail:p.description,url:p.repository||p.live||'/projects'},{id:'project:'+p.id,sourceKind:'project',...(dates.length?{date:dates[0].slice(0,10),dateKind:'documented' as const}:{}),technologies:withheld?[]:[...p.stack.map(normalizeTechnology).filter((m):m is TechnologyMention=>m!==null),...technologiesInText(content)]});
   }
   for(const p of input.publicProjects||[]){
    if(!p.createdAt||p.createdAt.slice(0,10)>input.generatedAt.slice(0,10)||knownRepositories.has(normalized(p.name))||p.name==='gijs-hulsebos')continue;
    knownRepositories.add(normalized(p.name));const content=[p.description,p.readme||'',...p.topics,p.language||'',...(p.dependencies||[])].join(' ');totals.practice++;
    add(infer(content),{title:p.name,series:'practice',count:1,detail:p.description||'Openbare GitHub-repository.',url:p.url},{id:'project:'+p.key,sourceKind:'project',date:p.createdAt.slice(0,10),dateKind:'documented',technologies:technologiesInText(content)});
   }
 }
 let unclassifiedTheory=0;
 const seen=new Set<string>();
 for(const period of window.periods){
   for(const event of catalog?[]:period.theory.activities){
     const key=event.title.trim().toLowerCase();
     if(key&&seen.has(key))continue;if(key)seen.add(key);
     const n=count(event.contributions??1),curriculum=curriculumFor(event.title);totals.theory+=n;
     if(curriculum)add(curriculum.domains,{title:event.title,series:'theory',count:n,detail:curriculum.detail,url:curriculum.url});else unclassifiedTheory+=n;
   }
   // Public exercise records currently expose counts but no subject metadata.
   // Preserve the total; do not infer completed assignments from a syllabus.
   totals.exercises+=count(period.exercises.count);
 }
 if(catalog){
  // Course counts stay unique; modules supply classification evidence, not extra completions.
  const rules:Record<Domain,RegExp>={cloud:/cloud infrastructure|cloud computing|cloud services|application modernization|containers|serverless|virtual machines|cloud storage|google workspace|gmail|google docs|google drive|google meet|google sheets|google slides|google vids/i,automation:/automat|workflow|productivity|workspace|gmail|google docs|google sheets|google drive|google meet|google slides/i,ai:/generative|language model|machine learning|neural|prompt|gemini|\bAI\b|artificial intelligence|MCP/i,integration:/MCP|model context protocol|client.server|\bAPI\b|SDK|tool calling|defining tools|application integration/i,software:/python|programming|code|coding|software|debug|application development|testing/i,data:/data|analytics|analysis|spreadsheets|machine learning|research/i,security:/security|privacy|governance|responsible|ethic|bias|fairness|regulat|risk|compliance|safety/i};
  for(const course of catalog.entries){
   if(course.kind!=='course'||course.status!=='completed'||!course.completedAt||course.completedAt>input.generatedAt.slice(0,10))continue;
   totals.theory++;
   const content=[course.summary,...course.skills,...course.modules.flatMap(m=>[m.title,m.overview,...m.topics,...m.outcomes])].join(' ');
   const targets=domains.filter(d=>rules[d].test(content));
   if(!targets.length)unclassifiedTheory++;
   add(targets,{title:course.title,series:'theory',count:1,detail:(targets.includes('cloud')&&/workspace|gmail|google docs|google drive|google meet|google sheets|google slides|google vids/i.test(content)?'Cloudplatform (Google Workspace / SaaS). ':'')+'Behaald '+course.completedAt+' · '+course.modules.length+' modules. '+course.modules.map(m=>m.title+': '+m.topics.join(', ')).join('; '),url:course.url},{id:'course:'+course.id,sourceKind:'course',date:course.completedAt,dateKind:'completed',issuer:course.issuer,credential:course.credential,parentId:course.parentId,technologies:[...technologiesInText([course.summary,...course.skills].join(' ')),...course.modules.flatMap(m=>technologiesInText([m.title,m.overview,...m.topics,...m.outcomes].join(' ')).map(t=>({...t,moduleId:m.id,moduleTitle:m.title,url:m.url})))]});
  }
 }
 if(input.activityTotals)totals.exercises=input.activityTotals.exercises;
 for(const e of input.radarExercises||[]){if(e.date>input.generatedAt.slice(0,10))continue;const content=[e.title,...e.topics].join(' ');add(infer(content),{title:e.title,series:'exercises',count:1,detail:e.topics.join(' · '),url:e.url},{id:e.id,sourceKind:'activity',date:e.date,technologies:technologiesInText(content)});}
 return {scope:'lifetime',sourceSync:input.sourceSync,evidence,generatedAt:input.generatedAt,from:evidence.flatMap(e=>e.date?[e.date]:[]).sort()[0]||'',to:input.generatedAt.slice(0,10),totals,unclassifiedTheory,axes};
}
