import { defineMiddleware } from 'astro:middleware';

// Security headers for on-demand routes (/keystatic, /api/keystatic) in the
// cloud-editing build. Netlify's _headers file only applies to static assets —
// function responses ship without it — so the editor UI sets its own here.
// In the pure-static build every page is prerendered and this never runs.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const path = context.url.pathname;
  if (path.startsWith('/keystatic') || path.startsWith('/api/keystatic')) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  }
  return response;
});
