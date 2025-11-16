/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f17',
        casinoGold: '#ffd700',
        casinoGreen: '#14532d',
        casinoRed: '#b91c1c',
        casinoBlack: '#18181b',
        casinoAccent: '#fbbf24'
      }

    },
  },
  plugins: [],
}
