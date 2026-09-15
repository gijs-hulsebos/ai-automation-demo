export const domains = ['cloud', 'hosting', 'software', 'ai', 'automation', 'security', 'other'] as const;
export type Domain = typeof domains[number];
export type Series = 'theory' | 'practice' | 'exercises';
type Activity = {title:string; contributions?:number};
type Period = {
  practice:{commits?:number;segments:Record<string,{events:Activity[]}>};
  theory:{activities:Activity[]}; exercises:{count:number};
};
export type PublicChart = {schemaVersion:number;audience:string;generatedAt:string;windows:{'1Y':{from:string;to:string;periods:Period[]}}};
export type RadarData = {generatedAt:string;from:string;to:string;axes:{key:Domain;theory:number;practice:number;exercises:number}[]};
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
  const axes=domains.map(key=>({key,theory:0,practice:0,exercises:0}));
  const add=(key:Domain,series:Series,n:number)=>{axes.find(a=>a.key===key)![series]+=count(n)};
  for(const period of window.periods) {
    add('software','practice',count(period.practice.commits));
    for(const [source,key] of [['hosting','hosting'],['cloud','cloud'],['buildmap','other']] as const)
      for(const event of period.practice.segments[source]?.events||[]) add(key,'practice',event.contributions===undefined?1:count(event.contributions));
    for(const event of period.theory.activities) add(theoryDomain(event.title),'theory',event.contributions===undefined?1:count(event.contributions));
    // The public chart has no exercise subject metadata; never invent a domain.
    add('other','exercises',count(period.exercises.count));
  }
  return {generatedAt:input.generatedAt,from:window.from,to:window.to,axes};
}
