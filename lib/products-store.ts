import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { unstable_noStore as noStore } from "next/cache";

import type {
  Product,
  ProductCollection,
  ProductInput,
  ProductSection,
} from "@/features/landing/data/landing-content";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

const emptyCollection: ProductCollection = {
  customProducts: [],
  storeProducts: [],
};

function isPriorityProduct(product: Product) {
  return Boolean(product.highlight?.trim() || product.textImage?.trim());
}

function sortProducts(products: Product[]) {
  const priorityProducts = products.filter(isPriorityProduct);
  const regularProducts = products.filter((product) => !isPriorityProduct(product));

  return [...priorityProducts, ...regularProducts];
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function parsePrice(value: number | string) {
  if (typeof value === "number") {
    return value;
  }

  const normalized = value.replace(/[^\d.,]/g, "").replace(".", "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function ensureUniqueId(baseName: string, data: ProductCollection, ignoreId?: string) {
  const baseId = slugify(baseName) || crypto.randomUUID();
  const existingIds = new Set(
    [...data.customProducts, ...data.storeProducts]
      .filter((product) => product.id !== ignoreId)
      .map((product) => product.id),
  );

  if (!existingIds.has(baseId)) {
    return baseId;
  }

  let suffix = 2;
  let candidate = `${baseId}-${suffix}`;

  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${baseId}-${suffix}`;
  }

  return candidate;
}

function normalizeProduct(
  input: ProductInput,
  data: ProductCollection,
  fallbackId?: string,
): Product {
  const name = input.name.trim();

  if (!name) {
    throw new Error("Informe o nome do produto.");
  }

  const price = parsePrice(input.price);

  if (!price || price < 0) {
    throw new Error("Informe um preço válido.");
  }

  const id = ensureUniqueId(name, data, fallbackId);

  return {
    id,
    name,
    category: input.category?.trim() || undefined,
    price,
    installment: input.installment?.trim() || undefined,
    description: input.description.trim(),
    highlight: input.highlight?.trim() || undefined,
    image: input.image?.trim() || undefined,
    textImage: input.textImage?.trim() || undefined,
  };
}

function normalizeLoadedProduct(product: ProductInput & { id: string }): Product {
  return {
    id: product.id,
    name: product.name,
    category: product.category?.trim() || undefined,
    price: parsePrice(product.price),
    installment: product.installment?.trim() || undefined,
    description: product.description,
    highlight:
      ("highlight" in product ? product.highlight : undefined) ||
      ("badge" in product ? (product as ProductInput & { badge?: string }).badge : undefined),
    image: product.image?.trim() || undefined,
    textImage: product.textImage?.trim() || undefined,
  };
}

async function writeProducts(data: ProductCollection) {
  await fs.writeFile(
    productsFilePath,
    JSON.stringify(
      {
        customProducts: sortProducts(data.customProducts),
        storeProducts: sortProducts(data.storeProducts),
      },
      null,
      2,
    ),
  );
}

export async function getProducts() {
  noStore();

  try {
    const file = await fs.readFile(productsFilePath, "utf-8");
    const parsed = JSON.parse(file) as {
      customProducts?: Array<ProductInput & { id: string }>;
      storeProducts?: Array<ProductInput & { id: string }>;
    };

    return {
      customProducts: sortProducts((parsed.customProducts ?? []).map(normalizeLoadedProduct)),
      storeProducts: sortProducts((parsed.storeProducts ?? []).map(normalizeLoadedProduct)),
    };
  } catch {
    return emptyCollection;
  }
}

export async function createProduct(section: ProductSection, input: ProductInput) {
  const data = await getProducts();
  const product = normalizeProduct(input, data);

  if (isPriorityProduct(product)) {
    data[section].unshift(product);
  } else {
    data[section].push(product);
  }
  await writeProducts(data);

  return product;
}

export async function updateProduct(id: string, section: ProductSection, input: ProductInput) {
  const data = await getProducts();
  const currentSections: ProductSection[] = ["customProducts", "storeProducts"];
  let currentSection: ProductSection | null = null;
  let currentProduct: Product | null = null;

  for (const sectionName of currentSections) {
    const found = data[sectionName].find((product) => product.id === id);

    if (found) {
      currentSection = sectionName;
      currentProduct = found;
      break;
    }
  }

  if (!currentProduct || !currentSection) {
    throw new Error("Produto não encontrado.");
  }

  const updatedProduct = normalizeProduct({ ...currentProduct, ...input, id }, data, id);

  data[currentSection] = data[currentSection].filter((product) => product.id !== id);
  if (isPriorityProduct(updatedProduct)) {
    data[section].unshift(updatedProduct);
  } else {
    data[section].push(updatedProduct);
  }
  await writeProducts(data);

  return updatedProduct;
}

export async function deleteProduct(id: string) {
  const data = await getProducts();
  let removed = false;

  data.customProducts = data.customProducts.filter((product) => {
    if (product.id === id) {
      removed = true;
      return false;
    }

    return true;
  });

  data.storeProducts = data.storeProducts.filter((product) => {
    if (product.id === id) {
      removed = true;
      return false;
    }

    return true;
  });

  if (!removed) {
    throw new Error("Produto não encontrado.");
  }

  await writeProducts(data);
}
