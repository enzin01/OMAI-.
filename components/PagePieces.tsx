import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "./site-data";

export function PageHero({
  eyebrow,
  title,
  text,
  cta = "Conversar pelo WhatsApp"
}: {
  eyebrow: string;
  title: string;
  text: string;
  cta?: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={19} aria-hidden="true" />
          {cta}
        </a>
      </div>
      <div className="page-hero-visual" aria-hidden="true">
        <Image src="/assets/digital-foundation-hero.png" alt="" fill priority fetchPriority="high" sizes="(max-width: 900px) 100vw, 45vw" />
        <div className="visual-badge badge-top">Mais clareza</div>
        <div className="visual-badge badge-bottom">Mais confiança</div>
        <div className="visual-ring" />
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function FinalCall() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="cta-content reveal">
        <p className="eyebrow">Próximo passo</p>
        <h2 id="final-title">Quer saber como isso ficaria para o seu negócio?</h2>
        <p>
          Chame a OMAI no WhatsApp. A conversa é simples, direta e sem
          compromisso.
        </p>
        <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={20} aria-hidden="true" />
          Chamar no WhatsApp
        </a>
        <p className="context-links">
          <Link href="/servicos">Conheça os serviços</Link>{" · "}
          <Link href="/como-funciona">Entenda o processo</Link>{" · "}
          <Link href="/contato">Fale com a OMAI</Link>
        </p>
      </div>
    </section>
  );
}

export function InternalLinkCard({
  href,
  title,
  text
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link className="link-card reveal" href={href}>
      <span>{title}</span>
      <p>{text}</p>
      <ArrowUpRight size={20} aria-hidden="true" />
    </Link>
  );
}
