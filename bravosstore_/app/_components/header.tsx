"use client";

/*
  ARQUIVO: header.tsx
  Função: cabeçalho fixo da loja.
  Controla navbar, pesquisa, login/cadastro e abertura do carrinho.
  A navegação funciona tanto na home quanto dentro da página de produto.
*/

// Cabeçalho fixo da loja. Controla navbar, pesquisa, login/cadastro e abertura do carrinho.

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  totalItems: number;
  setIsCartOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAuthClick?: () => void;
  loggedUserName?: string;
  onLogout?: () => void;
}

export default function Header({ totalItems, setIsCartOpen, searchQuery, setSearchQuery, onAuthClick, loggedUserName, onLogout }: HeaderProps) {
  // Guarda qual item da navbar está marcado como ativo.
  const [localActiveTab, setLocalActiveTab] = React.useState("INÍCIO");
  const [mounted, setMounted] = useState(false);

  // Evita erros de hydration garantindo que o componente foi montado no client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hooks do Next usados para redirecionar entre páginas sem recarregar o site.
  const router = useRouter();
  const pathname = usePathname();

  // Mapa que transforma o texto da navbar no id da seção da página inicial.
  const sectionByTab: Record<string, string> = {
    "INÍCIO": "topo",
    "COLEÇÕES": "colecoes",
    "MASCULINO": "masculino",
    "FEMININO": "feminino",
  };

  // Faz a rolagem com desconto da altura da navbar fixa, para o título não ficar escondido.
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "topo") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      const offset = 160;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };
  
  const handleTabClick = (tab: string) => {
    setLocalActiveTab(tab);

    const sectionId = sectionByTab[tab] || "topo";

    // Se o usuário estiver dentro da página de detalhes de um produto, primeiro volta para a home.
    // O hash (#colecoes, #masculino...) indica qual seção deve abrir depois do redirecionamento.
    if (pathname !== "/") {
      router.push(sectionId === "topo" ? "/" : `/#${sectionId}`);
      return;
    }

    scrollToSection(sectionId);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#00ff66] text-black text-[13px] md:text-[15px] font-black tracking-[0.2em] text-center py-2 uppercase relative z-50">
        FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • USE O CUPOM: BRAVOT777
      </div>

      {/* NAVBAR PRINCIPAL COMPLETA */}
      <header className="border-b border-zinc-900 bg-[#070708]/95 backdrop-blur-md px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto h-20 flex items-center justify-between gap-8">
          
          {/* LOGO */}
          <div className="flex-shrink-0 pr-4">
            <button 
              onClick={() => handleTabClick("INÍCIO")} 
              className="text-xl font-black italic tracking-[0.12em] text-[26px] md:text-[30px] text-white uppercase transition-all duration-200 hover:scale-105 bg-transparent border-none cursor-pointer"
            >
              BRAVO<span className="text-[#00ff66]">'s</span> STORE
            </button>
          </div>

          {/* MENU DE NAVEGAÇÃO CENTRALIZADO */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-bold tracking-[0.15em] uppercase text-zinc-400 select-none flex-shrink-0">
            {["INÍCIO", "COLEÇÕES", "MASCULINO", "FEMININO"].map((tab) => {
              const isActive = localActiveTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative py-2 transition-colors duration-300 cursor-pointer uppercase font-black ${
                    isActive ? "text-[#00ff66]" : "hover:text-white text-zinc-400"
                  }`}
                >
                  {tab}
                  {isActive && <span className="absolute bottom-[-25px] left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.6)]" />}
                </button>
              );
            })}
          </nav>

          {/* BARRA DE PESQUISA EXPANDIDA + MENUS DE AÇÃO */}
          <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
            
            {/* INPUT DE PESQUISA CONECTADO */}
            <div className="relative hidden sm:block w-full max-w-md xl:max-w-xl">
              <input 
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 text-zinc-200 text-xs font-medium pl-10 pr-4 py-2.5 rounded-full border border-zinc-800 focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition-all placeholder-zinc-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
              </svg>
            </div>

            {/* ÁREA DE AUTENTICAÇÃO (LOGIN/CADASTRO) */}
            {loggedUserName ? (
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                <span className="max-w-28 truncate text-[11px] font-black tracking-widest text-[#00ff66] uppercase">{loggedUserName}</span>
                <button onClick={onLogout} className="text-[10px] font-black tracking-widest text-zinc-500 hover:text-red-400 uppercase cursor-pointer">Sair</button>
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer group flex-shrink-0"
                title="Entrar ou cadastrar"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-full group-hover:border-zinc-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-300 group-hover:text-[#00ff66] transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <span className="text-[11px] font-black tracking-widest hidden xl:block uppercase">ENTRAR</span>
              </button>
            )}

            {/* BOTÃO DO CARRINHO */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative w-9 h-9 flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105 hover:border-zinc-700 active:scale-95 cursor-pointer group flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-300 group-hover:text-[#00ff66] transition-colors duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#00ff66] text-black font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,102,0.4)]">
                {mounted ? totalItems : 0}
              </span>
            </button>

          </div>
        </div>
      </header>
    </div>
  );
}