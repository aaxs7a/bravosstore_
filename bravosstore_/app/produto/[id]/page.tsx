"use client";

/*
  ARQUIVO: app/produto/[id]/page.tsx
  FUNÇÃO: página de detalhes de um produto específico.

  Como funciona:
  - O [id] da pasta representa uma rota dinâmica do Next.js.
  - Quando o usuário acessa /produto/8, o código lê o número 8 da URL.
  - Depois ele busca esse produto na tabela produtos do Supabase.
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
import {
  adicionarAoCarrinho,
  atualizarQuantidadeCarrinho,
  buscarCarrinho,
  buscarProdutoPorId,
  buscarUsuarioLogado,
  finalizarPedido,
  removerDoCarrinho,
  sairDaConta,
  type CartItem,
  type Product,
} from '../../_lib/bravosSupabase';

// Subcomponentes específicos
import ProductInfo from './_components/ProductInfo';
import ProductTabs from './_components/ProductTabs';
import ShippingBlock from './_components/ShippingBlock';
import TrustBadges from './_components/TrustBadges';



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

  // Carrinho vindo do Supabase.
  const [cart, setCart] = useState<CartItem[]>([]);

  // Produto aberto nesta página.
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  // Carrega sessão e carrinho do usuário logado no Supabase.
  useEffect(() => {
    const carregarSessao = async () => {
      try {
        const user = await buscarUsuarioLogado();
        setLoggedUser(user);

        if (user) {
          const carrinhoDoBanco = await buscarCarrinho(user.id);
          setCart(carrinhoDoBanco);
        }
      } catch (error) {
        console.error("Erro ao carregar sessão pelo Supabase:", error);
      }
    };

    carregarSessao();
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query) router.push(`/?busca=${encodeURIComponent(query)}`);
  }, [searchQuery, router]);

  // Busca o produto correspondente usando o id da URL diretamente no Supabase.
  useEffect(() => {
    const carregarProduto = async () => {
      if (!resolvedId) return;

      try {
        const produtoDoBanco = await buscarProdutoPorId(Number(resolvedId));
        setProduct(produtoDoBanco);
      } catch (error) {
        console.error("Erro ao buscar produto no Supabase:", error);
        setProduct(null);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    carregarProduto();
  }, [resolvedId]);

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-[#070708] text-white flex items-center justify-center">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Carregando produto...</p>
      </div>
    );
  }

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

  const addToCart = async () => {
    if (!loggedUser) {
      setIsAuthOpen(true);
      return;
    }

    try {
      await adicionarAoCarrinho(loggedUser.id, product.id, 1);
      const carrinhoAtualizado = await buscarCarrinho(loggedUser.id);
      setCart(carrinhoAtualizado);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Erro ao adicionar produto no Supabase:", error);
    }
  };

  const updateQuantity = async (id: number, amount: number) => {
    if (!loggedUser) return;

    const itemAtual = cart.find((item) => item.id === id);
    if (!itemAtual) return;

    const novaQuantidade = itemAtual.quantity + amount;

    try {
      await atualizarQuantidadeCarrinho(loggedUser.id, id, novaQuantidade);
      const carrinhoAtualizado = await buscarCarrinho(loggedUser.id);
      setCart(carrinhoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar carrinho no Supabase:", error);
    }
  };

  const removeFromCart = async (id: number) => {
    if (!loggedUser) return;

    try {
      await removerDoCarrinho(loggedUser.id, id);
      const carrinhoAtualizado = await buscarCarrinho(loggedUser.id);
      setCart(carrinhoAtualizado);
    } catch (error) {
      console.error("Erro ao remover produto do Supabase:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await sairDaConta();
      setLoggedUser(null);
      setCart([]);
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  const handleCheckout = async () => {
    if (!loggedUser) {
      setIsAuthOpen(true);
      return;
    }

    try {
      await finalizarPedido(loggedUser.id, cart);
      setCart([]);
      setIsCartOpen(false);
      alert('Pedido criado com sucesso no Supabase!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao finalizar pedido.');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans ${isCartOpen ? 'overflow-hidden' : 'overflow-x-hidden'}`}>
      
      <Header totalItems={totalItems} setIsCartOpen={setIsCartOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onAuthClick={() => setIsAuthOpen(true)} loggedUserName={loggedUser?.name} onLogout={handleLogout} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={async (user) => { setLoggedUser(user); setCart(await buscarCarrinho(user.id)); }} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalItems={totalItems} subtotal={subtotal} onCheckout={handleCheckout} />

      <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        
        <button 
          onClick={() => router.push('/')} 
          className="inline-flex items-center gap-2.5 text-xs font-mono font-black text-zinc-400 hover:text-[#00ff66] uppercase tracking-widest mb-10 cursor-pointer transition-all border border-zinc-900 bg-zinc-950/60 px-5 py-3 rounded-xl hover:border-[#00ff66]/30 hover:bg-zinc-900/30 group"
        >
          <span className="transition-transform group-hover:-translate-x-1 font-sans text-sm font-light">←</span> 
          Voltar para Vitrine
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