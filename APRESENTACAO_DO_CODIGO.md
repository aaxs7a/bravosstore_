# Guia rápido para apresentar o código da Bravos Store

## 1. Organização principal

O projeto foi feito com Next.js e React. A pasta mais importante é `app`, porque nela ficam as páginas, os componentes e os estilos da aplicação.

- `app/page.tsx`: página inicial da loja.
- `app/produto/[id]/page.tsx`: página de detalhes de cada produto.
- `app/_components`: componentes reutilizáveis, como header, footer, carrinho, modal de login e card de produto.
- `app/_data/products.ts`: arquivo central com todos os produtos, imagens, preços e descrições.

## 2. Onde ficam os produtos

Os produtos ficam centralizados em:

```txt
app/_data/products.ts
```

Esse arquivo é importante porque evita repetir a mesma lista de produtos em várias páginas. A home e a página de detalhes usam a mesma lista.

Cada produto tem:

- `id`: número usado para abrir a página `/produto/id`.
- `name`: nome do produto.
- `category`: categoria do produto.
- `target`: seção onde aparece na home.
- `price`: preço usado nos cálculos.
- `priceString`: preço formatado para aparecer na tela.
- `image`: link da imagem.
- `desc`: descrição curta.
- `details`: descrição completa.
- `highlights`: destaques do produto.

## 3. Como funciona a página inicial

A página inicial está em:

```txt
app/page.tsx
```

Ela controla:

- carrossel automático;
- pesquisa de produtos;
- vitrines de Coleções, Masculino e Feminino;
- carrinho;
- login/cadastro;
- chamada dos componentes visuais.

A pesquisa funciona filtrando a lista `ALL_PRODUCTS`. Quando o usuário digita, o código compara o texto com nome, categoria, público, preço e descrição do produto.

## 4. Como funciona a página de produto

A página individual fica em:

```txt
app/produto/[id]/page.tsx
```

O `[id]` é uma rota dinâmica. Isso significa que o Next.js entende URLs como:

```txt
/produto/1
/produto/8
/produto/30
```

O código pega esse id da URL e procura o produto correspondente dentro de `ALL_PRODUCTS`.

## 5. Como funciona o carrinho

O carrinho usa `useState` para guardar os produtos enquanto o site está aberto e `localStorage` para salvar os dados no navegador.

Isso significa que, mesmo atualizando a página, os itens continuam guardados no navegador durante o teste.

## 6. Como funciona login e cadastro

O login e cadastro ficam no componente:

```txt
app/_components/AuthModal.tsx
```

Ele também usa `localStorage`, ou seja, é uma simulação de autenticação para apresentação. Não é um banco de dados real, mas serve para demonstrar a lógica de cadastro, login, validação e usuário logado.

## 7. Melhorias feitas nesta versão

- Produtos ficaram centralizados no arquivo `products.ts`.
- As descrições ficaram mais completas e fáceis de explicar.
- As imagens foram trocadas por links mais adequados ao estilo esportivo.
- A página de detalhes agora usa `details` e `highlights` de cada produto.
- O código recebeu comentários mais explicativos para apresentação.
- O build foi testado com `npm run build`.
