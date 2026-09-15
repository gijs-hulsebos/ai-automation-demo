const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');const root=path.resolve(__dirname,'..'),ts=require(path.join(root,'node_modules/typescript'));
function load(file){const code=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const m={exports:{}};new Function('require','module','exports',code)(id=>id.startsWith('@/')?(id.endsWith('.json')?require(path.join(root,id.slice(2))):load(id.slice(2)+'.ts')):require(id),m,m.exports);return m.exports;}
const {normalizeTechnology,technologiesInText}=load('lib/technology-normalization.ts'),{aggregateTechnologies,bubbleDiameter}=load('lib/technology-evidence.ts');
for(const n of ['NextJS','nextjs','Next.js','Next.js 15'])assert.equal(normalizeTechnology(n).name,'Next.js');assert.equal(normalizeTechnology('Next.js 15').version,'15');assert.equal(normalizeTechnology('Firestore').name,'Cloud Firestore');assert.deepEqual(technologiesInText('React Flow').map(m=>m.name),['React Flow']);assert(!technologiesInText('reactive strategy and next steps').length);
const rows=[{id:'project:a',series:'practice',technologies:[{name:'Next.js',raw:'Next.js'},{name:'NextJS',raw:'NextJS'}]},{id:'course:a',series:'theory',technologies:[{name:'Next.js',raw:'Next.js',moduleId:'a'},{name:'Next.js',raw:'Next.js',moduleId:'b'}]}];
const [n]=aggregateTechnologies([...rows,rows[0]]);assert.equal(n.strength,2);assert.equal(n.counts.practice,1);assert.equal(n.counts.theory,1);assert.equal(n.moduleIds.length,2);assert.equal(n.counts.exercises,0);assert(bubbleDiameter(500)<=112);
console.log('PASS aliases, version metadata, exact names, overlapping mentions, unique records, module dedup and bounded size');
const {aggregateTechnologyAreas}=load('lib/technology-evidence.ts');
const areas=aggregateTechnologyAreas([...rows,{id:'project:a',series:'practice',technologies:[{name:'React',raw:'React'}]}]);
assert.equal(areas.find(a=>a.id==='software').counts.practice,1);
assert.equal(areas.find(a=>a.id==='software').counts.theory,1);
console.log('PASS area dedup across multiple technologies in the same project');
const contentRows=[{id:'workflow',series:'practice',domains:['automation','integration'],technologies:[]},{id:'cloud-course',series:'theory',domains:['cloud'],technologies:[]},{id:'ethics-course',series:'theory',domains:['security'],technologies:[]}];
const contentAreas=aggregateTechnologyAreas(contentRows);
assert.equal(contentAreas.find(a=>a.id==='automation').counts.practice,1);
assert.equal(contentAreas.find(a=>a.id==='integration').counts.practice,1);
assert.equal(contentAreas.find(a=>a.id==='cloud').counts.theory,1);
assert(!contentAreas.some(a=>a.evidenceIds.includes('ethics-course')));
console.log('PASS content without brand names, multi-area evidence, no ethics-to-cloud inference');
