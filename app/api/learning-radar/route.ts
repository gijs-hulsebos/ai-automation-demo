import {NextResponse} from 'next/server';
import {buildRadar} from '@/lib/learning-radar';

export async function GET() {
  try {
    const response=await fetch('https://skillmax-135087328412.europe-west4.run.app/api/public/learning-chart-public',{cache:'no-store',credentials:'omit',redirect:'error',signal:AbortSignal.timeout(10000)});
    if(!response.ok) throw new Error('Learning source unavailable');
    const curriculum=await fetch('https://skillmax-135087328412.europe-west4.run.app/api/public/learning-catalog',{next:{revalidate:60},signal:AbortSignal.timeout(10000)});
    if(!curriculum.ok)throw new Error('Curriculum unavailable');
    return NextResponse.json(buildRadar(await response.json(),await curriculum.json()),{headers:{'Cache-Control':'no-store'}});
  } catch {
    return NextResponse.json({error:'Learning data temporarily unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
