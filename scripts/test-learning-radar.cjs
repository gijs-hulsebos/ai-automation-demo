const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ts=require(path.join(root,'node_modules/typescript'));
function load(file){const code=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const m={exports:{}};new Function('require','module','exports',code)(id=>id.startsWith('@/')?(id.endsWith('.json')?require(path.join(root,id.slice(2))):load(id.slice(2)+'.ts')):require(id),m,m.exports);return m.exports;}
const {buildRadar,theoryDomains}=load('lib/learning-radar.ts');
const source={schemaVersion:1,audience:'public',generatedAt:'2026-09-15',windows:{'1Y':{from:'2025-09-16',to:'2026-09-15',periods:[{practice:{commits:900,segments:{hosting:{events:Array.from({length:100},()=>({title:'security-audit-checker',contributions:1}))}}},theory:{activities:[{title:'Google AI for Data Analysis'},{title:'Google AI for Data Analysis'},{title:'Unknown course'}]},exercises:{count:2}}]}}};
let result=buildRadar(source),get=k=>result.axes.find(a=>a.key===k);
assert.equal(result.totals.practice,require('../data/bento-projects.json').length+2);assert(result.evidence.some(e=>e.title==='FilePrint'));assert(result.evidence.some(e=>e.title==='GenReel'));assert.equal(get('cloud').evidence.filter(e=>e.title==='Security Audit Checker').length,1);assert.equal(result.totals.theory,2);assert.equal(get('data').theory,1);assert.equal(result.unclassifiedTheory,1);assert.equal(result.totals.exercises,2);assert(result.axes.every(a=>a.exercises===0));
assert(get('automation').evidence.some(e=>e.title==='AI Newsletter Engine'));assert(get('cloud').evidence.some(e=>e.title==='SkillMax+'));assert(get('integration').evidence.some(e=>e.title==='Tarvos'));
assert.deepEqual(theoryDomains('Google Cloud Gemini in Google Sheets'),['ai','automation','data']);assert(!theoryDomains('Google Cloud Gemini in Google Sheets').includes('cloud'));
assert.throws(()=>buildRadar({...source,audience:'owner'}));
source.windows['1Y']={from:'2020-01-01',to:'2020-12-31',periods:[]};result=buildRadar(source);assert.equal(result.totals.practice,require('../data/bento-projects.json').length+2);assert.equal(result.scope,'lifetime');
console.log('PASS project deduplication, curriculum mapping, no issuer-derived cloud claims, unknown metadata, annual review window, public-only source, no synthetic exercise counts');

const catalog=require('../public/learning-catalog.json');
source.windows['1Y']={from:'2025-09-16',to:'2026-09-15',periods:[]};
result=buildRadar(source,catalog);
assert.equal(result.totals.theory,34);
assert.equal(result.totals.exercises,0);
assert(result.axes.find(a=>a.key==='integration').evidence.some(e=>e.title==='Introduction to Model Context Protocol'&&e.detail.includes('Python')));
assert(!result.axes.flatMap(a=>a.evidence).some(e=>e.series==='theory'&&e.title.includes('Specialization')));
assert(result.axes.find(a=>a.key==='cloud').evidence.some(e=>e.series==='theory'&&e.title==='Gemini in Gmail'));
console.log('PASS repository modules, exact completion dates, incomplete programs and no parent double counting');

source.windows['1Y']={from:'2025-09-17',to:'2026-09-16',periods:[]};
source.generatedAt='2026-09-17';source.publicProjects=[{key:'github:123',name:'new-automation',url:'https://github.com/gijs-hulsebos/new-automation',createdAt:'2026-09-16T12:00:00Z',description:'Python workflow automation',topics:[],language:'Python'},{key:'github:456',name:'FilePrint-website',createdAt:'2026-09-16T12:00:00Z',description:'Website',topics:[],language:'TypeScript'}];
result=buildRadar(source,catalog);assert.equal(result.evidence.filter(e=>e.title==='new-automation').length,1);assert(!result.evidence.some(e=>e.title==='FilePrint-website'));assert(result.axes.find(a=>a.key==='automation').evidence.some(e=>e.title==='new-automation'));
console.log('PASS automatic new projects and portfolio website deduplication');

assert(result.evidence.find(e=>e.title==='Aegix').technologies.length>0);
assert(result.evidence.find(e=>e.title==='YamlGen').technologies.length===0);
assert(result.evidence.find(e=>e.title==='CrawlClaw').domains.length===0);
assert(result.evidence.find(e=>e.title==='AI for Brainstorming and Planning').domains.includes('ai'));
const before=result.totals;source.windows['1Y']={from:'2030-01-01',to:'2030-12-31',periods:[]};source.generatedAt='2030-12-31';result=buildRadar(source,catalog);assert.deepEqual(result.totals,before);
console.log('PASS lifetime stability, Aegix technology, complete module mapping and intentional withheld projects');
