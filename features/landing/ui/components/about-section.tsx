import { Card, CardContent } from "@/components/ui/card";
import { aboutParagraphs } from "@/features/landing/data/landing-content";
import { RevealOnScroll } from "@/features/landing/ui/components/reveal-on-scroll";
import { SectionTitle } from "@/features/landing/ui/components/section-title";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-black px-5 py-16 sm:px-8 lg:px-12">
      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Sobre a marca"
            title="Uma landing com ritmo visual, e nao apenas uma lista de produtos"
            description="As referencias serviram de base para o tom geral, mas a composicao, os espacamentos e a hierarquia foram redesenhados para criar algo proprio."
          />
        </RevealOnScroll>

        <div className="grid gap-5">
          {aboutParagraphs.map((paragraph, index) => (
            <RevealOnScroll key={paragraph} delay={index * 120}>
              <Card className="bg-[#0e0e0e]">
                <CardContent>
                  <p className="text-base leading-8 text-white/64">{paragraph}</p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
