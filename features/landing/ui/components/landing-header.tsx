'use client';

import { AdminSessionControls } from '@/features/landing/ui/components/admin-session-controls';
import { navigationItems } from '@/features/landing/data/landing-content';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type LandingHeaderProps = {
  isAdmin: boolean;
};

export function LandingHeader({ isAdmin }: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('');
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  function handleMobileLoginSuccess() {
    setIsMenuOpen(false);
    setToastMessage('Login realizado com sucesso.');
    window.location.hash = 'inicio';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
      {toastMessage ? (
        <div className="fixed bottom-5 left-1/2 z-80 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-emerald-300/20 bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          {toastMessage}
        </div>
      ) : null}

      <div className="mx-auto flex w-full items-center px-6 py-5 lg:px-12">
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

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <AdminSessionControls initialIsAdmin={isAdmin} />
        </div>

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
            <div className="pt-4">
              <AdminSessionControls
                initialIsAdmin={isAdmin}
                mobile
                onLoginSuccess={handleMobileLoginSuccess}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
