import { Button } from '@/components/ui/button';
import {
  footerInfo,
  footerLinks,
} from '@/features/landing/data/landing-content';
import { RevealOnScroll } from '@/features/landing/ui/components/reveal-on-scroll';

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="border-t border-white/5 bg-black px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="w-full">
        <RevealOnScroll className="mx-auto max-w-4xl text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/40">
            Design Exclusivo
          </p>
          <h2 className="mt-6 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-8xl">
            Sua ideia, <br className="hidden sm:block" />
            <span className="text-white/60">nossa arte</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
            Pronto para entrar em campo com um acessório único? Fale com nosso
            time de criação e personalize cada detalhe da sua armadura.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/5554999254677?text=Ol%C3%A1%2C%20gostaria%20de%20personalizar%20meu%20equipamento%21"
              target="_blank"
              rel="noreferrer"
              className="sm:flex-1"
            >
              <Button
                size="lg"
                className="w-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wider cursor-pointer"
              >
                Contato via WhatsApp
              </Button>
            </a>
            <a
              href="https://instagram.com/ifj.caneleiras"
              target="_blank"
              rel="noreferrer"
              className="sm:flex-1"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider cursor-pointer"
              >
                Acompanhe nosso Instagram
              </Button>
            </a>
          </div>
        </RevealOnScroll>

        <div className="mt-24 grid gap-12 border-t border-white/10 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          <RevealOnScroll className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <span className="block text-[2.5rem] font-black leading-none tracking-tighter text-white">
                  IFJ
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-white/30">
                  Caneleiras personalizadas
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/40 max-w-xs">
                Especialistas em caneleiras personalizadas de alta resistência e
                meias de performance para atletas.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="flex flex-col gap-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/30">
              Contato
            </h4>
            <div className="space-y-4">
              {footerInfo.map((item) => (
                <div key={item.label} className="group">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors ">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-white/70">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="flex flex-col gap-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/30">
              Localização
            </h4>
            <p className="text-sm text-white/70">Caxias do Sul - RS</p>
          </RevealOnScroll>

          <RevealOnScroll className="flex flex-col gap-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/30">
              Promoções
            </h4>
            <p className="text-sm text-white/40 italic">
              Acompanhe diversas promoções no nosso Instagram.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll
          delay={200}
          className="mt-20 border-t border-white/5 pt-10"
        >
          <div className="flex flex-col gap-8 text-[0.7rem] uppercase tracking-widest text-white/30 lg:flex-row lg:items-center lg:justify-between">
            <p>© 2026 IFJ Caneleiras. Todos os direitos reservados.</p>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="https://www.instagram.com/zanella_03"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
}
