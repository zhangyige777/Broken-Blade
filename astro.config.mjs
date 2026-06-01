import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://broken-blade-bqr.pages.dev',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
