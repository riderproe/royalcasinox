<script lang="ts">
  import { brand } from '$lib/config/index';

  export let data: {
    games: import('$lib/types').Game[];
    genres: string[];
    platforms: string[];
    q: string;
    g: string;
    p: string;
  };

  let q = data.q;
  let genre = data.g;
  let platform = data.p;

  function apply() {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (genre) params.set('genre', genre);
    if (platform) params.set('platform', platform);
    window.location.search = params.toString();
  }

  // For sharing the current page
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out RoyalCasinoX games${q ? `: "${q}"` : ''}`;
  
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  let webShareSupported = false;

  onMount(() => {
    webShareSupported = browser && !!navigator.share;
  });

  function handleWebShare() {
    if (navigator.share) {
      navigator.share({
        title: 'RoyalCasinoX Games',
        text: shareText,
        url: currentUrl
      });
    }
  }
</script>

<svelte:head>
  <title>Games — RoyalCasinoX</title>
  <meta name="description" content="Browse casino and gaming titles on RoyalCasinoX. Filter by genre or platform and download directly." />

  <meta property="og:title" content="Games — RoyalCasinoX" />
  <meta property="og:description" content="Browse casino and gaming titles on RoyalCasinoX. Filter by genre or platform." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={currentUrl} />
  <!-- Could add a generic image or first game's image -->
  <!-- <meta property="og:image" content="/og-games.jpg" /> -->

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Games — RoyalCasinoX" />
  <meta name="twitter:description" content="Browse casino and gaming titles on RoyalCasinoX. Filter by genre or platform." />
</svelte:head>

<section class="mx-auto max-w-6xl px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-extrabold">Games</h1>
    {#if webShareSupported}
      <button class="btn btn-outline" on:click={handleWebShare}>
        Share Games
      </button>
    {:else}
      <div class="flex gap-2">
        <a
          class="btn btn-outline flex items-center gap-2"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank" rel="noopener noreferrer"
        >
          <i class="fab fa-facebook-f"></i> Facebook
        </a>
        <a
          class="btn btn-outline flex items-center gap-2"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
          target="_blank" rel="noopener noreferrer"
        >
          <i class="fab fa-twitter"></i> X
        </a>
        <a
          class="btn btn-outline flex items-center gap-2"
          href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
          target="_blank" rel="noopener noreferrer"
        >
          <i class="fab fa-telegram"></i> Telegram
        </a>
        <a
          class="btn btn-outline flex items-center gap-2"
          href={brand.signal}
          target="_blank" rel="noopener noreferrer"
        >
          <img src="/signal.svg" alt="Signal" class="w-6 h-6 inline-block align-middle" style="background:transparent;" /> Signal
        </a>
      </div>
    {/if}
  </div>

  <!-- 🚀 MESSAGE US TO PLAY INSTANTLY (CTA) -->
  <section class="mx-auto max-w-3xl px-4 py-10 flex flex-col items-center text-center animate-fade-in">
    <div class="bg-gradient-to-br from-emerald-900/80 via-slate-900/90 to-indigo-900/80 rounded-3xl shadow-2xl border-4 border-[color:#ffd700]/30 p-8 w-full flex flex-col items-center">
      <h2 class="text-2xl md:text-3xl font-extrabold text-[color:#ffd700] mb-3 flex items-center gap-2">
        <i class="fa fa-paper-plane"></i> Message Us to Play Instantly
      </h2>
      <p class="text-lg text-slate-200 mb-6 max-w-xl">
        No signup, no ID, no hassle. <b>Just message us on Telegram or Signal</b> to start playing, redeem bonuses, or get support—instantly!
      </p>
      <div class="flex flex-col sm:flex-row gap-5 justify-center w-full">
        <a href="https://t.me/yourtelegram" target="_blank" class="flex-1 btn btn-primary text-xl py-4 flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform" style="background-color:#229ED9; color:white;">
          <i class="fa-brands fa-telegram"></i> Telegram
        </a>
        <a href="https://signal.group/#yourgroup" target="_blank" class="flex-1 btn btn-primary text-xl py-4 flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform" style="background-color:#3A76F0; color:white;">
          <img src="/signal.svg" alt="Signal" class="w-7 h-7 inline-block align-middle" style="background:transparent;" /> Signal
        </a>
        <a href="https://facebook.com/yourpage" target="_blank" class="flex-1 btn btn-primary text-xl py-4 flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform" style="background-color:#1877F3; color:white;">
          <i class="fa-brands fa-facebook-f"></i> Facebook
        </a>
      </div>
      <div class="mt-6 text-slate-400 text-sm">
        Our team is online 24/7. Get started or ask anything—<b>we reply fast!</b>
      </div>
    </div>
  </section>

  <div class="mt-4 grid md:grid-cols-3 gap-3">
    <input
      bind:value={q}
      placeholder="Search by title, genre, or platform"
      class="rounded-xl bg-black/50 border border-white/15 px-4 py-3"
    />
    <select bind:value={genre} class="rounded-xl bg-black/50 border border-white/15 px-4 py-3">
      <option value="">All Genres</option>
      {#each data.genres as g}<option value={g}>{g}</option>{/each}
    </select>
    <select bind:value={platform} class="rounded-xl bg-black/50 border border-white/15 px-4 py-3">
      <option value="">All Platforms</option>
      {#each data.platforms as p}<option value={p}>{p}</option>{/each}
    </select>
  </div>

  <div class="mt-3">
    <button class="btn btn-primary text-white" on:click={apply}>Filter</button>
  </div>

  <div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.games as g}
      <article class="card overflow-hidden hover:border-indigo-500/40 transition">
        <a class="block" href={`/games/${g.slug}`}>
          <img src={g.image} alt={g.title} class="w-full h-48 object-cover rounded-lg" loading="lazy" />
          <div class="p-4">
            <h3 class="text-lg font-bold text-indigo-300">{g.title}</h3>
            <p class="text-xs text-slate-400 mt-1">{g.genre} • {g.platform}</p>
            <p class="text-sm text-slate-300 mt-2 line-clamp-2">{g.description}</p>
            <div class="mt-3 text-indigo-300">View & Download →</div>
          </div>
        </a>
      </article>
    {/each}
    {#if data.games.length === 0}
      <p class="text-slate-400">No games match your filters.</p>
    {/if}
  </div>

  <!-- 🚀 MESSAGE US TO PLAY INSTANTLY (CTA) -->
  <section class="mx-auto max-w-3xl px-4 py-10 flex flex-col items-center text-center animate-fade-in">
    <div class="bg-gradient-to-br from-emerald-900/80 via-slate-900/90 to-indigo-900/80 rounded-3xl shadow-2xl border-4 border-[color:#ffd700]/30 p-8 w-full flex flex-col items-center">
      <h2 class="text-2xl md:text-3xl font-extrabold text-[color:#ffd700] mb-3 flex items-center gap-2">
        <i class="fa fa-paper-plane"></i> Message Us to Play Instantly
      </h2>
      <p class="text-lg text-slate-200 mb-6 max-w-xl">
        No signup, no ID, no hassle. <b>Just message us on Telegram or Signal</b> to start playing, redeem bonuses, or get support—instantly!
      </p>
      <div class="flex flex-col sm:flex-row gap-5 justify-center w-full">
        <a href="https://t.me/yourtelegram" target="_blank" class="flex-1 btn btn-primary text-xl py-4 flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform" style="background-color:#229ED9; color:white;">
          <i class="fa-brands fa-telegram"></i> Telegram
        </a>
        <a href="https://signal.group/#yourgroup" target="_blank" class="flex-1 btn btn-primary text-xl py-4 flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform" style="background-color:#3A76F0; color:white;">
          <img src="/signal.svg" alt="Signal" class="w-7 h-7 inline-block align-middle" style="background:transparent;" /> Signal
        </a>
      </div>
      <div class="mt-6 text-slate-400 text-sm">
        Our team is online 24/7. Get started or ask anything—<b>we reply fast!</b>
      </div>
    </div>
  </section>
</section>
