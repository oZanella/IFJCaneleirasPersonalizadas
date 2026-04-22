'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type AdminSessionControlsProps = {
  initialIsAdmin: boolean;
  mobile?: boolean;
  onLoginSuccess?: () => void;
};

export function AdminSessionControls({
  initialIsAdmin,
  mobile = false,
  onLoginSuccess,
}: AdminSessionControlsProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? 'Não foi possível entrar.');
      setIsSubmitting(false);
      return;
    }

    setIsAdmin(true);
    setIsModalOpen(false);
    setEmail('');
    setPassword('');
    setIsSubmitting(false);
    onLoginSuccess?.();
    router.refresh();
  }

  async function handleLogout() {
    setIsSubmitting(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAdmin(false);
    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <>
      {isAdmin ? (
        <Button
          type="button"
          variant={mobile ? 'outline' : 'ghost'}
          size={mobile ? 'default' : 'sm'}
          className={
            mobile ? 'w-full justify-center cursor-pointer' : 'cursor-pointer'
          }
          onClick={handleLogout}
          disabled={isSubmitting}
        >
          Sair
        </Button>
      ) : (
        <Button
          type="button"
          variant={mobile ? 'outline' : 'ghost'}
          size={mobile ? 'default' : 'sm'}
          className={
            mobile ? 'w-full justify-center cursor-pointer' : 'cursor-pointer'
          }
          onClick={() => setIsModalOpen(true)}
        >
          Login
        </Button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-md flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="mb-6">
              <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.05em] text-white">
                Entrar como administrador
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Apenas o administrador pode realizar o login.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  E-mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                  placeholder="seuemail@dominio.com"
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Senha
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </label>

              {error ? <p className="text-sm text-red-300">{error}</p> : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError('');
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
