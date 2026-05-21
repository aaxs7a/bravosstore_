"use client";

/*
  ARQUIVO: app/page.tsx
  FUNÇÃO: página inicial da Bravos Store.

  O que este arquivo controla:
  1. Carrossel principal automático da home.
  2. Barra de pesquisa funcional.
  3. Vitrines de produtos: Coleções, Masculino e Feminino.
  4. Carrinho de compras usando localStorage.
  5. Login/cadastro de teste usando localStorage.

  Explicação para apresentação:
  Esta é a tela principal do sistema. Ela importa os produtos do arquivo
  app/_data/products.ts, filtra os itens conforme a pesquisa e renderiza os
  cards. Quando o usuário adiciona um produto, o estado do carrinho é atualizado
  e salvo no navegador.
*/

// Página inicial da BRAVOS STORE. Reúne hero, carrossel, busca, vitrines, carrinho e autenticação.

import React, { useState, useEffect } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';
import AuthModal, { BravosUser } from './_components/AuthModal';
import Cart from './_components/cart';
import ProductCard from './_components/cardproduct';
import { useRouter } from 'next/navigation';
import { ALL_PRODUCTS, HERO_PRODUCTS, Product } from './_data/products';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}


export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<BravosUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [indexColecoes, setIndexColecoes] = useState(0);
  const [indexMasculino, setIndexMasculino] = useState(0);
  const [indexFeminino, setIndexFeminino] = useState(0);

  // 🛡️ INICIALIZAÇÃO BLINDADA DO CARRINHO NA HOME
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('bravos_cart');
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Erro ao ler carrinho na Home, resetando...", error);
        return [];
      }
    }
    return [];
  });

  // 🔄 SINCRONIZAÇÃO DE ALTERAÇÕES
  useEffect(() => {
    try {
      localStorage.setItem('bravos_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Falha ao salvar dados do carrinho na Home:", error);
    }
  }, [cart]);

  // 👤 Recupera usuário logado ao abrir o site
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bravos_logged_user');
      if (savedUser) setLoggedUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Erro ao carregar usuário logado:", error);
    }
  }, []);

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get('busca');
    if (queryFromUrl) setSearchQuery(queryFromUrl);
  }, []);


  // Quando a home abre com um link tipo /#masculino, rola automaticamente para a seção correta.
  // Isso resolve o problema de clicar na navbar estando dentro de uma página de produto.
  useEffect(() => {
    const scrollFromHash = () => {
      const sectionId = window.location.hash.replace('#', '');
      if (!sectionId) return;

      const element = document.getElementById(sectionId);
      if (!element) return;

      setTimeout(() => {
        const offset = 160;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }, 100);
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);
    return () => window.removeEventListener('hashchange', scrollFromHash);
  }, []);

  // 🎞️ Faz o carrossel principal passar sozinho
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_PRODUCTS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // 🔎 Volta o carrossel das seções para o início ao pesquisar
  useEffect(() => {
    setIndexColecoes(0);
    setIndexMasculino(0);
    setIndexFeminino(0);
  }, [searchQuery]);

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.target.toLowerCase().includes(query) ||
      product.priceString.toLowerCase().includes(query) ||
      (product.desc || '').toLowerCase().includes(query)
    );
  });

  const listColecoes = filteredProducts.filter(p => p.target === "COLEÇÕES");
  const listMasculino = filteredProducts.filter(p => p.target === "MASCULINO");
  const listFeminino = filteredProducts.filter(p => p.target === "FEMININO");

  const addToCart = (product: Product) => {
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

  const handleLogout = () => {
    localStorage.removeItem('bravos_logged_user');
    setLoggedUser(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const nextSlide = () => { setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_PRODUCTS.length); };
  const prevSlide = () => { setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length); };
  const getLeftIndex = () => (currentIndex - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;
  const getRightIndex = () => (currentIndex + 1) % HERO_PRODUCTS.length;

  const moveCarrossel = (currentIdx: number, setIdx: React.Dispatch<React.SetStateAction<number>>, direction: number, maxItems: number) => {
    let newIdx = currentIdx + (direction * 4);
    if (newIdx < 0) newIdx = 0;
    if (newIdx >= maxItems) newIdx = 0;
    setIdx(newIdx);
  };

  return (
    <div className={`min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans selection:bg-[#00ff66] selection:text-black ${isCartOpen ? 'overflow-hidden' : 'overflow-x-hidden'}`}>
      
      <Header totalItems={totalItems} setIsCartOpen={setIsCartOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onAuthClick={() => setIsAuthOpen(true)} loggedUserName={loggedUser?.name} onLogout={handleLogout} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={setLoggedUser} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalItems={totalItems} subtotal={subtotal} />

      {/* HERO SECTION */}
      <main id="topo" className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#00ff66]/60"></span>
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#00ff66] uppercase">DROP 01 // HIGH PERFORMANCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9] text-white italic">
            Não force.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-emerald-400 to-emerald-500 drop-shadow-[0_0_30px_rgba(0,255,102,0.2)]">Supere.</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl tracking-wide leading-relaxed font-light">
            Anatomia têxtil avançada com fios de compressão inteligentes e engenharia dry-fit de máxima absorção. Projetado milimetricamente para atletas de elite.
          </p>
          <div className="pt-2">
            <button onClick={() => document.getElementById('colecoes')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#00ff66] text-black font-black text-xs tracking-[0.2em] uppercase px-10 py-4.5 rounded shadow-[0_0_40px_rgba(0,255,102,0.25)] flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
              EXPLORAR PRODUTOS <span>↓</span>
            </button>
          </div>
        </div>

        {/* CARROSSEL HERO */}
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
                <span className="text-[9px] font-mono text-[#00ff66] block tracking-widest uppercase">{HERO_PRODUCTS[currentIndex].category} // {HERO_PRODUCTS[currentIndex].target}</span>
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

      {/* 🛍️ VITRINE COMPACTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-28 border-t border-zinc-900/60">
        
        {/* SECTION 1: COLEÇÕES */}
        <div id="colecoes" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[11px] font-mono text-[#00ff66] block tracking-widest uppercase">// DROP EXCLUSIVO</span>
              <h2 className="text-2xl font-black tracking-wider text-white uppercase italic">COLEÇÕES</h2>
            </div>
            {listColecoes.length > 4 && (
              <div className="flex gap-2">
                <button onClick={() => moveCarrossel(indexColecoes, setIndexColecoes, -1, listColecoes.length)} className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer">←</button>
                <button onClick={() => moveCarrossel(indexColecoes, setIndexColecoes, 1, listColecoes.length)} className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer">→</button>
              </div>
            )}
          </div>
          {listColecoes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listColecoes.slice(indexColecoes, indexColecoes + 4).map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-xs italic tracking-wider py-4">Nenhum produto encontrado nesta categoria para "{searchQuery}".</p>
          )}
        </div>

        {/* SECTION 2: MASCULINO */}
        <div id="masculino" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[11px] font-mono text-[#00ff66] block tracking-widest uppercase">// ALINHAMENTO COMBATE</span>
              <h2 className="text-2xl font-black tracking-wider text-white uppercase italic">MASCULINO</h2>
            </div>
            {listMasculino.length > 4 && (
              <div className="flex gap-2">
                <button onClick={() => moveCarrossel(indexMasculino, setIndexMasculino, -1, listMasculino.length)} className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer">←</button>
                <button onClick={() => moveCarrossel(indexMasculino, setIndexMasculino, 1, listMasculino.length)} className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer">→</button>
              </div>
            )}
          </div>
          {listMasculino.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listMasculino.slice(indexMasculino, indexMasculino + 4).map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-xs italic tracking-wider py-4">Nenhum produto encontrado nesta categoria para "{searchQuery}".</p>
          )}
        </div>

        {/* SECTION 3: FEMININO */}
        <div id="feminino" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[11px] font-mono text-[#00ff66] block tracking-widest uppercase">// PERFORMANCE AVANÇADA</span>
              <h2 className="text-2xl font-black tracking-wider text-white uppercase italic">FEMININO</h2>
            </div>
            {listFeminino.length > 4 && (
              <div className="flex gap-2">
                <button onClick={() => moveCarrossel(indexFeminino, setIndexFeminino, -1, listFeminino.length)} className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer">←</button>
                <button onClick={() => moveCarrossel(indexFeminino, setIndexFeminino, 1, listFeminino.length)} className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer">→</button>
              </div>
            )}
          </div>
          {listFeminino.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listFeminino.slice(indexFeminino, indexFeminino + 4).map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-xs italic tracking-wider py-4">Nenhum produto encontrado nesta categoria para "{searchQuery}".</p>
          )}
        </div>

      </section>

      <Footer />
    </div>
  );
}