# Comentários dos arquivos do projeto

Este projeto foi comentado nos arquivos de código principais: `.tsx`, `.ts`, `.css`, `.mjs`, `.md`, `.svg` e `.gitignore`.

Alguns arquivos não foram comentados por dentro porque poderiam quebrar o projeto:

- `package.json`: JSON não aceita comentários. Ele guarda scripts e dependências.
- `package-lock.json`: JSON gerado automaticamente pelo npm. Não deve ser editado manualmente.
- `tsconfig.json`: JSON de configuração do TypeScript. Também não aceita comentários comuns.
- `app/favicon.ico`: arquivo de imagem binária do ícone da aba do navegador.

## O que cada parte faz

- `app/page.tsx`: página inicial, carrossel automático, pesquisa, produtos, login/cadastro e carrinho.
- `app/layout.tsx`: estrutura global do Next.js.
- `app/globals.css`: estilos globais.
- `app/_components/header.tsx`: navbar fixa, busca, login e carrinho.
- `app/_components/footer.tsx`: footer da loja.
- `app/_components/AuthModal.tsx`: modal de login e cadastro.
- `app/_components/cart.tsx`: carrinho lateral.
- `app/_components/cardproduct.tsx`: card de produto.
- `app/produto/[id]/page.tsx`: página de detalhes do produto.
- `app/produto/[id]/_components/*`: blocos internos da página de produto.
