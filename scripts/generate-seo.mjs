import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const site = JSON.parse(await readFile(new URL("lib/site.json", root), "utf8"));
async function routes(dir, prefix = "") {
  const found = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.isDirectory()) found.push(...await routes(path.join(dir, item.name), `${prefix}/${item.name}`));
    else if (item.name === "page.tsx") found.push(prefix || "/");
  }
  return found.sort();
}
const actual = await routes(fileURLToPath(new URL("app/", root)));
const declared = site.pages.map((page) => page.path).sort();
if (JSON.stringify(actual) !== JSON.stringify(declared)) throw new Error("As rotas e o catálogo de SEO não coincidem. Atualize lib/site.json.");
if (!/^https:\/\/[^/]+$/.test(site.url)) throw new Error("O domínio canônico deve usar HTTPS e não ter barra final.");
const urls = site.pages.filter((page) => page.index).map((page) => `${site.url}${page.path === "/" ? "" : page.path}`);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(new URL("public/sitemap.xml", root), xml);
// O briefing é rastreável para que os robôs possam ler o noindex da página.
await writeFile(new URL("public/robots.txt", root), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`SEO: robots.txt e sitemap.xml gerados para ${urls.length} páginas indexáveis.`);
