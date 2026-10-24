import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => readFileSync(path.join(root, file), "utf8");
const site = JSON.parse(read("lib/site.json"));
const urlFor = (route) => `${site.url}${route === "/" ? "" : route}`;
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
}
function tags(html, name) { return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((m) => attrs(m[0])); }
function localFile(url) {
  const p = new URL(url, site.url).pathname;
  if (p === "/") return "out/index.html";
  return ["out" + p, "out" + p + ".html", "out" + p + "/index.html"].find((file) => existsSync(path.join(root, file)));
}
const rendered = site.pages.map((page) => ({ page, html: read(page.path === "/" ? "out/index.html" : `out${page.path}.html`) }));
function jpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8);
  let offset = 2;
  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset++;
    const marker = buffer[offset++];
    const size = buffer.readUInt16BE(offset);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return [buffer.readUInt16BE(offset + 5), buffer.readUInt16BE(offset + 3)];
    offset += size;
  }
  throw new Error("JPEG sem dimensões.");
}

test("catálogo cobre todas as rotas reais e sitemap somente páginas indexáveis", () => {
  function scan(dir, prefix = "") {
    return readdirSync(dir, { withFileTypes: true }).flatMap((item) => item.isDirectory()
      ? scan(path.join(dir, item.name), `${prefix}/${item.name}`) : item.name === "page.tsx" ? [prefix || "/"] : []);
  }
  assert.deepEqual(scan(path.join(root, "app")).sort(), site.pages.map((p) => p.path).sort());
  const xml = read("public/sitemap.xml");
  assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(urls.sort(), site.pages.filter((p) => p.index).map((p) => urlFor(p.path)).sort());
  assert.equal(new Set(urls).size, urls.length);
  assert.equal((xml.match(/<url>/g) || []).length, urls.length);
  assert.equal((xml.match(/<\/url>/g) || []).length, urls.length);
  assert.match(read("public/robots.txt"), /User-agent: \*\nAllow: \/\n/);
  assert.match(read("public/robots.txt"), new RegExp(`Sitemap: ${site.url}/sitemap.xml`));
  assert.doesNotMatch(read("public/robots.txt"), /Disallow:\s*\//);
});

test("títulos e descrições únicos em português", () => {
  const titles = [], descriptions = [];
  for (const { page, html } of rendered) {
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const title = decode(head.match(/<title>([^<]+)<\/title>/)[1]);
    const meta = tags(head, "meta");
    const description = meta.find((m) => m.name === "description")?.content;
    assert.equal(title, `${page.title} | OMAI`, page.path);
    assert.equal(description, page.description, page.path);
    assert.match(html, /<html[^>]+lang="pt-BR"/);
    assert.equal(tags(head, "title").length, 1);
    titles.push(title); descriptions.push(description);
  }
  assert.equal(new Set(titles).size, rendered.length);
  assert.equal(new Set(descriptions).size, rendered.length);
});

test("canônica, robôs, conteúdo e sitemap concordam em cada página", () => {
  for (const { page, html } of rendered) {
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const canonical = tags(head, "link").filter((t) => t.rel === "canonical");
    assert.deepEqual(canonical.map((c) => c.href), [urlFor(page.path)]);
    const meta = tags(head, "meta");
    for (const name of ["robots", "googlebot"]) {
      const directives = meta.find((m) => m.name === name)?.content;
      assert.ok(directives?.includes("follow"));
      assert.equal(directives.includes("noindex"), !page.index);
      assert.doesNotMatch(directives, /nofollow|none/);
    }
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, page.path);
    const headings = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    for (let i = 1; i < headings.length; i++) assert.ok(headings[i] <= headings[i - 1] + 1, `Hierarquia: ${page.path}`);
    assert.doesNotMatch(html, /(?:src|href)="http:\/\//);
  }
});

test("JSON-LD válido, sem avaliações fictícias e sem entidades contraditórias", () => {
  for (const { page, html } of rendered) {
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1, page.path);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data["@context"], "https://schema.org");
    const graph = data["@graph"];
    assert.equal(new Set(graph.map((e) => e["@id"])).size, graph.length);
    const current = graph.find((e) => e["@id"] === `${urlFor(page.path)}#pagina`);
    assert.equal(current.url, urlFor(page.path));
    assert.equal(current.name, page.title);
    assert.equal(current.description, page.description);
    assert.equal(current.inLanguage, "pt-BR");
    assert.equal(graph.filter((e) => e["@type"] === "Organization").length, 1);
    assert.equal(graph.filter((e) => e["@type"] === "WebSite").length, 1);
    assert.equal(graph.some((e) => e["@type"] === "BreadcrumbList"), page.path !== "/");
    assert.ok(graph.every((e) => !["Review", "AggregateRating", "LocalBusiness", "Product"].includes(e["@type"])));
    const visible = decode(html.replace(/<script\b[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
    if (page.path === "/duvidas") for (const question of current.mainEntity) {
      assert.ok(visible.includes(question.name)); assert.ok(visible.includes(question.acceptedAnswer.text));
    }
    if (page.path === "/servicos") for (const service of graph.filter((e) => e["@type"] === "Service")) {
      assert.ok(visible.includes(service.name)); assert.ok(visible.includes(service.description));
    }
  }
});

test("prévias sociais localizadas com JPEG público de 1200 × 630", () => {
  for (const { page, html } of rendered) {
    const meta = tags(html.match(/<head>([\s\S]*?)<\/head>/)[1], "meta");
    const get = (key) => meta.find((m) => m.property === key || m.name === key)?.content;
    assert.equal(get("og:title"), `${page.title} | OMAI`);
    assert.equal(get("og:description"), page.description);
    assert.equal(get("og:url"), urlFor(page.path));
    assert.equal(get("og:locale"), "pt_BR");
    assert.equal(get("twitter:card"), "summary_large_image");
    assert.equal(get("twitter:title"), get("og:title"));
    assert.equal(get("twitter:description"), page.description);
    assert.ok(get("og:image:alt")); assert.ok(get("twitter:image:alt"));
    assert.ok(get("og:image").startsWith(site.url + "/assets/"));
    assert.equal(get("twitter:image"), get("og:image"));
    const file = localFile(get("og:image")); assert.ok(file);
    assert.deepEqual(jpegDimensions(readFileSync(path.join(root, file))), [1200, 630]);
  }
});

test("links internos, ícones, imagens e variantes referenciadas existem", () => {
  for (const { page, html } of rendered) {
    for (const tag of [...tags(html, "a"), ...tags(html, "img"), ...tags(html, "link")]) {
      const urls = [tag.href, tag.src, ...(tag.srcset || "").split(",").map((s) => s.trim().split(" ")[0])].filter(Boolean);
      for (const url of urls) {
        if (!url.startsWith("/") && !url.startsWith(site.url)) continue;
        assert.ok(localFile(url), `URL quebrada em ${page.path}: ${url}`);
      }
    }
    for (const image of tags(html, "img")) assert.ok("alt" in image, `Imagem sem alt em ${page.path}`);
    assert.match(html, /Navegação sem JavaScript/);
  }
  const hero = tags(rendered[0].html, "img").find((image) => image.class === "hero-image");
  const mainHeading = decode(rendered[0].html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g, ""));
  assert.equal(mainHeading, "Sua empresa precisa ser entendida em segundos.");
  assert.equal(hero.fetchpriority, "high"); assert.notEqual(hero.loading, "lazy");
  assert.match(hero.srcset, /640w/); assert.match(hero.srcset, /960w/); assert.match(hero.srcset, /1440w/);
  for (const name of ["google-review-icon-transparent.webp", "verified-review-icon-transparent.webp"]) {
    assert.ok(readFileSync(path.join(root, "public/assets", name)).length < 10000);
  }
});

test("404 em português, sem canônica da home, e redirecionamento do domínio duplicado", () => {
  const html = read("out/404.html");
  assert.match(html, /Não encontramos esta página/);
  assert.match(html, /noindex/);
  assert.equal(tags(html.match(/<head>([\s\S]*?)<\/head>/)[1], "link").filter((t) => t.rel === "canonical").length, 0);
  const config = JSON.parse(read("vercel.json"));
  const redirect = config.redirects.find((r) => r.has?.some((h) => h.type === "host" && h.value === "digital-foundation-beryl.vercel.app"));
  assert.equal(redirect.destination, `${site.url}/:path*`); assert.equal(redirect.permanent, true);
});
