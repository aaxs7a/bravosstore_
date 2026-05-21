"use client";

/*
  ARQUIVO: app/_components/cardproduct.tsx
<<<<<<< HEAD
  FUNÇÃO: criar o card de cada produto mostrado na vitrine com efeitos dinâmicos de escala no hover.
=======
  FUNÇÃO: criar o card de cada produto mostrado na vitrine.
>>>>>>> main

  O que este componente recebe:
  - product: dados do produto vindos de app/_data/products.ts.
  - onAddToCart: função da página inicial que adiciona o item no carrinho.

  Explicação para apresentação:
  O card é reutilizável. A home chama este mesmo componente várias vezes,
  passando produtos diferentes. Isso evita repetir o mesmo HTML/JSX para cada
  item da loja.
*/

// Card visual de cada produto. Mostra imagem, categoria, preço e botões de detalhes/comprar.

import React from 'react';
import Link from 'next/link';
import type { Product } from '../_data/products';

<<<<<<< HEAD
=======

>>>>>>> main
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
<<<<<<< HEAD
    /* 📦 CARD COMPLETO DO PRODUTO (Ganha escala de 2% no hover e sombra sutil) */
    <div className="group bg-zinc-900/20 border border-zinc-800/80 hover:border-[#00ff66]/30 transition-all duration-300 rounded-2xl flex flex-col overflow-hidden h-full hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
=======
    <div className="group bg-zinc-900/20 border border-zinc-800/80 hover:border-[#00ff66]/30 transition-all duration-300 rounded-2xl flex flex-col overflow-hidden h-full">
>>>>>>> main
      
      {/* 📸 ÁREA DA IMAGEM COM LINK PARA DETALHES */}
      <Link href={`/produto/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-zinc-950 cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge da Categoria */}
        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-zinc-800 text-[9px] font-mono font-bold tracking-wider px-2 py-1 rounded text-[#00ff66] uppercase">
          {product.category}
        </span>
      </Link>

      {/* 📝 INFORMAÇÕES DO PRODUTO */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase">
            {product.target}
          </span>
          <Link href={`/produto/${product.id}`} className="text-sm font-black text-white hover:text-[#00ff66] transition-colors line-clamp-2 uppercase tracking-wide cursor-pointer h-10 block">
            {product.name}
          </Link>
        </div>

        <div className="space-y-4">
          {/* Preço formatado no estilo Bravos */}
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-mono text-zinc-500">R$</span>
            <span className="text-xl font-black text-white tracking-tight">{product.priceString}</span>
          </div>

          {/* 🔘 BOTÕES LADO A LADO */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            
<<<<<<< HEAD
            {/* Botão Ver Detalhes (Ganha escala de 4% no hover) */}
            <Link 
              href={`/produto/${product.id}`}
              className="border border-zinc-800 hover:border-[#00ff66]/60 bg-zinc-950/50 hover:bg-zinc-900 text-zinc-300 hover:text-white text-[10px] font-black tracking-widest uppercase py-3 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-[1.04] cursor-pointer"
=======
            {/* Botão Ver Detalhes */}
            <Link 
              href={`/produto/${product.id}`}
              className="border border-zinc-800 hover:border-[#00ff66]/60 bg-zinc-950/50 hover:bg-zinc-900 text-zinc-300 hover:text-white text-[10px] font-black tracking-widest uppercase py-3 rounded-lg flex items-center justify-center transition-all cursor-pointer"
>>>>>>> main
            >
              DETALHES
            </Link>

<<<<<<< HEAD
            {/* Botão Adicionar ao Carrinho (Ganha escala de 4% no hover e glow neon) */}
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-[#00ff66] hover:bg-[#00e055] text-black text-[10px] font-black tracking-widest uppercase py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 transform hover:scale-[1.04] active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,255,102,0.1)] hover:shadow-[0_0_25px_rgba(0,255,102,0.3)]"
=======
            {/* Botão Adicionar ao Carrinho */}
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-[#00ff66] hover:bg-[#00e055] text-black text-[10px] font-black tracking-widest uppercase py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all transform active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,255,102,0.1)]"
>>>>>>> main
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              COMPRAR
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}