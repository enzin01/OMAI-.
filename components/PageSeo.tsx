import { canonicalUrl, getPage, site } from "@/lib/seo";
import { faqItems, services } from "./site-data";

export function PageSeo({ path }: { path: string }) {
  const page = getPage(path);
  const url = canonicalUrl(path);
  const organizationId = `${site.url}/#organizacao`;
  const websiteId = `${site.url}/#site`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization", "@id": organizationId,
      name: site.name, url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/apple-touch-icon.png`, width: 180, height: 180, caption: "Logo da OMAI" },
      telephone: site.telephone
    },
    {
      "@type": "WebSite", "@id": websiteId, url: site.url, name: site.name,
      inLanguage: site.language, publisher: { "@id": organizationId }
    },
    {
      "@type": page.type, "@id": `${url}#pagina`, url, name: page.title,
      description: page.description, inLanguage: site.language,
      isPartOf: { "@id": websiteId }, about: { "@id": organizationId },
      ...(path !== "/" ? { breadcrumb: { "@id": `${url}#caminho` } } : {}),
      ...(path === "/duvidas" ? { mainEntity: faqItems.map((faq) => ({
        "@type": "Question", name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      })) } : {})
    }
  ];
  if (path !== "/") graph.push({
    "@type": "BreadcrumbList", "@id": `${url}#caminho`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: page.label, item: url }
    ]
  });
  if (path === "/servicos") graph.push(...services.map((service, index) => ({
    "@type": "Service", "@id": `${url}#servico-${index + 1}`,
    name: service.title, description: `${service.text} ${service.details}`,
    provider: { "@id": organizationId }, url
  })));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
