import {NextResponse} from 'next/server';
export async function GET(){
 try{const response=await fetch('https://skillmax-135087328412.europe-west4.run.app/api/public/skillmax-viewer',{cache:'no-store',signal:AbortSignal.timeout(10000),redirect:'error'});if(!response.ok)throw Error();
 const data=await response.json();const seen=new Set<string>();
 const posts=(Array.isArray(data.xPosts)?data.xPosts:[]).flatMap((post:unknown)=>{if(!post||typeof post!=='object')return [];const p=post as Record<string,unknown>;if(typeof p.id!=='string'||!/^\d{1,25}$/.test(p.id)||(typeof p.url!=='string'||!(p.reply===true?new RegExp(`^https://x\\.com/[A-Za-z0-9_]{1,15}/status/${p.id}$`).test(p.url):p.url===`https://x.com/Gijs_Hulsebos/status/${p.id}`))||seen.has(p.id))return [];seen.add(p.id);return [{id:p.id,url:p.url,pinned:p.pinned===true,pinOrder:typeof p.pinOrder==='number'&&Number.isFinite(p.pinOrder)?p.pinOrder:0,reply:p.reply===true}]}).sort((a:{id:string;pinned:boolean;pinOrder:number},b:{id:string;pinned:boolean;pinOrder:number})=>Number(b.pinned)-Number(a.pinned)||(a.pinned&&b.pinned?a.pinOrder-b.pinOrder:0)||b.id.length-a.id.length||b.id.localeCompare(a.id));
 return NextResponse.json({posts},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Social posts unavailable'},{status:503})}
}
