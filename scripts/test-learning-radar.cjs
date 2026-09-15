const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ts=require(path.join(root,'node_modules/typescript'));
const code=ts.transpileModule(fs.readFileSync(path.join(root,'lib/learning-radar.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const m={exports:{}};new Function('exports','module',code)(m.exports,m);const {buildRadar,theoryDomain}=m.exports;
const source={schemaVersion:1,audience:'public',generatedAt:'2026-09-15',windows:{'1Y':{from:'2025-09-16',to:'2026-09-15',periods:[{practice:{commits:5,segments:{hosting:{events:[{title:'Anonymous',contributions:3}]},cloud:{events:[{title:'Cloud setup'}]},buildmap:{events:[]}}},theory:{activities:[{title:'Google AI Fundamentals'},{title:'Unclassified course'}]},exercises:{count:2}}]}}};
const result=buildRadar(source),get=k=>result.axes.find(a=>a.key===k);
assert.equal(get('software').practice,5);assert.equal(get('hosting').practice,3);assert.equal(get('cloud').practice,1);assert.equal(get('ai').theory,1);assert.equal(get('other').theory,1);assert.equal(get('other').exercises,2);
assert.equal(result.axes.reduce((n,a)=>n+a.practice,0),9);assert.equal(result.totals.practice,9);
assert.throws(()=>buildRadar({...source,audience:'owner'}));assert.equal(theoryDomain('unknown'),'other');
assert.equal(theoryDomain('Google Cloud Security'),'security');
source.windows['1Y'].periods=[];assert(buildRadar(source).axes.every(a=>a.theory===0&&a.practice===0&&a.exercises===0));
console.log('PASS: source counts, no double counting, title classification, unknown subjects, public-only projection, empty data.');

source.windows['1Y'].periods=[{practice:{commits:0,segments:{hosting:{events:[{title:'security-audit-checker',contributions:4}]}}},theory:{activities:[{title:'Google Cloud Introduction to Generative AI'}]},exercises:{count:0}}];
const overlap=buildRadar(source);assert.equal(overlap.totals.practice,4);assert.equal(overlap.totals.theory,1);assert.equal(overlap.axes.find(a=>a.key==='security').practice,4);assert.equal(overlap.axes.find(a=>a.key==='cloud').theory,1);assert.equal(overlap.axes.find(a=>a.key==='ai').theory,1);console.log('PASS overlapping directions preserve unique totals');
