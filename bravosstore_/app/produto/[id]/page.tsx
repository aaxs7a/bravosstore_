"use client";

/*
  ARQUIVO: app/produto/[id]/page.tsx
  FUNÇÃO: página de detalhes de um produto específico.

  BLOCO DE APRESENTAÇÃO:
  Esta página usa rota dinâmica do Next.js. O [id] vem da URL
  (/produto/1, /produto/2...) e é usado para buscar aquele produto no Supabase.
  O carrinho também é salvo no Supabase, não no localStorage.
*/

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../_components/header";
import Footer from "../../_components/footer";
import AuthModal from "../../_components/AuthModal";
import Cart from "../../_components/cart";
import {
  Product,
  CartItem,
  BravosUser,
  buscarProdutoPorId,
  buscarUsuarioLogado,
  buscarCarrinho,
  adicionarAoCarrinho,
  atualizarQuantidadeCarrinho,
  removerDoCarrinho,
  sairDaConta,
} from "../../_lib/bravosSupabase";

import ProductInfo from "./_components/ProductInfo";
import ProductTabs from "./_components/ProductTabs";
import ShippingBlock from "./_components/ShippingBlock";
import TrustBadges from "./_components/TrustBadges";

const CLOTHING_SIZES = ["P", "M", "G", "GG"];
const SHOE_SIZES = ["38", "39", "40", "41", "42", "43"];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const resolvedId = params?.id;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<BravosUser | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShippingPrice, setSelectedShippingPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProdutoEUsuario() {
      try {
        setLoading(true);
        const produtoId = Number(resolvedId);

        if (!Number.isFinite(produtoId)) {
          setProduct(null);
          return;
        }

        const [produtoDoBanco, usuarioAtual] = await Promise.all([
          buscarProdutoPorId(produtoId),
          buscarUsuarioLogado(),
        ]);

        setProduct(produtoDoBanco);
        setLoggedUser(usuarioAtual);

        if (usuarioAtual) {
          const carrinhoDoBanco = await buscarCarrinho(usuarioAtual.id);
          setCart(carrinhoDoBanco);
        }
      } finally {
        setLoading(false);
      }
    }

    carregarProdutoEUsuario();
  }, [resolvedId]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query) router.push(`/?busca=${encodeURIComponent(query)}`);
  }, [searchQuery, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center gap-4">
        <span className="text-[11px] font-mono text-[#00ff66] tracking-[0.3em] uppercase">
          Supabase
        </span>
        <h1 className="text-2xl font-black uppercase tracking-wider text-zinc-300">
          Carregando produto...
        </h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-wider text-zinc-400">
          Produto não encontrado
        </h1>
        <button
          onClick={() => router.push("/")}
          className="bg-[#00ff66] text-black font-black text-xs px-6 py-3 rounded uppercase tracking-widest cursor-pointer"
        >
          Voltar para a home
        </button>
      </div>
    );
  }

  const sizeOptions =
    product.category === "CALÇADOS" ? SHOE_SIZES : CLOTHING_SIZES;

  const addToCart = async () => {
    if (!loggedUser) {
      setIsAuthOpen(true);
      return;
    }

    try {
      await adicionarAoCarrinho(loggedUser.id, product.id, 1);
      const carrinhoAtualizado = await buscarCarrinho(loggedUser.id);
      setCart(carrinhoAtualizado);

      localStorage.setItem(
        "bravos_selected_shipping",
        String(selectedShippingPrice),
      );
      window.dispatchEvent(new Event("storage"));
      setIsCartOpen(true);
    } catch (error: any) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert(
        error?.message || "Não foi possível adicionar o produto ao carrinho.",
      );
    }
  };

  const updateQuantity = async (id: number, amount: number) => {
    if (!loggedUser) return;

    const itemAtual = cart.find((item) => item.id === id);
    if (!itemAtual) return;

    try {
      await atualizarQuantidadeCarrinho(
        loggedUser.id,
        id,
        itemAtual.quantity + amount,
      );
      const carrinhoAtualizado = await buscarCarrinho(loggedUser.id);
      setCart(carrinhoAtualizado);
    } catch (error: any) {
      alert(error?.message || "Não foi possível atualizar o carrinho.");
    }
  };

  const removeFromCart = async (id: number) => {
    if (!loggedUser) return;

    try {
      await removerDoCarrinho(loggedUser.id, id);
      const carrinhoAtualizado = await buscarCarrinho(loggedUser.id);
      setCart(carrinhoAtualizado);
    } catch (error: any) {
      alert(error?.message || "Não foi possível remover o item.");
    }
  };

  const handleLoginSuccess = async (user: BravosUser) => {
    setLoggedUser(user);
    const carrinhoDoBanco = await buscarCarrinho(user.id);
    setCart(carrinhoDoBanco);
  };

  const handleLogout = async () => {
    try {
      await sairDaConta();
    } finally {
      setLoggedUser(null);
      setCart([]);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`min-h-screen bg-[#070708] text-zinc-100 antialiased font-sans ${isCartOpen ? "overflow-hidden" : "overflow-x-hidden"}`}
    >
      <Header
        totalItems={totalItems}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAuthClick={() => setIsAuthOpen(true)}
        loggedUserName={loggedUser?.name}
        onLogout={handleLogout}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Cart
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        totalItems={totalItems}
        subtotal={subtotal}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2.5 text-xs font-mono font-black text-zinc-400 hover:text-[#00ff66] uppercase tracking-widest mb-10 cursor-pointer transition-all border border-zinc-900 bg-zinc-950/60 px-5 py-3 rounded-xl hover:border-[#00ff66]/30 hover:bg-zinc-900/30 group"
        >
          <span className="transition-transform group-hover:-translate-x-1 font-sans text-sm font-light">
            ←
          </span>
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LADO ESQUERDO: Mídia e Abas Descritivas */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-zinc-900/10 border border-zinc-900 rounded-3xl overflow-hidden aspect-square relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-102"
              />
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

            {/* 💡 AJUSTE: Passamos o interceptor onSelectShipping para atualizar o estado local sempre que o frete mudar */}
            <ShippingBlock
              productPrice={product.price}
              onSelectShipping={(option) =>
                setSelectedShippingPrice(option.rawPrice)
              }
            />

            <TrustBadges />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
