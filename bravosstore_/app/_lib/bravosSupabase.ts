// ============================================================================
// ARQUIVO: app/_lib/bravosSupabase.ts
// OBJETIVO: centralizar a conexão e as funções do Supabase da Bravos Store.
// Use este arquivo para substituir o localStorage por dados reais no banco.
//
// Antes de usar:
// 1) Instale o pacote:
//    npm install @supabase/supabase-js
//
// 2) Crie o arquivo .env.local na raiz do projeto:
//    NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
//
// 3) No Supabase, confira se as tabelas existem:
//    usuarios, produtos, produto_highlights, carrinho, pedidos, itens_pedido
// ============================================================================

import { createClient } from "@supabase/supabase-js";

// Pega as variáveis do .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Proteção para evitar erro silencioso caso falte configurar o .env.local
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local"
  );
}

// Cliente principal do Supabase.
// Ele será usado para login, cadastro, produtos, carrinho e pedidos.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// TIPOS USADOS NA APLICAÇÃO
// ============================================================================

export type BravosUser = {
  id: string;
  name: string;
  email: string;
  tipo: "admin" | "cliente";
};

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

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// ============================================================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================================================

// Cadastra um cliente usando Supabase Auth.
// A senha NÃO fica na tabela usuarios; ela fica segura no auth.users.
export async function cadastrarCliente(nome: string, email: string, senha: string) {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password: senha,
  });

  if (error) throw new Error(error.message);

  const userId = data.user?.id;

  if (!userId) {
    throw new Error("Usuário criado, mas o Supabase não retornou o ID.");
  }

  // Salva dados extras do usuário na tabela public.usuarios
  const { error: perfilError } = await supabase.from("usuarios").insert({
    id: userId,
    nome,
    tipo: "cliente",
  });

  if (perfilError) throw new Error(perfilError.message);

  return {
    id: userId,
    name: nome,
    email: cleanEmail,
    tipo: "cliente" as const,
  };
}

// Faz login pelo Supabase Auth e busca o nome/tipo na tabela usuarios.
export async function fazerLogin(email: string, senha: string): Promise<BravosUser> {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password: senha,
  });

  if (error) throw new Error("E-mail ou senha incorretos.");

  const userId = data.user.id;

  const { data: perfil, error: perfilError } = await supabase
    .from("usuarios")
    .select("id, nome, tipo")
    .eq("id", userId)
    .single();

  if (perfilError) throw new Error(perfilError.message);

  return {
    id: perfil.id,
    name: perfil.nome,
    email: data.user.email ?? cleanEmail,
    tipo: perfil.tipo,
  };
}

// Busca o usuário logado atualmente.
// Use isso no lugar de localStorage.getItem("bravos_logged_user").
export async function buscarUsuarioLogado(): Promise<BravosUser | null> {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return null;

  const { data: perfil, error } = await supabase
    .from("usuarios")
    .select("id, nome, tipo")
    .eq("id", data.user.id)
    .single();

  if (error || !perfil) return null;

  return {
    id: perfil.id,
    name: perfil.nome,
    email: data.user.email ?? "",
    tipo: perfil.tipo,
  };
}

// Sai da conta.
// Use isso no lugar de localStorage.removeItem("bravos_logged_user").
export async function sairDaConta() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// Envia e-mail de recuperação de senha pelo Supabase.
// No painel do Supabase, configure a URL do site em Authentication > URL Configuration.
export async function recuperarSenha(email: string) {
  const cleanEmail = email.trim().toLowerCase();

  const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
    redirectTo: typeof window !== "undefined" ? `${window.location.origin}` : undefined,
  });

  if (error) throw new Error(error.message);
}

// ============================================================================
// FUNÇÕES DE PRODUTOS
// ============================================================================

// Converte o formato do banco para o formato usado no seu frontend.
function mapProduto(produto: any): Product {
  return {
    id: produto.id,
    name: produto.nome,
    category: produto.categoria,
    target: produto.target,
    price: Number(produto.preco),
    priceString:
      produto.preco_formatado ??
      Number(produto.preco).toFixed(2).replace(".", ","),
    image: produto.imagem,
    desc: produto.descricao,
    details: produto.detalhes,
    highlights: produto.produto_highlights?.map((item: any) => item.destaque) ?? [],
  };
}

