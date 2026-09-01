import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const DEFAULT_SITE_URL =
  "https://tiago-oliveira-music.vercel.app";

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  DEFAULT_SITE_URL
).replace(/\/+$/, "");

const worksFile = path.join(
  root,
  "src",
  "data",
  "works.ts",
);

const publicFolder = path.join(root, "public");

const worksSource = fs.readFileSync(
  worksFile,
  "utf8",
);

const workSlugs = [
  ...worksSource.matchAll(
    /slug:\s*["'`]([^"'`]+)["'`]/g,
  ),
].map((match) => match[1]);

const staticRoutes = [
  "/",
  "/catalogo",
  "/flex-band",
  "/concert-band",
  "/marchas",
  "/marchas/rua",
  "/marchas/procissao",
  "/iniciacao-musical",
  "/clarinete-camara",
  "/vocal-concert-band",
  "/sobre",
  "/contacto",
];

const workRoutes = workSlugs.map(
  (slug) => `/obra/${slug}`,
);

const routes = [
  ...new Set([
    ...staticRoutes,
    ...workRoutes,
  ]),
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteUrl(route) {
  if (route === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${route}`;
}

const sitemapEntries = routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(
      absoluteUrl(route),
    )}</loc>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.mkdirSync(publicFolder, {
  recursive: true,
});

fs.writeFileSync(
  path.join(publicFolder, "sitemap.xml"),
  sitemap,
  "utf8",
);

fs.writeFileSync(
  path.join(publicFolder, "robots.txt"),
  robots,
  "utf8",
);

console.log(
  `SEO files generated for ${routes.length} URLs`,
);

console.log(`Sitemap: ${SITE_URL}/sitemap.xml`);
console.log(`Robots: ${SITE_URL}/robots.txt`);