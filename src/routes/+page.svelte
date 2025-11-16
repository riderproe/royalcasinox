
<script lang="ts">
  import { brand } from '$lib/config/index';
  import { onMount } from 'svelte';
  import { getGames } from '$lib/data';
  import type { Game } from '$lib/types';
  import { CountUp } from 'countup.js';

  let hotGames: Game[] = [];
  let playersEl: HTMLDivElement;
  let winningsEl: HTMLDivElement;

  // Live stats logic (same as layout)
  let livePlayers = 1200 + Math.floor(Math.random() * 300);
  let recentWinnings = 5000 + Math.random() * 2000;
  function updateLiveStats() {
    livePlayers += Math.floor(Math.random() * 10) - 3;
    if (livePlayers < 1000) livePlayers = 1000 + Math.floor(Math.random() * 100);
    if (livePlayers > 2000) livePlayers = 1800 + Math.floor(Math.random() * 100);
    recentWinnings += Math.random() * 100 - 20;
    if (recentWinnings < 5000) recentWinnings = 5000 + Math.random() * 500;
    if (recentWinnings > 12000) recentWinnings = 9000 + Math.random() * 1000;
    return {
      livePlayers: Math.floor(livePlayers),
      recentWinnings: +recentWinnings.toFixed(2)
    };
  }

  onMount(async () => {
    const allGames = await getGames();
    hotGames = allGames
      .map(v => [Math.random(), v] as [number, Game])
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v)
      .slice(0, 4);

    // Live stats animation
    const { livePlayers: p, recentWinnings: w } = updateLiveStats();
    if (playersEl && winningsEl) {
      new CountUp(playersEl, p, {
        duration: 1.2,
        separator: ",",
        useEasing: true
      }).start();
      new CountUp(winningsEl, w, {
        duration: 1.5,
        separator: ",",
        decimalPlaces: 2,
        prefix: "$",
        useEasing: true
      }).start();
    }
    const interval = setInterval(() => {
      const { livePlayers: p, recentWinnings: w } = updateLiveStats();
      if (playersEl && winningsEl) {
        new CountUp(playersEl, p, {
          duration: 0.8,
          separator: ",",
          useEasing: true
        }).start();
        new CountUp(winningsEl, w, {
          duration: 1,
          separator: ",",
          decimalPlaces: 2,
          prefix: "$",
          useEasing: true
        }).start();
      }
    }, 4000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>RoyalCasinoX | Download Casino & Gaming Titles Safely</title>

  <meta name="description" content="Download the latest casino and gaming titles instantly with RoyalCasinoX. Fast, safe links to official providers. Join our community for updates and support." />

  <meta name="keywords" content="online casino, casino games, slot games, poker, blackjack, roulette, mobile casino, PC casino games, gaming downloads, RoyalCasinoX, safe game downloads" />

  <!-- Open Graph -->
  <meta property="og:title" content="RoyalCasinoX | All Casino & Gaming Titles in One Place" />
  <meta property="og:description" content="Instantly download casino and gaming titles with safe, official links. Join the RoyalCasinoX community for support." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:url" content="https://royalcasinox.live" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="RoyalCasinoX | Download Casino Games Safely" />
  <meta name="twitter:description" content="Browse and download the latest casino and gaming titles with safe, official links." />
  <meta name="twitter:image" content="/og-image.jpg" />
</svelte:head>


<!-- 🎰 MODERN ANIMATED CASINO HERO -->
<header class="relative overflow-hidden min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[color:#18181b] via-[color:#222c1a] to-[color:#0b0f17]">
  <!-- Animated Sparkles Background -->
  <div class="absolute inset-0 pointer-events-none z-0">
    <div class="absolute w-full h-full animate-sparkle-bg"></div>
    <svg class="absolute w-full h-full" style="opacity:0.18;" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sparkleGold" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffd700" stop-opacity="0.7"/>
          <stop offset="1" stop-color="#ffd700" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="200" cy="100" r="80" fill="url(#sparkleGold)">
        <animate attributeName="cx" values="200;1240;200" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1240" cy="300" r="60" fill="url(#sparkleGold)">
        <animate attributeName="cx" values="1240;200;1240" dur="10s" repeatCount="indefinite"/>
      </circle>
      <circle cx="720" cy="200" r="100" fill="url(#sparkleGold)">
        <animate attributeName="cy" values="200;350;200" dur="7s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
  <div class="relative z-10 mx-auto max-w-4xl px-4 py-24 flex flex-col items-center text-center">
    <h1 class="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-xl animate-hero-title flex items-center justify-center gap-3">
      <img src="/logo.png" alt="Casino Logo" class="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 border-2 border-[color:#ffd700] shadow-lg" />
      <span class="animated-gold-gradient">RoyalCasinoX</span>
    </h1>
    <p class="mt-7 text-2xl text-[color:#e5e7eb] max-w-2xl animate-fade-in">
      The #1 trusted online casino in the USA.<br />Play premium slots, blackjack, roulette, and live dealer games.<br />Fast payouts, huge bonuses, and 24/7 support.
    </p>
    <div class="mt-10 flex flex-col sm:flex-row gap-5 justify-center animate-fade-in">
      <a href="/games" class="btn btn-primary text-xl px-10 py-4 shadow-lg hover:scale-105 transition-transform">Play Now</a>
      <a href="/redemption" class="btn btn-outline text-xl px-10 py-4 shadow-lg hover:scale-105 transition-transform">Redeem Bonus</a>
    </div>
    <div class="mt-10 flex gap-8 items-center justify-center animate-fade-in">
      <span class="text-4xl">✅</span>
      <span class="text-[color:#ffd700] font-semibold text-xl">100% Legal & Secure</span>
      <span class="text-[color:#22c55e] font-semibold text-xl">21+ Only</span>
    </div>
    <div class="mt-12 flex flex-col md:flex-row items-center justify-center gap-10 animate-slide-up">
      <img src="/logo.png" alt="Casino Logo" class="w-28 h-28 rounded-full border-4 border-[color:#ffd700] bg-white/10 shadow-2xl" />
      <!-- Live Stats Card -->
      <div class="stat-card bg-slate-800/60 p-7 rounded-2xl border border-[color:#ffd700]/30 shadow-2xl backdrop-blur-xl min-w-[220px]">
        <div class="text-[color:#ffd700] text-lg font-bold mb-2 flex items-center gap-2"><span>📊</span>Live Stats</div>
        <div class="text-slate-300 text-sm">Live Players</div>
        <div bind:this={playersEl} class="stat-number text-indigo-300"></div>
        <div class="mt-4 text-slate-300 text-sm">Recent Winnings</div>
        <div bind:this={winningsEl} class="stat-number text-green-300"></div>
      </div>
    </div>
  </div>

</header>

<!-- 🚀 MESSAGE US TO PLAY INSTANTLY -->
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


<!-- 🔥 HOT GAMES (Random selection, no random text) -->
<section class="mx-auto max-w-6xl px-4 py-16">
  <h2 class="text-3xl md:text-4xl font-bold text-[color:#ffd700] mb-8 text-center flex items-center justify-center gap-2">
    <span>🔥 Hot Games</span>
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {#each hotGames as game}
      <a href={game.link} target="_blank" rel="noopener" class="group relative p-0 rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-[color:#18181b]/90 via-[color:#222c1a]/80 to-[color:#0b0f17]/90 hover:from-[color:#ffd700]/20 hover:to-[color:#fbbf24]/10 transition-all duration-300">
        <div class="absolute top-2 left-2 z-10 bg-gradient-to-r from-[color:#ffd700] to-[color:#fbbf24] text-[color:#18181b] text-xs font-bold px-2 py-1 rounded shadow-lg tracking-wide">HOT</div>
        <div class="flex flex-col items-center p-6 backdrop-blur-xl">
          {#if game.image}
            <img src={game.image} alt={game.title} class="w-20 h-20 mb-3 rounded-xl shadow-lg border-2 border-[color:#ffd700] bg-black/20 object-cover group-hover:scale-110 group-hover:shadow-[0_0_24px_#ffd700] transition-all duration-300" loading="lazy" />
          {:else}
            <span class="text-5xl mb-3">🎰</span>
          {/if}
          <div class="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[color:#ffd700] to-[color:#fbbf24] mb-1 text-center drop-shadow-lg">{game.title}</div>
          <div class="text-xs text-[color:#e5e7eb] text-center mb-2 opacity-80">{game.genre} &bull; {game.platform}</div>
          <div class="text-sm text-[color:#fbbf24] text-center line-clamp-2 font-medium">{game.description.replace(/Agent:.*/i, '').trim()}</div>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  .card {
    /* fallback for glassmorphism */
    background: rgba(24, 24, 27, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    border-radius: 1.25rem;
    border: 1.5px solid rgba(255, 215, 0, 0.13);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.9s ease-out forwards;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(25px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 1s ease-out forwards;
  }
  /* Animated gold gradient text */
  .animated-gold-gradient {
    background: linear-gradient(90deg, #ffd700 0%, #fffbe6 40%, #fbbf24 60%, #ffd700 100%);
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gold-gradient-move 3s linear infinite alternate;
    display: inline-block;
    filter: drop-shadow(0 2px 16px #ffd70088);
  }
  @keyframes gold-gradient-move {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  /* Hero title pop-in */
  @keyframes heroTitlePop {
    0% { opacity: 0; transform: scale(0.95) translateY(30px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .animate-hero-title {
    animation: heroTitlePop 1.2s cubic-bezier(.23,1.12,.72,1.01) both;
  }
  /* Sparkle background animation (subtle) */
  @keyframes sparkleBg {
    0% { filter: blur(0px) brightness(1); }
    50% { filter: blur(2px) brightness(1.2); }
    100% { filter: blur(0px) brightness(1); }
  }
  .animate-sparkle-bg {
    animation: sparkleBg 6s ease-in-out infinite;
  }
</style>


<!-- 💰 BONUSES & PROMOS -->
<section class="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-8">
  <div class="card p-8 flex flex-col items-center text-center">
    <span class="text-4xl mb-3">🎁</span>
    <h3 class="text-2xl font-bold text-[color:#ffd700] mb-2">Welcome Bonus</h3>
    <p class="text-[color:#e5e7eb]">Get up to <b class="text-[color:#fbbf24]">$2,000</b> on your first deposit. Fast, easy, and secure payouts.</p>
  </div>
  <div class="card p-8 flex flex-col items-center text-center">
    <span class="text-4xl mb-3">⚡</span>
    <h3 class="text-2xl font-bold text-[color:#ffd700] mb-2">Instant Payouts</h3>
    <p class="text-[color:#e5e7eb]">Withdraw your winnings instantly with our trusted payment partners. No hidden fees.</p>
  </div>
  <div class="card p-8 flex flex-col items-center text-center">
    <span class="text-4xl mb-3">🛡️</span>
    <h3 class="text-2xl font-bold text-[color:#ffd700] mb-2">Safe & Legal</h3>
    <p class="text-[color:#e5e7eb]">Fully licensed for US players. 21+ only. Play responsibly and enjoy peace of mind.</p>
  </div>
</section>

<!-- 🏆 TRUST & LEGAL -->
<section class="mx-auto max-w-6xl px-4 py-10 text-center">
  <div class="inline-block card p-6">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
      <span class="text-[color:#ffd700] font-bold text-lg"><img src="/logo.png" alt="Casino Logo" class="w-6 h-6 inline-block align-middle mr-1 rounded-full bg-white/10 border border-[color:#ffd700]" />RoyalCasinoX is licensed and regulated for US players.</span>
      <span class="text-[color:#e5e7eb] text-sm">21+ only. Gambling can be addictive. Please play responsibly.</span>
    </div>
  </div>
</section>



