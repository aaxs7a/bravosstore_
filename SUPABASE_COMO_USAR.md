# Como usar o Supabase na Bravos Store

Este projeto foi ajustado para consumir o Supabase no lugar do `localStorage`.

## 1. Instalar dependência

```bash
npm install @supabase/supabase-js
```

## 2. Criar o arquivo `.env.local`

Copie o arquivo `.env.local.example`, renomeie para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
```

Esses dados ficam no Supabase em:

```txt
Project Settings > API
```

## 3. Arquivo principal da integração

A conexão com o Supabase está em:

```txt
app/_lib/bravosSupabase.ts
```

Esse arquivo centraliza:

- cadastro de cliente;
- login com Supabase Auth;
- logout;
- recuperação de senha;
- busca de produtos;
- busca de produto por ID;
- carrinho no banco;
- finalização de pedido.

## 4. O que mudou no projeto

Antes, a aplicação guardava usuário e carrinho no navegador com `localStorage`.
Agora:

- usuários fazem login/cadastro pelo Supabase Auth;
- dados extras do usuário ficam na tabela `usuarios`;
- produtos vêm da tabela `produtos`;
- carrinho fica salvo na tabela `carrinho`;
- pedidos são salvos nas tabelas `pedidos` e `itens_pedido`.

## 5. Rodar o projeto

```bash
npm install
npm run dev
```

Depois acesse:

```txt
http://localhost:3000
```
