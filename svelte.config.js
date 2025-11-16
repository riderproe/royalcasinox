import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // <-- important for SPA-like routing
    }),
    prerender: {
      crawl: false,
      entries: []
    }
  }
};

export default config;
