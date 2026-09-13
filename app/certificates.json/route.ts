import manifest from '@/data/certificates.json';

// The manifest and carousel are compiled from the same source in each deployment.
export function GET() {
  return Response.json(manifest, { headers: { 'Cache-Control': 'no-store' } });
}
