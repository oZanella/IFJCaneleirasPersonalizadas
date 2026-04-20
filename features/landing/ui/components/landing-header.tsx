'use client';

import { navigationItems } from '@/features/landing/data/landing-content';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-360 items-center px-6 py-5 lg:px-12">
        <div className="flex shrink-0 items-center">
          <a
            href="#inicio"
            className="group flex flex-col items-start leading-none"
          >
            <span className="text-2xl font-black uppercase tracking-[0.3em] text-white transition group-hover:text-zinc-400 sm:text-3xl">
              IFJ
            </span>
            <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.4em] text-zinc-500 sm:text-[0.6rem]">
              Premium Custom
            </span>
          </a>
        </div>

        <nav className="hidden items-center gap-10 ml-20 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto lg:hidden">
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 h-screen bg-black/95 p-8 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-8 pt-10">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-widest text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
