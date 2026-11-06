// @ts-check
import { defineConfig } from "astro/config";

// Static build for GitHub Pages with the custom domain aivectrix.com.
// Because the site is served from the domain root, no `base` is needed.
export default defineConfig({
  site: "https://aivectrix.com",
  output: "static",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "always",
  },
  devToolbar: { enabled: false },
});
