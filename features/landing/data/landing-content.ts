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
  textImage?: string;
};

export const navigationItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#footer' },
];

export const customProducts: Product[] = [
  {
    id: 'personalizada-p',
    name: 'Tamanho P',
    category: 'Caneleira personalizada',
    price: 'R$ 54,90',
    installment: 'ou 2x de R$ 29,90',
    description:
      'Ideal para crianças ou atletas que preferem proteção compacta e leveza total.',
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
    description:
      'O tamanho padrão mais versátil. Perfeito para garantir proteção sem perder a mobilidade.',
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
    description:
      'Proteção máxima para atletas profissionais e amadores. Área de cobertura ampliada.',
    badge: 'Promoção',
    label: 'Frase aqui',
    image: '/produtos/tamanhoG/g1.png',
    accentClass: 'from-zinc-950 via-zinc-900 to-zinc-700',
  },
];

export const storeProducts: Product[] = [
  {
    id: 'porta',
    name: 'Porta Caneleira',
    category: 'Acessórios',
    price: 'R$ 59,90',
    installment: 'ou 2x de R$ 34,90 sem juros',
    description:
      'Esqueça fitas e esparadrapos. Acessório ideal para prender e guardar sua caneleira com cuidado e estilo.',
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
      'Necessaire premium, robusta e versátil. Ideal para organizar itens de viagem ou transportar chuteiras.',
    label: '',
    image: '/produtos/necessaire-lv.png',
    accentClass: 'from-zinc-100 via-white to-zinc-300',
  },
  {
    id: 'meia-pro',
    name: 'Meia Pro Socks',
    category: 'Acessórios',
    price: 'R$ 37,90',
    installment: '',
    description:
      'Tecnologia antiderrapante no solado, evitando deslizes dentro da chuteira e prevenindo bolhas.',
    label: '',
    image: '/produtos/meia-pro-socks.png',
    accentClass: 'from-green-100 via-white to-green-300',
  },
  {
    id: 'canelito',
    name: 'Canelito (Meião Cortado)',
    category: 'Acessórios',
    price: 'R$ 34,90',
    installment: '',
    textImage: 'Consultar Cores',
    description:
      'Oferece a compressão ideal para manter a panturrilha aquecida e a caneleira no lugar.',
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
