import { sql } from '@/lib/db';
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

async function ensureUniqueId(baseName: string, ignoreId?: string) {
  const baseId = slugify(baseName) || crypto.randomUUID();

  const existing =
    await sql`SELECT id FROM ifj.products WHERE id = ${baseId} ${ignoreId ? sql`AND id != ${ignoreId}` : sql``}`;

  if (existing.length === 0) {
    return baseId;
  }

  let suffix = 2;
  let candidate = `${baseId}-${suffix}`;

  while (true) {
    const check =
      await sql`SELECT id FROM ifj.products WHERE id = ${candidate}`;
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

    return {
      customProducts: sortProducts(
        rows.filter((r) => r.section === 'customProducts').map(mapRowToProduct),
      ),
      storeProducts: sortProducts(
        rows.filter((r) => r.section === 'storeProducts').map(mapRowToProduct),
      ),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return emptyCollection;
  }
}

export async function createProduct(
  section: ProductSection,
  input: ProductInput,
) {
  const name = input.name.trim();
  if (!name) throw new Error('Informe o nome do produto.');

  const price = parsePrice(input.price);
  if (!price || price < 0) throw new Error('Informe um preço válido.');

  const id = await ensureUniqueId(name);

  await sql`
    INSERT INTO ifj.products (
      id, name, category, price, installment, description, highlight, image, text_image, section
    ) VALUES (
      ${id}, ${name}, ${input.category || null}, ${price}, ${input.installment || null}, 
      ${input.description}, ${input.highlight || null}, ${input.image || null}, 
      ${input.textImage || null}, ${section}
    )
  `;

  return {
    id,
    name,
    category: input.category,
    price,
    installment: input.installment,
    description: input.description,
    highlight: input.highlight,
    image: input.image,
    textImage: input.textImage,
  };
}

export async function updateProduct(
  id: string,
  section: ProductSection,
  input: ProductInput,
) {
  const name = input.name.trim();
  if (!name) throw new Error('Informe o nome do produto.');

  const price = parsePrice(input.price);
  if (!price || price < 0) throw new Error('Informe um preço válido.');

  const newId = await ensureUniqueId(name, id);

  await sql`
    UPDATE ifj.products SET
      id = ${newId},
      name = ${name},
      category = ${input.category || null},
      price = ${price},
      installment = ${input.installment || null},
      description = ${input.description},
      highlight = ${input.highlight || null},
      image = ${input.image || null},
      text_image = ${input.textImage || null},
      section = ${section},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `;

  return {
    id: newId,
    name,
    category: input.category,
    price,
    installment: input.installment,
    description: input.description,
    highlight: input.highlight,
    image: input.image,
    textImage: input.textImage,
  };
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM ifj.products WHERE id = ${id}`;
}
