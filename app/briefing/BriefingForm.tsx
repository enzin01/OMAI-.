"use client";

import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  MapPin,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UploadCloud,
  UsersRound
} from "lucide-react";

type FieldValue = string | string[] | File[] | boolean;
type BriefingValues = Record<string, FieldValue>;

type ShowWhen = {
  field: string;
  equals?: string | boolean;
  notEquals?: string | boolean;
  includes?: string;
  oneOf?: string[];
};

type Option = {
  label: string;
  value: string;
};

type Field = {
  id: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "radio"
    | "checkbox"
    | "checkboxGroup"
    | "select"
    | "file";
  placeholder?: string;
  help?: string;
  note?: string;
  required?: boolean;
  full?: boolean;
  rows?: number;
  options?: Option[];
  accept?: string;
  multiple?: boolean;
  showWhen?: ShowWhen;
  excludeFromSummary?: boolean;
};

type Step = {
  title: string;
  shortTitle: string;
  kicker: string;
  description: string;
  icon: LucideIcon;
  fields: Field[];
};

type PdfLine = {
  text: string;
  size?: number;
  bold?: boolean;
  gapBefore?: number;
};

const FORM_ENDPOINT = "https://formsubmit.co/ajax/rivarolienzo@gmail.com";
const EMAIL_TO = "rivarolienzo@gmail.com";
const DRAFT_KEY = "digital-foundation-briefing-draft";
const MAX_UPLOAD_BYTES = Math.floor(9.5 * 1024 * 1024);

const yesNoOptions: Option[] = [
  { label: "Sim", value: "Sim" },
  { label: "Não", value: "Não" }
];

