/*
  ARQUIVO: TrustBadges.tsx
  Função: mostra selos de confiança, segurança e benefícios.
  Esses blocos ajudam a passar mais confiança para o cliente.
*/

// Badges de confiança exibidos na página do produto.
import React from 'react';

export default function TrustBadges() {
  return (
    <div className="border border-zinc-900/50 bg-gradient-to-b from-zinc-950/20 to-zinc-950/50 p-8 rounded-2xl space-y-8">
      
      {/* CARD 1 */}
      <div className="flex gap-4 items-center">
        <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[#00ff66] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        </div>
        <div>
          <h4 className="text-[15px] font-mono font-black text-white uppercase tracking-wider">Compra 100% Autêntica</h4>
          <p className="text-[12px] text-zinc-500 mt-0.5">Garantia de originalidade direto de distribuidores oficiais.</p>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="flex gap-4 items-center border-t border-zinc-900/40 pt-4">
        <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[#00ff66] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
        <div>
          <h4 className="text-[15px] font-mono font-black text-white uppercase tracking-wider">Primeira Troca Grátis</h4>
          <p className="text-[12px] text-zinc-500 mt-0.5">Não serviu? Nós cobrimos o frete reverso de devolução.</p>
        </div>
      </div>

      {/* CARD 3 */}
      <div className="flex gap-4 items-center border-t border-zinc-900/40 pt-4">
        <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[#00ff66] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 10.5h13.5c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H5.625c-.621 0-1.125.504-1.125 1.125v7.125c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
        </div>
        <div>
          <h4 className="text-[15px] font-mono font-black text-white uppercase tracking-wider">Ambiente Criptografado</h4>
          <p className="text-[12px] text-zinc-500 mt-0.5">Pagamento processado sob protocolos rígidos de segurança SSL.</p>
        </div>
      </div>

    </div>
  );
}