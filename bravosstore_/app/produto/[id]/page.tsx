"use client";

/*
  ARQUIVO: app/produto/[id]/page.tsx
  FUNÇÃO: página de detalhes de um produto específico.

  Como funciona:
  - O [id] da pasta representa uma rota dinâmica do Next.js.
  - Quando o usuário acessa /produto/8, o código lê o número 8 da URL.
  - Depois ele procura esse id dentro da lista ALL_PRODUCTS.
  - Se encontrar, mostra imagem, preço, descrição, tamanho e botão de carrinho.

  Explicação para apresentação:
  Esta página reaproveita a mesma lista de produtos da home. Assim, o produto
  que aparece no card é o mesmo que aparece nos detalhes, evitando dados
  duplicados e deixando o projeto mais organizado.
*/

// Página de detalhes do produto. Usa o id da URL para encontrar o produto e mostrar informações completas.

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Trocamos o 'use' pelo oficial useParams
import Header from '../../_components/header';
import Footer from '../../_components/footer';
import AuthModal, { BravosUser } from '../../_components/AuthModal';
import Cart from '../../_components/cart';
import { ALL_PRODUCTS } from '../../_data/products';

// Subcomponentes específicos
import ProductInfo from './_components/ProductInfo';
import ProductTabs from './_components/ProductTabs';
import ShippingBlock from './_components/ShippingBlock';
import TrustBadges from './_components/TrustBadges';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}


const CLOTHING_SIZES = ["P", "M", "G", "GG"];
const SHOE_SIZES = ["38", "39", "40", "41", "42", "43"];

export default function ProductDetailPage() {
  const router = useRouter();
  
  // Usamos a forma 100% segura e compatível de ler parâmetros no Client Side do Next.js
  const params = useParams();
  const resolvedId = params?.id;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<BravosUser | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Inicialização segura do carrinho com localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('bravos_cart');
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Dados corrompidos no localStorage. Resetando...", error);
        return [];
      }
    }
    return [];
  });

  // Sincroniza alterações do carrinho para o localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bravos_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Falha ao salvar dados do carrinho:", error);
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
    const query = searchQuery.trim();
    if (query) router.push(`/?busca=${encodeURIComponent(query)}`);
  }, [searchQuery, router]);

  // Busca o produto correspondente usando o id resolvido pelo useParams
  const product = ALL_PRODUCTS.find((p) => String(p.id) === String(resolvedId));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-wider text-zinc-400">Produto não encontrado</h1>
        <button onClick={() => router.push('/')} className="bg-[#00ff66] text-black font-black text-xs px-6 py-3 rounded uppercase tracking-widest cursor-pointer">
          Voltar para a home
        </button>
      </div>
    );
  }

  const sizeOptions = product.category === "CALÇADOS" ? SHOE_SIZES : CLOTHING_SIZES;

  const addToCart = () => {
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

  return (
    <div className={`min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans ${isCartOpen ? 'overflow-hidden' : 'overflow-x-hidden'}`}>
      
      <Header totalItems={totalItems} setIsCartOpen={setIsCartOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onAuthClick={() => setIsAuthOpen(true)} loggedUserName={loggedUser?.name} onLogout={handleLogout} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={setLoggedUser} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalItems={totalItems} subtotal={subtotal} />

      <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        
        <button 
          onClick={() => router.push('/')} 
          className="inline-flex items-center gap-2.5 text-xs font-mono font-black text-zinc-400 hover:text-[#00ff66] uppercase tracking-widest mb-10 cursor-pointer transition-all border border-zinc-900 bg-zinc-950/60 px-5 py-3 rounded-xl hover:border-[#00ff66]/30 hover:bg-zinc-900/30 group"
        >
          <span className="transition-transform group-hover:-translate-x-1 font-sans text-sm font-light">←</span> 
<<<<<<< HEAD
          Voltar
=======
          Voltar para Vitrine
>>>>>>> main
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LADO ESQUERDO: Mídia e Abas Descritivas */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-zinc-900/10 border border-zinc-900 rounded-3xl overflow-hidden aspect-square relative group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-102" />
              <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono tracking-widest px-3 py-1.5 rounded text-[#00ff66] uppercase font-bold">
                {product.category} // {product.target}
              </span>
            </div>

            <ProductTabs product={product} />
          </div>

          {/* LADO DIREITO: Compra, Frete e Badges de Confiança */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <ProductInfo 
              product={product} 
              sizeOptions={sizeOptions} 
              selectedSize={selectedSize} 
              setSelectedSize={setSelectedSize} 
              onAddToCart={addToCart} 
            />

            <ShippingBlock productPrice={product.price} />

            <TrustBadges />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}