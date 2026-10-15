// Single source of truth for the site's main address.
// Canonical tags, the sitemap and schema must all use this exact host.
// If the main host ever changes (www vs non-www), change it here AND make the
// same host "Primary" in Vercel → Domains so the other one 308-redirects to it.
export const SITE_URL = 'https://www.mobilearmour.com.au';