const steps: Step[] = [
  {
    title: "Informações básicas",
    shortTitle: "Dados",
    kicker: "Começo do projeto",
    description: "Identificação da empresa e dos contatos principais.",
    icon: Building2,
    fields: [
      {
        id: "company_name",
        label: "Nome da empresa",
        type: "text",
        required: true,
        placeholder: "Ex.: Clínica Aurora"
      },
      {
        id: "responsible_name",
        label: "Nome do responsável",
        type: "text",
        required: true,
        placeholder: "Quem vai acompanhar o projeto?"
      },
      {
        id: "phone",
        label: "Telefone",
        type: "tel",
        placeholder: "(00) 0000-0000"
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        type: "tel",
        required: true,
        placeholder: "(00) 00000-0000"
      },
      {
        id: "email",
        label: "E-mail",
        type: "email",
        required: true,
        placeholder: "contato@empresa.com.br"
      },
      {
        id: "instagram",
        label: "Instagram",
        type: "text",
        placeholder: "@suaempresa"
      },
      {
        id: "facebook",
        label: "Facebook",
        type: "text",
        placeholder: "Link ou nome da página"
      },
      {
        id: "other_socials",
        label: "Outras redes",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "TikTok, LinkedIn, YouTube, Pinterest ou outros canais."
      },
      {
        id: "has_site",
        label: "A empresa já possui site atual?",
        type: "radio",
        required: true,
        options: yesNoOptions
      },
      {
        id: "current_site",
        label: "Site atual",
        type: "url",
        full: true,
        showWhen: { field: "has_site", equals: "Sim" },
        placeholder: "https://www.suaempresa.com.br"
      }
    ]
  },
  {
    title: "Sobre o negócio",
    shortTitle: "Negócio",
    kicker: "Essência da marca",
    description: "O que a empresa faz, como se diferencia e o que precisa transmitir.",
    icon: Sparkles,
    fields: [
      {
        id: "market",
        label: "Ramo de atuação",
        type: "text",
        required: true,
        placeholder: "Ex.: estética, advocacia, engenharia, gastronomia..."
      },
      {
        id: "business_summary",
        label: "Descrição resumida do negócio",
        type: "textarea",
        required: true,
        full: true,
        rows: 4,
        placeholder: "Explique em poucas linhas o que a empresa faz e para quem."
      },
      {
        id: "main_products",
        label: "Principais produtos ou serviços",
        type: "textarea",
        required: true,
        full: true,
        rows: 4,
        placeholder: "Liste os principais itens que devem aparecer no site."
      },
      {
        id: "popular_services",
        label: "Produtos ou serviços mais procurados",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "O que os clientes mais pedem hoje?"
      },
      {
        id: "company_difference",
        label: "Diferencial da empresa",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Por que sua empresa é diferente das outras opções?"
      },
      {
        id: "has_exclusive_service",
        label: "Existe alguma técnica ou serviço exclusivo?",
        type: "radio",
        options: yesNoOptions
      },
      {
        id: "exclusive_service_details",
        label: "Detalhes da técnica ou serviço exclusivo",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "has_exclusive_service", equals: "Sim" },
        placeholder: "Nome, explicação, benefícios e qualquer cuidado de comunicação."
      },
      {
        id: "market_time",
        label: "Tempo de mercado",
        type: "text",
        placeholder: "Ex.: 8 anos, desde 2019, empresa nova..."
      },
      {
        id: "company_story",
        label: "História da empresa",
        type: "textarea",
        full: true,
        rows: 4,
        placeholder: "Como começou, por que existe e quais marcos importam."
      },
      {
        id: "brand_values",
        label: "Quais valores deseja transmitir?",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Ex.: confiança, proximidade, excelência, cuidado, inovação..."
      }
    ]
  },
  {
    title: "Público-alvo",
    shortTitle: "Público",
    kicker: "Quem decide",
    description: "Perfil do cliente ideal, dores principais e motivos de escolha.",
    icon: UsersRound,
    fields: [
      {
        id: "ideal_customer",
        label: "Quem é o cliente ideal?",
        type: "textarea",
        required: true,
        full: true,
        rows: 4,
        placeholder: "Descreva profissão, contexto, desejos, objeções e perfil de compra."
      },
      {
        id: "average_age",
        label: "Idade média",
        type: "text",
        placeholder: "Ex.: 25 a 45 anos"
      },
      {
        id: "predominant_gender",
        label: "Gênero predominante",
        type: "select",
        options: [
          { label: "Não definido", value: "Não definido" },
          { label: "Feminino", value: "Feminino" },
          { label: "Masculino", value: "Masculino" },
          { label: "Misto", value: "Misto" },
          { label: "Outro / depende do serviço", value: "Outro / depende do serviço" }
        ]
      },
      {
        id: "customer_problem",
        label: "Qual principal problema resolve para o cliente?",
        type: "textarea",
        required: true,
        full: true,
        rows: 4,
        placeholder: "O que incomoda, trava ou faz o cliente procurar sua empresa?"
      },
      {
        id: "why_choose",
        label: "Por que escolhem sua empresa?",
        type: "textarea",
        required: true,
        full: true,
        rows: 3,
        placeholder: "Preço, confiança, atendimento, resultado, localização, autoridade..."
      },
      {
        id: "main_objections",
        label: "Quais dúvidas ou objeções aparecem antes da compra?",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Ex.: preço, prazo, segurança, garantia, forma de pagamento..."
      }
    ]
  },
  {
    title: "Objetivos do site",
    shortTitle: "Objetivos",
    kicker: "Conversão",
    description: "O que o visitante deve fazer e quais resultados a página precisa gerar.",
    icon: Target,
    fields: [
      {
        id: "site_goals",
        label: "Quais objetivos o site deve cumprir?",
        type: "checkboxGroup",
        required: true,
        full: true,
        options: [
          { label: "Conseguir novos clientes", value: "Conseguir novos clientes" },
          { label: "Receber pedidos de orçamento", value: "Receber pedidos de orçamento" },
          { label: "Agendamento", value: "Agendamento" },
          { label: "Vendas", value: "Vendas" },
          { label: "Portfólio", value: "Portfólio" },
          { label: "Fortalecimento de marca", value: "Fortalecimento de marca" },
          { label: "Explicar serviços", value: "Explicar serviços" },
          { label: "Gerar autoridade", value: "Gerar autoridade" }
        ]
      },
      {
        id: "main_action",
        label: "Ação principal esperada do visitante",
        type: "select",
        required: true,
        options: [
          { label: "Chamar no WhatsApp", value: "Chamar no WhatsApp" },
          { label: "Pedir orçamento", value: "Pedir orçamento" },
          { label: "Agendar atendimento", value: "Agendar atendimento" },
          { label: "Comprar online", value: "Comprar online" },
          { label: "Preencher formulário", value: "Preencher formulário" },
          { label: "Ver portfólio", value: "Ver portfólio" },
          { label: "Conhecer a empresa", value: "Conhecer a empresa" }
        ]
      },
      {
        id: "expected_results",
        label: "Resultados esperados",
        type: "textarea",
        required: true,
        full: true,
        rows: 4,
        placeholder: "Ex.: receber leads mais qualificados, aumentar confiança, reduzir dúvidas..."
      },
      {
        id: "priority_offer",
        label: "Existe uma oferta, serviço ou produto prioritário?",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Algo que deve ganhar mais destaque no site."
      },
      {
        id: "has_deadline",
        label: "Existe prazo ou data importante?",
        type: "radio",
        options: yesNoOptions
      },
      {
        id: "deadline_details",
        label: "Qual prazo ou data?",
        type: "text",
        showWhen: { field: "has_deadline", equals: "Sim" },
        placeholder: "Ex.: publicar antes de uma campanha em setembro."
      }
    ]
  },
  {
    title: "Identidade visual",
    shortTitle: "Visual",
    kicker: "Aparência e sensação",
    description: "Logo, marca, cores, estilo e atmosfera que o site deve comunicar.",
    icon: Palette,
    fields: [
      {
        id: "has_logo",
        label: "Possui logotipo?",
        type: "radio",
        required: true,
        options: yesNoOptions
      },
      {
        id: "logo_upload",
        label: "Upload do logotipo",
        type: "file",
        full: true,
        multiple: true,
        accept: ".png,.jpg,.jpeg,.webp,.svg,.pdf",
        showWhen: { field: "has_logo", equals: "Sim" },
        help: "PNG, JPG, SVG ou PDF. Se tiver versões em fundo claro/escuro, envie todas."
      },
      {
        id: "logo_creation_note",
        label: "Observações sobre criação ou adaptação de logotipo",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "has_logo", equals: "Não" },
        placeholder: "Preferências, nomes, símbolos ou estilos que devem ser considerados."
      },
      {
        id: "has_brand_manual",
        label: "Possui manual de marca?",
        type: "radio",
        required: true,
        options: yesNoOptions
      },
      {
        id: "brand_manual_upload",
        label: "Upload do manual de marca",
        type: "file",
        full: true,
        multiple: true,
        accept: ".pdf,.png,.jpg,.jpeg,.webp",
        showWhen: { field: "has_brand_manual", equals: "Sim" },
        help: "PDF, imagens ou qualquer documento com regras de marca."
      },
      {
        id: "desired_colors",
        label: "Cores desejadas",
        type: "text",
        placeholder: "Ex.: azul, dourado, verde, preto, branco..."
      },
      {
        id: "avoid_colors",
        label: "Cores a evitar",
        type: "text",
        placeholder: "Ex.: vermelho, tons neon, bege..."
      },
      {
        id: "desired_style",
        label: "Estilo desejado",
        type: "checkboxGroup",
        full: true,
        options: [
          { label: "Confiança", value: "Confiança" },
          { label: "Sofisticação", value: "Sofisticação" },
          { label: "Inovação", value: "Inovação" },
          { label: "Proximidade", value: "Proximidade" },
          { label: "Minimalista", value: "Minimalista" },
          { label: "Premium / luxo", value: "Premium / luxo" },
          { label: "Criativo", value: "Criativo" },
          { label: "Técnico", value: "Técnico" }
        ]
      },
      {
        id: "desired_feeling",
        label: "Sensação que deseja transmitir",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Como a pessoa deve se sentir ao entrar no site?"
      }
    ]
  },
  {
    title: "Referências e conteúdo",
    shortTitle: "Conteúdo",
    kicker: "Materiais disponíveis",
    description: "Sites de inspiração, textos, fotos, vídeos e limites de comunicação.",
    icon: FileText,
    fields: [
      {
        id: "reference_links",
        label: "Links de sites que gosta",
        type: "textarea",
        full: true,
        rows: 4,
        placeholder: "Cole um link por linha."
      },
      {
        id: "reference_notes",
        label: "O que mais agrada nesses sites?",
        type: "textarea",
        full: true,
        rows: 4,
        placeholder: "Layout, cores, sensação, animações, organização, páginas específicas..."
      },
      {
        id: "has_content",
        label: "Possui textos, fotos ou vídeos?",
        type: "radio",
        required: true,
        options: yesNoOptions
      },
      {
        id: "content_upload",
        label: "Upload de textos, fotos e vídeos",
        type: "file",
        full: true,
        multiple: true,
        accept:
          ".png,.jpg,.jpeg,.webp,.gif,.mp4,.mov,.pdf,.doc,.docx,.txt,.zip",
        showWhen: { field: "has_content", equals: "Sim" },
        help: "Envie os materiais principais. Arquivos grandes podem ser enviados por link nas observações."
      },
      {
        id: "required_information",
        label: "Informações que devem aparecer",
        type: "textarea",
        full: true,
        rows: 4,
        placeholder: "Garantias, certificações, formas de pagamento, prazos, diferenciais..."
      },
      {
        id: "forbidden_information",
        label: "Informações que não devem aparecer",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Promessas, termos, preços, fotos ou assuntos que devem ser evitados."
      },
      {
        id: "authorize_copywriting",
        label: "Autoriza a OMAI a criar textos para o site?",
        type: "radio",
        required: true,
        options: yesNoOptions
      },
      {
        id: "tone_of_voice",
        label: "Tom de voz desejado",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Ex.: profissional, próximo, direto, acolhedor, técnico, sofisticado..."
      }
    ]
  },
  {
    title: "Atendimento e localização",
    shortTitle: "Atendimento",
    kicker: "Como o cliente encontra você",
    description: "Horários, canais de contato, endereço e regras de exibição.",
    icon: MapPin,
    fields: [
      {
        id: "service_days",
        label: "Dias de atendimento",
        type: "text",
        placeholder: "Ex.: segunda a sexta, terça a sábado..."
      },
      {
        id: "service_hours",
        label: "Horários de atendimento",
        type: "text",
        placeholder: "Ex.: 9h às 18h"
      },
      {
        id: "holiday_service",
        label: "Atende em feriados?",
        type: "radio",
        options: [
          { label: "Sim", value: "Sim" },
          { label: "Não", value: "Não" },
          { label: "Sob consulta", value: "Sob consulta" }
        ]
      },
      {
        id: "service_type",
        label: "Tipo de atendimento",
        type: "checkboxGroup",
        full: true,
        options: [
          { label: "Presencial", value: "Presencial" },
          { label: "Online", value: "Online" },
          { label: "Delivery", value: "Delivery" },
          { label: "Retirada", value: "Retirada" },
          { label: "Em domicílio", value: "Em domicílio" },
          { label: "Híbrido", value: "Híbrido" }
        ]
      },
      {
        id: "contact_channels",
        label: "Canais de contato que devem aparecer",
        type: "checkboxGroup",
        full: true,
        options: [
          { label: "WhatsApp", value: "WhatsApp" },
          { label: "Telefone", value: "Telefone" },
          { label: "E-mail", value: "E-mail" },
          { label: "Instagram", value: "Instagram" },
          { label: "Formulário", value: "Formulário" },
          { label: "Endereço físico", value: "Endereço físico" }
        ]
      },
      {
        id: "full_address",
        label: "Endereço completo",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Rua, número, complemento, bairro."
      },
      {
        id: "city",
        label: "Cidade",
        type: "text"
      },
      {
        id: "state",
        label: "Estado",
        type: "text",
        placeholder: "UF"
      },
      {
        id: "zip_code",
        label: "CEP",
        type: "text",
        placeholder: "00000-000"
      },
      {
        id: "maps_link",
        label: "Link do Google Maps",
        type: "url",
        placeholder: "https://maps.google.com/..."
      },
      {
        id: "show_address",
        label: "O endereço deve ser exibido no site?",
        type: "radio",
        full: true,
        options: [
          { label: "Sim, completo", value: "Sim, completo" },
          { label: "Apenas cidade/estado", value: "Apenas cidade/estado" },
          { label: "Não exibir", value: "Não exibir" }
        ]
      }
    ]
  },
  {
    title: "Funcionalidades e concorrentes",
    shortTitle: "Recursos",
    kicker: "Escopo esperado",
    description: "Itens do site, integrações, concorrentes e pontos de comparação.",
    icon: FileCheck2,
    fields: [
      {
        id: "features",
        label: "Funcionalidades desejadas",
        type: "checkboxGroup",
        required: true,
        full: true,
        options: [
          { label: "Botão de WhatsApp", value: "Botão de WhatsApp" },
          { label: "Formulário de contato", value: "Formulário de contato" },
          { label: "Orçamento", value: "Orçamento" },
          { label: "Agendamento", value: "Agendamento" },
          { label: "Loja virtual", value: "Loja virtual" },
          { label: "Catálogo", value: "Catálogo" },
          { label: "Portfólio", value: "Portfólio" },
          { label: "Depoimentos", value: "Depoimentos" },
          { label: "FAQ", value: "FAQ" },
          { label: "Blog", value: "Blog" },
          { label: "Integração com Instagram", value: "Integração com Instagram" },
          { label: "Outros", value: "Outros" }
        ]
      },
      {
        id: "budget_details",
        label: "Como deve funcionar o pedido de orçamento?",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "features", includes: "Orçamento" },
        placeholder: "Campos necessários, etapas, anexos, mensagem automática..."
      },
      {
        id: "scheduling_details",
        label: "Como deve funcionar o agendamento?",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "features", includes: "Agendamento" },
        placeholder: "Dias, duração, confirmação, ferramenta atual, regras de agenda..."
      },
      {
        id: "ecommerce_details",
        label: "Informações para loja virtual",
        type: "textarea",
        full: true,
        rows: 4,
        showWhen: { field: "features", includes: "Loja virtual" },
        placeholder: "Produtos, pagamentos, frete, retirada, estoque, checkout..."
      },
      {
        id: "catalog_details",
        label: "Informações para catálogo",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "features", includes: "Catálogo" },
        placeholder: "Categorias, filtros, preços, fotos e forma de solicitar."
      },
      {
        id: "instagram_details",
        label: "Detalhes da integração com Instagram",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "features", includes: "Integração com Instagram" },
        placeholder: "Perfil, tipo de conteúdo, feed, posts fixos, links importantes."
      },
      {
        id: "other_features",
        label: "Outras funcionalidades",
        type: "textarea",
        full: true,
        rows: 3,
        showWhen: { field: "features", includes: "Outros" },
        placeholder: "Descreva qualquer recurso específico."
      },
      {
        id: "competitors",
        label: "Concorrentes, nomes e links",
        type: "textarea",
        full: true,
        rows: 4,
        placeholder: "Liste concorrentes diretos e, se possível, links dos sites ou redes sociais."
      },
      {
        id: "competitor_notes",
        label: "O que devemos observar nos concorrentes?",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Pontos fortes, pontos fracos, o que evitar ou superar."
      }
    ]
  },
  {
    title: "Informações extras e envio",
    shortTitle: "Envio",
    kicker: "Conferência final",
    description: "Ideias adicionais, anexos finais e autorização para envio.",
    icon: ShieldCheck,
    fields: [
      {
        id: "extra_notes",
        label: "Qualquer ideia ou observação adicional",
        type: "textarea",
        full: true,
        rows: 5,
        placeholder: "Conte tudo que pode ajudar a criar um site mais personalizado."
      },
      {
        id: "decision_makers",
        label: "Quem aprova o projeto?",
        type: "text",
        placeholder: "Nome(s) de quem decide e revisa."
      },
      {
        id: "approval_process",
        label: "Como será a aprovação dos materiais?",
        type: "textarea",
        full: true,
        rows: 3,
        placeholder: "Ex.: uma pessoa aprova, equipe revisa, prazo interno..."
      },
      {
        id: "extra_uploads",
        label: "Uploads adicionais",
        type: "file",
        full: true,
        multiple: true,
        accept: ".png,.jpg,.jpeg,.webp,.pdf,.doc,.docx,.txt,.zip",
        help: "Arquivos extras que ajudem a entender a empresa."
      },
      {
        id: "privacy_consent",
        label:
          "Confirmo que as informações podem ser enviadas por e-mail para a OMAI e usadas para planejar o projeto.",
        type: "checkbox",
        required: true,
        full: true,
        excludeFromSummary: true
      }
    ]
  }
];

