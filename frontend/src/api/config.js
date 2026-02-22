/** Hosted FastAPI backend (Swagger: http://35.200.180.98/docs) */
const HOSTED_API_BASE = 'http://35.200.180.98';

/**
 * FastAPI Backend — Base URL for all /api/* requests.
 * - Vercel: set VITE_VERCEL_DEPLOY=true → relative /api (Vercel rewrites proxy to backend)
 * - Dev: empty → Vite proxy to backend
 * - Other production: defaults to HOSTED_API_BASE or VITE_API_BASE_URL
 */
export function getApiBase() {
  if (import.meta.env.VITE_VERCEL_DEPLOY === 'true') return '';
  const env = import.meta.env.VITE_API_BASE_URL ?? '';
  const base = env.trim();
  if (base) return base.replace(/\/$/, '');
  if (import.meta.env.PROD) return HOSTED_API_BASE;
  return '';
}

export function apiUrl(path) {
  const base = getApiBase();
  const p = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}
