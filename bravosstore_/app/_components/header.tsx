"use client";

/*
  ARQUIVO: header.tsx
  Função: cabeçalho fixo da loja.
  Controla navbar, pesquisa, menu lateral de perfil, login/cadastro e abertura do carrinho.
*/

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
  onOpenProfileSettings?: () => void;
}

export default function Header({
  totalItems,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  onAuthClick,
  loggedUserName,
  onLogout,
  onOpenProfileSettings,
}: HeaderProps) {
  const [localActiveTab, setLocalActiveTab] = useState("INÍCIO");
  const [mounted, setMounted] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const sectionByTab: Record<string, string> = {
    "INÍCIO": "topo",
    "COLEÇÕES": "colecoes",
    "MASCULINO": "masculino",
    "FEMININO": "feminino",
  };

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

    if (pathname !== "/") {
      router.push(sectionId === "topo" ? "/" : `/#${sectionId}`);
      return;
    }

    scrollToSection(sectionId);
  };

  // Funções ajustadas para disparar eventos da sidebar com segurança
  const handleOpenSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileSidebarOpen(false);
    setTimeout(() => {
      if (onOpenProfileSettings) {
        onOpenProfileSettings();
      }
    }, 50);
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileSidebarOpen(false);
    setTimeout(() => {
      if (onLogout) {
        onLogout();
      }
    }, 50);
  };

  return (
    <>
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
              
              {/* INPUT DE PESQUISA */}
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

              {/* BOTÃO DO PERFIL DO UTILIZADOR */}
              {loggedUserName ? (
                <div className="border-r border-zinc-800 pr-5 flex items-center">
                  <button
                    onClick={() => setIsProfileSidebarOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[#00ff66]/50 hover:bg-zinc-800/80 transition-all cursor-pointer group shadow-sm"
                    title="Acessar Menu do Perfil"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] font-black text-xs uppercase group-hover:scale-105 transition-transform">
                      {loggedUserName.charAt(0)}
                    </div>
                    <span className="max-w-[130px] truncate text-xs font-black tracking-widest text-[#00ff66] uppercase italic">
                      {loggedUserName}
                    </span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer group flex-shrink-0 border-r border-zinc-800 pr-5 h-9"
                  title="Entrar ou cadastrar"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-full group-hover:border-zinc-700 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#00ff66] transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-black tracking-widest hidden xl:block uppercase">ENTRAR</span>
                </button>
              )}

              {/* BOTÃO DO CARRINHO */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative w-9 h-9 flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-400 hover:text-[#00ff66] transition-all duration-300 hover:scale-105 hover:border-[#00ff66]/30 active:scale-95 cursor-pointer group flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-300 group-hover:text-[#00ff66] group-hover:scale-110 transition-all duration-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 bg-[#00ff66] text-black font-mono font-black text-[9px] w-4.5 h-4.5 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(0,255,102,0.3)] border border-[#070708]">
                  {mounted ? totalItems : 0}
                </span>
              </button>

            </div>
          </div>
        </header>
      </div>

      {/* SIDEBAR LATERAL DO PERFIL */}
      {isProfileSidebarOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Fundo escuro com transição */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsProfileSidebarOpen(false)}
          />

          {/* Painel da Sidebar */}
          <div className="relative z-10 w-full max-w-xs bg-[#09090b] border-l border-zinc-800/80 h-full p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-right duration-300">
            <div>
              {/* Topo da Sidebar */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] font-black text-sm uppercase shadow-[0_0_15px_rgba(0,255,102,0.15)]">
                    {loggedUserName?.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Conta Ativa
                    </p>
                    <p className="text-sm font-black text-white uppercase italic truncate">
                      {loggedUserName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Opções do Menu */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleOpenSettings}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-[#00ff66]/40 hover:bg-zinc-800/50 text-zinc-200 hover:text-white text-xs font-mono uppercase tracking-wider transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#00ff66]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.773a1.125 1.125 0 0 1 .12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 0 1-1.45-.12l-.773-.773a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.349.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.149-.894Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span>Configurações do Perfil</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-red-950/40 bg-red-950/10 hover:bg-red-900/20 hover:border-red-800/50 text-red-400 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    <span>Sair da Conta</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-zinc-800/60">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                BRAVO'S STORE // SECURE SYSTEM
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}