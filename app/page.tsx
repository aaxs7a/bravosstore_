"use client";

import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 📦 BANCO DE DADOS EXPANDIDO E SEPARADO POR CATEGORIAS
const ALL_PRODUCTS = [
  // 👟 CALÇADOS
  { 
    id: 1, 
    name: "TÊNIS BRAVO PULSAR NEON v2", 
    category: "CALÇADOS",
    subCategory: "PROPULSÃO / PERFORMANCE", 
    price: 549.90, 
    priceString: "549,90", 
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80",
    desc: "• Amortecimento responsivo de última geração\n• Mesh respirável ultra leve com detalhes neon" 
  },
  { 
    id: 2, 
    name: "BOOT CYBER TRACKER BLACK", 
    category: "CALÇADOS",
    subCategory: "OUTDOOR / RESISTÊNCIA", 
    price: 689.90, 
    priceString: "689,90", 
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
    desc: "• Solado tratorado com grip de alta tração\n• Cabedal impermeável com travas rápidas" 
  },
  { 
    id: 3, 
    name: "SNEAKER PHANTOM RUN v1", 
    category: "CALÇADOS",
    subCategory: "LINHA URBAN / DAILY", 
    price: 419.90, 
    priceString: "419,90", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    desc: "• Palmilha ergonômica anti-impacto\n• Design minimalista com ajuste em meia" 
  },

  // 🩳 BERMUDAS
  { 
    id: 4, 
    name: "BERMUDA COMPRESS SHIELD", 
    category: "BERMUDAS",
    subCategory: "COMPRESSÃO / TREINO", 
    price: 149.90, 
    priceString: "149,90", 
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80",
    desc: "• Forro interno de alta compressão muscular\n• Bolso embutido para smartphone anti-balanço" 
  },
  { 
    id: 5, 
    name: "", 
    category: "BERMUDAS",
    subCategory: "LINHA URBAN / UTILITY", 
    price: 189.90, 
    priceString: "189,90", 
    image: "https://imgcentauro-a.akamaihd.net/1024x1024/97916717A8.jpg",
    desc: "• Tecido ripstop militar ultra resistente\n• Bolsos modulares com fechamento tático" 
  },

  // 🧥 CAMISAS
  { 
    id: 6, 
    name: "JAQUETA CORTA-VENTO STEALTH", 
    category: "CAMISAS",
    subCategory: "LINHA SHIELD / CORRIDA", 
    price: 289.90, 
    priceString: "289,90", 
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    desc: "• Tecido de alta densidade repelente à água\n• Modelagem slim com ajuste anatômico" 
  },
  { 
    id: 7, 
    name: "CORINGA ARMOR HOODIE", 
    category: "CAMISAS",
    subCategory: "LINHA URBAN / COLD", 
    price: 289.90, 
    priceString: "289,90", 
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
    desc: "• Algodão premium com interior peluciado\n• Capuz ajustável com gola alta integrada" 
  }
];

// O carrossel do topo continuará usando os mesmos destaques fixos de antes
const HERO_PRODUCTS = [ALL_PRODUCTS[5], ALL_PRODUCTS[0], ALL_PRODUCTS[6]];

