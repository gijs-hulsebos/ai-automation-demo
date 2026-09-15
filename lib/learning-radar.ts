export const domains = ['cloud', 'hosting', 'software', 'ai', 'automation', 'security', 'other'] as const;
export type Domain = typeof domains[number];
export type Series = 'theory' | 'practice' | 'exercises';
type Activity = {title:string; contributions?:number};
type Period = {
  practice:{commits?:number;segments:Record<string,{events:Activity[]}>};
  theory:{activities:Activity[]}; exercises:{count:number};
};
export type PublicChart = {schemaVersion:number;audience:string;generatedAt:string;windows:{'1Y':{from:string;to:string;periods:Period[]}}};
export type RadarData = {generatedAt:string;from:string;to:string;totals:Record<Series,number>;axes:{key:Domain;theory:number;practice:number;exercises:number;evidence:{title:string;series:Series;count:number}[]}[]};
const projectDomains:Record<string,Domain[]>={
  'ai-automation-demo':['software','ai'],
  'insurance-demo-website-and-backend-workflow':['software','ai','automation'],
  'security-audit-checker':['software','security'],
  'acquisition-gap-analyzer':['software','ai'],
  'git-hub-pr-changes-extractor':['software','automation'],
  'video-audio-extractor':['software'],
  'repo-explorer':['software'],
  'oracle-gateway':['software'],
  'tarvos-website':['software','automation'],
  'tarvos-website-lju1':['software','automation'],
};
export function theoryDomains(title:string):Domain[]{
  const result=new Set<Domain>();const primary=theoryDomain(title);if(primary!=='other')result.add(primary);
  if(/google cloud|firebase|kubernetes/i.test(title))result.add('cloud');
  if(/model context protocol|app building/i.test(title))result.add('software');
  if(/model context protocol|large language model|data analysis|google vids/i.test(title))result.add('ai');
  return result.size?[...result]:['other'];
}
// Conservative, ordered title rules. Unmatched records remain explicitly unclassified.
export function theoryDomain(title:string):Domain {
  if (/security|secure|devsecops|owasp|cyber/i.test(title)) return 'security';
  if (/deploy|hosting|ci\/cd/i.test(title)) return 'hosting';
  if (/workflow|automation|automatis|n8n/i.test(title)) return 'automation';
  if (/\bAI\b|artificial intelligence|machine learning|generative|gemini|claude|prompt|neural|\bRAG\b|agent/i.test(title)) return 'ai';
  if (/cloud|firebase|kubernetes/i.test(title)) return 'cloud';
  if (/python|programming|software|javascript|typescript|git\b|api\b|docker/i.test(title)) return 'software';
  return 'other';
}
const count = (n:unknown) => typeof n==='number' && Number.isFinite(n) && n>=0 ? n : 0;
export function buildRadar(input:PublicChart):RadarData {
  if(input.schemaVersion!==1 || input.audience!=='public' || !Array.isArray(input.windows?.['1Y']?.periods)) throw new Error('Invalid public learning source');
  const window=input.windows['1Y'];
  const totals={theory:0,practice:0,exercises:0};
  const axes:RadarData['axes']=domains.map(key=>({key,theory:0,practice:0,exercises:0,evidence:[]}));
  const add=(targets:Domain[],series:Series,n:number,title:string)=>{n=count(n);totals[series]+=n;for(const key of new Set(targets)){const axis=axes.find(a=>a.key===key)!;axis[series]+=n;if(n){const existing=axis.evidence.find(e=>e.title===title&&e.series===series);if(existing)existing.count+=n;else axis.evidence.push({title,series,count:n})}}};
  for(const period of window.periods) {
    add(['software'],'practice',count(period.practice.commits),'GitHub commits');
    for(const [source,key] of [['hosting','hosting'],['cloud','cloud'],['buildmap','other']] as const)
      for(const event of period.practice.segments[source]?.events||[]) add([key,...(source==='hosting'?projectDomains[event.title]||[]:[])],'practice',event.contributions===undefined?1:count(event.contributions),event.title);
    for(const event of period.theory.activities) add(theoryDomains(event.title),'theory',event.contributions===undefined?1:count(event.contributions),event.title||'Certificate');
    // The public chart has no exercise subject metadata; never invent a domain.
    add(['other'],'exercises',count(period.exercises.count),'Exercises');
  }
  return {generatedAt:input.generatedAt,from:window.from,to:window.to,totals,axes};
}
