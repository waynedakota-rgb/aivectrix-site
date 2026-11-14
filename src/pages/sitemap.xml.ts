import type { APIRoute } from "astro";
import { SITE_URL, services } from "../content/site";

// Generated at build time so new pages and lastmod stay current without a plugin.
const paths = ["/", ...services.map((s) => `/${s.slug}/`), "/about/"];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) => `  <url>\n    <loc>${new URL(p, SITE_URL).href}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
