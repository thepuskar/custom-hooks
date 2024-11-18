const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  basePath: "/custom-hooks",
  assetPrefix: "/custom-hooks",
  images: {
    unoptimized: true, // Necessary for GitHub Pages
  },
});
