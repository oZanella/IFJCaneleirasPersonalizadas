import { sql, fragment } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

import type {
  Product,
  ProductCollection,
  ProductInput,
  ProductSection,
} from '@/features/landing/data/landing-content';

const emptyCollection: ProductCollection = {
  customProducts: [],
  storeProducts: [],
};

function isPriorityProduct(product: Product) {
  return Boolean(product.highlight?.trim() || product.textImage?.trim());
}

function sortProducts(products: Product[]) {
  const priorityProducts = products.filter(isPriorityProduct);
  const regularProducts = products.filter(
    (product) => !isPriorityProduct(product),
  );

  return [...priorityProducts, ...regularProducts];
}

function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category || undefined,
    price: Number(row.price),
    installment: row.installment || undefined,
    description: row.description,
    highlight: row.highlight || undefined,
    image: row.image || undefined,
    textImage: row.text_image || undefined,
  };
}

type ProductRow = {
  id: string;
  name: string;
  category: string | null;
  price: string | number;
  installment: string | null;
  description: string;
  highlight: string | null;
  image: string | null;
  text_image: string | null;
  section: string;
};

type NormalizedProductInput = {
  name: string;
  category: string | null;
  price: number;
  installment: string | null;
  description: string;
  highlight: string | null;
  image: string | null;
  textImage: string | null;
  section: ProductSection;
};

const VALID_SECTIONS: ProductSection[] = ['customProducts', 'storeProducts'];

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function parsePrice(value: number | string) {
  if (typeof value === 'number') {
    return value;
  }

  const normalized = value
    .replace(/[^\d.,]/g, '')
    .replace('.', '')
    .replace(',', '.');
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeOptionalText(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function normalizeSection(section: string): ProductSection {
  if (VALID_SECTIONS.includes(section as ProductSection)) {
    return section as ProductSection;
  }

  throw new Error('Seção inválida para o produto.');
}

function normalizeProductInput(
  section: ProductSection,
  input: ProductInput,
): NormalizedProductInput {
  const name = input.name.trim();
  if (!name) throw new Error('Informe o nome do produto.');

  const description = input.description.trim();
  if (!description) throw new Error('Informe a descrição do produto.');

  const normalizedSection = normalizeSection(section);
  const price = parsePrice(input.price);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error('Informe um preço válido.');
  }

  return {
    name,
    category: normalizeOptionalText(input.category),
    price,
    installment: normalizeOptionalText(input.installment),
    description,
    highlight: normalizeOptionalText(input.highlight),
    image: normalizeOptionalText(input.image),
    textImage: normalizeOptionalText(input.textImage),
    section: normalizedSection,
  };
}

async function ensureUniqueId(baseName: string, ignoreId?: string) {
  const baseId = slugify(baseName) || crypto.randomUUID();

  const existing =
    (await sql`SELECT id FROM ifj.products WHERE id = ${baseId} ${ignoreId ? fragment`AND id != ${ignoreId}` : fragment``}`) as Record<
      string,
      unknown
    >[];

  if (existing.length === 0) {
    return baseId;
  }

  let suffix = 2;
  let candidate = `${baseId}-${suffix}`;

  while (true) {
    const check =
      (await sql`SELECT id FROM ifj.products WHERE id = ${candidate}`) as Record<
        string,
        unknown
      >[];
    if (check.length === 0) break;
    suffix += 1;
    candidate = `${baseId}-${suffix}`;
  }

  return candidate;
}

export async function getProducts() {
  noStore();

  try {
    const rows =
      (await sql`SELECT * FROM ifj.products ORDER BY created_at DESC`) as ProductRow[];

    if (!rows || rows.length === 0) {
      console.warn('⚠️ Nenhum produto encontrado na tabela ifj.products.');
    }

    return {
      customProducts: sortProducts(
        rows.filter((r) => r.section === 'customProducts').map(mapRowToProduct),
      ),
      storeProducts: sortProducts(
        rows.filter((r) => r.section === 'storeProducts').map(mapRowToProduct),
      ),
    };
  } catch (error) {
    console.error('❌ Falha ao buscar produtos no banco:', error);
    return emptyCollection;
  }
}

export async function createProduct(
  section: ProductSection,
  input: ProductInput,
) {
  const normalized = normalizeProductInput(section, input);

  const id = await ensureUniqueId(normalized.name);

  await sql`
    INSERT INTO ifj.products (
      id, name, category, price, installment, description, highlight, image, text_image, section
    ) VALUES (
      ${id}, ${normalized.name}, ${normalized.category}, ${normalized.price}, ${normalized.installment}, 
      ${normalized.description}, ${normalized.highlight}, ${normalized.image}, 
      ${normalized.textImage}, ${normalized.section}
    )
  `;

  return {
    id,
    name: normalized.name,
    category: normalized.category ?? undefined,
    price: normalized.price,
    installment: normalized.installment ?? undefined,
    description: normalized.description,
    highlight: normalized.highlight ?? undefined,
    image: normalized.image ?? undefined,
    textImage: normalized.textImage ?? undefined,
  };
}

export async function updateProduct(
  id: string,
  section: ProductSection,
  input: ProductInput,
) {
  const normalized = normalizeProductInput(section, input);

  const newId = await ensureUniqueId(normalized.name, id);

  await sql`
    UPDATE ifj.products SET
      id = ${newId},
      name = ${normalized.name},
      category = ${normalized.category},
      price = ${normalized.price},
      installment = ${normalized.installment},
      description = ${normalized.description},
      highlight = ${normalized.highlight},
      image = ${normalized.image},
      text_image = ${normalized.textImage},
      section = ${normalized.section},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `;

  return {
    id: newId,
    name: normalized.name,
    category: normalized.category ?? undefined,
    price: normalized.price,
    installment: normalized.installment ?? undefined,
    description: normalized.description,
    highlight: normalized.highlight ?? undefined,
    image: normalized.image ?? undefined,
    textImage: normalized.textImage ?? undefined,
  };
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM ifj.products WHERE id = ${id}`;
}
