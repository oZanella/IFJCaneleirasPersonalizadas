import type { Metadata } from 'next';
import './globals.css';

const siteConfig = {
  name: 'IFJ Caneleiras Personalizadas',
  description:
    'Personalize suas caneleiras de futebol com nosso serviço de personalização. Adicione seu nome, número ou design exclusivo para destacar-se em campo.',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-muted/40 text-foreground min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
