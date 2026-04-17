export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  installment: string;
  description: string;
  badge?: string;
  label: string;
  accentClass: string;
};

export const navigationItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#footer" },
];

export const heroHighlights = [
  "Layout full screen com foco total no produto",
  "Animacoes suaves conforme a rolagem",
  "Estrutura pronta para adicionar produtos reais",
];

export const products: Product[] = [
  {
    id: "personalizada",
    name: "Caneleira Personalizada",
    category: "Shark Collection",
    price: "R$ 89,90",
    installment: "ou 2x de R$ 44,95 sem juros",
    description: "Modelo para foto, nome, numero ou arte exclusiva com visual premium.",
    badge: "Destaque",
    label: "Sua foto aqui",
    accentClass: "from-zinc-100 via-zinc-300 to-zinc-500",
  },
  {
    id: "design",
    name: "Caneleira com Design",
    category: "Linha Arte",
    price: "R$ 109,90",
    installment: "ou 2x de R$ 54,95 sem juros",
    description: "Peça pensada para quem quer presença visual mais forte na vitrine.",
    label: "Arte exclusiva",
    accentClass: "from-slate-950 via-slate-700 to-slate-500",
  },
  {
    id: "frases",
    name: "Caneleira com Frases",
    category: "Colecao Fe",
    price: "R$ 49,90",
    installment: "ou 2x de R$ 24,95 sem juros",
    description: "Perfeita para frases, mensagens e versiculos com valor emocional.",
    badge: "Promocao",
    label: "Frase aqui",
    accentClass: "from-zinc-950 via-zinc-900 to-zinc-700",
  },
  {
    id: "porta",
    name: "Porta Caneleira",
    category: "Acessorios",
    price: "R$ 59,90",
    installment: "ou 2x de R$ 29,95 sem juros",
    description: "Complemento ideal para montar kits e elevar o ticket medio.",
    label: "Porta caneleira",
    accentClass: "from-neutral-950 via-neutral-800 to-neutral-700",
  },
  {
    id: "regata",
    name: "Regata Dry Fit",
    category: "Linha Treino",
    price: "R$ 79,90",
    installment: "ou 2x de R$ 39,95 sem juros",
    description: "Produto adicional para ampliar o catalogo sem perder a identidade.",
    label: "Sua frase",
    accentClass: "from-zinc-100 via-white to-zinc-300",
  },
  {
    id: "kit",
    name: "Kit Fita + Meihao",
    category: "Acessorios",
    price: "R$ 69,90",
    installment: "ou 2x de R$ 34,95 sem juros",
    description: "Bloco extra para destacar produtos complementares e kits promocionais.",
    label: "Kit treino",
    accentClass: "from-red-500 via-yellow-300 to-zinc-700",
  },
];

export const aboutParagraphs = [
  "A proposta desta home e transformar sua loja em uma vitrine mais forte, com secao hero marcante, grade de produtos e leitura fluida do topo ao rodape.",
  "Usei as referencias como direcao de clima e composicao, mas construindo uma pagina propria, mais limpa, mais modular e preparada para crescer com novos produtos.",
];

export const footerInfo = [
  { label: "Instagram", value: "@ifjcaneleiras" },
  { label: "WhatsApp", value: "(54) 99665-5417" },
  { label: "Atendimento", value: "Seg a sab - 9h as 18h" },
];

export const footerLinks = [
  "Politica de privacidade",
  "Politica de frete",
  "Trocas e devolucoes",
  "Informacoes de contato",
];
