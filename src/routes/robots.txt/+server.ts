import type { RequestHandler } from './$types';
export const GET: RequestHandler = () => {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://gamingcoinhub.com/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
};
