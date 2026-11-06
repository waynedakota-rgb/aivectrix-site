// Renders raster brand assets (social image, PNG icons) from the SVG sources.
// Usage: node tools/render-assets.cjs   (requires Playwright + Chromium)
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const pub = path.join(__dirname, "..", "public");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto("file://" + path.join(__dirname, "og.html"));
  await p.waitForTimeout(400);
  await p.locator(".og").screenshot({ path: path.join(pub, "og-image.png") });
  const svg = fs.readFileSync(path.join(pub, "favicon.svg"), "utf8");
  for (const [name, size, pad] of [["apple-touch-icon.png", 180, true], ["icon-192.png", 192, false], ["icon-512.png", 512, false], ["favicon-32.png", 32, false]]) {
    const html = `<html><body style="margin:0;background:transparent">${pad ? `<div style="width:${size}px;height:${size}px;background:#151819">` : "<div>"}${svg.replace("<svg ", `<svg width="${size}" height="${size}" `).replace(pad ? 'rx="12"' : "§", 'rx="0"')}</div></body></html>`;
    await p.setViewportSize({ width: size, height: size });
    await p.setContent(html);
    await p.screenshot({ path: path.join(pub, name), omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  }
  await b.close();
})();
