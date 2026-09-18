import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Pages are rendered to static HTML at build time (src/render/prerender.tsx).
// In dev the same renderer answers page requests, so there is no index.html.
function devPages(): Plugin {
  return {
    name: 'kunz-global-dev-pages',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '/').split('?')[0];
        const wantsPage = req.method === 'GET' && (url.endsWith('/') || url.endsWith('.html'));
        if (!wantsPage || url.startsWith('/@') || url.startsWith('/src/')) return next();
        try {
          const mod = await server.ssrLoadModule('/src/render/pages.tsx');
          const html: string | null = mod.renderUrl(url, {
            scripts: ['/@vite/client', '/src/client/main.ts'],
            styles: [],
            preloadFonts: [],
          });
          if (html === null) return next();
          res.statusCode = url === '/404.html' ? 404 : 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), devPages()],
  appType: 'custom',
  build: {
    manifest: true,
    assetsInlineLimit: 0,
    rollupOptions: { input: 'src/client/main.ts' },
  },
});
