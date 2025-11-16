<script lang="ts">
  import { brand } from '$lib/config/index';
  export let data: { game: import('$lib/types').Game };
  const g = data.game;

  const dl = `/download?u=${encodeURIComponent(g.link)}&s=${encodeURIComponent(g.slug)}`;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = g.title;
  const shareText = `Check out ${g.title} on ${brand.name}!`;

  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let webShareSupported = false;
  onMount(() => {
    webShareSupported = browser && !!navigator.share;
  });

  function handleWebShare() {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: currentUrl,
      });
    }
  }
</script>

<svelte:head>
  <title>{g.title} — {brand.name}</title>
  <meta name="description" content={g.description} />
  <meta name="keywords" content="online casino, casino games, slot games, poker, blackjack, roulette, mobile casino, PC casino games, gaming downloads, RoyalCasinoX, safe game downloads" />

  <meta property="og:title" content={`${g.title} — ${brand.name}`} />
  <meta property="og:description" content={g.description} />
  <meta property="og:image" content={g.image} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={currentUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${g.title} — ${brand.name}`} />
  <meta name="twitter:description" content={g.description} />
  <meta name="twitter:image" content={g.image} />
</svelte:head>

<section class="mx-auto max-w-6xl px-4 py-8">
  <div class="grid md:grid-cols-2 gap-6 items-start">
    <img
      src={g.image}
      alt={g.title}
      class="w-full rounded-2xl border border-white/10 object-cover"
    />
    <div>
      <h1 class="text-3xl font-extrabold text-indigo-300">{g.title}</h1>
      <p class="text-slate-400 mt-1">{g.genre} • {g.platform}</p>
      <p class="text-slate-200 mt-4">{g.description}</p>

      <div class="mt-6 flex gap-3">
        <a class="btn btn-primary text-white" href={dl}>Download Game</a>

        {#if webShareSupported}
          <button class="btn btn-outline" on:click={handleWebShare}>
            Share
          </button>
        {:else}
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
            <!-- Use solid or brand version of signal icon -->
            <i class="fab fa-signal-messenger"></i> Signal
          </a>
        {/if}
      </div>
    </div>
  </div>
</section>