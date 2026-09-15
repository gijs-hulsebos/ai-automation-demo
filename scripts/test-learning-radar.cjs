const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ts=require(path.join(root,'node_modules/typescript'));
function load(file){const code=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const m={exports:{}};new Function('require','module','exports',code)(id=>id.startsWith('@/')?(id.endsWith('.json')?require(path.join(root,id.slice(2))):load(id.slice(2)+'.ts')):require(id),m,m.exports);return m.exports;}
const {buildRadar,theoryDomains}=load('lib/learning-radar.ts');
const source={schemaVersion:1,audience:'public',generatedAt:'2026-09-15',windows:{'1Y':{from:'2025-09-16',to:'2026-09-15',periods:[{practice:{commits:900,segments:{hosting:{events:Array.from({length:100},()=>({title:'security-audit-checker',contributions:1}))}}},theory:{activities:[{title:'Google AI for Data Analysis'},{title:'Google AI for Data Analysis'},{title:'Unknown course'}]},exercises:{count:2}}]}}};
let result=buildRadar(source),get=k=>result.axes.find(a=>a.key===k);
assert.equal(result.totals.practice,19);assert.equal(get('cloud').evidence.filter(e=>e.title==='Security Audit Checker').length,1);assert.equal(result.totals.theory,2);assert.equal(get('data').theory,1);assert.equal(result.unclassifiedTheory,1);assert.equal(result.totals.exercises,2);assert(result.axes.every(a=>a.exercises===0));
assert(get('automation').evidence.some(e=>e.title==='AI Newsletter Engine'));assert(get('cloud').evidence.some(e=>e.title==='SkillMax+'));assert(get('integration').evidence.some(e=>e.title==='Tarvos'));
assert.deepEqual(theoryDomains('Google Cloud Gemini in Google Sheets'),['ai','automation','data']);assert(!theoryDomains('Google Cloud Gemini in Google Sheets').includes('cloud'));
assert.throws(()=>buildRadar({...source,audience:'owner'}));
source.windows['1Y']={from:'2020-01-01',to:'2020-12-31',periods:[]};result=buildRadar(source);assert.equal(result.totals.practice,0);assert(result.axes.every(a=>a.theory===0&&a.practice===0&&a.exercises===0));
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
