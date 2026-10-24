import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import { FinalCall, PageHero, SectionIntro } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";
import { faqItems } from "@/components/site-data";

export const metadata = pageMetadata("/duvidas");

export default function QuestionsPage() {
  return (
    <SiteChrome>
      <main>
        <PageSeo path="/duvidas" />
        <PageHero
          eyebrow="Dúvidas"
          title="Perguntas que todo dono de negócio faz antes de investir em um site."
          text="As respostas aqui são diretas, sem complicação e pensadas para quem quer entender o valor antes de decidir."
          cta="Tirar minha dúvida no WhatsApp"
        />

        <section className="section faq-section">
          <SectionIntro
            eyebrow="Respostas claras"
            title="O que você precisa saber antes de começar."
          />
          <div className="faq-list">
            {faqItems.map((faq) => (
              <details className="faq-item reveal" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
