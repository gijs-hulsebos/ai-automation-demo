import {portfolioProjects} from '@/lib/portfolio-projects';
export async function GET(){return Response.json({schemaVersion:1,projects:portfolioProjects()},{headers:{'Cache-Control':'public, max-age=60'}});}
