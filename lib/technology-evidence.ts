import type {EvidenceRecord,Series} from './learning-radar';
import {normalizeTechnology,technologyGroups} from '@/lib/technology-normalization';
export type TechnologyNode={id:string;name:string;group:string;counts:Record<Series,number>;evidenceIds:string[];moduleIds:string[];versions:string[];strength:number};
// Independent source records determine size. Modules explain their parent course;
// repeated mentions, commits and deployments never multiply a project here.
export function aggregateTechnologies(records:EvidenceRecord[]):TechnologyNode[]{
 const nodes=new Map<string,TechnologyNode>();
 for(const record of records){
  for(const mention of record.technologies){const canonical=normalizeTechnology(mention.name);if(!canonical)continue;
   const name=canonical.name;let node=nodes.get(name);
   if(!node){node={id:name,name,group:technologyGroups[name]||'other',counts:{theory:0,practice:0,exercises:0},evidenceIds:[],moduleIds:[],versions:[],strength:0};nodes.set(name,node);}
   if(!node.evidenceIds.includes(record.id)){node.evidenceIds.push(record.id);node.counts[record.series]++;}
   if(mention.moduleId&&!node.moduleIds.includes(mention.moduleId))node.moduleIds.push(mention.moduleId);
   const version=mention.version||canonical.version;if(version&&!node.versions.includes(version))node.versions.push(version);
  }
 }
 for(const node of nodes.values())node.strength=node.evidenceIds.length;
 return [...nodes.values()].sort((a,b)=>b.strength-a.strength||a.name.localeCompare(b.name));
}
export function bubbleDiameter(strength:number){return 52+12*Math.sqrt(Math.min(25,Math.max(0,strength)));}
