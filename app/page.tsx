"use client";

import React, { useState } from 'react';

const FEATURED_PRODUCTS = [
  { 
    id: 1, 
    name: "JAQUETA CORTA-VENTO STEALTH", 
    category: "LINHA SHIELD / CORRIDA", 
    price: "289,90", 
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    desc: "• Tecido de alta densidade repelente à água\n• Modelagem slim com ajuste anatômico" 
  },
  { 
    id: 2, 
    name: "TÊNIS BRAVO PULSAR NEON v2", 
    category: "PROPULSÃO / PERFORMANCE", 
    price: "549,90", 
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80",
    desc: "• Amortecimento responsivo de última geração\n• Mesh respirável ultra leve com detalhes neon" 
  },
  { 
    id: 3, 
    name: "CORINGA ARMOR HOODIE", 
    category: "LINHA URBAN / COLD", 
    price: "289,90", 
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
    desc: "• Algodão premium com interior peluciado\n• Capuz ajustável com gola alta integrada" 
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("INÍCIO"); // Estado para controlar a aba ativa da navbar

  // Estado para controlar qual produto está em destaque no centro
  const [currentIndex, setCurrentIndex] = useState(1); // Começa no Tênis Pulsar (index 1)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURED_PRODUCTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);
  };

  // Funções auxiliares para pegar os produtos da esquerda e da direita de forma infinita
  const getLeftIndex = () => (currentIndex - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length;
  const getRightIndex = () => (currentIndex + 1) % FEATURED_PRODUCTS.length;

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans selection:bg-[#00ff66] selection:text-black overflow-x-hidden">
      
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#00ff66] text-black text-[11px] font-black tracking-[0.2em] text-center py-2.5 uppercase">
        FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • USE O CUPOM: BRAVOT0
      </div>

      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-[#070708]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Oficial */}
          <a href="#" className="text-xl font-black italic tracking-[0.15em] text-white uppercase transition-transform duration-200 hover:scale-110">
            BRAVOS<span className="text-[#00ff66] font-serif text-lg lowercase">'s</span> STORE
          </a>

{/* Links de Navegação Dinâmicos */}
<nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 select-none">
  {["INÍCIO", "COLEÇÕES", "MASCULINO", "FEMININO"].map((tab) => {
    const isActive = activeTab === tab;
    return (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`relative py-2 transition-colors duration-300 cursor-pointer uppercase ${
          isActive 
            ? "text-[#00ff66]" 
            : "hover:text-white text-zinc-400"
        }`}
      >
        {tab}
        {/* Listra verde que só aparece no botão ativo */}
        {isActive && (
          <span className="absolute bottom-[-21px] left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.6)] transition-all" />
        )}
      </button>
    );
  })}
</nav>

{/* Carrinho com Ícone Minimalista e Alerta Flutuante */}
<div className="flex items-center">
  <button className="relative w-12 h-12 flex items-center justify-center bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-zinc-700 active:scale-95 cursor-pointer group">
    
    {/* Ícone de Sacola em SVG Puro */}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-300 group-hover:text-[#00ff66] transition-colors duration-200">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>

    {/* Alerta de Quantidade Flutuante (Badge) */}
    <span className="absolute -top-1 -right-1 bg-[#00ff66] text-black font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,102,0.4)] transition-transform duration-300 group-hover:scale-110">
      0
    </span>
    
  </button>
 </div>
</div>
</header>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Lado Esquerdo: Mensagem da Marca */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#00ff66]/60"></span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#00ff66] uppercase">
              DROP 01 // HIGH PERFORMANCE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9] text-white italic">
            NÃO FORCE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-emerald-400 to-emerald-500 drop-shadow-[0_0_30px_rgba(0,255,102,0.2)]">
              SUPERE.
            </span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base max-w-xl tracking-wide leading-relaxed font-light">
            Anatomia têxtil avançada com fios de compressão inteligentes e engenharia dry-fit de máxima absorção. Projetado milimetricamente para atletas de elite que exigem o ápice em performance e presença urbana.
          </p>

          <div className="pt-2">
            <button className="bg-[#00ff66] text-black font-black text-xs tracking-[0.2em] uppercase px-10 py-4.5 rounded shadow-[0_0_40px_rgba(0,255,102,0.25)] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-[#00cc55] active:scale-98 cursor-pointer">
              VER COLEÇÃO COMPLETA <span>→</span>
            </button>
          </div>
        </div>

        {/* Lado Direito: Sistema Avançado de Carrossel com Visual Neon */}
        <div className="lg:col-span-7 flex items-center justify-center relative px-4 select-none">
          
          {/* SETA ESQUERDA (Estilo Cyber-Ring) */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 lg:left-4 z-30 w-12 h-12 rounded-full border-2 border-[#00ff66] bg-black/80 text-[#00ff66] flex items-center justify-center hover:bg-[#00ff66] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.4)] hover:scale-110 active:scale-90 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* CONTAINER DOS CARDS REAIS */}
          <div className="w-full flex items-center justify-center gap-4 relative overflow-visible h-[420px]">
            
            {/* Card de Fundo / Esquerda (Parcialmente Visível) */}
            <div className="w-[20%] h-[320px] rounded-xl overflow-hidden border border-zinc-900 opacity-30 hidden md:block blur-[1px] transform scale-90 transition-all duration-500">
              <img src={FEATURED_PRODUCTS[getLeftIndex()].image} alt="Anterior" className="w-full h-full object-cover" />
            </div>

            {/* CARD PRINCIPAL EM DESTAQUE (Centro) */}
            <div className="w-[100%] md:w-[60%] h-[400px] bg-zinc-900/40 border border-[#00ff66]/30 shadow-[0_0_50px_rgba(0,255,102,0.06)] rounded-2xl relative flex flex-col justify-between overflow-hidden group transition-all duration-500 ease-out">
              <div className="w-full h-full overflow-hidden relative">
                <img 
                  src={FEATURED_PRODUCTS[currentIndex].image} 
                  alt={FEATURED_PRODUCTS[currentIndex].name}
                  key={currentIndex} // Força animação suave de fade ao trocar
                  className="w-full h-full object-cover opacity-90 group-hover:scale-108 transition-all duration-700 ease-out animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent"></div>
              </div>
              
              {/* Tag com Informações Dinâmicas */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-zinc-800/80 backdrop-blur-md p-4 rounded-xl z-10 transform transition-all duration-300 group-hover:border-[#00ff66]/40">
                <span className="text-[9px] font-mono text-[#00ff66] block tracking-widest uppercase">{FEATURED_PRODUCTS[currentIndex].category}</span>
                <span className="text-sm font-black text-white tracking-wider block uppercase mt-0.5">{FEATURED_PRODUCTS[currentIndex].name}</span>
                
                {/* Indicadores Dinâmicos de bolinha (Dots) */}
                <div className="flex gap-1.5 mt-3 justify-end">
                  {FEATURED_PRODUCTS.map((_, idx) => (
                    <span 
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-[#00ff66]' : 'w-1 bg-zinc-700'}`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card de Fundo / Direita (Parcialmente Visível) */}
            <div className="w-[20%] h-[320px] rounded-xl overflow-hidden border border-zinc-900 opacity-30 hidden md:block blur-[1px] transform scale-90 transition-all duration-500">
              <img src={FEATURED_PRODUCTS[getRightIndex()].image} alt="Próximo" className="w-full h-full object-cover" />
            </div>

          </div>

          {/* SETA DIREITA (Estilo Cyber-Ring) */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 lg:right-4 z-30 w-12 h-12 rounded-full border-2 border-[#00ff66] bg-black/80 text-[#00ff66] flex items-center justify-center hover:bg-[#00ff66] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.4)] hover:scale-110 active:scale-90 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

        </div>
      </main>

      {/* VITRINE PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-900/60">
        <div className="mb-10">
          <span className="text-[15px] font-mono text-zinc-500 block mb-1 tracking-widest uppercase">// EQUIPAMENTOS DE ELITE</span>
          <div className="w-12 h-[1px] bg-zinc-800"></div>
        </div>

        {/* Grade de Cards Horizontais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className={`bg-[#0f0f11] border rounded-xl p-4 flex gap-4 items-center group hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ${product.id === currentIndex + 1 ? 'border-[#00ff66]/30 bg-zinc-900/20' : 'border-zinc-900 hover:border-zinc-800'}`}
            >
              <div className="w-32 h-32 bg-zinc-950 border border-zinc-900 rounded-lg relative overflow-hidden shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-115 group-hover:opacity-100 transition-all duration-500 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
              </div>

              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <h3 className="text-xs font-black tracking-wide text-white group-hover:text-[#00ff66] transition-colors duration-200 uppercase leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1.5 whitespace-pre-line leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">
                    R$ <span className="text-sm font-black text-[#00ff66]">{product.price}</span>
                  </span>
                  <button className="border border-zinc-800 text-[9px] font-black tracking-wider text-zinc-300 px-3 py-2 rounded uppercase whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 hover:border-[#00ff66] hover:bg-[#00ff66]/5 hover:text-[#00ff66] active:scale-95">
                    ADICIONAR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#050506] py-10 text-zinc-600 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BRAVOS's STORE. POWERED BY NEXT.JS 15 & TAILWIND v4.</p>
          <div className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-950 flex items-center justify-center text-white text-[9px] font-black select-none">
            N
          </div>
        </div>
      </footer>

    </div>
  );
}