export default function Home() {
  const [activeTab, setActiveTab] = useState("INÍCIO");
  const [currentIndex, setCurrentIndex] = useState(1);
  
  // 🛒 ESTADOS DO CARRINHO
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🗂️ ESTADO DA ABA DA VITRINE (Começa em Calçados)
  const [activeCategory, setActiveCategory] = useState("CALÇADOS");
  
  // 🎹 ESTADO DO INDEX DO CARROSSEL DA VITRINE
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  // Filtrar produtos com base na aba selecionada da vitrine
  const filteredProducts = ALL_PRODUCTS.filter(p => p.category === activeCategory);

  // Lógica para rodar o carrossel inferior de 2 em 2 ou resetar
  const nextShowcase = () => {
    if (filteredProducts.length > 2 && showcaseIndex < filteredProducts.length - 2) {
      setShowcaseIndex(prev => prev + 1);
    } else {
      setShowcaseIndex(0); // Volta pro início de forma infinita
    }
  };

  const prevShowcase = () => {
    if (showcaseIndex > 0) {
      setShowcaseIndex(prev => prev - 1);
    } else if (filteredProducts.length > 2) {
      setShowcaseIndex(filteredProducts.length - 2); // Vai pro final
    }
  };

  // Mudar categoria e resetar a posição do carrossel inferior
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowcaseIndex(0);
  };

  // Funções do Carrinho
  const addToCart = (product: typeof ALL_PRODUCTS[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Funções do Carrossel Superior (Hero)
  const nextSlide = () => { setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_PRODUCTS.length); };
  const prevSlide = () => { setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length); };
  const getLeftIndex = () => (currentIndex - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;
  const getRightIndex = () => (currentIndex + 1) % HERO_PRODUCTS.length;

  return (
    <div className={`min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans selection:bg-[#00ff66] selection:text-black ${isCartOpen ? 'overflow-hidden' : 'overflow-x-hidden'}`}>
      
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-[#00ff66] text-black text-[11px] font-black tracking-[0.2em] text-center py-2.5 uppercase">
        FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • USE O CUPOM: BRAVOT0
      </div>

      {/* NAVBAR */}
      <header className="border-b border-zinc-900 bg-[#070708]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-black italic tracking-[0.15em] text-white uppercase transition-transform duration-200 hover:scale-110">
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
                  {isActive && <span className="absolute bottom-[-21px] left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.6)] animate-all" />}
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

      {/* CARRINHO LATERAL */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isCartOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0b0b0d] border-l border-zinc-900 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-[0.2em] uppercase text-white">SUA SACOLA</h2>
              <span className="bg-zinc-900 text-zinc-400 font-mono text-[10px] px-2 py-0.5 rounded-full border border-zinc-800">{totalItems}</span>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#00ff66] hover:border-[#00ff66] transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-zinc-500 text-xs font-mono tracking-wider uppercase">Seu carrinho está vazio.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="bg-zinc-950 border border-zinc-900 p-3 rounded-xl flex gap-3 items-center relative">
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="flex flex-col justify-between h-full w-full pr-6">
                    <h3 className="text-[11px] font-black text-white uppercase tracking-wide line-clamp-1">{item.name}</h3>
                    <p className="text-xs font-mono text-[#00ff66] mt-0.5">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded-md overflow-hidden w-max mt-1.5">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 text-zinc-500 hover:text-white text-xs font-bold">-</button>
                      <span className="px-2.5 py-0.5 text-zinc-300 font-mono text-[10px] bg-zinc-950">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 text-zinc-500 hover:text-white text-xs font-bold">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="absolute top-3 right-3 text-zinc-600 hover:text-red-500 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-900 bg-zinc-950/40 space-y-4">
              <div className="font-mono text-[11px] text-zinc-400 space-y-1">
                <div className="flex justify-between"><span>SUBTOTAL</span><span className="text-white font-bold">R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
                <div className="flex justify-between text-xs font-black text-white uppercase pt-2 border-t border-zinc-900 mt-2"><span>TOTAL</span><span className="text-[#00ff66]">R$ {(subtotal >= 299 ? subtotal : subtotal + 15).toFixed(2).replace('.', ',')}</span></div>
              </div>
              <button className="w-full bg-[#00ff66] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded cursor-pointer">FINALIZAR PEDIDO</button>
            </div>
          )}
        </div>
      </div>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#00ff66]/60"></span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#00ff66] uppercase">DROP 01 // HIGH PERFORMANCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9] text-white italic">
            NÃO FORCE.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-emerald-400 to-emerald-500 drop-shadow-[0_0_30px_rgba(0,255,102,0.2)]">SUPERE.</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl tracking-wide leading-relaxed font-light">
            Anatomia têxtil avançada com fios de compressão inteligentes e engenharia dry-fit de máxima absorção. Projetado milimetricamente para atletas de elite.
          </p>
          <div className="pt-2">
            <button className="bg-[#00ff66] text-black font-black text-xs tracking-[0.2em] uppercase px-10 py-4.5 rounded shadow-[0_0_40px_rgba(0,255,102,0.25)] flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
              VER COLEÇÃO COMPLETA <span>→</span>
            </button>
          </div>
        </div>

        {/* CARROSSEL HERO SUPERIOR */}
        <div className="lg:col-span-7 flex items-center justify-center relative px-4 select-none">
          <button onClick={prevSlide} className="absolute left-0 lg:left-4 z-30 w-12 h-12 rounded-full border-2 border-[#00ff66] bg-black/80 text-[#00ff66] flex items-center justify-center hover:bg-[#00ff66] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          </button>

          <div className="w-full flex items-center justify-center gap-4 relative h-[420px]">
            <div className="w-[20%] h-[320px] rounded-xl overflow-hidden border border-zinc-900 opacity-30 hidden md:block blur-[1px]">
              <img src={HERO_PRODUCTS[getLeftIndex()].image} alt="Anterior" className="w-full h-full object-cover" />
            </div>

            <div className="w-[100%] md:w-[60%] h-[400px] bg-zinc-900/40 border border-[#00ff66]/30 shadow-[0_0_50px_rgba(0,255,102,0.06)] rounded-2xl relative flex flex-col justify-between overflow-hidden group">
              <img src={HERO_PRODUCTS[currentIndex].image} alt={HERO_PRODUCTS[currentIndex].name} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-108" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-zinc-800/80 backdrop-blur-md p-4 rounded-xl z-10">
                <span className="text-[9px] font-mono text-[#00ff66] block tracking-widest uppercase">{HERO_PRODUCTS[currentIndex].subCategory}</span>
                <span className="text-sm font-black text-white tracking-wider block uppercase mt-0.5">{HERO_PRODUCTS[currentIndex].name}</span>
              </div>
            </div>

            <div className="w-[20%] h-[320px] rounded-xl overflow-hidden border border-zinc-900 opacity-30 hidden md:block blur-[1px]">
              <img src={HERO_PRODUCTS[getRightIndex()].image} alt="Próximo" className="w-full h-full object-cover" />
            </div>
          </div>

          <button onClick={nextSlide} className="absolute right-0 lg:right-4 z-30 w-12 h-12 rounded-full border-2 border-[#00ff66] bg-black/80 text-[#00ff66] flex items-center justify-center hover:bg-[#00ff66] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </main>

      {/* 🛠️ VITRINE PRINCIPAL INTERATIVA COM ABAS E CARROSSEL */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-900/60">
        
        {/* Cabeçalho da Seção com Menu de Abas */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[13px] font-mono text-zinc-500 block mb-1 tracking-widest uppercase">// FILTRAR EQUIPAMENTOS</span>
            <h2 className="text-xl font-black italic tracking-wider text-white uppercase">VITRINE DE ELITE</h2>
          </div>

          {/* 🔘 LINKS DAS ABAS DE CATEGORIAS */}
          <div className="flex flex-wrap gap-3 bg-zinc-950/80 border border-zinc-900 p-1.5 rounded-xl font-mono text-[10px] tracking-wider">
            {["CALÇADOS", "BERMUDAS", "CAMISAS"].map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#00ff66] text-black font-black shadow-[0_0_15px_rgba(0,255,102,0.2)]" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTAINER DO CARROSSEL DA VITRINE */}
        <div className="relative group/showcase px-0 md:px-4 select-none">
          
          {/* Seta Esquerda da Vitrine */}
          {filteredProducts.length > 3 && (
            <button 
              onClick={prevShowcase}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-zinc-800 bg-black text-zinc-400 flex items-center justify-center hover:border-[#00ff66] hover:text-[#00ff66] transition-all cursor-pointer shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </button>
          )}

          {/* Grade de Exibição Deslizante */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden items-center min-h-[170px]">
            {/* Renderiza até 3 itens a partir do index atual do carrossel */}
            {filteredProducts.slice(showcaseIndex, showcaseIndex + 3).map((product) => (
              <div 
                key={product.id} 
                className="bg-[#0f0f11] border border-zinc-900 hover:border-zinc-800 rounded-xl p-4 flex gap-4 items-center group transition-all duration-300 h-full hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Foto Miniatura */}
                <div className="w-28 h-28 bg-zinc-950 border border-zinc-900 rounded-lg relative overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-70 group-hover:scale-115 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
                </div>

                {/* Info Textual */}
                <div className="flex flex-col justify-between h-full w-full py-0.5">
                  <div>
                    <h3 className="text-[11px] font-black tracking-wide text-white group-hover:text-[#00ff66] transition-colors duration-200 uppercase leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[9px] text-zinc-500 font-mono mt-1 whitespace-pre-line leading-normal line-clamp-2">
                      {product.desc}
                    </p>
                  </div>

                  {/* Preço e Botão */}
                  <div className="mt-3 pt-2 border-t border-zinc-900/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap">
                      R$ <span className="text-xs font-black text-[#00ff66]">{product.priceString}</span>
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="border border-zinc-800 text-[8px] font-black tracking-wider text-zinc-300 px-2.5 py-1.5 rounded uppercase cursor-pointer transition-all hover:border-[#00ff66] hover:bg-[#00ff66]/5 hover:text-[#00ff66] active:scale-95"
                    >
                      ADICIONAR
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Seta Direita da Vitrine */}
          {filteredProducts.length > 3 && (
            <button 
              onClick={nextShowcase}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-zinc-800 bg-black text-zinc-400 flex items-center justify-center hover:border-[#00ff66] hover:text-[#00ff66] transition-all cursor-pointer shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </button>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#050506] py-10 text-zinc-600 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BRAVOS's STORE. POWERED BY NEXT.JS 15 & TAILWIND v4.</p>
          <div className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-950 flex items-center justify-center text-white text-[9px] font-black select-none">N</div>
        </div>
      </footer>

    </div>
  );
}