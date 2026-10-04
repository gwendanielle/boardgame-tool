import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the app from https://<user>.github.io/boardgame-tool/
  base: '/boardgame-tool/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // new service worker takes over as soon as it is ready, no user prompt
      registerType: 'autoUpdate',
      // makes the app installable/offline-capable while running `vite dev`
      devOptions: {enabled: true},
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Boardgame Tool',
        short_name: 'Boardgame',
        description: 'Handy tools for game night: scoreboard, answer sheet and role playing helpers.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/boardgame-tool/',
        scope: '/boardgame-tool/',
        icons: [
          {src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png'},
          {src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png'},
          {src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png'},
          {src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // SPA: every navigation falls back to the cached shell when offline
        navigateFallback: '/boardgame-tool/index.html',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
  },
  css: {
    modules: {
      // 'camelCaseOnly' drops the original kebab-case keys.
      // Use 'camelCase' if you want to keep both.
      localsConvention: 'camelCaseOnly'
    },
  }
})
