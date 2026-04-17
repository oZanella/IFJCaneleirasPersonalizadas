import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroHighlights } from "@/features/landing/data/landing-content";
import { RevealOnScroll } from "@/features/landing/ui/components/reveal-on-scroll";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

      <div className="relative flex min-h-[calc(100vh-89px)] w-full items-stretch">
        <div className="hidden w-14 items-center justify-center border-r border-white/10 lg:flex">
          <span className="[writing-mode:vertical-rl] rotate-180 text-[0.7rem] uppercase tracking-[0.45em] text-white/45">
            Studio IFJ
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.62)),radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.42),rgba(255,255,255,0.08)_42%,transparent_68%),linear-gradient(125deg,#d6d7de_0%,#b5b8c4_24%,#f0f1f4_44%,#c7c7cd_68%,#8f939f_100%)]" />
          <div className="absolute inset-y-0 left-[8%] w-px bg-black/10" />
          <div className="absolute inset-y-0 right-[10%] w-px bg-black/10" />
          <div className="absolute left-[4%] top-[8%] -rotate-12 text-[clamp(4rem,15vw,13rem)] font-black uppercase tracking-[-0.08em] text-slate-900/80">
            IFJ
          </div>
          <div className="absolute right-[8%] top-[10%] rotate-90 text-[clamp(1rem,2vw,1.35rem)] font-semibold uppercase tracking-[0.4em] text-black/45">
            Performance
          </div>
          <div className="absolute bottom-[20%] left-[8%] h-[28%] w-[47%] rounded-[2rem] border border-black/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(228,228,228,0.92))] shadow-[0_30px_80px_rgba(0,0,0,0.22)]" />
          <div className="absolute bottom-[47%] left-[15%] rotate-[-2deg] rounded-full bg-[#f0eccb] px-8 py-5 text-[clamp(1.1rem,3vw,2.8rem)] font-black uppercase tracking-[0.08em] text-zinc-900 shadow-[0_14px_35px_rgba(0,0,0,0.18)]">
            Colecao autoral
          </div>
          <div className="absolute bottom-[17%] left-[13%] h-[16%] w-[12%] rounded-[1.5rem] border border-black/8 bg-[linear-gradient(180deg,#e9ebf5,#8097d9)] shadow-[0_18px_45px_rgba(0,0,0,0.16)]" />
          <div className="absolute bottom-[18%] left-[28%] h-[18%] w-[16%] rotate-[6deg] rounded-[1.5rem] border border-black/8 bg-[linear-gradient(180deg,#ececec,#9a9a9a)] shadow-[0_24px_55px_rgba(0,0,0,0.18)]" />
          <div className="absolute bottom-[12%] right-[8%] h-[29%] w-[10%] rounded-[2rem] bg-[linear-gradient(180deg,#2a2a2a,#0f0f0f)] shadow-[0_24px_70px_rgba(0,0,0,0.35)]" />
          <div className="absolute bottom-[8%] right-[2%] h-[25%] w-[11%] rounded-[2rem] bg-[linear-gradient(180deg,#383838,#090909)] shadow-[0_24px_70px_rgba(0,0,0,0.35)]" />

          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.88))] px-5 pb-8 pt-28 sm:px-8 lg:px-12">
            <RevealOnScroll className="flex w-full flex-col gap-10">
              <div className="max-w-4xl">
                <Badge>Destaque da semana</Badge>
                <h1 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.07em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  Uma vitrine forte, imersiva e feita para ocupar a tela inteira.
                </h1>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                  A referencia guiou o clima visual, mas esta home foi desenhada com
                  identidade propria: hero amplo, cards elegantes, seções reveladas no scroll
                  e foco total nos produtos e valores.
                </p>
              </div>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4 text-sm text-white/70 backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="#produtos">
                    <Button size="lg">Ver produtos</Button>
                  </a>
                  <a href="#footer">
                    <Button variant="outline" size="lg">
                      Falar com a loja
                    </Button>
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
