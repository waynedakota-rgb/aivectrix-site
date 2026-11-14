import type { APIRoute } from "astro";
import { SITE_URL, DEFINITION, EMAIL, LINKEDIN, services, founder, AREA_SERVED } from "../content/site";

// llms.txt (https://llmstxt.org): a plain-text summary for AI assistants.
// Built from the same content as the pages, so it can't drift.
export const GET: APIRoute = () => {
  const abs = (p: string) => new URL(p, SITE_URL).href;
  const lines = [
    "# Vectrix",
    "",
    `> ${DEFINITION}`,
    "",
    `Vectrix serves business owners, entrepreneurs, and leaders in ${AREA_SERVED}. It is currently a one-person practice run by founder ${founder.name}. Credentials: ${founder.credentials.map((c) => c.text).join("; ")}. Contact: ${EMAIL}.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.h1}](${abs(`/${s.slug}/`)}): ${s.description}`),
    "",
    "## About",
    "",
    `- [About Dakota Wayne](${abs("/about/")}): background, credentials, and employment history (employers are not Vectrix clients).`,
    `- [Dakota Wayne on LinkedIn](${LINKEDIN})`,
    "",
    "## Optional",
    "",
    `- [Home](${SITE_URL})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
