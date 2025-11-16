import type { Game } from '$lib/types';

const DATA_URL = import.meta.env.VITE_DATA_URL; // optional remote JSON

export async function getGames(fetchFn?: typeof fetch): Promise<Game[]> {
  try {
    if (DATA_URL) {
      const f = fetchFn ?? fetch;
      const res = await f(DATA_URL);
      if (!res.ok) throw new Error('Failed to fetch DATA_URL');
      const list = (await res.json()) as Game[];
      return normalize(list);
    } else {
      const local = await import('./games.json');
      return normalize(local.default as Game[]);
    }
  } catch (e) {
    console.error('getGames error', e);
    const local = await import('./games.json');
    return normalize(local.default as Game[]);
  }
}

export async function getGame(slug: string, fetchFn?: typeof fetch): Promise<Game | null> {
  const list = await getGames(fetchFn);
  return list.find((g) => g.slug === slug) ?? null;
}

function normalize(list: Game[]): Game[] {
  return list.map((g) => ({
    ...g,
    slug: g.slug || slugify(g.title),
    platform: g.platform.trim()
  }));
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
