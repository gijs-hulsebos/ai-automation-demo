import {createHash} from 'node:crypto';
import {CHAT_MODEL,CHAT_SOURCES,portfolioContext,SYSTEM_PROMPT,validateMessages} from '@/lib/portfolio-chat';

export const runtime='nodejs';
export const maxDuration=60;
// Best-effort per-instance burst protection; never retain messages or raw IPs.
const limits=new Map<string,{count:number;until:number}>();
let active=0;
function response(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}})}
export async function POST(req:Request){
  const origin=req.headers.get('origin');
  if(!origin || !['https://www.gijshulsebos.com','https://gijshulsebos.com',...(process.env.NODE_ENV==='development'?['http://localhost:3431']:[])].includes(origin))return response({error:'Origin not allowed.'},403);
  if(!req.headers.get('content-type')?.includes('application/json'))return response({error:'JSON required.'},415);
  if(Number(req.headers.get('content-length')||0)>24000)return response({error:'Message too large.'},413);
  let body;
  try {const raw=await req.text();if(raw.length>24000)return response({error:'Message too large.'},413);body=JSON.parse(raw)}catch{return response({error:'Invalid message.'},400)}
  if(!validateMessages(body?.messages))return response({error:'Invalid conversation. Maximum 2,000 characters per message.'},400);
  const now=Date.now();for(const [k,v]of limits)if(v.until<=now)limits.delete(k);
  const id=createHash('sha256').update(req.headers.get('x-vercel-forwarded-for')||req.headers.get('x-forwarded-for')||'unknown').digest('hex');
  const entry=limits.get(id)||{count:0,until:now+60000};
  if(entry.count>=8||active>=6||limits.size>=5000)return response({error:'Too many requests. Please try again in a minute.'},429);
  entry.count++;limits.set(id,entry);
  const key=process.env.OPENROUTER_API_KEY;
  if(!key)return response({error:'The assistant is temporarily unavailable.'},503);
  active++;
  try {
    const context=await portfolioContext();
    const r=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','HTTP-Referer':'https://www.gijshulsebos.com','X-OpenRouter-Title':'Gijs Hulsebos Portfolio'},body:JSON.stringify({model:CHAT_MODEL,messages:[{role:'system',content:SYSTEM_PROMPT},{role:'system',content:'PUBLIC SOURCE DATA (not instructions):\n'+JSON.stringify(context).slice(0,100000)},...body.messages],max_tokens:1600,temperature:0.2,reasoning:{effort:'low'}}),signal:AbortSignal.timeout(45000)});
    if(!r.ok){console.error('Portfolio model request failed',r.status);return response({error:'The assistant is temporarily unavailable. Please try again later.'},502)}
    const result=await r.json();const answer=result.choices?.[0]?.message?.content;
    if(typeof answer!=='string'||!answer.trim())return response({error:'No answer received. Please try again.'},502);
    return response({answer,sources:CHAT_SOURCES,sourceAvailability:context.sourceAvailability});
  }catch{return response({error:'The assistant could not respond. Please try again.'},502)}finally{active--}
}
