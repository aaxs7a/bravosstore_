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
