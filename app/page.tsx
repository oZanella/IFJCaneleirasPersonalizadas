import type { Metadata } from "next";
import { LandingHome } from "@/features/landing/ui/view/landing-home";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProducts } from "@/lib/products-store";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Landing page para apresentar seus produtos.",
};

export default async function HomePage() {
  const [products, isAdmin] = await Promise.all([
    getProducts(),
    isAdminAuthenticated(),
  ]);

  return <LandingHome products={products} isAdmin={isAdmin} />;
}
