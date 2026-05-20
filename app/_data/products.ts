// ============================================================================
// ARQUIVO: app/_data/products.ts
// OBJETIVO: centralizar todos os dados dos produtos da loja.
//
// Por que este arquivo é importante para apresentação?
// - Antes, a lista de produtos ficava repetida em mais de uma página.
// - Agora, a home e a página de detalhes usam a mesma fonte de dados.
// - Se quiser trocar imagem, preço, nome ou descrição, basta alterar aqui.
// - Isso deixa o projeto mais organizado e evita erro de um produto aparecer
//   diferente na vitrine e na página individual.
// ============================================================================

// Tipo que define o formato obrigatório de cada produto.
// O TypeScript usa este tipo para avisar se faltar algum campo importante.
export type Product = {
  id: number;              // Identificador único usado na URL /produto/[id]
  name: string;            // Nome exibido no card e na página de detalhes
  category: string;        // Categoria principal: CALÇADOS, VESTUÁRIO ou ACESSÓRIOS
  target: string;          // Seção da home onde o produto aparece
  price: number;           // Preço em formato numérico para cálculos do carrinho
  priceString: string;     // Preço já formatado para aparecer na tela
  image: string;           // Link da imagem do produto
  desc: string;            // Resumo curto usado no card, busca e apresentação
  details: string;         // Descrição comercial mais completa da página do produto
  highlights: string[];    // Lista de destaques mostrados/explicados na apresentação
};

