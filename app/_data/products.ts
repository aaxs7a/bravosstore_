
// ============================================================================
// ARQUIVO: app/_data/products.ts
// OBJETIVO: buscar os produtos diretamente do Supabase.
// Agora os dados NÃO ficam mais salvos localmente.
// ============================================================================

import { supabase } from "../_lib/bravosSupabase";

// Tipo principal usado nas páginas da loja
export type Product = {
  id: number;
  name: string;
  category: string;
  target: string;
  price: number;
  priceString: string;
  image: string;
  desc: string;
  details: string;
  highlights: string[];
};

// ============================================================================
// BUSCAR TODOS OS PRODUTOS
// ============================================================================

export async function getAllProducts(): Promise<Product[]> {

  const { data, error } = await supabase
    .from("produtos")
    .select(`
      id,
      nome,
      categoria,
      target,
      preco,
      preco_formatado,
      imagem,
      descricao,
      detalhes,
      produto_highlights (
        destaque
      )
    `)
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }

  return data.map((produto: any) => ({
    id: produto.id,
    name: produto.nome,
    category: produto.categoria,
    target: produto.target,
    price: Number(produto.preco),
    priceString: produto.preco_formatado,
    image: produto.imagem,
    desc: produto.descricao,
    details: produto.detalhes,
    highlights:
      produto.produto_highlights?.map(
        (highlight: any) => highlight.destaque
      ) || [],
  }));
}

// ============================================================================
// BUSCAR PRODUTO POR ID
// ============================================================================

export async function getProductById(id: number) {

  const produtos = await getAllProducts();

  return produtos.find((produto) => produto.id === id);
}

// ============================================================================
// PRODUTOS DO HERO/CARROSSEL
// ============================================================================

export async function getHeroProducts() {

  const produtos = await getAllProducts();

  return [
    produtos[1],
    produtos[7],
    produtos[27]
  ].filter(Boolean);
}
