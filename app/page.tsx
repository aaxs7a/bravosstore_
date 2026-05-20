"use client";

import React, { useState } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';
import Cart from './_components/cart';
import ProductCard from './_components/cardproduct';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ALL_PRODUCTS = [
  { id: 1, name: "TÊNIS BRAVO PULSAR NEON v2", category: "CALÇADOS", subCategory: "PROPULSÃO / PERFORMANCE", price: 549.90, priceString: "549,90", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80", desc: "• Amortecimento responsivo de última geração\n• Mesh respirável ultra leve com detalhes neon" },
  { id: 2, name: "BOOT CYBER TRACKER BLACK", category: "CALÇADOS", subCategory: "OUTDOOR / RESISTÊNCIA", price: 689.90, priceString: "689,90", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80", desc: "• Solado tratorado com grip de alta tração\n• Cabedal impermeável com travas rápidas" },
  { id: 3, name: "SNEAKER PHANTOM RUN v1", category: "CALÇADOS", subCategory: "LINHA URBAN / DAILY", price: 419.90, priceString: "419,90", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", desc: "• Palmilha ergonômica anti-impacto\n• Design minimalista com ajuste em meia" },
  { id: 4, name: "BERMUDA COMPRESS SHIELD", category: "BERMUDAS", subCategory: "COMPRESSÃO / TREINO", price: 149.90, priceString: "149,90", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80", desc: "• Forro interno de alta compressão muscular\n• Bolso embutido para smartphone anti-balanço" },
  { id: 5, name: "SHORTS VOLT CARGO MATRIX", category: "BERMUDAS", subCategory: "LINHA URBAN / UTILITY", price: 189.90, priceString: "189,90", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80", desc: "• Tecido ripstop militar ultra resistente\n• Bolsos modulares com fechamento tático" },
  { id: 6, name: "JAQUETA CORTA-VENTO STEALTH", category: "JAQUETAS", subCategory: "LINHA SHIELD / CORRIDA", price: 289.90, priceString: "289,90", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80", desc: "• Tecido de alta densidade repelente à água\n• Modelagem slim com ajuste anatômico" },
  { id: 7, name: "CORINGA ARMOR HOODIE", category: "JAQUETAS", subCategory: "LINHA URBAN / COLD", price: 289.90, priceString: "289,90", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80", desc: "• Algodão premium com interior peluciado\n• Capuz ajustável com gola alta integrada" }
];

const HERO_PRODUCTS = [ALL_PRODUCTS[5], ALL_PRODUCTS[0], ALL_PRODUCTS[6]];

export default function Home() {
  const [activeTab, setActiveTab] = useState("INÍCIO");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("CALÇADOS");
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  const filteredProducts = ALL_PRODUCTS.filter(p => p.category === activeCategory);

  const nextShowcase = () => {
    if (filteredProducts.length > 2 && showcaseIndex < filteredProducts.length - 2) {
      setShowcaseIndex(prev => prev + 1);
    } else {
      setShowcaseIndex(0);
    }
  };

  const prevShowcase = () => {
    if (showcaseIndex > 0) {
      setShowcaseIndex(prev => prev - 1);
    } else if (filteredProducts.length > 2) {
      setShowcaseIndex(filteredProducts.length - 2);
    }
  };

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

  const nextSlide = () => { setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_PRODUCTS.length); };
  const prevSlide = () => { setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length); };
  const getLeftIndex = () => (currentIndex - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;
  const getRightIndex = () => (currentIndex + 1) % HERO_PRODUCTS.length;

  return (
    <div className={`min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans selection:bg-[#00ff66] selection:text-black ${isCartOpen ? 'overflow-hidden' : 'overflow-x-hidden'}`}>
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} totalItems={totalItems} setIsCartOpen={setIsCartOpen} />

      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalItems={totalItems} subtotal={subtotal} />

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

      {/* VITRINE PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-900/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[13px] font-mono text-zinc-500 block mb-1 tracking-widest uppercase">// FILTRAR EQUIPAMENTOS</span>
            <h2 className="text-xl font-black italic tracking-wider text-white uppercase">VITRINE DE ELITE</h2>
          </div>

          <div className="flex flex-wrap gap-3 bg-zinc-950/80 border border-zinc-900 p-1.5 rounded-xl font-mono text-[10px] tracking-wider">
            {["CALÇADOS", "BERMUDAS", "JAQUETAS"].map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setShowcaseIndex(0); }}
                className={`px-4 py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${activeCategory === category ? "bg-[#00ff66] text-black font-black shadow-[0_0_15px_rgba(0,255,102,0.2)]" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group/showcase px-0 md:px-4 select-none">
          {filteredProducts.length > 2 && (
            <button onClick={prevShowcase} className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-zinc-800 bg-black text-zinc-400 flex items-center justify-center hover:border-[#00ff66] hover:text-[#00ff66] transition-all cursor-pointer shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden items-center min-h-[220px]">
            {filteredProducts.slice(showcaseIndex, showcaseIndex + 2).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredProducts.length > 2 && (
            <button onClick={nextShowcase} className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-zinc-800 bg-black text-zinc-400 flex items-center justify-center hover:border-[#00ff66] hover:text-[#00ff66] transition-all cursor-pointer shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}