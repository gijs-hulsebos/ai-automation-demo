import manifest from './manifest.json';

const allowed = new Set(manifest.map(item => item.key));

export default {
  async fetch(request, env, ctx) {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } });
    }
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS', 'Access-Control-Allow-Headers': 'Range', 'Access-Control-Expose-Headers': 'Content-Length, Content-Range, ETag, Accept-Ranges' };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    let key;
    try { key = decodeURIComponent(new URL(request.url).pathname.slice(1)); }
    catch { return new Response(null, { status: 400 }); }
    if (!allowed.has(key)) return new Response('Not found', { status: 404 });
    const cacheKey = new Request(new URL('/' + key, request.url).href);
    if (request.method === 'GET' && !request.headers.has('Range') && !request.headers.has('If-None-Match')) {
      const cached = await caches.default.match(cacheKey);
      if (cached) return cached;
    }
    const meta = await env.MEDIA.head(key);
    if (!meta) return new Response('Not found', { status: 404 });
    const headers = new Headers(cors);
    meta.writeHttpMetadata(headers);
    headers.set('ETag', meta.httpEtag);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Content-Length', String(meta.size));
    if (request.headers.get('If-None-Match')?.split(',').map(s => s.trim().replace(/^W\//, '')).some(s => s === '*' || s === meta.httpEtag)) {
      headers.delete('Content-Length');
      return new Response(null, { status: 304, headers });
    }
    if (request.method === 'HEAD') return new Response(null, { headers });
    let range;
    const raw = request.headers.get('Range');
    const ifRange = request.headers.get('If-Range');
    if (raw && (!ifRange || ifRange === meta.httpEtag)) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(raw);
      if (match && (match[1] || match[2])) {
        const start = match[1] ? Number(match[1]) : Math.max(0, meta.size - Number(match[2]));
        const end = match[1] && match[2] ? Math.min(Number(match[2]), meta.size - 1) : meta.size - 1;
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= meta.size || start > end) {
          headers.set('Content-Range', `bytes */${meta.size}`);
          headers.set('Content-Length', '0');
          return new Response(null, { status: 416, headers });
        }
        range = { offset: start, length: end - start + 1 };
        headers.set('Content-Range', `bytes ${start}-${end}/${meta.size}`);
        headers.set('Content-Length', String(range.length));
      }
    }
    const object = await env.MEDIA.get(key, range ? { range } : undefined);
    if (!object) return new Response('Not found', { status: 404 });
    const response = new Response(object.body, { status: range ? 206 : 200, headers });
    if (!range) ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    return response;
  }
};
