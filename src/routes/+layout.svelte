<script lang="ts">
	import '../app.css';
	import { brand } from '$lib/config/index';
	import { CountUp } from 'countup.js';
	import { onMount } from 'svelte';

	let playersEl: HTMLDivElement;
	let winningsEl: HTMLDivElement;
	let showMenu = false;


	// Simulate live stats
	let livePlayers = 1200 + Math.floor(Math.random() * 300); // Start with a base
	let recentWinnings = 5000 + Math.random() * 2000;

	function updateLiveStats() {
		// Simulate random increments for a live feel
		livePlayers += Math.floor(Math.random() * 10) - 3; // fluctuate up/down
		if (livePlayers < 1000) livePlayers = 1000 + Math.floor(Math.random() * 100);
		if (livePlayers > 2000) livePlayers = 1800 + Math.floor(Math.random() * 100);

		recentWinnings += Math.random() * 100 - 20; // fluctuate up/down
		if (recentWinnings < 5000) recentWinnings = 5000 + Math.random() * 500;
		if (recentWinnings > 12000) recentWinnings = 9000 + Math.random() * 1000;

		return {
			livePlayers: Math.floor(livePlayers),
			recentWinnings: +recentWinnings.toFixed(2)
		};
	}

	onMount(() => {
		// Initialize live stats
		const { livePlayers: p, recentWinnings: w } = updateLiveStats();
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

		// Update stats every 4 seconds for a live feel
		const interval = setInterval(() => {
			const { livePlayers: p, recentWinnings: w } = updateLiveStats();
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
		}, 4000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<link rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<nav class="sticky top-0 z-50 border-b casino-border bg-black/60 backdrop-blur-2xl shadow-2xl animate-fade-in">
	<div class="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between relative">
		<!-- LOGO & BRAND -->
		<a href="/" class="flex items-center gap-3 focus:outline-none" aria-label="Casino Home">
			<img src="/logo.png" alt="Casino Logo" class="w-11 h-11 rounded-full bg-white/10 border-2 border-[color:#ffd700] shadow-lg" />
		</a>

		<!-- Desktop Nav Links -->
		<div class="hidden md:flex items-center gap-2 text-base font-semibold">
			<a class="nav-btn casino-accent" href="/games">Games</a>
			<a class="nav-btn" href="/redemption">Redemption</a>
			<a class="nav-btn" href="/certifications">Certifications</a>
			<a class="nav-btn" href="/terms">Terms</a>
			<!-- Social -->
			<div class="ml-4 flex gap-2">
				<a target="_blank" href={brand.x} class="social-btn" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
				<a target="_blank" href={brand.facebook} class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
				<a target="_blank" href={brand.telegram} class="social-btn" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
				   <a target="_blank" href={brand.signal} class="social-btn" aria-label="Signal"><img src="/signal.svg" alt="Signal" class="w-6 h-6 inline-block align-middle" style="background:transparent;" /></a>
			</div>
			<!-- CTA Button -->
			<a href="/games" class="btn btn-primary ml-4 shadow-xl hover:scale-105 focus:outline-none" aria-label="Play Now">Play Now</a>
		</div>

		<!-- Hamburger for Mobile -->
		<button class="md:hidden flex items-center p-2 rounded-lg border border-[color:#ffd700] bg-black/40 text-[color:#ffd700] focus:outline-none" aria-label="Open menu" on:click={() => showMenu = !showMenu}>
			<i class="fa fa-bars text-2xl"></i>
		</button>

		<!-- Mobile Menu -->
		{#if showMenu}
			<div class="absolute top-16 right-4 w-56 bg-black/95 rounded-2xl shadow-2xl border border-[color:#ffd700] flex flex-col gap-2 p-5 animate-fade-in-up z-50">
				<a class="nav-btn casino-accent" href="/games" on:click={() => showMenu = false}>Games</a>
				<a class="nav-btn" href="/redemption" on:click={() => showMenu = false}>Redemption</a>
				<a class="nav-btn" href="/certifications" on:click={() => showMenu = false}>Certifications</a>
				<a class="nav-btn" href="/terms" on:click={() => showMenu = false}>Terms</a>
				<div class="flex gap-3 mt-2">
					<a target="_blank" href={brand.x} class="social-btn" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
					<a target="_blank" href={brand.facebook} class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
					<a target="_blank" href={brand.telegram} class="social-btn" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
							   <a target="_blank" href={brand.signal} class="social-btn" aria-label="Signal"><img src="/signal.svg" alt="Signal" class="w-6 h-6 inline-block align-middle" style="background:transparent;" /></a>
				</div>
				<a href="/games" class="btn btn-primary mt-3 shadow-xl" aria-label="Play Now" on:click={() => showMenu = false}>Play Now</a>
			</div>
		{/if}
	</div>
</nav>

<!-- ====================================================== -->
<!-- ======================== PAGE CONTENT ================== -->
<!-- ====================================================== -->
<slot />

<!-- ====================================================== -->
<!-- ========================= FOOTER ======================= -->
<!-- ====================================================== -->
<footer class="border-t border-white/10 bg-black/70 backdrop-blur-xl mt-20 animate-fade-in-up">
	<div class="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-3 gap-10">

		<!-- BRAND -->
		<div>
			<h2 class="text-xl font-bold text-indigo-300 flex items-center gap-2">
				<img src="/logo.png" alt="Casino Logo" class="w-7 h-7 rounded-full bg-white/10 border border-white/20 inline-block align-middle" />
				<span class="flex items-center gap-1">
						<img src="/logo.png" alt="Casino Logo" class="w-8 h-8 rounded-full bg-white/10 border border-white/20 inline-block align-middle" />
					</span>
			</h2>
			<p class="text-slate-400 text-sm mt-3 leading-relaxed">
				The trusted hub for safe casino games, fast redemptions, and support.
			</p>
		</div>

		<!-- SOCIAL ICONS -->
		<div>
			<h3 class="text-slate-200 font-semibold mb-3">Follow Us</h3>

			<div class="flex gap-4">
				<a href={brand.telegram} target="_blank" class="footer-icon">
					<i class="fa-brands fa-telegram"></i>
				</a>

				<a href={brand.signal} target="_blank" class="footer-icon">
							   <img src="/signal.svg" alt="Signal" class="w-7 h-7 inline-block align-middle" style="background:transparent;" />
				</a>

				<a href={brand.facebook} target="_blank" class="footer-icon">
					<i class="fa-brands fa-facebook"></i>
				</a>

				<a href={brand.x} target="_blank" class="footer-icon">
					<i class="fa-brands fa-x-twitter"></i>
				</a>
			</div>
		</div>

		<!-- STATS -->
		<div>
			<h3 class="text-slate-200 font-semibold mb-3">Today’s Stats</h3>

			<div class="stat-card">
				<div class="text-slate-300 text-sm">Live Players</div>
				<div bind:this={playersEl} class="stat-number text-indigo-300"></div>

				<div class="mt-6 text-slate-300 text-sm">Recent Winnings</div>
				<div bind:this={winningsEl} class="stat-number text-green-300"></div>
			</div>
		</div>

	</div>

	<div class="text-center text-slate-500 text-xs py-4 border-t border-white/5">
		© {new Date().getFullYear()} <img src="/logo.png" alt="Casino Logo" class="w-6 h-6 rounded-full bg-white/10 border border-white/20 inline-block align-middle" /> — All Rights Reserved.
	</div>
</footer>

<style>
	/* NAV BUTTONS */
	.nav-btn {
		@apply px-4 py-2 rounded-xl hover:bg-yellow-400/10 transition text-slate-200 hover:text-yellow-400 font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400;
	}
	/* SOCIAL ICONS HEADER */
	.social-btn {
		@apply p-2 rounded-lg bg-white/5 text-slate-300 hover:text-yellow-400 hover:bg-yellow-400/20 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400;
	}
	/* Hamburger menu animation */
	.mobile-menu-enter {
		animation: fadeInUp 0.5s ease;
	}
	/* FOOTER ICONS */
	.footer-icon {
		@apply w-12 h-12 flex items-center justify-center text-2xl bg-slate-800/50 rounded-xl text-white shadow-md transition-all hover:scale-110 hover:bg-indigo-600/40;
	}
	/* STATS CARD */
	.stat-card {
		@apply bg-slate-800/40 p-6 rounded-xl border border-white/10 shadow-xl backdrop-blur-xl;
	}
	.stat-number {
		@apply text-4xl font-bold drop-shadow-lg;
	}
	/* ANIMATIONS */
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fadeIn 0.7s ease forwards;
	}
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in-up {
		animation: fadeInUp 0.7s ease forwards;
	}
	@keyframes pulseSlow {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}
	.animate-pulse-slow {
		animation: pulseSlow 2.5s infinite linear;
	}
</style>

