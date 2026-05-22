-- =====================================================
-- CORREÇÃO SUPABASE AUTH + UUID + CPF - BRAVOS STORE
-- =====================================================
-- Rode este arquivo no Supabase em: SQL Editor > New Query > Run
-- Ele garante que a tabela usuarios tenha CPF e que, ao criar uma conta
-- no Supabase Auth, o perfil seja criado automaticamente na tabela usuarios.

ALTER TABLE public.usuarios
ADD COLUMN IF NOT EXISTS cpf VARCHAR(14);

CREATE OR REPLACE FUNCTION public.handle_new_bravos_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, nome, cpf, tipo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'cpf',
    COALESCE(NEW.raw_user_meta_data->>'tipo', 'cliente')
  )
  ON CONFLICT (id) DO UPDATE SET
    nome = EXCLUDED.nome,
    cpf = EXCLUDED.cpf,
    tipo = EXCLUDED.tipo;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_bravos ON auth.users;

CREATE TRIGGER on_auth_user_created_bravos
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_bravos_user();

-- Policies básicas para desenvolvimento/apresentação.
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produto_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrinho ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itens_pedido ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "usuarios_select_proprio" ON public.usuarios;
CREATE POLICY "usuarios_select_proprio" ON public.usuarios
FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "usuarios_insert_proprio" ON public.usuarios;
CREATE POLICY "usuarios_insert_proprio" ON public.usuarios
FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "usuarios_update_proprio" ON public.usuarios;
CREATE POLICY "usuarios_update_proprio" ON public.usuarios
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "produtos_leitura_publica" ON public.produtos;
CREATE POLICY "produtos_leitura_publica" ON public.produtos
FOR SELECT USING (true);

DROP POLICY IF EXISTS "highlights_leitura_publica" ON public.produto_highlights;
CREATE POLICY "highlights_leitura_publica" ON public.produto_highlights
FOR SELECT USING (true);

DROP POLICY IF EXISTS "carrinho_select_proprio" ON public.carrinho;
CREATE POLICY "carrinho_select_proprio" ON public.carrinho
FOR SELECT USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "carrinho_insert_proprio" ON public.carrinho;
CREATE POLICY "carrinho_insert_proprio" ON public.carrinho
FOR INSERT WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "carrinho_update_proprio" ON public.carrinho;
CREATE POLICY "carrinho_update_proprio" ON public.carrinho
FOR UPDATE USING (auth.uid() = usuario_id) WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "carrinho_delete_proprio" ON public.carrinho;
CREATE POLICY "carrinho_delete_proprio" ON public.carrinho
FOR DELETE USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "pedidos_select_proprio" ON public.pedidos;
CREATE POLICY "pedidos_select_proprio" ON public.pedidos
FOR SELECT USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "pedidos_insert_proprio" ON public.pedidos;
CREATE POLICY "pedidos_insert_proprio" ON public.pedidos
FOR INSERT WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "itens_pedido_select_proprio" ON public.itens_pedido;
CREATE POLICY "itens_pedido_select_proprio" ON public.itens_pedido
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.pedidos
    WHERE pedidos.id = itens_pedido.pedido_id
    AND pedidos.usuario_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "itens_pedido_insert_proprio" ON public.itens_pedido;
CREATE POLICY "itens_pedido_insert_proprio" ON public.itens_pedido
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.pedidos
    WHERE pedidos.id = itens_pedido.pedido_id
    AND pedidos.usuario_id = auth.uid()
  )
);
