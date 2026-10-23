"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { navItems, whatsappUrl } from "./site-data";

const particles = Array.from({ length: 34 }, (_, index) => index);
const ribbons = Array.from({ length: 5 }, (_, index) => index);

function WhatsAppMark() {
  return (
    <svg className="whatsapp-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9.56 24.36 5 25.66l1.34-4.38a11.28 11.28 0 1 1 3.22 3.08Z" />
      <path d="M12.2 10.52c-.28-.62-.58-.63-.84-.64h-.72c-.25 0-.66.1-1 .47-.34.38-1.31 1.28-1.31 3.12s1.34 3.62 1.52 3.87c.19.25 2.58 4.13 6.39 5.63 3.16 1.24 3.81.99 4.5.93.69-.06 2.23-.91 2.55-1.79.31-.88.31-1.63.22-1.79-.1-.16-.35-.25-.72-.44-.38-.19-2.23-1.1-2.58-1.23-.34-.12-.59-.18-.84.19-.25.38-.97 1.23-1.19 1.48-.22.25-.44.28-.81.1-.38-.2-1.59-.59-3.03-1.87-1.12-1-1.88-2.23-2.1-2.6-.22-.38-.02-.58.16-.77.17-.17.38-.44.57-.66.18-.22.25-.38.38-.63.12-.25.06-.47-.03-.66-.1-.19-.83-2.04-1.18-2.71Z" />
    </svg>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateSpotlight = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX / window.innerWidth}`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY / window.innerHeight}`);

      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest<HTMLElement>(
        ".benefit-card, .answer-card, .service-card, .route-card, .statement-card, .link-card, .project-card, .timeline-item, .faq-item, .big-contact-card, .story-panel, .focus-phone, .experience-tile"
      );

      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
      }
    };

    window.addEventListener("pointermove", updateSpotlight, { passive: true });
    return () => window.removeEventListener("pointermove", updateSpotlight);
  }, []);

  useEffect(() => {
    let frame = 0;
    let previousScroll = window.scrollY;

    const updateScroll = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentScroll = window.scrollY;
      const progress = currentScroll / maxScroll;
      const velocity = Math.max(-1, Math.min(1, (currentScroll - previousScroll) / 80));

      document.documentElement.style.setProperty("--scroll-px", `${currentScroll}px`);
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
      document.documentElement.style.setProperty("--scroll-velocity", `${velocity}`);
      previousScroll = currentScroll;
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-surface surface-one" />
        <span className="ambient-surface surface-two" />
        <span className="ambient-surface surface-three" />
        <div className="kinetic-ribbons">
          {ribbons.map((item) => (
            <span key={item} style={{ "--r": item } as CSSProperties} />
          ))}
        </div>
        <div className="particle-field">
          {particles.map((item) => (
            <i key={item} style={{ "--p": item } as CSSProperties} />
          ))}
        </div>
        <span className="scroll-aurora" />
      </div>

      <header className="site-header" aria-label="Menu principal">
        <Link className="brand" href="/" aria-label="OMAI">
          <span className="brand-logo-wrap" aria-hidden="true">
            <Image
              className="brand-logo"
              src="/assets/digital-foundation-logo-mark.png"
              alt=""
              width={174}
              height={104}
              priority
            />
          </span>
          <span>OMAI</span>
        </Link>

        <span className="mobile-brand-promise">Criamos sites profissionais</span>

        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Navegação">
          {navItems.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18} aria-hidden="true" />
          Pedir orçamento
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="page-shell" key={pathname}>
        {children}
      </div>

      <a
        className="whatsapp-float"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chamar no WhatsApp"
      >
        <WhatsAppMark />
      </a>
    </>
  );
}
