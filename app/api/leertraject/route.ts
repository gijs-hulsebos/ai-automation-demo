export const dynamic = 'force-dynamic';
export async function GET() {
  const endpoint = process.env.SKILLMAX_PUBLIC_API_URL;
  if (!endpoint) return Response.json(null, { headers: { 'Cache-Control': 'no-store' } });
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' || url.pathname !== '/api/skillmax/cloud/public') throw new Error('Invalid public endpoint');
    // No cookies or authorization are forwarded: the website uses only the public API.
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10000), redirect: 'error' });
    if (!response.ok) throw new Error('Public API unavailable');
    const data = await response.json();
    if (data !== null && (!Array.isArray(data.trajectories) || typeof data.updatedAt !== 'string' || !data.totals)) throw new Error('Invalid public data');
    return Response.json(data, { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch { return Response.json({ error: 'Het Leertraject is tijdelijk niet beschikbaar.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } }); }
}
