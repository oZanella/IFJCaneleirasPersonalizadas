import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { footerInfo, footerLinks } from "@/features/landing/data/landing-content";
import { RevealOnScroll } from "@/features/landing/ui/components/reveal-on-scroll";

export function FooterSection() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-black px-5 py-16 sm:px-8 lg:px-12">
      <div className="w-full">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/45">
            Faca seu pedido
          </p>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Envie sua ideia e peça sua caneleira personalizada.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/62 sm:text-base">
            Se voce quer personalizar com foto, nome, numero, frase ou arte exclusiva,
            fale direto com a loja pelo WhatsApp ou acompanhe o Instagram.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/5554996655417?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20os%20valores%20dos%20produtos%20por%20gentileza%21"
              target="_blank"
              rel="noreferrer"
              className="sm:flex-1"
            >
              <Button size="lg" className="w-full">
                Chamar no WPP
              </Button>
            </a>
            <a
              href="https://instagram.com/ifj.caneleiras"
              target="_blank"
              rel="noreferrer"
              className="sm:flex-1"
            >
              <Button type="button" variant="outline" size="lg" className="w-full normal-case tracking-[0.08em]">
                Instagram @ifj.caneleiras
              </Button>
            </a>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-12 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <div>
              <span className="block text-[2rem] font-black uppercase tracking-[0.42em] text-white">
                IFJ
              </span>
              <span className="mt-1 block text-[0.72rem] uppercase tracking-[0.34em] text-white/45">
                Caneleiras personalizadas
              </span>

              <div className="mt-8 space-y-4">
                {footerInfo.map((item) => (
                  <p key={item.label} className="text-sm text-white/68">
                    <span className="mr-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/38">
                      {item.label}
                    </span>
                    {item.value}
                  </p>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid gap-5 sm:grid-cols-2">
            <RevealOnScroll delay={100}>
              <Card className="bg-white/3">
                <CardContent>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/38">
                    Personalizacao sob encomenda
                  </p>
                  <p className="mt-4 text-lg text-white/82">
                    Cada pedido e pensado para ficar com a identidade que o cliente imaginou.
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <Card className="bg-white/3">
                <CardContent>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/38">
                    Atendimento direto
                  </p>
                  <p className="mt-4 text-lg text-white/82">
                    Tire duvidas, envie sua referencia e combine todos os detalhes do pedido.
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </div>

        <RevealOnScroll delay={220} className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between">
            <p>© 2026 IFJ Caneleiras. Todos os direitos reservados.</p>
            <div className="flex flex-wrap gap-4">
              {footerLinks.map((link) => (
                <a key={link} href="#footer" className="transition hover:text-white/75">
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
