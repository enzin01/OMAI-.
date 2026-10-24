import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bolt, MessageCircle, Target, TrendingUp, UsersRound, Zap } from "lucide-react";
import { FinalCall } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { homeBenefits, whatsappUrl, whyCards } from "@/components/site-data";

const testimonials = [
  {
    name: "MARINA COSTA",
    text: "Antes eu explicava tudo pelo direct. Depois do site, as pessoas chegam perguntando valores e horários com muito mais segurança..."
  },
  {
    name: "RAFAEL ANDRADE",
    text: "A OMAI deixou minha empresa com uma presença muito mais profissional. O cliente entende rápido o que eu faço..."
  },
  {
    name: "BIANCA MARTINS",
    text: "O site virou meu cartão de visita principal. Ficou bonito, claro e passa confiança antes mesmo da primeira conversa..."
  },
  {
    name: "LUCAS FERREIRA",
    text: "Eu precisava de algo simples para colocar na bio, mas com aparência forte. Agora o WhatsApp recebe contatos mais preparados..."
  },
  {
    name: "CLÍNICA ALVORADA",
    text: "Ficou muito mais fácil mostrar confiança. A pessoa entra, entende o serviço e já sabe exatamente como chamar no WhatsApp..."
  },
  {
    name: "DANTE TESTA",
    text: "Visual limpo, mensagem clara e sensação de empresa séria. Era exatamente o que eu precisava para apresentar meu negócio..."
  }
];

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <SiteChrome>
      <main id="top">
        <PageSeo path="/" />
        <section className="hero short-hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/assets/digital-foundation-hero.png"
            alt="Presença digital premium para empresas"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-content compact">
            <h1 id="hero-title" className="hero-title">
              <span>Sua empresa</span>{" "}
              <span>precisa ser</span>{" "}
              <span>entendida em</span>{" "}
              <span>segundos.</span>
            </h1>
            <p className="hero-subtitle">
              A OMAI cria uma presença online simples de entender,
              bonita de ver e fácil de confiar. A pessoa entra, entende seu valor
              e sabe exatamente como chamar você.
            </p>
            <div className="hero-actions" aria-label="Ações principais">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={19} aria-hidden="true" />
                Quero meu site
              </a>
              <Link className="button button-secondary" href="/por-que-ter-um-site">
                Ver como funciona
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hero-showcase" aria-hidden="true">
            <span className="energy-line energy-line-one" />
            <span className="energy-line energy-line-two" />
            <span className="energy-line energy-line-three" />

            <div className="showcase-chip chip-strategy">
              <Target size={24} />
              <span>Estrat&eacute;gia</span>
            </div>
            <div className="showcase-chip chip-growth">
              <TrendingUp size={24} />
              <span>Crescimento</span>
            </div>
            <div className="showcase-chip chip-connection">
              <UsersRound size={24} />
              <span>Conex&atilde;o</span>
            </div>
            <div className="showcase-chip chip-performance">
              <Zap size={24} />
              <span>Performance</span>
            </div>

            <div className="showcase-panel">
              <div className="panel-top">
                <span>Sua marca</span>
                <i />
                <i />
                <i />
              </div>
              <div className="panel-body">
                <div className="panel-copy">
                  <strong>Solu&ccedil;&otilde;es que impulsionam o seu neg&oacute;cio.</strong>
                  <span>Fale conosco</span>
                </div>
                <div className="panel-visual">
                  <span className="mountain mountain-a" />
                  <span className="mountain mountain-b" />
                  <span className="mountain-glow" />
                </div>
              </div>
              <div className="panel-metrics">
                <span>Design estrat&eacute;gico</span>
                <span>Experi&ecirc;ncia clara</span>
                <span>Resultado real</span>
              </div>
            </div>

            <div className="showcase-phone">
              <div className="phone-mini-top">
                <span>Sua marca</span>
                <i />
              </div>
              <strong>Presen&ccedil;a que gera confian&ccedil;a.</strong>
              <span className="phone-mini-cta">Fale conosco</span>
              <small>Mais visibilidade</small>
              <div className="phone-mini-chart">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="showcase-spark">
              <Bolt size={18} />
            </div>
          </div>

        </section>

        <section className="experience-lab-section" aria-labelledby="experience-title">
          <div className="experience-lab-copy reveal">
            <p className="eyebrow">Do primeiro olhar ao contato</p>
            <h2 id="experience-title">
              Cada <span className="headline-accent">segundo</span> precisa{" "}
              <span className="headline-accent">aproximar</span> o cliente da{" "}
              <span className="headline-accent">decisão.</span>
            </h2>
            <p>
              O site conduz a atenção com clareza, confiança e desejo. Nada fica solto:
              cada bloco existe para a pessoa entender melhor e chamar com mais segurança.
            </p>
          </div>
          <div className="experience-tiles" aria-label="Como a experiência guia o visitante">
            <article className="experience-tile reveal">
              <span>Percepção</span>
              <strong>Sua empresa parece mais preparada.</strong>
            </article>
            <article className="experience-tile reveal">
              <span>Clareza</span>
              <strong>A pessoa entende sem esforço.</strong>
            </article>
            <article className="experience-tile reveal">
              <span>Confiança</span>
              <strong>A dúvida vira segurança para chamar.</strong>
            </article>
            <article className="experience-tile reveal">
              <span>Ação</span>
              <strong>O caminho até o WhatsApp fica natural.</strong>
            </article>
          </div>
        </section>

        <section className="section first-answer">
          <div className="section-heading reveal visual-reference-heading">
            <p className="eyebrow">O ponto principal</p>
            <h2>
              Um <span>bom site</span> tira <span>dúvidas</span> antes que elas virem <span>desistência</span>.
            </h2>
            <p>
              A maioria das pessoas pesquisa antes de chamar. Seu site precisa responder rápido:
              quem é você, o que oferece, por que confiar e como entrar em contato.
            </p>
          </div>
          <div className="benefit-grid visual-reference-cards">
            {homeBenefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="benefit-card reveal" key={item.title} style={{ transitionDelay: `${index * 80}ms` }}>
                  <Icon size={26} aria-hidden="true" />
                  {index === 1 ? <MessageCircle className="benefit-whatsapp-cue" size={20} aria-hidden="true" /> : null}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {index === 1 ? <span className="card-progress" aria-hidden="true" /> : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="section question-section">
          <div className="section-heading reveal visual-reference-heading">
            <p className="eyebrow">Dúvidas reais</p>
            <h2>O site não é só bonito. Ele organiza a decisão do cliente.</h2>
          </div>
          <div className="answer-grid visual-reference-cards">
            {whyCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="answer-card reveal" key={item.question} style={{ transitionDelay: `${index * 80}ms` }}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                  <span className="card-progress" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="section testimonials-section" aria-labelledby="testimonials-title">
          <div className="testimonials-heading reveal">
            <p className="eyebrow">Depoimentos</p>
            <h2 id="testimonials-title">O que negócios como o seu podem sentir quando a presença digital fica clara.</h2>
          </div>
          <p className="testimonial-note">Depoimentos ilustrativos: nomes e situações fictícios.</p>
          <TestimonialCarousel testimonials={testimonials} />
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
