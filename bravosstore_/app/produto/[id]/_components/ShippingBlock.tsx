/*
  ARQUIVO: ShippingBlock.tsx
  Função: bloco visual sobre entrega/frete.
  Serve para deixar a página de produto mais completa e parecida com loja real.
*/

// Bloco de simulação visual de frete e resumo de entrega.
import React, { useState } from 'react';

interface ShippingOption {
  type: string;
  price: string;
  deliveryTime: string;
}

interface ShippingBlockProps {
  productPrice: number;
}

export default function ShippingBlock({ productPrice }: ShippingBlockProps) {
  const [cepInput, setCepInput] = useState("");
  const [shippingResults, setShippingResults] = useState<ShippingOption[] | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");
  const [detectedLocation, setDetectedLocation] = useState("");

  const handleCalculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cepInput.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setShippingError("Digite um CEP válido com 8 dígitos.");
      setShippingResults(null);
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
        return;
      }

      setDetectedLocation(`${data.logradouro ? data.logradouro + ', ' : ''}${data.bairro ? data.bairro + ' - ' : ''}${data.localidade}/${data.uf}`);
      const uf = data.uf.toUpperCase();
      let basePricePAC = 14.90;
      let basePriceSEDEX = 26.50;
      let daysPAC = 4;
      let daysSEDEX = 1;

      if (["SP", "RJ", "MG", "ES"].includes(uf)) {
        basePricePAC = 12.80; basePriceSEDEX = 19.90; daysPAC = 3; daysSEDEX = 1;
      } else if (["PR", "SC", "RS", "GO", "DF"].includes(uf)) {
        basePricePAC = 18.50; basePriceSEDEX = 32.40; daysPAC = 5; daysSEDEX = 2;
      } else if (["BA", "PE", "CE", "MA", "RN", "PB", "AL", "SE", "PI", "MT", "MS"].includes(uf)) {
        basePricePAC = 24.90; basePriceSEDEX = 46.80; daysPAC = 7; daysSEDEX = 3;
      } else {
        basePricePAC = 32.00; basePriceSEDEX = 59.90; daysPAC = 10; daysSEDEX = 4;
      }

      const finalPacPrice = productPrice > 400 ? "GRÁTIS" : `R$ ${basePricePAC.toFixed(2).replace('.', ',')}`;

      setShippingResults([
        { type: "BRAVOS STANDARD (PAC)", price: finalPacPrice, deliveryTime: `${daysPAC} a ${daysPAC + 3} dias úteis` },
        { type: "BRAVOS EXPRESS (SEDEX)", price: `R$ ${basePriceSEDEX.toFixed(2).replace('.', ',')}`, deliveryTime: `${daysSEDEX} a ${daysSEDEX + 1} dias úteis` }
      ]);
    } catch (err) {
      setShippingError("Erro de conexão ao calcular o frete. Tente novamente.");
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  return (
    <div className="border border-zinc-900 bg-zinc-950/40 p-5 rounded-2xl space-y-4 shadow-sm">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#00ff66]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM19.5 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-.75-12h-1.5m1.5 0H18.75a3 3 0 0 1 2.97 2.605l.578 4.047a3 3 0 0 1-.294 1.983L21.3 16.5a1.5 1.5 0 0 1-1.083.75h-1.5m-.75-10.5a3 3 0 0 0-3-3h-7.5a3 3 0 0 0-3 3v9.75m12 0a3 3 0 0 1-3 3H5.625a3 3 0 0 1-3-3v-9.75m12 0H3" />
        </svg>
        <span className="text-[14px] font-mono font-black text-white uppercase tracking-wider">Simular Frete Operacional</span>
      </div>

      <form onSubmit={handleCalculateShipping} className="flex gap-2">
        <input 
          type="text" 
          value={cepInput}
          onChange={(e) => setCepInput(e.target.value)}
          placeholder="00000-000" 
          maxLength={9}
          className="bg-zinc-950 border border-zinc-800 text-sm px-4 py-3 rounded-lg flex-grow font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-[#00ff66]/60 transition-colors"
        />
        <button 
          type="submit" 
          disabled={isCalculatingShipping}
          className="bg-zinc-900 border border-zinc-800 hover:border-[#00ff66] text-zinc-300 hover:text-[#00ff66] font-mono text-xs font-black uppercase px-5 rounded-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {isCalculatingShipping ? "CALCULANDO..." : "OK"}
        </button>
      </form>

      {shippingError && (
        <p className="text-xs font-mono text-red-500 tracking-wide mt-1">⚠️ {shippingError}</p>
      )}

      {shippingResults && (
        <div className="space-y-2.5 pt-2 border-t border-zinc-900/60 transition-all">
          {detectedLocation && (
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">📍 Destino: {detectedLocation}</p>
          )}
          {shippingResults.map((opt, i) => (
            <div key={i} className="flex justify-between items-center bg-black/30 border border-zinc-900/60 p-3 rounded-xl font-mono text-xs">
              <div>
                <p className="text-zinc-300 font-bold tracking-wide uppercase">{opt.type}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Prazo: {opt.deliveryTime}</p>
              </div>
              <span className={`font-black text-sm tracking-tight ${opt.price === "GRÁTIS" ? "text-[#00ff66]" : "text-white"}`}>
                {opt.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}