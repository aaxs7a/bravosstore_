import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalItems: number;
  setIsCartOpen: (isOpen: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, totalItems, setIsCartOpen }: HeaderProps) {
  return (
    <>
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#00ff66] text-black text-[17px] font-black tracking-[0.2em] text-center py-2.5 uppercase">
        FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • USE O CUPOM: BRAVOT777
      </div>

      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-[#070708]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-black italic tracking-[0.15em] text-[30px] text-white uppercase transition-transform duration-200 hover:scale-110">
            BRAVO<span className="text-[#00ff66]">'s</span> STORE
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 select-none">
            {["INÍCIO", "COLEÇÕES", "MASCULINO", "FEMININO"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-2 transition-colors duration-300 cursor-pointer uppercase ${isActive ? "text-[#00ff66]" : "hover:text-white text-zinc-400"}`}
                >
                  {tab}
                  {isActive && <span className="absolute bottom-[-21px] left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.6)]" />}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center">
            <button onClick={() => setIsCartOpen(true)} className="relative w-12 h-12 flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-zinc-700 active:scale-95 cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-300 group-hover:text-[#00ff66] transition-colors duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#00ff66] text-black font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,102,0.4)]">{totalItems}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}