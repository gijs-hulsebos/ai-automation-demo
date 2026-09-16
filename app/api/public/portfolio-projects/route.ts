import projects from '@/data/bento-projects.json';
export async function GET(){return Response.json({projects:projects.map(p=>({id:p.id,title:p.displayName||p.name,description:[p.summary,p.implementation,...p.highlights].join(' '),stack:p.stack,repository:p.private?null:p.repository,live:p.live}))},{headers:{'Cache-Control':'public, max-age=60'}});}
