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
  "Personalize com foto, nome, número ou frase especial",
  "Modelos criados para presentear, jogar e marcar momentos",
  "Peça sua arte e receba atendimento direto pelo WhatsApp",
];

export const products: Product[] = [
  {
    id: "personalizada",
    name: "Caneleira Personalizada",
    category: "Shark Collection",
    price: "R$ 89,90",
    installment: "ou 2x de R$ 44,95 sem juros",
    description: "Escolha a foto que quiser e transforme sua caneleira em uma peça unica feita para você.",
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
    description: "Ideal para quem quer uma arte mais marcante, com composicao forte e acabamento premium.",
    label: "Arte exclusiva",
    accentClass: "from-slate-950 via-slate-700 to-slate-500",
  },
  {
    id: "frases",
    name: "Caneleira com Frases",
    category: "Colecao Fe",
    price: "R$ 49,90",
    installment: "ou 2x de R$ 24,95 sem juros",
    description: "Perfeita para colocar frase, mensagem ou versiculo que tenha significado especial.",
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
    description: "Acessorio ideal para guardar sua caneleira personalizada com mais cuidado e estilo.",
    label: "Porta caneleira",
    accentClass: "from-neutral-950 via-neutral-800 to-neutral-700",
  },
  {
    id: "regata",
    name: "Regata Dry Fit",
    category: "Linha Treino",
    price: "R$ 79,90",
    installment: "ou 2x de R$ 39,95 sem juros",
    description: "Opcao para quem tambem quer montar conjunto personalizado para treino e dia de jogo.",
    label: "Sua frase",
    accentClass: "from-zinc-100 via-white to-zinc-300",
  },
  {
    id: "kit",
    name: "Kit Fita + Meihao",
    category: "Acessorios",
    price: "R$ 69,90",
    installment: "ou 2x de R$ 34,95 sem juros",
    description: "Kit complementar para quem quer praticidade e mais identidade no uniforme esportivo.",
    label: "Kit treino",
    accentClass: "from-red-500 via-yellow-300 to-zinc-700",
  },
];

export const aboutParagraphs = [
  "Cada caneleira personalizada pode levar a foto de quem voce ama, uma lembranca especial, o nome do jogador, numero, frase de fe ou uma arte criada do seu jeito.",
  "Aqui a ideia e vender mais do que um acessorio esportivo: e entregar uma peça com identidade, emocao e significado para usar no jogo, no treino ou presentear alguem.",
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
