import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://digitalfoundation.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OMAI | Sua empresa mais confiável online",
    template: "%s | OMAI"
  },
  description:
    "A OMAI cria sites claros, bonitos e confiáveis para empresas que querem atrair clientes, passar credibilidade e crescer.",
  keywords: [
    "OMAI",
    "site para empresas",
    "site profissional",
    "site para Instagram",
    "presença online",
    "credibilidade online",
    "atrair clientes",
    "site para pequenos negócios"
  ],
  authors: [{ name: "OMAI" }],
  creator: "OMAI",
  publisher: "OMAI",
  applicationName: "OMAI",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg"
  },
  openGraph: {
    title: "OMAI | Sua empresa mais confiável online",
    description:
      "Um site claro e premium para sua empresa passar confiança, atrair clientes e ser encontrada todos os dias.",
    url: siteUrl,
    siteName: "OMAI",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/digital-foundation-hero.png",
        width: 1920,
        height: 1080,
        alt: "Visual premium de infraestrutura digital da OMAI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "OMAI | Sua empresa mais confiável online",
    description:
      "Sites claros, bonitos e confiáveis para empresas que querem crescer."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0d",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
