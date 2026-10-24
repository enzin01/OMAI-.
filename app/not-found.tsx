import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "Página não encontrada | OMAI" },
  description: "Esta página não está disponível. Volte ao início ou conheça os serviços de criação de sites da OMAI.",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return <SiteChrome><main className="section not-found-page">
    <p className="eyebrow">Página não encontrada</p>
    <h1>Não encontramos esta página.</h1>
    <p>Confira o endereço ou continue por um dos caminhos abaixo.</p>
    <div className="hero-actions">
      <Link className="button button-primary" href="/">Voltar ao início</Link>
      <Link className="button button-secondary" href="/servicos">Conhecer os serviços</Link>
    </div>
  </main></SiteChrome>;
}
