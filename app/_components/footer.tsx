/*
  ARQUIVO: footer.tsx
  Função: rodapé da loja.
  Fica no final das páginas com informações institucionais e atendimento genérico.
  As redes sociais pessoais foram removidas daqui.
*/

// Rodapé da aplicação. Contém informações institucionais, navegação e atendimento sem redes sociais pessoais.
import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#050506] text-zinc-400">
      {/* Conteúdo principal do footer em colunas responsivas. */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-2xl font-black italic tracking-[0.12em] text-white uppercase">
            BRAVO<span className="text-[#00ff66]">'s</span> STORE
          </h3>
          <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
            Loja de artigos esportivos com foco em performance, estilo e produtos selecionados para treinos, corrida e uso diário.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black tracking-[0.2em] text-white uppercase">Navegação</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><a href="/#colecoes" className="hover:text-[#00ff66] transition-colors">Coleções</a></li>
            <li><a href="/#masculino" className="hover:text-[#00ff66] transition-colors">Masculino</a></li>
            <li><a href="/#feminino" className="hover:text-[#00ff66] transition-colors">Feminino</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black tracking-[0.2em] text-white uppercase">Atendimento</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>Segunda a sexta</li>
            <li>08h às 18h</li>
            <li>Suporte para compras, pedidos e dúvidas sobre produtos.</li>
          </ul>
        </div>
      </div>

      {/* Faixa inferior com direitos reservados e tecnologias utilizadas. */}
      <div className="border-t border-zinc-900 py-5">
        {/* Conteúdo principal do footer em colunas responsivas. */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-zinc-600">
          <p>© 2026 BRAVOS's STORE. Todos os direitos reservados.</p>
          <p>Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
