"use client";

/*
  ARQUIVO: ShippingBlock.tsx
  Função: bloco visual sobre entrega/frete interativo.
*/

import React, { useState } from 'react';

interface ShippingOption {
  id: 'standard' | 'express';
  type: string;
  price: string;
  deliveryTime: string;
  rawPrice: number;
}

interface ShippingBlockProps {
  productPrice: number;
  onSelectShipping?: (option: ShippingOption) => void;
}

export default function ShippingBlock({ productPrice, onSelectShipping }: ShippingBlockProps) {
  const [cepInput, setCepInput] = useState("");
  const [shippingResults, setShippingResults] = useState<ShippingOption[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");
  const [detectedLocation, setDetectedLocation] = useState("");

  const handleCalculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cepInput.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setShippingError("Digite um CEP válido com 8 dígitos.");
      setShippingResults(null);
      setSelectedOption(null);
      return;
    }

    setShippingError("");
    setIsCalculatingShipping(true);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setShippingError("CEP não localizado na base de dados nacional.");
        setIsCalculatingShipping(false);
        setShippingResults(null);
        setSelectedOption(null);
        return;
      }

      setDetectedLocation(`${data.logradouro ? data.logradouro + ', ' : ''}${data.bairro ? data.bairro + ' - ' : ''}${data.localidade}/${data.uf}`);
      const uf = data.uf.toUpperCase();

      let basePricePAC = 14.90;
      let basePriceSEDEX = 26.50;
      let daysPAC = 6;
      let daysSEDEX = 1;

      if (["SP", "RJ", "MG", "ES"].includes(uf)) {
        basePricePAC = 12.80; basePriceSEDEX = 19.90; daysPAC = 5; daysSEDEX = 1;
      } else if (["PR", "SC", "RS", "GO", "DF"].includes(uf)) {
        basePricePAC = 18.50; basePriceSEDEX = 32.40; daysPAC = 7; daysSEDEX = 2;
      } else if (["BA", "PE", "CE", "MA", "RN", "PB", "AL", "SE", "PI", "MT", "MS"].includes(uf)) {
        basePricePAC = 24.90; basePriceSEDEX = 46.80; daysPAC = 9; daysSEDEX = 3;
      } else {
        basePricePAC = 32.00; basePriceSEDEX = 59.90; daysPAC = 14; daysSEDEX = 5;
      }
      
      const isPacFree = productPrice > 499;
      const finalPacPrice = isPacFree ? "GRÁTIS" : `R$ ${basePricePAC.toFixed(2).replace('.', ',')}`;
      const rawPacPrice = isPacFree ? 0 : basePricePAC;

      const options: ShippingOption[] = [
        {
          id: 'standard',
          type: "BRAVOS STANDARD (PAC)",
          price: finalPacPrice,
          deliveryTime: `${daysPAC} a ${daysPAC + 3} dias úteis`,
          rawPrice: rawPacPrice
        },
        {
          id: 'express',
          type: "BRAVOS EXPRESS (SEDEX)",
          price: `R$ ${basePriceSEDEX.toFixed(2).replace('.', ',')}`,
          deliveryTime: `${daysSEDEX} a ${daysSEDEX + 1} dias úteis`,
          rawPrice: basePriceSEDEX,
        }
      ];

      setShippingResults(options);
      setSelectedOption(options[0].id);

      // 💡 Salva a opção padrão inicial (PAC) no localStorage para sincronizar com a Home
      localStorage.setItem('bravos_selected_shipping', String(options[0].rawPrice));

      if (onSelectShipping) onSelectShipping(options[0]);

    } catch (err) {
      setShippingError("Erro de conexão ao calcular o frete. Tente novamente.");
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const handleSelectOption = (option: ShippingOption) => {
    setSelectedOption(option.id);

    // 💡 Atualiza o localStorage reativamente quando o usuário alternar entre PAC e SEDEX
    localStorage.setItem('bravos_selected_shipping', String(option.rawPrice));

    if (onSelectShipping) onSelectShipping(option);
  };

  return (
    <div className="border border-zinc-900 bg-zinc-950/40 p-6 rounded-2xl space-y-4 shadow-sm">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#00ff66]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM19.5 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-.75-12h-1.5m1.5 0H18.75a3 3 0 0 1 2.97 2.605l.578 4.047a3 3 0 0 1-.294 1.983L21.3 16.5a1.5 1.5 0 0 1-1.083.75h-1.5m-.75-10.5a3 3 0 0 0-3-3h-7.5a3 3 0 0 0-3 3v9.75m12 0a3 3 0 0 1-3 3H5.625a3 3 0 0 1-3-3v-9.75m12 0H3" />
        </svg>
        <span className="text-base font-mono font-black text-white uppercase tracking-wider">Simular Frete Operacional</span>
      </div>

      <form onSubmit={handleCalculateShipping} className="flex gap-2">
        <input 
          type="text" 
          value={cepInput}
          onChange={(e) => setCepInput(e.target.value)}
          placeholder="00000-000" 
          maxLength={9}
          className="bg-zinc-950 border border-zinc-800 text-sm px-4 py-3.5 rounded-lg flex-grow font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-[#00ff66]/60 transition-colors"
        />
        <button 
          type="submit" 
          disabled={isCalculatingShipping}
          className="bg-zinc-900 border border-zinc-800 hover:border-[#00ff66] text-zinc-300 hover:text-[#00ff66] font-mono text-sm font-black uppercase px-6 rounded-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {isCalculatingShipping ? "CALCULANDO..." : "OK"}
        </button>
      </form>

      {shippingError && (
        <p className="text-sm font-mono text-red-500 tracking-wide mt-1">⚠️ {shippingError}</p>
      )}

      {shippingResults && (
        <div className="space-y-3 pt-3 border-t border-zinc-900/60 transition-all">
          {detectedLocation && (
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">📍 Destino: {detectedLocation}</p>
          )}
          
          <div className="grid gap-2.5">
            {shippingResults.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`flex justify-between items-center bg-black/30 p-4 rounded-xl font-mono text-sm text-left w-full transition-all border outline-none
                    ${isSelected 
                      ? "border-[#00ff66] bg-[#00ff66]/5 shadow-[0_0_12px_rgba(0,255,102,0.05)]" 
                      : "border-zinc-900/60 hover:border-zinc-700"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all
                      ${isSelected ? "border-[#00ff66]" : "border-zinc-700"}`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#00ff66]" />}
                    </div>
                    
                    <div>
                      <p className={`font-bold tracking-wide uppercase transition-colors ${isSelected ? "text-[#00ff66]" : "text-zinc-200"}`}>
                        {opt.type}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">Prazo: {opt.deliveryTime}</p>
                    </div>
                  </div>

                  <span className={`font-black text-base tracking-tight ${opt.price === "GRÁTIS" ? "text-[#00ff66]" : "text-white"}`}>
                    {opt.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}