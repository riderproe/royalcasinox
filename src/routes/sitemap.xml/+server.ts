import type { RequestHandler } from './$types';
import { getGames } from '$lib/data';

export const GET: RequestHandler = async ({ fetch, url }) => {
  const origin = url.origin;
  const games = await getGames(fetch);
  const urls = [
    `${origin}/`,
    `${origin}/games`,
    `${origin}/redemption`,
    `${origin}/certifications`,
    `${origin}/terms`,
    ...games.map((g) => `${origin}/games/${g.slug}`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u}</loc><changefreq>${u.includes('/games/') ? 'weekly' : 'monthly'}</changefreq></url>`)
  .join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
