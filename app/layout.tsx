import type { Metadata, Viewport } from "next";
import { site } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "OMAI | Criação de sites profissionais", template: "%s | OMAI" },
  description: "Sites claros, bonitos e confiáveis para empresas que querem apresentar seus serviços e facilitar o contato dos clientes.",
  authors: [{ name: site.name }], creator: site.name, publisher: site.name,
  applicationName: site.name, manifest: "/site.webmanifest",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/apple-touch-icon.png" }
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, themeColor: "#0b0b0d", colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
