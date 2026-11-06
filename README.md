# AIVectrix website

Single-page site for **AIVectrix** at https://aivectrix.com. Static Astro build, hosted on GitHub Pages.

## Editing the words

All copy lives in `src/content/site.ts`. Change text there, commit, and the site redeploys. You don't need to touch layout or animation code.

Keep the factual boundaries noted at the top of that file: founder experience is employment history, not client work. The current employer stays anonymous.

## Adding the founder headshot

1. Save the photo as `public/images/dakota-wayne.webp` (4:5 portrait, at least 800 × 1000 px, ideally under 150 KB).
2. In `src/content/site.ts`, set `headshot: "/images/dakota-wayne.webp"`.
3. Commit and push.

Until then the Founder section shows a designed "DW" monogram panel. Nothing looks broken.

## Local development

Requires Node.js 22.23.4 or newer.

```bash
npm ci          # install exact locked versions
npm run dev     # local dev server at http://localhost:4321
npm run build   # production build into dist/
npm run preview # serve the production build
npm run check   # type-check and build
```

## Project structure

```
.github/workflows/deploy.yml   GitHub Pages build + deploy on push to main
public/
  CNAME                        aivectrix.com
  brand/                       logo, wordmark, symbol (light + dark SVG)
  fonts/                       self-hosted Manrope + Inter WOFF2 and OFL licenses
  favicon.svg, favicon.ico, apple-touch-icon.png, icon-192/512.png
  og-image.png                 1200 × 630 social sharing image
  robots.txt, sitemap.xml, site.webmanifest
src/
  content/site.ts              ALL editable copy, email, links
  components/                  Header, Hero, AlignmentVisual, Invitation, Approach,
                               Capabilities, CapabilityRow, AIFeature, Experience,
                               ExperienceEntry, Founder, Contact, Footer, Button, Logo
  layouts/Base.astro           <head>, SEO, Open Graph, structured data
  pages/index.astro            the page
  pages/404.astro              not-found page
  scripts/alignment.ts         geometry for the hero "alignment system" visual
  scripts/main.ts              header, mobile menu, reveals, animation, copy email
  styles/global.css            color tokens, type scale, base styles
tools/                         one-off scripts to re-render og-image and PNG icons
```

## GitHub Pages setup (one time)

1. Push this project to the `main` branch of a GitHub repository.
2. Repository **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
3. The "Deploy to GitHub Pages" workflow runs on every push to `main`.
4. **Settings → Pages → Custom domain**: enter `aivectrix.com` and save. (The `public/CNAME` file also declares it.)
5. After DNS is working and the certificate is issued, tick **Enforce HTTPS**.

GitHub Pages on a free account requires a **public** repository.

## Custom domain DNS

Set these at the domain registrar for `aivectrix.com`. Values are GitHub's published Pages addresses (docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Re-check that page before entering them; they were not verified live from this build environment.

| Type  | Host  | Value                     |
| ----- | ----- | ------------------------- |
| A     | @     | 185.199.108.153           |
| A     | @     | 185.199.109.153           |
| A     | @     | 185.199.110.153           |
| A     | @     | 185.199.111.153           |
| AAAA  | @     | 2606:50c0:8000::153       |
| AAAA  | @     | 2606:50c0:8001::153       |
| AAAA  | @     | 2606:50c0:8002::153       |
| AAAA  | @     | 2606:50c0:8003::153       |
| CNAME | www   | `<github-username>.github.io` |

Remove any old A, AAAA, ALIAS or "parking" records on `@` first. Optionally verify the domain in GitHub account settings (Settings → Pages → Add a domain), which gives a TXT record to add.

## Brand assets

- `public/brand/aivectrix-logo-{dark,light}.svg`: symbol + wordmark. "dark" is for ivory backgrounds, "light" for charcoal.
- `public/brand/aivectrix-symbol-*.svg`, `aivectrix-wordmark-*.svg`: separate pieces.
- `public/favicon.svg`: symbol on a charcoal tile.

The wordmark is outlined from Manrope Bold (SIL Open Font License 1.1). The "AI" is set in copper so it can't be misread as "Al". This is an original mark; no trademark search or registration has been done.

To re-render the PNGs after a brand change: `node tools/render-assets.cjs` (needs Playwright and Chromium installed locally). Then re-create `favicon.ico` from a 32 px PNG.

## Color and contrast

Tokens live in `src/styles/global.css`. Measured contrast (WCAG relative luminance):

- Body `#343B3D` on ivory: 10.2:1. Secondary `#586163` on ivory: 5.7:1.
- Secondary `#BDC3C2` on charcoal: 10.0:1. Light copper `#D9AA85` on charcoal: 8.5:1.
- Copper `#B8794F` on ivory is 3.2:1, so it's used only for rules, dots and large display text.
- Small copper-toned labels on ivory use a derived "copper ink" `#8B5A3A` (5.2:1).

## Privacy

No analytics, cookies, trackers, forms, or third-party embeds. Contact is a plain `mailto:` link.
