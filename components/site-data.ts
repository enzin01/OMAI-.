import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Eye,
  HelpCircle,
  Home,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp
} from "lucide-react";

export const whatsappText =
  "Olá, vim pelo site da OMAI e quero entender como um site pode ajudar meu negócio.";

export const whatsappUrl = `https://wa.me/5511995512411?text=${encodeURIComponent(
  whatsappText
)}`;

export const navItems = [
  { label: "Início", href: "/" },
  { label: "Por que ter um site", href: "/por-que-ter-um-site" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Briefing", href: "/briefing" },
  { label: "Dúvidas", href: "/duvidas" },
  { label: "Contato", href: "/contato" }
];

export const homeBenefits = [
  {
    icon: ShieldCheck,
    title: "Mais confiança",
    text: "O cliente entende rápido e decide com mais segurança."
  },
  {
    icon: Clock3,
    title: "Atendimento 24h",
    text: "Seu site apresenta tudo e leva ao WhatsApp a qualquer hora."
  },
  {
    icon: TrendingUp,
    title: "Mais oportunidades",
    text: "Curiosidade vira conversa, orçamento e novos negócios."
  }
];

export const whyCards = [
  {
    icon: Eye,
    question: "Por que eu preciso disso?",
    answer:
      "Porque antes de comprar, o cliente pesquisa. Se ele não encontra nada claro sobre sua empresa, ele pode escolher outra opção."
  },
  {
    icon: Star,
    question: "O que muda no meu negócio?",
    answer:
      "Sua empresa passa a parecer mais séria, mais preparada e mais fácil de contratar."
  },
  {
    icon: MessageCircle,
    question: "Como isso ajuda nas vendas?",
    answer:
      "O site tira dúvidas, mostra valor e leva a pessoa para chamar no WhatsApp com mais segurança."
  }
];

export const services = [
  {
    icon: Home,
    title: "Site de apresentação",
    text: "Para sua empresa ter uma presença clara, bonita e confiável na internet.",
    details:
      "Ideal para negócios que querem explicar quem são, o que fazem e por que merecem a confiança do cliente."
  },
  {
    icon: BriefcaseBusiness,
    title: "Página para vender melhor",
    text: "Para apresentar um serviço, produto ou oferta de forma direta e convincente.",
    details:
      "A pessoa entende o valor, vê motivos para confiar e encontra um caminho simples para pedir orçamento."
  },
  {
    icon: Sparkles,
    title: "Melhoria da imagem digital",
    text: "Para deixar sua marca mais profissional em todos os pontos de contato.",
    details:
      "Organizamos a mensagem, o visual e os próximos passos para o cliente sentir segurança desde o primeiro clique."
  }
];

export const projects = [
  {
    image: "/assets/project-commerce.png",
    title: "Negócio local mais confiável",
    tag: "Antes: pouca clareza. Depois: apresentação profissional.",
    text: "A empresa passou a explicar melhor seus serviços e receber contatos mais preparados."
  },
  {
    image: "/assets/project-saas.png",
    title: "Serviço explicado com simplicidade",
    tag: "Antes: difícil entender. Depois: valor claro.",
    text: "A comunicação ficou mais direta, com menos dúvidas antes do primeiro atendimento."
  },
  {
    image: "/assets/project-brand.png",
    title: "Marca com presença de alto padrão",
    tag: "Antes: visual comum. Depois: percepção premium.",
    text: "A primeira impressão ficou mais forte, aumentando confiança e interesse."
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Conversa inicial",
    text: "Entendemos seu negócio, seus clientes e o que você quer que as pessoas sintam ao conhecer sua empresa."
  },
  {
    step: "02",
    title: "Clareza da mensagem",
    text: "Organizamos as ideias para explicar seu valor de um jeito simples, direto e convincente."
  },
  {
    step: "03",
    title: "Visual de confiança",
    text: "Criamos uma aparência premium, com contraste, impacto e cuidado nos detalhes."
  },
  {
    step: "04",
    title: "Página pronta para receber clientes",
    text: "Montamos tudo para a pessoa navegar sem se perder e chegar facilmente ao WhatsApp."
  },
  {
    step: "05",
    title: "Entrega e próximos passos",
    text: "Você recebe o site pronto para usar, divulgar e colocar na bio, com orientação simples para seguir."
  }
];

export const faqItems = [
  {
    question: "Eu realmente preciso de um site se já tenho Instagram?",
    answer:
      "Sim. O Instagram ajuda a chamar atenção, mas o site passa mais confiança, organiza suas informações e funciona como uma base oficial da sua empresa."
  },
  {
    question: "Meu cliente vai entender rápido o que eu faço?",
    answer:
      "Essa é a ideia. O site é pensado para explicar seu negócio em poucos segundos, com textos simples e caminhos claros."
  },
  {
    question: "O site ajuda mesmo a trazer clientes?",
    answer:
      "Ele ajuda a transformar interesse em contato. Quando a pessoa entende seu valor e sente confiança, ela tem mais motivo para chamar."
  },
  {
    question: "Eu vou precisar entender algo complicado?",
    answer:
      "Não. Você precisa entender seu negócio. A parte complicada fica por nossa conta, e você recebe tudo explicado de forma simples."
  },
  {
    question: "Posso colocar o link na bio do Instagram?",
    answer:
      "Sim. O site foi pensado para funcionar muito bem no celular e levar o visitante rapidamente para o WhatsApp."
  }
];

export const pageLinks = [
  {
    icon: HelpCircle,
    title: "Entenda por que vale a pena",
    text: "Veja como um site muda a percepção do cliente.",
    href: "/por-que-ter-um-site"
  },
  {
    icon: ArrowRight,
    title: "Conheça os serviços",
    text: "Escolha o tipo de presença que seu negócio precisa.",
    href: "/servicos"
  },
  {
    icon: MessageCircle,
    title: "Fale pelo WhatsApp",
    text: "Tire dúvidas e peça um orçamento sem compromisso.",
    href: whatsappUrl,
    external: true
  }
];
