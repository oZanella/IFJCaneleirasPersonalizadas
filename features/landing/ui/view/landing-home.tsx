import type { ProductCollection } from '@/features/landing/data/landing-content';
import { AboutSection } from "@/features/landing/ui/components/about-section";
import { FooterSection } from "@/features/landing/ui/components/footer-section";
import { HeroSection } from "@/features/landing/ui/components/hero-section";
import { LandingHeader } from "@/features/landing/ui/components/landing-header";
import { ProductsSection } from "@/features/landing/ui/components/products-section";

type LandingHomeProps = {
  products: ProductCollection;
  isAdmin: boolean;
};

export function LandingHome({ products, isAdmin }: LandingHomeProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingHeader isAdmin={isAdmin} />
      <main>
        <HeroSection />
        <ProductsSection products={products} isAdmin={isAdmin} />
        <AboutSection />
      </main>
      <FooterSection />
    </div>
  );
}
