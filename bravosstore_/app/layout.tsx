/*
  ARQUIVO: layout.tsx
  Função: estrutura principal do Next.js.
  Tudo que aparece em todas as páginas passa por esse layout.
  Aqui também são carregados os estilos globais e metadados do site.
*/

// Layout raiz do Next.js. Define metadados do site e carrega estilos globais.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRAVOS STORE",
  description: "Equipamentos esportivos de elite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Forçando a renderização com o fundo preto profissional do Tailwind */}
      <body className="bg-[#09090b] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
