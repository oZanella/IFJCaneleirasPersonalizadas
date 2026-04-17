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
            Receba novidades
          </p>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Um fechamento forte para manter a loja memoravel.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/62 sm:text-base">
            Newsletter, informacoes da marca e blocos institucionais ajudam a
            encerrar a navegacao com mais confianca.
          </p>

          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="min-h-14 flex-1 rounded-full border border-white/20 bg-transparent px-5 text-white placeholder:text-white/35 focus:border-white focus:outline-none"
            />
            <Button type="submit" size="lg">
              Enviar
            </Button>
          </form>
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
              <Card className="bg-white/[0.03]">
                <CardContent>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/38">
                    Compra segura
                  </p>
                  <p className="mt-4 text-lg text-white/82">
                    Pagamentos facilitados, atendimento direto e experiencia premium.
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <Card className="bg-white/[0.03]">
                <CardContent>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/38">
                    Entrega e suporte
                  </p>
                  <p className="mt-4 text-lg text-white/82">
                    Atendimento rapido para pedidos personalizados e acompanhamento da compra.
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
