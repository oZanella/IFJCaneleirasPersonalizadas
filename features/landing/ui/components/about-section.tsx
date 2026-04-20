import { RevealOnScroll } from '@/features/landing/ui/components/reveal-on-scroll';
import { SectionTitle } from '@/features/landing/ui/components/section-title';

export function AboutSection() {
  return (
    <section id="sobre" className="bg-black px-5 py-16 sm:px-8 lg:px-12">
      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Sobre a marca"
            title="Personalização que transforma a caneleira em algo único"
            description="A proposta da loja é permitir que cada cliente tenha uma peça feita com a própria história, imagem ou mensagem especial."
          />
        </RevealOnScroll>

        <div className="grid gap-5"></div>
      </div>
    </section>
  );
}
