const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');const root=path.resolve(__dirname,'..'),ts=require(path.join(root,'node_modules/typescript'));
function load(file){const out=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;const m={exports:{}};new Function('require','module','exports',out)(id=>id==='@/lib/portfolio-chat'?lib:id.startsWith('@/')?(id.endsWith('.json')?require(path.join(root,id.slice(2))):load(id.slice(2)+'.ts')):require(id),m,m.exports);return m.exports}

const lib=load('lib/portfolio-chat.ts'),route=load('app/api/chat/route.ts');process.env.OPENROUTER_API_KEY='test-only-secret';
let provider='ok',sourceCalls=0,modelCalls=0,failSources=false;
global.fetch=async(url,options)=>{
 if(String(url).includes('openrouter.ai')){modelCalls++;const d=JSON.parse(options.body);assert(!d.messages[1].content.includes('test-only-secret'));
 if(provider==='timeout')throw new DOMException('timeout','TimeoutError');
 if(provider==='busy')return new Response('',{status:429});
 if(provider==='empty')return Response.json({choices:[{message:{content:''}}]});
 return Response.json({choices:[{message:{content:'**Grounded** answer'},finish_reason:'stop'}]});}
 sourceCalls++;if(failSources)throw Error('source unavailable');
 return Response.json({schemaVersion:1,records:Array.from({length:1000},()=>({text:'a'.repeat(1000)})),learningTracks:[],exercises:[],activityTotals:{github:12},historicalOverview:[]});
};
let address=0;
const req=(text,origin='https://www.gijshulsebos.com',ip=String(++address))=>new Request('https://www.gijshulsebos.com/api/chat',{method:'POST',headers:{origin,'content-type':'application/json','x-forwarded-for':ip},body:JSON.stringify({messages:[{role:'user',content:text}]})});
(async()=>{
 assert.equal((await route.POST(req('hello','https://evil.example'))).status,403);
 let c=await lib.portfolioContext([{role:'user',content:'Hoi'}]);assert.equal(sourceCalls,0);assert.equal(c.projects.length,0);
 c=await lib.portfolioContext([{role:'user',content:'What did Gijs build?'}]);assert(c.projects.length>5);assert.equal(sourceCalls,0);
 c=await lib.portfolioContext([{role:'user',content:'Vertel over het project FilePrint'}]);assert.deepEqual(c.projects.map(p=>p.name),['FilePrint']);
 c=await lib.portfolioContext([{role:'user',content:'Tarvos'},{role:'assistant',content:'Tarvos. Also SkillMax and certificates.'},{role:'user',content:'Vertel meer'}]);assert.deepEqual(c.projects.map(p=>p.name),['Tarvos']);assert.equal(sourceCalls,0);
 c=await lib.portfolioContext([{role:'user',content:'Welke certificaten?'}]);assert(c.certificates.length>0);assert.equal(sourceCalls,0);
 c=await lib.portfolioContext([{role:'user',content:'Mijn leertraject'}]);assert.equal(sourceCalls,2);assert(JSON.stringify(c).length<10000);
 failSources=true;c=await lib.portfolioContext([{role:'user',content:'Wat heeft Gijs geleerd?'}]);assert.equal(c.sourceAvailability.learning,false);failSources=false;
 assert.equal((await route.POST(req('Hoi'))).status,200);
 provider='timeout';let r=await route.POST(req('Hoi'));assert.equal(r.status,504);assert.equal((await r.json()).code,'timeout');
 provider='busy';r=await route.POST(req('Hoi'));assert.equal((await r.json()).code,'provider_busy');
 provider='empty';r=await route.POST(req('Hoi'));assert.equal((await r.json()).code,'empty_response');
 provider='ok';assert.equal((await route.POST(req('Hoi'))).status,200);
 for(let i=0;i<8;i++)assert.equal((await route.POST(req('Hoi',undefined,'rate-test'))).status,200);
 assert.equal((await route.POST(req('Hoi',undefined,'rate-test'))).status,429);
 console.log('PASS routing, follow-ups, source failure, bounded data, provider timeout/busy/empty/recovery, rate limit and secret isolation');
})().catch(e=>{console.error(e);process.exit(1)});
