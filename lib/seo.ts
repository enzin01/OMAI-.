import type { Metadata } from "next";
import site from "./site.json";

export { site };
export const canonicalUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;
export function getPage(path: string) {
  const page = site.pages.find((item) => item.path === path);
  if (!page) throw new Error(`Página sem configuração de SEO: ${path}`);
  return page;
}

export function pageMetadata(path: string): Metadata {
  const page = getPage(path);
  const title = `${page.title} | ${site.name}`;
  const url = canonicalUrl(path);
  const image = `${site.url}${"image" in page ? page.image : "/assets/compartilhar-omai.jpg"}`;
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: url },
    robots: {
      index: page.index,
      follow: true,
      googleBot: { index: page.index, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    },
    openGraph: {
      title, description: page.description, url, siteName: site.name,
      locale: site.locale, type: "website",
      images: [{ url: image, width: 1200, height: 630, type: "image/jpeg", alt: path === "/projetos" ? "OMAI — projetos e exemplos de sites profissionais" : "OMAI — criação de sites profissionais em preto e amarelo" }]
    },
    twitter: { card: "summary_large_image", title, description: page.description, images: [{ url: image, alt: "Apresentação de sites profissionais da OMAI" }] }
  };
}
