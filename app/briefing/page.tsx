import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { BriefingForm } from "./BriefingForm";

export const metadata: Metadata = {
  title: "Briefing para site personalizado",
  description:
    "Formulario completo de briefing da OMAI para criar sites personalizados com estrategia, identidade, conteudo e funcionalidades bem definidos.",
  alternates: {
    canonical: "/briefing"
  }
};

export default function BriefingPage() {
  return (
    <SiteChrome>
      <main className="briefing-page" id="top">
        <BriefingForm />
      </main>
    </SiteChrome>
  );
}
