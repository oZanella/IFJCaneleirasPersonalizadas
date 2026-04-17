import { AboutSection } from "@/features/landing/ui/components/about-section";
import { FooterSection } from "@/features/landing/ui/components/footer-section";
import { HeroSection } from "@/features/landing/ui/components/hero-section";
import { LandingHeader } from "@/features/landing/ui/components/landing-header";
import { ProductsSection } from "@/features/landing/ui/components/products-section";

export function LandingHome() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProductsSection />
        <AboutSection />
      </main>
      <FooterSection />
    </div>
  );
}
