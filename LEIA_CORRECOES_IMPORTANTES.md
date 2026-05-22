# Correções aplicadas

- Login/cadastro usando Supabase Auth, sem localStorage.
- Carrinho salvo na tabela `carrinho` do Supabase.
- Produtos carregados da tabela `produtos` do Supabase.
- Página de detalhes busca produto pelo ID no Supabase.
- Olhinho da senha mantido no login e no cadastro.
- Mercado Pago recriado em `app/api/checkout/route.ts` usando API REST oficial.

## Rode no Supabase

Abra o arquivo `SUPABASE_CORRECAO_AUTH_UUID_CPF.sql` no Supabase SQL Editor e clique em Run.

## Variáveis necessárias

No `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
MERCADO_PAGO_ACCESS_TOKEN=SEU_ACCESS_TOKEN_DO_MERCADO_PAGO
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Na Vercel, coloque as mesmas variáveis em Settings > Environment Variables.