const fileFieldIds = new Set(
  steps.flatMap((step) => step.fields.filter((field) => field.type === "file").map((field) => field.id))
);

const allFields = steps.flatMap((step) => step.fields);

const initialValues = allFields.reduce<BriefingValues>((values, field) => {
  if (field.type === "checkboxGroup" || field.type === "file") {
    values[field.id] = [];
  } else if (field.type === "checkbox") {
    values[field.id] = false;
  } else {
    values[field.id] = "";
  }

  return values;
}, {});

function getString(value: FieldValue | undefined) {
  return typeof value === "string" ? value : "";
}

function getStringArray(value: FieldValue | undefined) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function getFileArray(value: FieldValue | undefined) {
  return Array.isArray(value) && value.every((item) => item instanceof File) ? value : [];
}

function isEmptyValue(value: FieldValue | undefined) {
  if (typeof value === "boolean") return !value;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return true;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidUrl(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return true;

  try {
    new URL(/^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`);
    return true;
  } catch {
    return false;
  }
}

function fieldIsVisible(field: Field, values: BriefingValues) {
  if (!field.showWhen) return true;

  const currentValue = values[field.showWhen.field];

  if (field.showWhen.equals !== undefined) {
    return currentValue === field.showWhen.equals;
  }

  if (field.showWhen.notEquals !== undefined) {
    return currentValue !== field.showWhen.notEquals;
  }

  if (field.showWhen.includes !== undefined) {
    return getStringArray(currentValue).includes(field.showWhen.includes);
  }

  if (field.showWhen.oneOf) {
    return field.showWhen.oneOf.includes(getString(currentValue));
  }

  return true;
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 MB";
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(megabytes >= 10 ? 0 : 1)} MB`;
}

function selectedFiles(values: BriefingValues) {
  return allFields
    .filter((field) => field.type === "file")
    .flatMap((field) =>
      getFileArray(values[field.id]).map((file) => ({
        file,
        label: field.label
      }))
    );
}

function getUploadTotal(values: BriefingValues) {
  return selectedFiles(values).reduce((total, item) => total + item.file.size, 0);
}

function slugifyFileName(value: string) {
  const cleaned = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return cleaned || "briefing";
}

function displayValue(field: Field, value: FieldValue | undefined) {
  if (field.type === "file") {
    const files = getFileArray(value);
    if (!files.length) return "Não enviado";
    return files.map((file) => `${file.name} (${formatBytes(file.size)})`).join("; ");
  }

  if (field.type === "checkbox") {
    return value === true ? "Sim" : "Não";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "Não informado";
  }

  if (typeof value === "string") {
    return value.trim() || "Não informado";
  }

  return "Não informado";
}

function summarySections(values: BriefingValues) {
  return steps
    .map((step) => {
      const entries = step.fields
        .filter((field) => !field.excludeFromSummary && fieldIsVisible(field, values))
        .map((field) => ({
          label: field.label,
          value: displayValue(field, values[field.id])
        }))
        .filter((entry) => entry.value !== "Não informado" && entry.value !== "Não enviado");

      return {
        title: step.title,
        entries
      };
    })
    .filter((section) => section.entries.length > 0);
}

function buildSubmissionText(values: BriefingValues) {
  const company = getString(values.company_name) || "Empresa não informada";
  const responsible = getString(values.responsible_name) || "Responsável não informado";
  const submittedAt = new Date().toLocaleString("pt-BR");
  const sections = summarySections(values);

  const lines = [
    "BRIEFING OMAI",
    `Empresa: ${company}`,
    `Responsável: ${responsible}`,
    `Enviado em: ${submittedAt}`,
    "",
    ...sections.flatMap((section) => [
      `## ${section.title}`,
      ...section.entries.map((entry) => `${entry.label}: ${entry.value}`),
      ""
    ])
  ];

  return lines.join("\n");
}

function wrapWords(text: string, maxLength: number) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= maxLength) {
      current = next;
      return;
    }

    if (current) lines.push(current);

    if (word.length > maxLength) {
      for (let index = 0; index < word.length; index += maxLength) {
        lines.push(word.slice(index, index + maxLength));
      }
      current = "";
      return;
    }

    current = word;
  });

  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function buildPdfLines(values: BriefingValues) {
  const sections = summarySections(values);
  const lines: PdfLine[] = [
    { text: "Briefing OMAI", size: 20, bold: true },
    {
      text: `Gerado em ${new Date().toLocaleString("pt-BR")} para organização do projeto.`,
      size: 10,
      gapBefore: 4
    },
    {
      text: `Empresa: ${displayValue({ id: "company_name", label: "", type: "text" }, values.company_name)}`,
      size: 11,
      bold: true,
      gapBefore: 8
    }
  ];

  sections.forEach((section) => {
    lines.push({ text: section.title, size: 14, bold: true, gapBefore: 14 });

    section.entries.forEach((entry) => {
      const fieldText = `${entry.label}: ${entry.value}`;
      wrapWords(fieldText, 92).forEach((line, index) => {
        lines.push({
          text: index === 0 ? line : `  ${line}`,
          size: 9.6,
          bold: index === 0 && fieldText.length <= 92
        });
      });
    });
  });

  return lines;
}