// Lista principal de produtos da Bravos Store.
// As imagens continuam vindo de links externos para evitar deixar o ZIP pesado.
export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tênis Nike Air Max Alpha Trainer 5",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 549.90,
    priceString: "549,90",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis masculino robusto para academia, treino funcional e uso diário, com ótima estabilidade no calcanhar.",
    details: "Modelo pensado para quem precisa de firmeza em treinos de força e conforto no dia a dia. A base larga ajuda na estabilidade, enquanto o cabedal respirável melhora a ventilação durante exercícios intensos.",
    highlights: ["Base larga para estabilidade", "Visual esportivo premium", "Ideal para treino e rotina"]
  },
  {
    id: 2,
    name: "Tênis Adidas Ultraboost Light",
    category: "CALÇADOS",
    target: "COLEÇÕES",
    price: 1199.90,
    priceString: "1.199,90",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis leve e moderno com amortecimento macio, indicado para corrida, caminhada e composições urbanas.",
    details: "Produto de destaque da coleção, combinando amortecimento responsivo, acabamento premium e design limpo. É uma peça forte para chamar atenção no carrossel e representar a linha mais avançada da loja.",
    highlights: ["Amortecimento responsivo", "Design de coleção", "Conforto para longos períodos"]
  },
  {
    id: 3,
    name: "Tênis Puma Velocity Nitro 3",
    category: "CALÇADOS",
    target: "FEMININO",
    price: 749.90,
    priceString: "749,90",
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis feminino para corrida e caminhada, com pegada esportiva e visual leve.",
    details: "Criado para entregar conforto, tração e resposta em atividades de impacto. A proposta visual combina com a identidade esportiva da Bravos Store e deixa a vitrine feminina mais profissional.",
    highlights: ["Leve para corrida", "Solado com boa aderência", "Visual esportivo feminino"]
  },
  {
    id: 4,
    name: "Tênis Under Armour Hovr Phantom 3",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 899.90,
    priceString: "899,90",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis masculino com estilo tecnológico, indicado para treinos intensos e uso casual esportivo.",
    details: "Une aparência futurista, estrutura firme e conforto para treinos de alta intensidade. Na apresentação, ele mostra como a loja trabalha produtos de performance e não apenas moda casual.",
    highlights: ["Estrutura firme", "Estilo tecnológico", "Boa escolha para treinos intensos"]
  },
  {
    id: 5,
    name: "Tênis Nike Pegasus 40 Feminino",
    category: "CALÇADOS",
    target: "FEMININO",
    price: 799.90,
    priceString: "799,90",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis feminino versátil para corrida leve, caminhada, academia e looks esportivos.",
    details: "Modelo versátil que ajuda a preencher a vitrine com um produto conhecido e fácil de vender. A descrição foi pensada para mostrar uso real: corrida leve, academia e combinações do dia a dia.",
    highlights: ["Versátil", "Confortável para caminhada", "Combina com looks esportivos"]
  },
  {
    id: 6,
    name: "Tênis Olympikus Corre 3",
    category: "CALÇADOS",
    target: "COLEÇÕES",
    price: 499.90,
    priceString: "499,90",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis nacional de corrida com bom custo-benefício, leveza e amortecimento para treinos.",
    details: "Produto de coleção com foco em custo-benefício. Ele melhora a variedade da loja porque nem todos os itens precisam ser premium; também é importante ter opções acessíveis.",
    highlights: ["Bom custo-benefício", "Leve para corrida", "Ótimo para treino diário"]
  },
  {
    id: 7,
    name: "Tênis Mizuno Wave Titan 2",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 379.90,
    priceString: "379,90",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis masculino confortável para academia, caminhada e uso casual.",
    details: "Opção de entrada para o público masculino, com preço mais acessível e proposta de uso diário. É importante para a loja ter variedade de valores dentro da mesma categoria.",
    highlights: ["Preço acessível", "Uso diário", "Conforto para caminhada"]
  },
  {
    id: 8,
    name: "Tênis Asics Gel-Nimbus 26",
    category: "CALÇADOS",
    target: "COLEÇÕES",
    price: 1199.90,
    priceString: "1.199,90",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis premium de corrida com foco em amortecimento, conforto prolongado e alta performance.",
    details: "Um dos produtos mais fortes da coleção. Ele reforça o posicionamento premium da Bravos Store, com descrição voltada para tecnologia, absorção de impacto e conforto em longas distâncias.",
    highlights: ["Produto premium", "Amortecimento avançado", "Indicado para longas distâncias"]
  },
  {
    id: 9,
    name: "Tênis Reebok Nano X4",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 999.90,
    priceString: "999,90",
    image: "https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis para cross training, musculação e treinos de explosão, com solado firme.",
    details: "Produto focado em treinos funcionais e musculação. A descrição destaca estabilidade, durabilidade e segurança em movimentos rápidos, deixando claro o público-alvo.",
    highlights: ["Ideal para cross training", "Solado firme", "Alta durabilidade"]
  },
  {
    id: 10,
    name: "Tênis Nike Downshifter 12",
    category: "CALÇADOS",
    target: "FEMININO",
    price: 399.90,
    priceString: "399,90",
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=900&auto=format&fit=crop&q=85",
    desc: "Tênis feminino leve e acessível para caminhada, rotina e primeiros treinos.",
    details: "Produto pensado para entrada de linha. Ele deixa a vitrine feminina mais equilibrada, oferecendo uma opção bonita, útil e com preço mais baixo.",
    highlights: ["Leve e confortável", "Preço acessível", "Bom para primeiros treinos"]
  },
  {
    id: 11,
    name: "Camisa Adidas Tiro 23 Pro",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 199.90,
    priceString: "199,90",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&auto=format&fit=crop&q=85",
    desc: "Camisa masculina esportiva com tecido leve para treinos, futebol e uso casual.",
    details: "Peça básica e importante para uma loja esportiva. Combina com produtos de calçado e cria uma vitrine mais completa, oferecendo look esportivo completo ao cliente.",
    highlights: ["Tecido leve", "Boa para futebol", "Visual esportivo casual"]
  },
  {
    id: 12,
    name: "Bermuda Nike Pro Dri-FIT 7\"",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 179.90,
    priceString: "179,90",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=900&auto=format&fit=crop&q=85",
    desc: "Bermuda masculina para treino com tecido flexível e secagem rápida.",
    details: "A bermuda complementa a linha masculina e ajuda a demonstrar uma loja com categorias variadas. O foco é mobilidade, conforto e visual limpo.",
    highlights: ["Secagem rápida", "Boa mobilidade", "Ideal para academia"]
  },
  {
    id: 13,
    name: "Camisa Nike Dri-FIT Race Feminina",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 149.90,
    priceString: "149,90",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=85",
    desc: "Camisa feminina para corrida e academia, com caimento leve e respirável.",
    details: "Produto com boa descrição para apresentar recursos de vestuário esportivo: leveza, ventilação e conforto em movimento. Ajuda a valorizar a seção feminina.",
    highlights: ["Respirável", "Leve para corrida", "Caimento confortável"]
  },
  {
    id: 14,
    name: "Shorts Saia Adidas Club Tennis",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 229.90,
    priceString: "229,90",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=900&auto=format&fit=crop&q=85",
    desc: "Shorts saia feminino com proposta esportiva elegante para tênis, academia e lazer.",
    details: "Item que traz variedade visual para a seção feminina, saindo apenas de camisetas. A proposta mistura desempenho esportivo com estilo.",
    highlights: ["Shorts interno", "Estilo esportivo elegante", "Boa mobilidade"]
  },
  {
    id: 15,
    name: "Camiseta Puma Run Favorite",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 119.90,
    priceString: "119,90",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=85",
    desc: "Camiseta masculina básica de corrida com visual minimalista e tecido confortável.",
    details: "Produto simples, direto e fácil de entender para o cliente. É útil para demonstrar que a loja tem itens de diferentes preços e necessidades.",
    highlights: ["Visual minimalista", "Boa para corrida", "Preço competitivo"]
  },
  {
    id: 16,
    name: "Bermuda Adidas Ergo Tennis 9\"",
    category: "VESTUÁRIO",
    target: "COLEÇÕES",
    price: 249.90,
    priceString: "249,90",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=85",
    desc: "Bermuda esportiva premium com tecido elástico para tênis, treino e lazer.",
    details: "Peça de coleção com acabamento mais premium. Ajuda a seção de coleções a não ficar apenas com tênis, mostrando variedade de produtos selecionados.",
    highlights: ["Tecido elástico", "Acabamento premium", "Boa para esportes com movimento"]
  },
  {
    id: 17,
    name: "Regata Nike Miler Run Division",
    category: "VESTUÁRIO",
    target: "COLEÇÕES",
    price: 189.90,
    priceString: "189,90",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=900&auto=format&fit=crop&q=85",
    desc: "Regata leve para treinos em dias quentes, com visual moderno e esportivo.",
    details: "Produto escolhido para reforçar a ideia de performance. A regata mostra que a loja atende atletas e pessoas que treinam com frequência.",
    highlights: ["Muito leve", "Boa ventilação", "Ideal para dias quentes"]
  },
  {
    id: 18,
    name: "Shorts Under Armour Launch 5\"",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 159.90,
    priceString: "159,90",
    image: "https://images.unsplash.com/photo-1506629905607-d9e5ea7efc9e?w=900&auto=format&fit=crop&q=85",
    desc: "Shorts masculino de corrida com forro interno, leveza e bolso funcional.",
    details: "Item voltado para corrida e treino. Ele melhora a experiência da vitrine porque adiciona mais opções masculinas além de tênis e camisetas.",
    highlights: ["Forro interno", "Leve para corrida", "Bolso funcional"]
  },
  {
    id: 19,
    name: "Camiseta Adidas Own The Run",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 139.90,
    priceString: "139,90",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&auto=format&fit=crop&q=85",
    desc: "Camiseta feminina de corrida com tecido confortável e detalhes esportivos.",
    details: "Peça criada para treinos leves e rotina ativa. A descrição destaca conforto, acabamento e facilidade de combinação com outros produtos da loja.",
    highlights: ["Confortável", "Detalhes esportivos", "Combina com shorts e tênis"]
  },
  {
    id: 20,
    name: "Shorts Nike Tempo Luxe Icon Clash",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 219.90,
    priceString: "219,90",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=85",
    desc: "Shorts feminino de corrida com tecido flexível e acabamento premium.",
    details: "Produto feminino premium para treino e corrida. Ele melhora a vitrine por trazer um item com visual marcante e proposta de performance.",
    highlights: ["Tecido flexível", "Acabamento premium", "Bom para corrida"]
  },
  {
    id: 21,
    name: "Boné Nike Dri-FIT Club Unissex",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 149.90,
    priceString: "149,90",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&auto=format&fit=crop&q=85",
    desc: "Boné esportivo ajustável para treino ao ar livre e uso casual.",
    details: "Acessório simples, mas importante para completar a loja. Ele mostra que a Bravos Store trabalha também com itens complementares ao vestuário.",
    highlights: ["Ajustável", "Proteção no sol", "Estilo esportivo"]
  },
  {
    id: 22,
    name: "Mala Duffel Adidas Linear Medium",
    category: "ACESSÓRIOS",
    target: "COLEÇÕES",
    price: 279.90,
    priceString: "279,90",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop&q=85",
    desc: "Mala esportiva média para academia, viagem curta e organização dos equipamentos.",
    details: "Produto funcional que deixa a coleção mais completa. É um bom exemplo para explicar que a loja não vende só roupas, mas também acessórios úteis.",
    highlights: ["Boa capacidade", "Ideal para academia", "Compartimentos úteis"]
  },
  {
    id: 23,
    name: "Jaqueta Corta-Vento Nike Essential",
    category: "ACESSÓRIOS",
    target: "FEMININO",
    price: 449.90,
    priceString: "449,90",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=85",
    desc: "Jaqueta feminina corta-vento para treino externo, caminhada e dias frios.",
    details: "Peça importante para ampliar a seção feminina com um produto de maior valor. A descrição destaca proteção, praticidade e estilo esportivo.",
    highlights: ["Proteção contra vento", "Boa para treino externo", "Visual moderno"]
  },
  {
    id: 24,
    name: "Moletom Puma ESS Big Logo Fleece",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 299.90,
    priceString: "299,90",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&auto=format&fit=crop&q=85",
    desc: "Moletom masculino confortável para rotina, pós-treino e dias frios.",
    details: "Produto casual esportivo que deixa a loja mais realista, pois clientes também buscam peças confortáveis para usar fora do treino.",
    highlights: ["Confortável", "Bom para frio", "Estilo casual esportivo"]
  },
  {
    id: 25,
    name: "Viseira Adidas Superlite Performance",
    category: "ACESSÓRIOS",
    target: "FEMININO",
    price: 119.90,
    priceString: "119,90",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d435350?w=900&auto=format&fit=crop&q=85",
    desc: "Viseira leve para corrida, caminhada e treino ao ar livre.",
    details: "Acessório feminino com preço acessível. Ajuda a vitrine a ter produtos menores e fáceis de adicionar ao carrinho.",
    highlights: ["Leve", "Protege do sol", "Fácil de combinar"]
  },
  {
    id: 26,
    name: "Mochila Under Armour Hustle Pro",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 399.90,
    priceString: "399,90",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&auto=format&fit=crop&q=85",
    desc: "Mochila esportiva resistente para academia, estudos e notebook.",
    details: "Produto muito útil para o público jovem e esportivo. A descrição conecta academia, escola/curso e rotina, deixando o produto mais próximo da realidade do usuário.",
    highlights: ["Compartimento para notebook", "Resistente", "Boa para academia e estudos"]
  },
  {
    id: 27,
    name: "Gorro Nike Peak Jordan Club",
    category: "ACESSÓRIOS",
    target: "COLEÇÕES",
    price: 169.90,
    priceString: "169,90",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=900&auto=format&fit=crop&q=85",
    desc: "Gorro urbano de coleção para dias frios, com estilo streetwear esportivo.",
    details: "Acessório de coleção com pegada urbana. Ele deixa a loja mais estilosa e ajuda a mostrar que a Bravos Store mistura esporte e moda.",
    highlights: ["Estilo streetwear", "Bom para frio", "Item de coleção"]
  },
  {
    id: 28,
    name: "Jaqueta Adidas Originals Firebird",
    category: "ACESSÓRIOS",
    target: "COLEÇÕES",
    price: 449.90,
    priceString: "449,90",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&auto=format&fit=crop&q=85",
    desc: "Jaqueta clássica com visual retrô esportivo, ideal para compor looks urbanos.",
    details: "Peça forte para coleção porque tem identidade visual marcante. Na apresentação, ela ajuda a explicar o conceito de produtos em destaque e drops selecionados.",
    highlights: ["Visual retrô", "Produto de destaque", "Combina esporte e moda"]
  },
  {
    id: 29,
    name: "Pochete de Corrida Nike Slim 3.0",
    category: "ACESSÓRIOS",
    target: "FEMININO",
    price: 139.90,
    priceString: "139,90",
    image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=900&auto=format&fit=crop&q=85",
    desc: "Pochete compacta para corrida e caminhada, ideal para celular, chave e documentos.",
    details: "Acessório funcional para quem treina ao ar livre. A descrição deixa claro o problema que ele resolve: carregar itens pequenos com segurança.",
    highlights: ["Compacta", "Boa para corrida", "Carrega celular e chaves"]
  },
  {
    id: 30,
    name: "Meias Nike Everyday Cushion (3 Pares)",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 89.90,
    priceString: "89,90",
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=900&auto=format&fit=crop&q=85",
    desc: "Kit de meias esportivas acolchoadas para treino, corrida e uso diário.",
    details: "Produto de baixo valor que deixa o carrinho mais completo. Em lojas reais, itens assim ajudam na venda adicional junto com tênis e roupas.",
    highlights: ["Kit com 3 pares", "Acolchoamento confortável", "Ótimo item complementar"]
  }
];

// Produtos usados no carrossel principal da home.
// Foram escolhidos produtos mais chamativos para causar uma boa primeira impressão.
export const HERO_PRODUCTS = [ALL_PRODUCTS[1], ALL_PRODUCTS[7], ALL_PRODUCTS[27]];
