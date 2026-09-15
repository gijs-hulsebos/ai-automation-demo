import type {LearningCatalog} from './learning-catalog';
import projects from '@/data/bento-projects.json';
import {profileDomains,projectProfile,profileReviewedOn,curriculumFor,type ProfileDomain} from '@/data/learning-profile';
export const domains=profileDomains;
export type Domain=ProfileDomain;
export type Series='theory'|'practice'|'exercises';
type Activity={title:string;contributions?:number};
type Period={practice:{commits?:number;segments:Record<string,{events:Activity[]}>};theory:{activities:Activity[]};exercises:{count:number}};
export type PublicChart={schemaVersion:number;audience:string;generatedAt:string;windows:{'1Y':{from:string;to:string;periods:Period[]}}};
export type Evidence={title:string;series:Series;count:number;detail:string;url:string};
export type RadarData={generatedAt:string;from:string;to:string;totals:Record<Series,number>;unclassifiedTheory:number;axes:{key:Domain;theory:number;practice:number;exercises:number;evidence:Evidence[]}[]};
export const theoryDomains=(title:string):Domain[]=>curriculumFor(title)?.domains||[];
const count=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)&&n>=0?n:0;
const deploymentProject:Record<string,string>={'ai-automation-demo':'portfolio','repo-explorer':'repo','video-audio-extractor':'audio','insurance-demo-website-and-backend-workflow':'insurance','git-hub-pr-changes-extractor':'pr','security-audit-checker':'security','acquisition-gap-analyzer':'acquisition','stayai-demo':'stayai','tarvos-website':'tarvos','tarvos-website-lju1':'tarvos','aegix-restored-dashboard':'aegix','oracle-gateway':'hermes'};
export function buildRadar(input:PublicChart,catalog?:LearningCatalog):RadarData{
 if(input.schemaVersion!==1||input.audience!=='public'||!Array.isArray(input.windows?.['1Y']?.periods))throw Error('Invalid public learning source');
 const window=input.windows['1Y'],totals={theory:0,practice:0,exercises:0};
 const axes:RadarData['axes']=domains.map(key=>({key,theory:0,practice:0,exercises:0,evidence:[]}));
 const deployed=new Set(window.periods.flatMap(p=>(p.practice.segments.hosting?.events||[]).map(e=>deploymentProject[e.title]).filter(Boolean)));
 const add=(targets:Domain[],e:Evidence)=>{for(const key of new Set(targets)){const axis=axes.find(a=>a.key===key)!;axis[e.series]+=e.count;axis.evidence.push(e)}};
 // Portfolio evidence is counted once per project, never per commit or deployment.
 // The review date means documented in this annual window, not completion date.
 if(profileReviewedOn>=window.from&&profileReviewedOn<=window.to){
   const catalog=[...projects.map(p=>({id:p.id,title:p.displayName||p.name})),{id:'tarvos',title:'Tarvos'},{id:'aegix',title:'Aegix'}];
   for(const p of catalog){const profile=projectProfile[p.id];if(!profile)continue;totals.practice++;add([...profile.domains,...(deployed.has(p.id)?['cloud' as Domain]:[])],{title:p.title,series:'practice',count:1,detail:profile.detail+(deployed.has(p.id)?' Productiedeployment bevestigd in SkillMax+.':''),url:'/projects'});}
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
  const rules:Record<Domain,RegExp>={cloud:/cloud infrastructure|cloud computing|cloud services|application modernization|containers|serverless|virtual machines|cloud storage/i,automation:/automat|workflow|productivity|workspace|gmail|google docs|google sheets|google drive|google meet|google slides/i,ai:/generative|language model|machine learning|neural|prompt|\bAI\b|artificial intelligence|MCP/i,integration:/MCP|model context protocol|client.server|\bAPI\b|SDK|tool calling|defining tools|application integration/i,software:/python|programming|code|coding|software|debug|application development|testing/i,data:/data|analytics|analysis|spreadsheets|machine learning|research/i,security:/security|privacy|governance|responsible|ethic|bias|fairness|regulat|risk|compliance|safety/i};
  for(const course of catalog.entries){
   if(course.kind!=='course'||course.status!=='completed'||!course.completedAt||course.completedAt<window.from||course.completedAt>window.to)continue;
   totals.theory++;
   const content=[...course.skills,...course.modules.flatMap(m=>[m.title,...m.topics])].join(' ');
   const targets=domains.filter(d=>rules[d].test(content));
   if(!targets.length)unclassifiedTheory++;
   add(targets,{title:course.title,series:'theory',count:1,detail:'Behaald '+course.completedAt+' · '+course.modules.length+' modules. '+course.modules.map(m=>m.title+': '+m.topics.join(', ')).join('; '),url:course.url});
  }
 }
 return {generatedAt:input.generatedAt,from:window.from,to:window.to,totals,unclassifiedTheory,axes};
}