function winAnsiBytes(text: string) {
  const replacements: Record<number, number> = {
    0x20ac: 0x80,
    0x201a: 0x82,
    0x0192: 0x83,
    0x201e: 0x84,
    0x2026: 0x85,
    0x2020: 0x86,
    0x2021: 0x87,
    0x02c6: 0x88,
    0x2030: 0x89,
    0x0160: 0x8a,
    0x2039: 0x8b,
    0x0152: 0x8c,
    0x017d: 0x8e,
    0x2018: 0x91,
    0x2019: 0x92,
    0x201c: 0x93,
    0x201d: 0x94,
    0x2022: 0x95,
    0x2013: 0x96,
    0x2014: 0x97,
    0x02dc: 0x98,
    0x2122: 0x99,
    0x0161: 0x9a,
    0x203a: 0x9b,
    0x0153: 0x9c,
    0x017e: 0x9e,
    0x0178: 0x9f
  };

  return Array.from(text).map((character) => {
    const code = character.charCodeAt(0);
    if (code <= 0xff) return code;
    return replacements[code] ?? 0x3f;
  });
}

function escapePdfText(text: string) {
  return winAnsiBytes(text).reduce((output, byte) => {
    if (byte === 0x28) return `${output}\\(`;
    if (byte === 0x29) return `${output}\\)`;
    if (byte === 0x5c) return `${output}\\\\`;
    if (byte === 0x0a) return `${output}\\n`;
    if (byte === 0x0d) return output;
    return output + String.fromCharCode(byte);
  }, "");
}

