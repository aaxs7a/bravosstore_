-- Cole este código no Supabase > SQL Editor caso os produtos não carreguem.
-- Ele libera a leitura dos produtos e destaques para visitantes da loja.
-- Também protege carrinho, pedidos e dados do usuário por usuário logado.

ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE produto_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE carrinho ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Produtos visíveis para todos" ON produtos;
CREATE POLICY "Produtos visíveis para todos"
ON produtos FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Highlights visíveis para todos" ON produto_highlights;
CREATE POLICY "Highlights visíveis para todos"
ON produto_highlights FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Usuario ve seu proprio perfil" ON usuarios;
CREATE POLICY "Usuario ve seu proprio perfil"
ON usuarios FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuario cria seu proprio perfil" ON usuarios;
CREATE POLICY "Usuario cria seu proprio perfil"
ON usuarios FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Usuario atualiza seu proprio perfil" ON usuarios;
CREATE POLICY "Usuario atualiza seu proprio perfil"
ON usuarios FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Usuario ve seu proprio carrinho" ON carrinho;
CREATE POLICY "Usuario ve seu proprio carrinho"
ON carrinho FOR SELECT
TO authenticated
USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuario adiciona no proprio carrinho" ON carrinho;
CREATE POLICY "Usuario adiciona no proprio carrinho"
ON carrinho FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuario atualiza proprio carrinho" ON carrinho;
CREATE POLICY "Usuario atualiza proprio carrinho"
ON carrinho FOR UPDATE
TO authenticated
USING (auth.uid() = usuario_id)
WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuario remove do proprio carrinho" ON carrinho;
CREATE POLICY "Usuario remove do proprio carrinho"
ON carrinho FOR DELETE
TO authenticated
USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuario ve seus pedidos" ON pedidos;
CREATE POLICY "Usuario ve seus pedidos"
ON pedidos FOR SELECT
TO authenticated
USING (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuario cria seus pedidos" ON pedidos;
CREATE POLICY "Usuario cria seus pedidos"
ON pedidos FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = usuario_id);

DROP POLICY IF EXISTS "Usuario ve itens dos seus pedidos" ON itens_pedido;
CREATE POLICY "Usuario ve itens dos seus pedidos"
ON itens_pedido FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM pedidos
    WHERE pedidos.id = itens_pedido.pedido_id
    AND pedidos.usuario_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Usuario cria itens nos seus pedidos" ON itens_pedido;
CREATE POLICY "Usuario cria itens nos seus pedidos"
ON itens_pedido FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pedidos
    WHERE pedidos.id = itens_pedido.pedido_id
    AND pedidos.usuario_id = auth.uid()
  )
);
