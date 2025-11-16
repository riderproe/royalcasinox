import { getGames } from '$lib/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const q = url.searchParams.get('q') ?? '';
  const g = url.searchParams.get('genre') ?? '';
  const p = url.searchParams.get('platform') ?? '';
  const games = await getGames(fetch);

  const filtered = games.filter((x) => {
    const s = q.toLowerCase();
    const okQ = !s || [x.title, x.genre, x.platform].some((v) => v.toLowerCase().includes(s));
    const okG = !g || x.genre === g;
    const okP = !p || x.platform === p;
    return okQ && okG && okP;
  });

  const genres = [...new Set(games.map((x) => x.genre))].sort();
  const platforms = [...new Set(games.map((x) => x.platform))].sort();

  return { games: filtered, genres, platforms, q, g, p };
};
