"use client";

/*
  ARQUIVO: app/produto/[id]/_components/ProductTabs.tsx
  FUNÇÃO: organizar as informações extras do produto em abas.
*/

import React, { useState } from 'react';

interface ProductTabsProps {
  product: {
    name: string;
    category: string;
    target: string;
    desc: string;
    details: string;
    highlights: string[];
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "shipping">("desc");

  return (
    <div className="border border-zinc-900 bg-zinc-950/20 rounded-3xl p-8 space-y-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* ABAS: Aumentadas de text-sm para text-base e tracking reduzido para não espalhar muito */}
      <div className="flex flex-wrap gap-8 border-b border-zinc-900 pb-4">
        <button onClick={() => setActiveTab("desc")} className={`text-base font-mono font-black tracking-wider uppercase transition-all pb-4 relative cursor-pointer ${activeTab === "desc" ? "text-[#00ff66]" : "text-zinc-400 hover:text-zinc-200"}`}>
          Descrição do Drop {activeTab === "desc" && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#00ff66]"></span>}
        </button>
        <button onClick={() => setActiveTab("specs")} className={`text-base font-mono font-black tracking-wider uppercase transition-all pb-4 relative cursor-pointer ${activeTab === "specs" ? "text-[#00ff66]" : "text-zinc-400 hover:text-zinc-200"}`}>
          Ficha Técnica {activeTab === "specs" && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#00ff66]"></span>}
        </button>
        <button onClick={() => setActiveTab("shipping")} className={`text-base font-mono font-black tracking-wider uppercase transition-all pb-4 relative cursor-pointer ${activeTab === "shipping" ? "text-[#00ff66]" : "text-zinc-400 hover:text-zinc-200"}`}>
          Garantia e Envios {activeTab === "shipping" && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#00ff66]"></span>}
        </button>
      </div>

      {/* CONTAINER PRINCIPAL: Mudado de text-zinc-400 font-light para text-zinc-300 font-normal */}
      <div className="text-lg text-zinc-300 font-normal leading-relaxed min-h-[260px] flex flex-col justify-start">
        {activeTab === "desc" && (
          <div className="space-y-6 animate-fadeIn">
            {/* TÍTULO COMERCIAL: Aumentado de text-lg para text-xl */}
            <p className="font-black text-white text-xl uppercase italic tracking-wide">
              {product.name} // Descrição Comercial
            </p>

            {/* TEXTO DE DETALHES: Agora herda o text-lg do container pai */}
            <p>{product.details}</p>

            {/* CARDS DOS HIGHLIGHTS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {product.highlights.map((highlight, index) => (
                <div key={highlight} className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5">
                  {/* Número do card aumentado para text-sm */}
                  <span className="text-[#00ff66] font-mono text-sm font-black">0{index + 1}</span>
                  {/* Texto do card aumentado de text-sm para text-base */}
                  <p className="text-base text-zinc-200 font-semibold mt-2">{highlight}</p>
                </div>
              ))}
            </div>

            {/* RESUMO: Aumentado de text-sm para text-base */}
            <p className="text-base text-zinc-400 border-l-2 border-[#00ff66]/50 pl-4">
              Resumo: {product.desc}
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          /* FICHA TÉCNICA: Aumentado de text-xs/text-sm para text-sm/text-base */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 font-mono text-sm md:text-base pt-2 animate-fadeIn">
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Material Base</span><span className="text-zinc-200 font-bold">{product.category === "CALÇADOS" ? "Mesh Balístico / TPU Co-injetado" : product.category === "VESTUÁRIO" ? "88% Poliamida / 12% Elastano" : "Nylon Cordura Ripstop 1000D"}</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Tecnologia Têxtil</span><span className="text-zinc-200 font-bold">{product.category === "CALÇADOS" ? "Amortecimento Responsivo V4" : product.category === "VESTUÁRIO" ? "Dri-Fit Hidrofóbico Aero" : "Blindagem Hidrorrepelente DWR"}</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Zonas de Respiro</span><span className="text-zinc-200 font-bold">Mapeamento Térmico Ativo</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Proteção Solar</span><span className="text-zinc-200 font-bold">Bloqueio Ativo FPU 50+</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Peso Líquido</span><span className="text-zinc-200 font-bold">{product.category === "CALÇADOS" ? "290g (Tam. 41 médio)" : product.category === "VESTUÁRIO" ? "145g (Ultra-Lightweight)" : "680g (Chassi Estruturado)"}</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Ergonomia</span><span className="text-zinc-200 font-bold">Anatômica Omnidirecional</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Acabamento</span><span className="text-zinc-200 font-bold">Costura Plana Flatlock</span></div>
            <div className="flex justify-between border-b border-zinc-900 pb-2"><span className="text-zinc-500">Categoria Oficial</span><span className="text-zinc-200 font-bold">{product.category} // {product.target}</span></div>
          </div>
        )}

        {activeTab === "shipping" && (
          /* GARANTIA E ENVIOS: Aumentado de text-sm para text-base */
          <div className="space-y-4 pt-2 animate-fadeIn text-base">
            <div className="flex gap-4 items-start bg-zinc-900/20 border border-zinc-900 p-5 rounded-xl">
              <span className="text-[#00ff66] font-mono text-base font-black">[01]</span>
              <p className="text-zinc-300"><strong className="text-white uppercase block mb-1 text-base">Garantia Blindada Bravos:</strong> Cobertura integral de 90 dias contra qualquer falha de fabricação, fadiga precoce de material ou problemas em costuras/fechos.</p>
            </div>
            <div className="flex gap-4 items-start bg-zinc-900/20 border border-zinc-900 p-5 rounded-xl">
              <span className="text-[#00ff66] font-mono text-base font-black">[02]</span>
              <p className="text-zinc-300"><strong className="text-white uppercase block mb-1 text-base">Logística de Despacho Ágil:</strong> Sistema de Coleta Integrada. Pedidos aprovados até as 13h são etiquetados, inspecionados pelo controle de qualidade e enviados no mesmo dia útil.</p>
            </div>
            <div className="flex gap-4 items-start bg-zinc-900/20 border border-zinc-900 p-5 rounded-xl">
              <span className="text-[#00ff66] font-mono text-base font-black">[03]</span>
              <p className="text-zinc-300"><strong className="text-white uppercase block mb-1 text-base">Política de Logística Reversa:</strong> Caso o produto não sirva como esperado, a primeira troca é totalmente por nossa conta dentro do prazo legal de 7 dias pós-recebimento.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
