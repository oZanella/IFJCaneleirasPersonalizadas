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
  image?: string;
};

export const navigationItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#footer' },
];

export const heroHighlights = [
  'Personalize com foto, nome, número ou frase especial',
  'Modelos criados para presentear, jogar e marcar momentos',
  'Peça sua arte e receba atendimento direto pelo WhatsApp',
];

export const products: Product[] = [
  {
    id: 'personalizada-p',
    name: 'Tamanho P',
    category: 'Caneleira personalizada',
    price: 'R$ 54,90',
    installment: 'ou 2x de R$ 29,90',
    description: '',
    label: '',
    image: '/produtos/tamanhoP/p1.png',
    accentClass: 'from-zinc-100 via-zinc-200 to-zinc-400',
  },
  {
    id: 'personalizada-m',
    name: 'Tamanho M',
    category: 'Caneleira personalizada',
    price: 'R$ 59,90',
    installment: 'ou 2x de R$ 32,90',
    description: '',
    badge: 'Destaque',
    label: 'Sua foto aqui',
    image: '/produtos/tamanhoM/m1.png',
    accentClass: 'from-zinc-100 via-zinc-300 to-zinc-500',
  },
  {
    id: 'personalizada-g',
    name: 'Tamanho G',
    category: 'Caneleira personalizada',
    price: 'R$ 64,90',
    installment: 'ou 2x de R$ 36,90',
    description: '',
    badge: 'Promocao',
    label: 'Frase aqui',
    image: '/produtos/tamanhoG/g1.png',
    accentClass: 'from-zinc-950 via-zinc-900 to-zinc-700',
  },
  {
    id: 'porta',
    name: 'Porta Caneleira',
    category: 'Acessórios',
    price: 'R$ 59,90',
    installment: 'ou 2x de R$ 34,90 sem juros',
    description:
      'Esqueça fitas e esparadrapos que usava para prender e manter suas caneleiras no lugar. Acessório ideial para prender e guardar sua caneleira personalizada com mais cuidado e estilo.',
    label: '',
    image: '/produtos/porta-caneleira.png',
    accentClass: 'from-neutral-950 via-neutral-800 to-neutral-700',
  },
  {
    id: 'necessaire-lv',
    name: 'Necessaire LV',
    category: 'Acessórios',
    price: 'R$ 64,90',
    installment: '',
    description:
      'Necessaire premium, robusta e versátil. Desenvolvida com materiais de alta durabilidade, é ideal para organizar itens de viagem ou transportar suas chuteiras com estilo.\n\nDesign sofisticado com zíper externo e tampa de fecho magnético, garantindo proteção e praticidade.\n\nMedidas:\nProfundidade: 28 cm\nAltura: 15 cm\nLargura: 16 cm',
    label: '',
    image: '/produtos/necessaire-lv.png',
    accentClass: 'from-zinc-100 via-white to-zinc-300',
  },
  {
    id: 'meia-pro',
    name: 'Meia Pro Socks',
    category: 'Acessórios',
    price: 'R$ 37,90',
    installment: 'Consultar cores e mais detalhes',
    description:
      'Aumente sua estabilidade e performance em campo. Nossa meia Pro Socks possui tecnologia antiderrapante no solado, evitando que o pé deslize dentro da chuteira e prevenindo bolhas.\n\nMaterial de alta compressão que garante ajuste perfeito e conforto durante toda a partida.\n\n',
    label: '',
    image: '/produtos/meia-pro-socks.png',
    accentClass: 'from-green-100 via-white to-green-300',
  },
  {
    id: 'canelito',
    name: 'Canelito (Meião Cortado)',
    category: 'Acessórios',
    price: 'R$ 34,90',
    installment: 'Consultar cores e mais detalhes',
    description:
      'O acessório favorito dos jogadores profissionais. O Canelito oferece a compressão ideal para manter a panturrilha aquecida e a caneleira no lugar, permitindo que você use sua meia curta de performance.\n\nAcabamento premium que não desfia e mantém a elasticidade por muito mais tempo.',
    label: '',
    image: '/produtos/canelito.png',
    accentClass: 'from-blue-100 via-white to-blue-300',
  },
];

export const footerInfo = [
  {
    label: 'Instagram',
    value: '@ifjcaneleiras',
    href: 'https://www.instagram.com/ifjcaneleiras/',
  },
  {
    label: 'WhatsApp',
    value: ' (54) 99925-4677',
    href: 'https://wa.me/55999254677',
  },
  { label: 'Atendimento', value: 'Seg a sab - 9h as 18h' },
];

export const footerLinks = ['Desenvolvido por Henrique Zanella'];
