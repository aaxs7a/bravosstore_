import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  priceString: string;
  image: string;
  desc: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-[#0f0f11] border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 flex gap-6 items-center group transition-all duration-300 min-h-[200px] hover:shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
      {/* Foto Miniatura Ampliada */}
      <div className="w-40 h-40 bg-zinc-950 border border-zinc-900 rounded-xl relative overflow-hidden shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-70 group-hover:scale-115 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
      </div>

      {/* Info Textual */}
      <div className="flex flex-col justify-between h-full w-full py-1">
        <div>
          <h3 className="text-[13px] font-black tracking-wide text-white group-hover:text-[#00ff66] transition-colors duration-200 uppercase leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[11px] text-zinc-400 font-mono mt-2 whitespace-pre-line leading-relaxed line-clamp-3">
            {product.desc}
          </p>
        </div>

        {/* Preço e Botão */}
        <div className="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-zinc-400 whitespace-nowrap">
            R$ <span className="text-sm font-black text-[#00ff66]">{product.priceString}</span>
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="border border-zinc-800 text-[10px] font-black tracking-wider text-zinc-300 px-4 py-2 rounded uppercase cursor-pointer transition-all hover:border-[#00ff66] hover:bg-[#00ff66]/5 hover:text-[#00ff66] active:scale-95"
          >
            ADICIONAR
          </button>
        </div>
      </div>
    </div>
  );
}