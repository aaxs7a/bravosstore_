import React from 'react';

const FEATURED_PRODUCTS = [
  { 
    id: 1, 
    name: "JAQUETA CORTA-VENTO STEALTH", 
    category: "LINHA SHIELD / CORRIDA", 
    price: "289,90", 
    desc: "• Tecido de alta densidade repelente à água\n• Modelagem slim com ajuste anatômico" 
  },
  { 
    id: 2, 
    name: "TÊNIS BRAVO PULSAR NEON v2", 
    category: "PROPULSÃO / PERFORMANCE", 
    price: "549,90", 
    desc: "• Amortecimento responsivo de última geração\n• Mesh respirável ultra leve com detalhes neon" 
  },
  { 
    id: 3, 
    name: "CORINGA ARMOR HOODIE", 
    category: "LINHA URBAN / COLD", 
    price: "289,90", 
    desc: "• Algodão premium com interior peluciado\n• Capuz ajustável com gola alta integrada" 
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans selection:bg-[#00ff66] selection:text-black">
      
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#00ff66] text-black text-[11px] font-black tracking-[0.2em] text-center py-2.5 uppercase">
        FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • USE O CUPOM: BRAVOT0
      </div>

      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-[#070708]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Oficial Definido */}
          <a href="#" className="text-xl font-black tracking-[0.15em] text-white uppercase">
            BRAVOS<span className="text-[#00ff66] font-serif text-lg lowercase">'s</span> STORE
          </a>

          {/* Links de Navegação */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
            <a href="#" className="text-[#00ff66] relative after:absolute after:bottom-[-29px] after:left-0 after:w-full after:h-[2px] after:bg-[#00ff66]">INÍCIO</a>
            <a href="#" className="hover:text-white transition-colors">COLEÇÕES</a>
            <a href="#" className="hover:text-white transition-colors">MASCULINO</a>
            <a href="#" className="hover:text-white transition-colors">FEMININO</a>
          </nav>

          {/* Carrinho */}
          <div className="flex items-center">
            <button className="text-zinc-400 hover:text-white text-[11px] font-bold tracking-widest bg-zinc-900/60 px-5 py-2.5 rounded-full border border-zinc-800 flex items-center gap-2">
              CARRINHO <span className="bg-[#00ff66] text-black font-black text-[10px] px-2 py-0.5 rounded-full">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE IMPACTO */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Lado Esquerdo: Mensagem da Marca */}
        <div className="lg:col-span-6 space-y-8">
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
            Engenharia têxtil avançada com fios de compressão inteligentes e tecnologia dry-fit de máxima absorção. Projetado para atletas de elite que exigem o máximo em performance e estilo.
          </p>

          <div className="pt-2">
            <button className="bg-[#00ff66] hover:bg-[#00cc55] text-black font-black text-xs tracking-[0.2em] uppercase px-10 py-4.5 rounded shadow-[0_0_40px_rgba(0,255,102,0.25)] flex items-center gap-2 transition-all cursor-pointer">
              VER COLEÇÃO COMPLETA <span>→</span>
            </button>
          </div>
        </div>

        {/* Lado Direito: Grid Assimétrica de Exibição */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center relative">
          
          {/* Card Esquerdo Slidável */}
          <div className="col-span-6 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 relative h-[340px] flex flex-col justify-between">
            <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 text-white p-1 rounded border border-zinc-800 text-xs cursor-pointer select-none">‹</div>
            <div className="w-full h-full flex items-center justify-center text-7xl select-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              🧥
            </div>
            <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 text-white p-1 rounded border border-zinc-800 text-xs cursor-pointer select-none">›</div>
          </div>

          {/* Card Direito de Foco Principal */}
          <div className="col-span-6 bg-zinc-900/40 border border-[#00ff66]/20 shadow-[0_0_40px_rgba(0,255,102,0.03)] rounded-xl p-4 relative h-[380px] flex flex-col justify-between">
            <div className="w-full h-full flex items-center justify-center text-8xl select-none filter drop-shadow-[0_0_25px_rgba(0,255,102,0.15)]">
              👟
            </div>
            
            {/* Tag do Carrossel */}
            <div className="bg-black/60 border border-zinc-800/80 backdrop-blur-md p-3 rounded-lg mt-2">
              <span className="text-[9px] font-mono text-zinc-500 block">PRODUTO CORE_01</span>
              <span className="text-xs font-black text-white tracking-wider block uppercase">CORINGA ARMOR HOODIE</span>
              <div className="flex gap-1 mt-2 justify-end">
                <span className="w-3 h-1 bg-[#00ff66] rounded-full"></span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* VITRINE PRINCIPAL HIERÁRQUICA */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-900/60">
        <div className="mb-10">
          <span className="text-[10px] font-mono text-zinc-500 block mb-1 tracking-widest uppercase">// EQUIPAMENTOS DE ELITE</span>
          <div className="w-12 h-[1px] bg-zinc-800"></div>
        </div>

        {/* Grade de Cards Detalhados Horizontais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#0f0f11] border border-zinc-900 rounded-xl p-4 flex gap-4 items-center group hover:border-zinc-800 transition-all duration-300"
            >
              {/* Box de Imagem Técnica */}
              <div className="w-32 h-32 bg-zinc-950 border border-zinc-900 rounded-lg flex items-center justify-center text-5xl relative overflow-hidden shrink-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:10px_10px]">
                {product.id === 1 && "🧥"}
                {product.id === 2 && "👟"}
                {product.id === 3 && "👕"}
              </div>

              {/* Informações Técnicas e Preço */}
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <h3 className="text-xs font-black tracking-wide text-white group-hover:text-[#00ff66] transition-colors uppercase leading-tight">
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
                  <button className="border border-zinc-800 hover:border-[#00ff66] hover:bg-[#00ff66]/5 text-[9px] font-black tracking-wider text-zinc-300 hover:text-[#00ff66] px-3 py-2 rounded uppercase transition-all whitespace-nowrap cursor-pointer">
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