function binaryStringToBytes(value: string) {
  const bytes = new Uint8Array(value.length);
  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }
  return bytes;
}

function createPdfBlob(values: BriefingValues) {
  const encoder = new TextEncoder();
  const pdfLines = buildPdfLines(values);
  const pages: PdfLine[][] = [[]];
  let y = 798;

  pdfLines.forEach((line) => {
    const size = line.size ?? 10;
    const height = (line.gapBefore ?? 0) + size * 1.35;

    if (y - height < 44 && pages[pages.length - 1].length) {
      pages.push([]);
      y = 798;
    }

    pages[pages.length - 1].push(line);
    y -= height;
  });

  const objects: (Uint8Array | string)[][] = [];
  const pageIds = pages.map((_, index) => 5 + index * 2);
  const contentIds = pages.map((_, index) => 6 + index * 2);

  objects.push(["<< /Type /Catalog /Pages 2 0 R >>"]);
  objects.push([`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`]);
  objects.push(["<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"]);
  objects.push(["<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"]);

  pages.forEach((page, pageIndex) => {
    let content = "";
    let cursorY = 798;

    page.forEach((line) => {
      const size = line.size ?? 10;
      cursorY -= line.gapBefore ?? 0;
      const font = line.bold ? "F2" : "F1";
      content += `BT /${font} ${size.toFixed(1)} Tf 42 ${cursorY.toFixed(1)} Td (${escapePdfText(line.text)}) Tj ET\n`;
      cursorY -= size * 1.35;
    });

    const contentBytes = binaryStringToBytes(content);

    objects.push([
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentIds[pageIndex]} 0 R >>`
    ]);
    objects.push([`<< /Length ${contentBytes.length} >>\nstream\n`, contentBytes, "\nendstream"]);
  });

  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let byteLength = 0;

  const add = (part: string | Uint8Array) => {
    const bytes = typeof part === "string" ? encoder.encode(part) : part;
    chunks.push(bytes);
    byteLength += bytes.length;
  };

  add("%PDF-1.4\n");

  objects.forEach((parts, index) => {
    offsets.push(byteLength);
    add(`${index + 1} 0 obj\n`);
    parts.forEach(add);
    add("\nendobj\n");
  });

  const xrefOffset = byteLength;
  add(`xref\n0 ${objects.length + 1}\n`);
  add("0000000000 65535 f \n");
  offsets.forEach((offset) => {
    add(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  add(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const pdfBuffer = new ArrayBuffer(byteLength);
  const pdfBytes = new Uint8Array(pdfBuffer);
  let cursor = 0;

  chunks.forEach((chunk) => {
    pdfBytes.set(chunk, cursor);
    cursor += chunk.length;
  });

  return new Blob([pdfBuffer], { type: "application/pdf" });
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function validateFields(fields: Field[], values: BriefingValues) {
  const nextErrors: Record<string, string> = {};

  fields.forEach((field) => {
    if (!fieldIsVisible(field, values)) return;

    const value = values[field.id];

    if (field.required && isEmptyValue(value)) {
      nextErrors[field.id] = "Preencha este campo para continuar.";
      return;
    }

    if (field.type === "email") {
      const email = getString(value);
      if (email && !isValidEmail(email)) {
        nextErrors[field.id] = "Informe um e-mail válido.";
      }
    }

    if (field.type === "url") {
      const url = getString(value);
      if (url && !isValidUrl(url)) {
        nextErrors[field.id] = "Informe um link válido.";
      }
    }
  });

  return nextErrors;
}

export function BriefingForm() {
  const [values, setValues] = useState<BriefingValues>(() => ({ ...initialValues }));
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const activeStep = steps[currentStep];
  const StepIcon = activeStep.icon;
  const uploadTotal = useMemo(() => getUploadTotal(values), [values]);
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  const visibleFields = useMemo(
    () => activeStep.fields.filter((field) => fieldIsVisible(field, values)),
    [activeStep.fields, values]
  );
  const sections = useMemo(() => summarySections(values), [values]);

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft) as BriefingValues;
        setValues((current) => ({ ...current, ...parsed }));
      }
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    } finally {
      setDraftReady(true);
    }
  }, []);

  useEffect(() => {
    if (!draftReady) return;

    const serializableDraft = Object.fromEntries(
      Object.entries(values).filter(([key]) => !fileFieldIds.has(key))
    );
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(serializableDraft));
  }, [draftReady, values]);

  const updateValue = (fieldId: string, value: FieldValue) => {
    setValues((current) => ({ ...current, [fieldId]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
    setFormStatus({ type: "idle", message: "" });
  };

  const handleTextChange =
    (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateValue(field.id, event.target.value);
    };

  const handleFileChange = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    updateValue(field.id, Array.from(event.target.files ?? []));
  };

  const toggleCheckboxValue = (field: Field, option: Option) => {
    const currentValues = getStringArray(values[field.id]);
    const nextValues = currentValues.includes(option.value)
      ? currentValues.filter((value) => value !== option.value)
      : [...currentValues, option.value];

    updateValue(field.id, nextValues);
  };

  const validateStep = (stepIndex: number) => {
    const stepErrors = validateFields(steps[stepIndex].fields, values);

    if (getUploadTotal(values) > MAX_UPLOAD_BYTES) {
      stepErrors._uploads = `Os arquivos somam ${formatBytes(
        getUploadTotal(values)
      )}. Reduza para até ${formatBytes(MAX_UPLOAD_BYTES)}.`;
    }

    setErrors((current) => {
      const fieldIds = new Set(steps[stepIndex].fields.map((field) => field.id));
      const filtered = Object.fromEntries(Object.entries(current).filter(([key]) => !fieldIds.has(key)));
      return { ...filtered, ...stepErrors };
    });

    return Object.keys(stepErrors).length === 0;
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(Math.max(0, Math.min(stepIndex, steps.length - 1)));
    setFormStatus({ type: "idle", message: "" });
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;
    goToStep(currentStep + 1);
  };

  const goBack = () => {
    goToStep(currentStep - 1);
  };

  const validateAll = () => {
    const allErrors = steps.reduce<Record<string, string>>((accumulator, step) => {
      return { ...accumulator, ...validateFields(step.fields, values) };
    }, {});

    if (getUploadTotal(values) > MAX_UPLOAD_BYTES) {
      allErrors._uploads = `Os arquivos somam ${formatBytes(
        getUploadTotal(values)
      )}. Reduza para até ${formatBytes(MAX_UPLOAD_BYTES)}.`;
    }

    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      const firstStepWithError = steps.findIndex((step) => step.fields.some((field) => allErrors[field.id]));
      if (firstStepWithError >= 0) {
        setCurrentStep(firstStepWithError);
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateAll()) {
      setFormStatus({
        type: "error",
        message: "Revise os campos destacados antes de enviar o briefing."
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "idle", message: "" });

    const companyName = getString(values.company_name);
    const pdfName = `briefing-${slugifyFileName(companyName)}.pdf`;
    const pdfBlob = createPdfBlob(values);
    downloadBlob(pdfBlob, pdfName);

    try {
      const formData = new FormData();
      const submissionText = buildSubmissionText(values);

      formData.append("_subject", `Novo briefing OMAI - ${companyName || "empresa sem nome"}`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");
      formData.append("_honey", "");
      formData.append("name", getString(values.responsible_name));
      formData.append("email", getString(values.email));
      formData.append("_replyto", getString(values.email));
      formData.append("_url", window.location.href);
      formData.append("empresa", companyName);
      formData.append("whatsapp", getString(values.whatsapp));
      formData.append("Resumo organizado", submissionText);

      summarySections(values).forEach((section) => {
        formData.append(
          section.title,
          section.entries.map((entry) => `${entry.label}: ${entry.value}`).join("\n")
        );
      });

      selectedFiles(values).forEach(({ file, label }, index) => {
        formData.append(`${label} ${index + 1}`, file, file.name);
      });

      formData.append("PDF do briefing", new File([pdfBlob], pdfName, { type: "application/pdf" }));

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Falha ao confirmar o envio.");
      }

      window.localStorage.removeItem(DRAFT_KEY);
      setFormStatus({
        type: "success",
        message: `Briefing enviado para ${EMAIL_TO}. O PDF também foi baixado neste dispositivo.`
      });
    } catch {
      setFormStatus({
        type: "error",
        message:
          "O PDF foi gerado, mas o envio automático não confirmou. Verifique a conexão ou envie o PDF baixado para a OMAI."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: Field) => {
    const fieldValue = values[field.id];
    const error = errors[field.id];
    const describedBy = error ? `${field.id}-error` : field.help ? `${field.id}-help` : undefined;
    const fieldClassName = `briefing-field${field.full ? " is-full" : ""}`;

    if (field.type === "radio") {
      return (
        <fieldset className={`${fieldClassName} briefing-fieldset`} key={field.id}>
          <legend>
            {field.label}
            {field.required ? <span aria-label="obrigatório">*</span> : null}
          </legend>
          <div className="briefing-choice-grid">
            {field.options?.map((option) => (
              <label className="briefing-choice" key={option.value}>
                <input
                  checked={fieldValue === option.value}
                  name={field.id}
                  onChange={() => updateValue(field.id, option.value)}
                  type="radio"
                  value={option.value}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {error ? (
            <p className="briefing-error" id={`${field.id}-error`}>
              {error}
            </p>
          ) : null}
        </fieldset>
      );
    }

    if (field.type === "checkboxGroup") {
      return (
        <fieldset className={`${fieldClassName} briefing-fieldset`} key={field.id}>
          <legend>
            {field.label}
            {field.required ? <span aria-label="obrigatório">*</span> : null}
          </legend>
          <div className="briefing-choice-grid is-multi">
            {field.options?.map((option) => {
              const checked = getStringArray(fieldValue).includes(option.value);
              return (
                <label className="briefing-choice" key={option.value}>
                  <input
                    checked={checked}
                    name={field.id}
                    onChange={() => toggleCheckboxValue(field, option)}
                    type="checkbox"
                    value={option.value}
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
          {field.help ? <p className="briefing-help">{field.help}</p> : null}
          {error ? (
            <p className="briefing-error" id={`${field.id}-error`}>
              {error}
            </p>
          ) : null}
        </fieldset>
      );
    }

    if (field.type === "checkbox") {
      return (
        <div className={`${fieldClassName} briefing-consent`} key={field.id}>
          <label>
            <input
              checked={fieldValue === true}
              onChange={(event) => updateValue(field.id, event.target.checked)}
              type="checkbox"
            />
            <span>
              {field.label}
              {field.required ? <strong aria-label="obrigatório">*</strong> : null}
            </span>
          </label>
          {error ? (
            <p className="briefing-error" id={`${field.id}-error`}>
              {error}
            </p>
          ) : null}
        </div>
      );
    }

    if (field.type === "file") {
      const files = getFileArray(fieldValue);

      return (
        <div className={fieldClassName} key={field.id}>
          <span className="briefing-label">
            {field.label}
            {field.required ? <span aria-label="obrigatório">*</span> : null}
          </span>
          <label className="briefing-upload" htmlFor={field.id}>
            <UploadCloud size={24} aria-hidden="true" />
            <span>
              <strong>Selecionar arquivo{field.multiple ? "s" : ""}</strong>
              <small>{field.help ?? "Anexe os materiais relacionados a este campo."}</small>
            </span>
          </label>
          <input
            accept={field.accept}
            className="briefing-sr-only"
            id={field.id}
            multiple={field.multiple}
            onChange={handleFileChange(field)}
            type="file"
          />
          {files.length ? (
            <ul className="briefing-file-list" aria-label={`Arquivos selecionados para ${field.label}`}>
              {files.map((file) => (
                <li key={`${file.name}-${file.size}`}>
                  <FileText size={16} aria-hidden="true" />
                  <span>{file.name}</span>
                  <small>{formatBytes(file.size)}</small>
                </li>
              ))}
            </ul>
          ) : null}
          {field.note ? <p className="briefing-help">{field.note}</p> : null}
          {error ? (
            <p className="briefing-error" id={`${field.id}-error`}>
              {error}
            </p>
          ) : null}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div className={fieldClassName} key={field.id}>
          <label htmlFor={field.id}>
            {field.label}
            {field.required ? <span aria-label="obrigatório">*</span> : null}
          </label>
          <textarea
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            id={field.id}
            onChange={handleTextChange(field)}
            placeholder={field.placeholder}
            rows={field.rows ?? 4}
            value={getString(fieldValue)}
          />
          {field.help ? (
            <p className="briefing-help" id={`${field.id}-help`}>
              {field.help}
            </p>
          ) : null}
          {error ? (
            <p className="briefing-error" id={`${field.id}-error`}>
              {error}
            </p>
          ) : null}
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div className={fieldClassName} key={field.id}>
          <label htmlFor={field.id}>
            {field.label}
            {field.required ? <span aria-label="obrigatório">*</span> : null}
          </label>
          <select
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            id={field.id}
            onChange={handleTextChange(field)}
            value={getString(fieldValue)}
          >
            <option value="">Selecione</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error ? (
            <p className="briefing-error" id={`${field.id}-error`}>
              {error}
            </p>
          ) : null}
        </div>
      );
    }

    return (
      <div className={fieldClassName} key={field.id}>
        <label htmlFor={field.id}>
          {field.label}
          {field.required ? <span aria-label="obrigatório">*</span> : null}
        </label>
        <input
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          id={field.id}
          onChange={handleTextChange(field)}
          placeholder={field.placeholder}
          type={field.type}
          value={getString(fieldValue)}
        />
        {field.help ? (
          <p className="briefing-help" id={`${field.id}-help`}>
            {field.help}
          </p>
        ) : null}
        {error ? (
          <p className="briefing-error" id={`${field.id}-error`}>
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="briefing-wrap">
      <section className="briefing-hero" aria-labelledby="briefing-title">
        <div className="briefing-hero-copy reveal">
          <p className="eyebrow">Briefing OMAI</p>
          <h1 id="briefing-title">Um formulário completo para criar um site realmente personalizado.</h1>
          <p>
            Reunimos estratégia, conteúdo, identidade visual, objetivos, funcionalidades e contexto do negócio em um
            único envio organizado para a equipe.
          </p>
        </div>

        <aside className="briefing-hero-panel reveal" aria-label="Resumo do briefing">
          <div>
            <span>Etapas</span>
            <strong>{steps.length}</strong>
          </div>
          <div>
            <span>Destino</span>
            <strong>{EMAIL_TO}</strong>
          </div>
          <div>
            <span>Entrega</span>
            <strong>E-mail + PDF</strong>
          </div>
        </aside>
      </section>

      <form className="briefing-form-shell reveal" encType="multipart/form-data" noValidate onSubmit={handleSubmit}>
        <aside className="briefing-sidebar" aria-label="Etapas do formulário">
          <div className="briefing-progress-block">
            <span>Progresso</span>
            <strong>{progress}%</strong>
            <div className="briefing-progress-track" aria-hidden="true">
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ol className="briefing-step-list">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isComplete = index < currentStep;

              return (
                <li key={step.title}>
                  <button
                    aria-current={isActive ? "step" : undefined}
                    className={isActive ? "is-active" : ""}
                    onClick={() => goToStep(index)}
                    type="button"
                  >
                    <span className="briefing-step-index">
                      {isComplete ? <CheckCircle2 size={17} aria-hidden="true" /> : String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon size={17} aria-hidden="true" />
                    <strong>{step.shortTitle}</strong>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="briefing-upload-meter" aria-live="polite">
            <span>Anexos</span>
            <strong>{formatBytes(uploadTotal)}</strong>
            <small>Limite prático: {formatBytes(MAX_UPLOAD_BYTES)} no total.</small>
          </div>
        </aside>

        <section className="briefing-panel" aria-labelledby="active-step-title">
          <div className="briefing-panel-top">
            <div className="briefing-step-heading">
              <span className="briefing-icon">
                <StepIcon size={24} aria-hidden="true" />
              </span>
              <div>
                <p>{activeStep.kicker}</p>
                <h2 id="active-step-title">{activeStep.title}</h2>
              </div>
            </div>
            <span className="briefing-step-count">
              {currentStep + 1}/{steps.length}
            </span>
          </div>

          <p className="briefing-step-description">{activeStep.description}</p>

          <div className="briefing-fields">{visibleFields.map(renderField)}</div>

          {currentStep === steps.length - 1 ? (
            <div className="briefing-review" aria-label="Resumo que será enviado">
              <div className="briefing-review-title">
                <Download size={19} aria-hidden="true" />
                <h3>Resumo organizado do envio</h3>
              </div>
              {sections.length ? (
                <div className="briefing-review-grid">
                  {sections.map((section) => (
                    <article key={section.title}>
                      <h4>{section.title}</h4>
                      <dl>
                        {section.entries.slice(0, 6).map((entry) => (
                          <div key={`${section.title}-${entry.label}`}>
                            <dt>{entry.label}</dt>
                            <dd>{entry.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="briefing-empty">Preencha as etapas anteriores para ver o resumo.</p>
              )}
            </div>
          ) : null}

          {errors._uploads ? (
            <p className="briefing-global-error" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              {errors._uploads}
            </p>
          ) : null}

          {formStatus.message ? (
            <p className={`briefing-status is-${formStatus.type}`} role="status">
              {formStatus.type === "success" ? (
                <CheckCircle2 size={19} aria-hidden="true" />
              ) : (
                <AlertCircle size={19} aria-hidden="true" />
              )}
              {formStatus.message}
            </p>
          ) : null}

          <div className="briefing-actions">
            <button
              className="briefing-button briefing-button-secondary"
              disabled={currentStep === 0 || isSubmitting}
              onClick={goBack}
              type="button"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Voltar
            </button>

            {currentStep < steps.length - 1 ? (
              <button className="briefing-button briefing-button-primary" onClick={goNext} type="button">
                Continuar
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            ) : (
              <button className="briefing-button briefing-button-primary" disabled={isSubmitting} type="submit">
                <Send size={18} aria-hidden="true" />
                {isSubmitting ? "Enviando..." : "Enviar briefing"}
              </button>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}
