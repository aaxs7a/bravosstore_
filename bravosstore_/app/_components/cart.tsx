"use client";

/*
  ARQUIVO: cart.tsx
  Função: controla a lateral do carrinho de compras.
  Mostra produtos adicionados, quantidade, total e opção de remover/alterar itens.
*/

// Componente lateral da sacola/carrinho. Ele recebe os itens por props e permite aumentar, diminuir e remover produtos.
import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cart: CartItem[];
  updateQuantity: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
  subtotal: number;
}

export default function Cart({ isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, totalItems, subtotal }: CartProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setLoading(true);
    try {
      // Mapeia o carrinho para o formato que a API do Mercado Pago espera
      const itemsToPay = cart.map(item => ({
        title: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: itemsToPay }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Redireciona o usuário para o Mercado Pago
        window.location.href = data.init_point;
      } else {
        alert('Erro ao gerar o link de pagamento.');
      }
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
      alert('Ocorreu um erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${isCartOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      {/* Fundo escuro: ao clicar fora da sacola, ela fecha. */}
      <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0b0b0d] border-l border-zinc-900 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Cabeçalho da sacola com título, quantidade e botão fechar. */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-white">SUA SACOLA</h2>
            <span className="bg-zinc-900 text-zinc-400 font-mono text-[10px] px-2 py-0.5 rounded-full border border-zinc-800">{totalItems}</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#00ff66] hover:border-[#00ff66] transition-all cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Lista dos produtos adicionados ao carrinho. */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-zinc-500 text-xs font-mono tracking-wider uppercase">Sua sacola está vazia.</p>
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

        {/* Resumo final com subtotal, total e botão de finalizar pedido. */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950/40 space-y-4">
            <div className="font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between"><span>SUBTOTAL</span><span className="text-white font-bold">R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
              <div className="flex justify-between text-xs font-black text-white uppercase pt-2 border-t border-zinc-900 mt-2"><span>TOTAL + FRETE</span><span className="text-[#00ff66]">R$ {(subtotal >= 299 ? subtotal : subtotal + 15).toFixed(2).replace('.', ',')}</span></div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#00ff66] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "PROCESSANDO..." : "FINALIZAR PEDIDO"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}