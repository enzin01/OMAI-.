import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import { FinalCall, InternalLinkCard, PageHero, SectionIntro } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";

const changes = [
  {
    title: "O cliente para de depender só do improviso",
    text: "Em vez de responder sempre as mesmas dúvidas no direct, seu site já explica o essencial e leva a pessoa para o contato certo."
  },
  {
    title: "Sua empresa parece mais preparada",
    text: "Uma apresentação bem cuidada passa a sensação de organização, seriedade e profissionalismo."
  },
  {
    title: "Você ganha um endereço oficial",
    text: "Redes sociais mudam o tempo todo. O site é a base onde sua empresa pode ser encontrada com clareza."
  },
  {
    title: "A decisão do cliente fica mais fácil",
    text: "Quando a pessoa entende o que você faz, vê motivos para confiar e encontra um botão de contato, ela avança."
  }
];

export const metadata = pageMetadata("/por-que-ter-um-site");

export default function WhyPage() {
  return (
    <SiteChrome>
      <main>
        <PageSeo path="/por-que-ter-um-site" />
        <PageHero
          eyebrow="Por que ter um site"
          title="Porque confiança começa antes da primeira conversa."
          text="Quando alguém conhece sua empresa pelo Instagram, indicação ou pesquisa, ela precisa encontrar uma resposta rápida: essa empresa é séria?"
          cta="Quero passar mais confiança"
        />

        <section className="section why-change-section">
          <SectionIntro
            eyebrow="O que muda"
            title="Um bom site tira dúvidas, valoriza sua marca e aproxima o cliente."
          />
          <div className="statement-grid">
            {changes.map((item, index) => (
              <article className="statement-card reveal" key={item.title} style={{ transitionDelay: `${index * 70}ms` }}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contrast-section">
          <div className="contrast-card reveal">
            <span>Sem uma boa presença online</span>
            <p>O cliente fica em dúvida, precisa perguntar tudo e pode escolher quem parece mais confiável.</p>
          </div>
          <div className="contrast-card strong reveal">
            <span>Com um site bem apresentado</span>
            <p>Ele entende seu valor, sente segurança e encontra um caminho claro para chamar você.</p>
          </div>
        </section>

        <section className="section route-section">
          <SectionIntro eyebrow="Continue" title="Veja como colocamos isso em prática." />
          <div className="mini-route-grid">
            <InternalLinkCard href="/servicos" title="Serviços" text="Entenda o que pode ser feito para sua empresa." />
            <InternalLinkCard href="/como-funciona" title="Como funciona" text="Veja o processo simples, do começo à entrega." />
          </div>
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
