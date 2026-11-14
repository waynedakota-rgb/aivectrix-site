import type { APIRoute } from "astro";
import { SITE_URL, services } from "../content/site";

// Generated at build time so new pages appear without a plugin. No <lastmod>:
// a build date on every page would be wrong, and Google ignores unreliable lastmod.
const paths = ["/", ...services.map((s) => `/${s.slug}/`), "/about/"];

export const GET: APIRoute = () => {
  const urls = paths
    .map((p) => `  <url>\n    <loc>${new URL(p, SITE_URL).href}</loc>\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