// Busca todos os produtos com seus highlights.
// Use isso no lugar de importar ALL_PRODUCTS.
export async function buscarProdutos(): Promise<Product[]> {
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
      estoque,
      produto_highlights (
        destaque
      )
    `)
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map(mapProduto);
}

// Busca um produto específico pelo ID.
// Use isso na página app/produto/[id]/page.tsx.
export async function buscarProdutoPorId(id: number): Promise<Product | null> {
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
      estoque,
      produto_highlights (
        destaque
      )
    `)
    .eq("id", id)
    .single();

  if (error) return null;

  return mapProduto(data);
}

// ============================================================================
// FUNÇÕES DO CARRINHO
// ============================================================================

// Busca o carrinho salvo no banco do usuário logado.
// Use isso no lugar de localStorage.getItem("bravos_cart").
export async function buscarCarrinho(usuarioId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("carrinho")
    .select(`
      quantidade,
      produtos (
        id,
        nome,
        preco,
        imagem
      )
    `)
    .eq("usuario_id", usuarioId)
    .order("criado_em", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((item: any) => ({
    id: item.produtos.id,
    name: item.produtos.nome,
    price: Number(item.produtos.preco),
    image: item.produtos.imagem,
    quantity: item.quantidade,
  }));
}

// Adiciona produto ao carrinho.
// Se o produto já existir no carrinho, aumenta a quantidade.
export async function adicionarAoCarrinho(usuarioId: string, produtoId: number, quantidade = 1) {
  const { data: itemExistente, error: buscaError } = await supabase
    .from("carrinho")
    .select("id, quantidade")
    .eq("usuario_id", usuarioId)
    .eq("produto_id", produtoId)
    .maybeSingle();

  if (buscaError) throw new Error(buscaError.message);

  if (itemExistente) {
    const { error } = await supabase
      .from("carrinho")
      .update({ quantidade: itemExistente.quantidade + quantidade })
      .eq("id", itemExistente.id);

    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from("carrinho").insert({
    usuario_id: usuarioId,
    produto_id: produtoId,
    quantidade,
  });

  if (error) throw new Error(error.message);
}

// Atualiza a quantidade de um produto do carrinho.
// Se a quantidade ficar 0 ou menor, remove o produto.
export async function atualizarQuantidadeCarrinho(
  usuarioId: string,
  produtoId: number,
  novaQuantidade: number
) {
  if (novaQuantidade <= 0) {
    await removerDoCarrinho(usuarioId, produtoId);
    return;
  }

  const { error } = await supabase
    .from("carrinho")
    .update({ quantidade: novaQuantidade })
    .eq("usuario_id", usuarioId)
    .eq("produto_id", produtoId);

  if (error) throw new Error(error.message);
}

// Remove um produto do carrinho.
export async function removerDoCarrinho(usuarioId: string, produtoId: number) {
  const { error } = await supabase
    .from("carrinho")
    .delete()
    .eq("usuario_id", usuarioId)
    .eq("produto_id", produtoId);

  if (error) throw new Error(error.message);
}

// Limpa o carrinho do usuário.
export async function limparCarrinho(usuarioId: string) {
  const { error } = await supabase
    .from("carrinho")
    .delete()
    .eq("usuario_id", usuarioId);

  if (error) throw new Error(error.message);
}

// ============================================================================
// FUNÇÕES DE PEDIDOS
// ============================================================================

// Finaliza a compra:
// 1) cria um pedido,
// 2) salva os itens em itens_pedido,
// 3) limpa o carrinho.
export async function finalizarPedido(usuarioId: string, cart: CartItem[]) {
  if (cart.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { data: pedido, error: pedidoError } = await supabase
    .from("pedidos")
    .insert({
      usuario_id: usuarioId,
      total,
      status: "pendente",
    })
    .select("id")
    .single();

  if (pedidoError) throw new Error(pedidoError.message);

  const itens = cart.map((item) => ({
    pedido_id: pedido.id,
    produto_id: item.id,
    quantidade: item.quantity,
    preco_unitario: item.price,
  }));

  const { error: itensError } = await supabase
    .from("itens_pedido")
    .insert(itens);

  if (itensError) throw new Error(itensError.message);

  await limparCarrinho(usuarioId);

  return pedido.id;
}

// Busca pedidos do usuário logado.
export async function buscarPedidos(usuarioId: string) {
  const { data, error } = await supabase
    .from("pedidos")
    .select(`
      id,
      total,
      status,
      criado_em,
      itens_pedido (
        quantidade,
        preco_unitario,
        produtos (
          id,
          nome,
          imagem
        )
      )
    `)
    .eq("usuario_id", usuarioId)
    .order("criado_em", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}