import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import { FinalCall, PageHero, SectionIntro } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";
import { services } from "@/components/site-data";

export const metadata = pageMetadata("/servicos");

export default function ServicesPage() {
  return (
    <SiteChrome>
      <main>
        <PageSeo path="/servicos" />
        <PageHero
          eyebrow="Serviços"
          title="Sua empresa precisa ser fácil de entender e fácil de contratar."
          text="A OMAI cria uma presença online clara, bonita e convincente para que o cliente perceba valor antes mesmo de chamar."
          cta="Quero entender o melhor caminho"
        />

        <section className="section services-intro-section">
          <SectionIntro
            eyebrow="O que fazemos"
            title="Primeiro explicamos o porquê. Depois mostramos o caminho."
            text="Cada serviço existe para resolver uma dúvida comum do cliente: posso confiar? Essa empresa resolve meu problema? Como faço para falar?"
          />
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="service-card reveal" key={service.title} style={{ transitionDelay: `${index * 80}ms` }}>
                  <Icon size={28} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <strong>{service.details}</strong>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section promise-section">
          <SectionIntro
            eyebrow="Sem complicação"
            title="Você não precisa saber termos difíceis para ter um site bom."
            text="A conversa é sobre seu negócio, seus clientes e o resultado que você quer. A parte difícil fica por nossa conta."
          />
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
