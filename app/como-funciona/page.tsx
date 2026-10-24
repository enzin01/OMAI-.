import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import { FinalCall, PageHero, SectionIntro } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";
import { processSteps } from "@/components/site-data";

export const metadata = pageMetadata("/como-funciona");

export default function ProcessPage() {
  return (
    <SiteChrome>
      <main>
        <PageSeo path="/como-funciona" />
        <PageHero
          eyebrow="Como funciona"
          title="Um processo simples para tirar sua presença digital do improviso."
          text="Você não precisa chegar com tudo pronto. A gente organiza as ideias, entende o que importa e transforma isso em uma experiência clara para seus clientes."
          cta="Começar pelo WhatsApp"
        />

        <section className="section process-section">
          <SectionIntro
            eyebrow="Passo a passo"
            title="Do primeiro papo ao site pronto para divulgar."
          />
          <div className="timeline">
            {processSteps.map((item, index) => (
              <article className="timeline-item reveal" key={item.step} style={{ transitionDelay: `${index * 70}ms` }}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section promise-section">
          <SectionIntro
            eyebrow="Tranquilidade"
            title="Você acompanha tudo de forma clara, sem precisar entender termos difíceis."
            text="A prioridade é fazer seu negócio ser compreendido e valorizado por quem chega até você."
          />
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
