import { MessageCircle } from "lucide-react";
import { FinalCall, PageHero, SectionIntro } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";
import { whatsappUrl } from "@/components/site-data";

export default function ContactPage() {
  return (
    <SiteChrome>
      <main>
        <PageHero
          eyebrow="Contato"
          title="Vamos entender o que seu negócio precisa para parecer mais confiável online."
          text="A conversa começa pelo WhatsApp. Você explica sua empresa, e nós mostramos o melhor caminho de forma simples."
          cta="Chamar agora"
        />

        <section className="section contact-panel-section">
          <SectionIntro
            eyebrow="WhatsApp"
            title="Clique, envie a mensagem pronta e comece sem complicação."
            text="Número oficial: 1199551-2411."
          />
          <a className="big-contact-card reveal" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={34} aria-hidden="true" />
            <span>Falar com a OMAI</span>
            <strong>Mensagem automática pronta</strong>
          </a>
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
