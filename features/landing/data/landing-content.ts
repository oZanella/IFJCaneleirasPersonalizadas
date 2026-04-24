export type Product = {
  id: string;
  name: string;
  category?: string;
  price: number;
  installment?: string;
  description?: string;
  highlight?: string;
  image?: string;
  textImage?: string;
};

export type ProductSection = 'customProducts' | 'storeProducts';

export type ProductCollection = Record<ProductSection, Product[]>;

export type ProductInput = Omit<Product, 'id'> & {
  id?: string;
};

export const navigationItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#footer' },
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
