import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/PageSeo";
import Image from "next/image";
import { FinalCall, PageHero, SectionIntro } from "@/components/PagePieces";
import { SiteChrome } from "@/components/SiteChrome";
import { projects } from "@/components/site-data";

export const metadata = pageMetadata("/projetos");

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <main>
        <PageSeo path="/projetos" />
        <PageHero
          eyebrow="Projetos"
          title="O visual certo muda a forma como o cliente enxerga sua empresa."
          text="Não é sobre enfeitar. É sobre fazer sua marca parecer preparada, organizada e digna de confiança."
          cta="Quero esse nível para minha marca"
        />

        <section className="section portfolio-section">
          <SectionIntro
            eyebrow="Transformações"
            title="Exemplos de como uma presença melhor muda a percepção."
          />
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <article className="project-card reveal" key={project.title} style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="project-image">
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="project-content">
                  <span>{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section comparison-section">
          <SectionIntro
            eyebrow="Antes e depois"
            title="A mesma empresa pode parecer comum ou memorável."
            text="Quando a apresentação melhora, o cliente entende melhor, confia mais e tem menos resistência para chamar."
          />
          <div className="comparison-static reveal">
            <div>
              <Image src="/assets/before.png" alt="Antes: presença online pouco clara" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <span>Antes</span>
            </div>
            <div>
              <Image src="/assets/after.png" alt="Depois: presença online premium" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <span>Depois</span>
            </div>
          </div>
        </section>

        <FinalCall />
      </main>
    </SiteChrome>
  );
}
