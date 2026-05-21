"use client";

/*
  ARQUIVO: app/page.tsx
  FUNÇÃO: página inicial da Bravos Store com Carrossel Hero em Looping Infinito Bidirecional.
*/

import React, { useState, useEffect, useRef } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';
import AuthModal, { BravosUser } from './_components/AuthModal';
import Cart from './_components/cart';
import ProductCard from './_components/cardproduct';
import { useRouter } from 'next/navigation';
import { ALL_PRODUCTS, HERO_PRODUCTS, Product } from './_data/products';

// 📦 Importações do Swiper.js para o movimento arrastável e fluido
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// 🎨 Estilos obrigatórios do Swiper
import 'swiper/css';
import 'swiper/css/navigation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Home() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<BravosUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [indexColecoes, setIndexColecoes] = useState(0);
  const [indexMasculino, setIndexMasculino] = useState(0);
  const [indexFeminino, setIndexFeminino] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  // Se a lista de destaques for pequena (ex: 3 itens), duplicamos para o Swiper fazer o Loop nos DOIS sentidos sem bugar
  const finalHeroProducts = HERO_PRODUCTS.length < 5 
    ? [...HERO_PRODUCTS, ...HERO_PRODUCTS, ...HERO_PRODUCTS] 
    : HERO_PRODUCTS;

  // Inicialização do carrinho com localStorage
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

  useEffect(() => {
    try {
      localStorage.setItem('bravos_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Falha ao salvar dados do carrinho na Home:", error);
    }
  }, [cart]);

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

        {/* 🎞️ CARROSSEL HERO EM LOOPING REAL INFINITO PARA OS DOIS LADOS */}
        <div className="lg:col-span-7 relative w-full select-none px-4">
          
          {/* Botão Customizado Esquerda */}
          <button onClick={() => swiperRef.current?.slidePrev()} className="absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border-2 border-[#00ff66] bg-black/80 text-[#00ff66] flex items-center justify-center hover:bg-[#00ff66] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          </button>

          {/* Container do Swiper */}
          <div className="w-full h-[440px] flex items-center overflow-visible">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              speed={600}
              grabCursor={true}
              centeredSlides={true}
              
              // Configurações críticas para blindar o looping em ambos os sentidos
              loop={true}
              slidesPerView={1.3}
              spaceBetween={24}
              loopPreventsSliding={false}
              
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="w-full h-full hero-swiper-infinite"
            >
              {finalHeroProducts.map((product, idx) => (
                <SwiperSlide key={idx} className="h-full flex items-center justify-center">
                  
                  <div className="w-full h-[400px] bg-zinc-900/40 rounded-2xl relative flex flex-col justify-between overflow-hidden border border-zinc-900 transition-all duration-500 group custom-hero-card">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent"></div>
                    
                    {/* Legenda do produto */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-zinc-800/80 backdrop-blur-md p-4 rounded-xl z-10 text-details-container transition-all duration-500">
                      <span className="text-[9px] font-mono text-[#00ff66] block tracking-widest uppercase">{product.category} // {product.target}</span>
                      <span className="text-sm font-black text-white tracking-wider block uppercase mt-0.5">{product.name}</span>
                    </div>
                  </div>

                </SwiperSlide>
              ))}
            </Swiper>

            {/* 🎨 CSS Injetado Seguro para os Modos do Carrossel */}
            <style jsx global>{`
              /* Estilo padrão para todos os cards invisíveis / nas pontas */
              .hero-swiper-infinite .swiper-slide .custom-hero-card {
                transform: scale(0.9) !important;
                opacity: 0.25 !important;
                filter: blur(1px);
              }
              .hero-swiper-infinite .swiper-slide .text-details-container {
                opacity: 0 !important;
              }

              /* Estilo ativo aplicado perfeitamente ao card do meio */
              .hero-swiper-infinite .swiper-slide-active .custom-hero-card {
                transform: scale(1) !important;
                opacity: 1 !important;
                filter: blur(0px) !important;
                border-color: rgba(0, 255, 102, 0.4) !important;
                box-shadow: 0 0 50px rgba(0, 255, 102, 0.12) !important;
              }
              .hero-swiper-infinite .swiper-slide-active .text-details-container {
                opacity: 1 !important;
              }
            `}</style>

          </div>

          {/* Botão Customizado Direita */}
          <button onClick={() => swiperRef.current?.slideNext()} className="absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border-2 border-[#00ff66] bg-black/80 text-[#00ff66] flex items-center justify-center hover:bg-[#00ff66] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>

        </div>
      </main>

      {/* VITRINES PRODUTOS - CORREÇÃO DEFINITIVA: SEM VAZAMENTOS E SEM CORTES */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-28 border-t border-zinc-900/60 overflow-hidden">
        
        {/* SECTION 1: COLEÇÕES */}
        <div id="colecoes" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[11px] font-mono text-[#00ff66] block tracking-widest uppercase">// DROP EXCLUSIVO</span>
              <h2 className="text-2xl font-black tracking-wider text-white uppercase italic">COLEÇÕES</h2>
            </div>
            {listColecoes.length > 4 && (
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const swiperEl = (document.querySelector('.swiper-colecoes') as HTMLElement & { swiper?: any })?.swiper;
                    swiperEl?.slidePrev();
                  }} 
                  className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer"
                >
                  ←
                </button>
                <button 
                  onClick={() => {
                    const swiperEl = (document.querySelector('.swiper-colecoes') as HTMLElement & { swiper?: any })?.swiper;
                    swiperEl?.slideNext();
                  }} 
                  className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer"
                >
                  →
                </button>
              </div>
            )}
          </div>
          {listColecoes.length > 0 ? (
            /* 💡 Removido margens negativas e overflows forçados que quebravam a tela */
            <div className="w-full">
              <Swiper
                speed={500}
                allowTouchMove={false} // 🚫 Bloqueia o arrasto manual do mouse
                slidesPerView={1}
                spaceBetween={12} // Diminuído um pouco para compensar o padding interno dos slides
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 }
                }}
                className="w-full swiper-colecoes"
              >
                {listColecoes.map((product) => (
                  /* 💡 O segredo: py-4 e px-2 no SwiperSlide dão o espaço para o zoom crescer sem vazar do carrossel */
                  <SwiperSlide key={product.id} className="h-full py-4 px-2">
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </SwiperSlide>
                ))}
              </Swiper>
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
                <button 
                  onClick={() => {
                    const swiperEl = (document.querySelector('.swiper-masculino') as HTMLElement & { swiper?: any })?.swiper;
                    swiperEl?.slidePrev();
                  }} 
                  className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer"
                >
                  ←
                </button>
                <button 
                  onClick={() => {
                    const swiperEl = (document.querySelector('.swiper-masculino') as HTMLElement & { swiper?: any })?.swiper;
                    swiperEl?.slideNext();
                  }} 
                  className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer"
                >
                  →
                </button>
              </div>
            )}
          </div>
          {listMasculino.length > 0 ? (
            <div className="w-full">
              <Swiper
                speed={500}
                allowTouchMove={false}
                slidesPerView={1}
                spaceBetween={12}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 }
                }}
                className="w-full swiper-masculino"
              >
                {listMasculino.map((product) => (
                  <SwiperSlide key={product.id} className="h-full py-4 px-2">
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </SwiperSlide>
                ))}
              </Swiper>
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
                <button 
                  onClick={() => {
                    const swiperEl = (document.querySelector('.swiper-feminino') as HTMLElement & { swiper?: any })?.swiper;
                    swiperEl?.slidePrev();
                  }} 
                  className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer"
                >
                  ←
                </button>
                <button 
                  onClick={() => {
                    const swiperEl = (document.querySelector('.swiper-feminino') as HTMLElement & { swiper?: any })?.swiper;
                    swiperEl?.slideNext();
                  }} 
                  className="w-10 h-10 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00ff66] hover:text-[#00ff66] transition-all rounded-xl flex items-center justify-center cursor-pointer"
                >
                  →
                </button>
              </div>
            )}
          </div>
          {listFeminino.length > 0 ? (
            <div className="w-full">
              <Swiper
                speed={500}
                allowTouchMove={false}
                slidesPerView={1}
                spaceBetween={12}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 }
                }}
                className="w-full swiper-feminino"
              >
                {listFeminino.map((product) => (
                  <SwiperSlide key={product.id} className="h-full py-4 px-2">
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </SwiperSlide>
                ))}
              </Swiper>
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