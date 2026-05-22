"use client";

/*
  ARQUIVO: ProductInfo.tsx
  Função: mostra as informações principais do produto.
*/

import React from 'react';

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    priceString: string;
  };
  sizeOptions: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  onAddToCart: () => void;
}

export default function ProductInfo({ product, sizeOptions, selectedSize, setSelectedSize, onAddToCart }: ProductInfoProps) {
  const parcelValue = (product.price / 10).toFixed(2).replace('.', ',');

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* TAG DO DROP: Subiu de 12px para text-xs (12px padrão) e ajustamos o tracking para não separar demais */}
        <span className="text-xs font-mono text-[#00ff66] tracking-wider uppercase block">// PRODUTO AUTÊNTICO</span>
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-wide leading-tight">
          {product.name}
        </h1>
      </div>

      {/* PREÇO */}
      <div className="p-5 bg-zinc-900/30 border border-zinc-900/80 rounded-2xl space-y-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
        <div className="flex items-baseline gap-1.5">
          {/* Cifrão com melhor contraste */}
          <span className="text-xl font-mono text-zinc-400 font-bold">R$</span>
          {/* Valor principal aumentado de text-3xl para text-4xl */}
          <span className="text-4xl font-black text-white tracking-tight">{product.priceString}</span>
        </div>
        {/* TEXTO DE PARCELAMENTO: Subiu de text-sm para text-base, e clareou o texto comum */}
        <p className="text-base text-zinc-300 tracking-wide mt-1">
          Ou em até <span className="text-white font-bold">10x de R$ {parcelValue}</span> sem juros no cartão
        </p>
      </div>

      {/* SELEÇÃO DE TAMANHOS */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          {/* TEXTO AUXILIAR: Subiu de 12px para text-xs e clareou de zinc-400 para zinc-300 */}
          <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">Selecione o Tamanho:</span>
          {selectedSize && <span className="text-xs font-mono text-[#00ff66] font-bold">Selecionado: {selectedSize}</span>}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* BOTÕES DE TAMANHO: Aumentado de text-sm para text-base */}
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3.5 border font-mono text-base rounded-xl uppercase font-black tracking-wider transition-all cursor-pointer ${
                selectedSize === size
                  ? 'border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.15)]'
                  : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* BOTÃO COMPRAR */}
      <div className="pt-2">
        {/* BOTÃO ADICIONAR: Ajustado de text-xs para text-sm e diminuído o espaçamento das letras exagerado */}
        <button 
          onClick={onAddToCart}
          className="w-full bg-[#00ff66] hover:bg-[#00e055] text-black font-black text-sm tracking-wider uppercase py-5 rounded-xl shadow-[0_0_40px_rgba(0,255,102,0.15)] flex items-center justify-center gap-2.5 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {/* ÍCONE DO CARRINHO: Aumentado levemente de w-4 h-4 para w-5 h-5 para acompanhar a fonte */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  );
}
