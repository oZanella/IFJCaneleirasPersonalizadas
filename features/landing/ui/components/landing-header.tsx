import { navigationItems } from "@/features/landing/data/landing-content";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8c0-3.2 3.2-5.5 7-5.5s7 2.3 7 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6.5 8.5h11l-1 10a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8Zm3-1V7a2.5 2.5 0 0 1 5 0v.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-8">
          <a href="#inicio" className="shrink-0 leading-none">
            <span className="block text-[1.7rem] font-black uppercase tracking-[0.42em] sm:text-[2rem]">
              IFJ
            </span>
            <span className="block text-[0.55rem] uppercase tracking-[0.42em] text-white/60 sm:text-[0.65rem]">
              Caneleiras personalizadas
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-transparent pb-1 transition hover:border-white hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5 text-white/85">
          <a href="#produtos" className="transition hover:text-white" aria-label="Buscar produtos">
            <SearchIcon />
          </a>
          <a href="#sobre" className="transition hover:text-white" aria-label="Sobre a loja">
            <UserIcon />
          </a>
          <a href="#footer" className="transition hover:text-white" aria-label="Contato">
            <BagIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
