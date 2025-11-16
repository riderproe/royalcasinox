import { getGame } from '$lib/data';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const game = await getGame(params.slug, fetch);
  if (!game) throw error(404, 'Game not found');
  return { game };
};
