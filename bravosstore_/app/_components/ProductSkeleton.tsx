export default function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-zinc-900 border border-zinc-800/80 p-4 shadow-sm flex flex-col justify-between">
      <div>
        {/* Placeholder da Imagem */}
        <div className="w-full h-64 bg-zinc-800/60 rounded-xl mb-4" />

        {/* Placeholder da Categoria/Tag */}
        <div className="w-1/4 h-3 bg-zinc-800 rounded mb-2" />

        {/* Placeholder do Título do Produto */}
        <div className="w-3/4 h-5 bg-zinc-800 rounded mb-3" />

        {/* Placeholder do Preço */}
        <div className="w-1/2 h-6 bg-zinc-800 rounded mb-4" />
      </div>

      {/* Placeholder do Botão Comprar */}
      <div className="w-full h-10 bg-zinc-800 rounded-xl" />
    </div>
  );
}