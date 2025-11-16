<script lang="ts">
    import { onMount } from 'svelte';
    let href = '/';
    onMount(() => {
      const p = new URLSearchParams(location.search);
      href = p.get('u') ?? '/';
      const s = p.get('s') ?? 'unknown';
      try {
        const key = `dl:${s}`;
        localStorage.setItem(key, String(Number(localStorage.getItem(key) || '0') + 1));
      } catch {}
      setTimeout(() => (location.href = href), 700);
    });
  </script>
  
  <section class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <div class="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      <h1 class="text-xl font-bold">Redirecting to official download…</h1>
      <p class="text-slate-400 mt-2">If it doesn’t open, click below.</p>
      <a class="btn btn-primary mt-4 text-white" target="_blank" rel="nofollow noopener" href={href}>Open Download</a>
    </div>
  </section>
  