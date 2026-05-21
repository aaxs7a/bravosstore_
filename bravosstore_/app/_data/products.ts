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
    name: "Tênis Nike Air Max Alpha Trainer 6 Masculino - Preto",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 531.99,
    priceString: "531,99",
    image: "https://static.netshoes.com.br/produtos/tenis-nike-air-max-alpha-trainer-6-masculino/06/JD8-8100-006/JD8-8100-006_zoom1.jpg?ts=1779271367&ims=1088x",
    desc: "Tênis masculino robusto para academia, treino funcional e uso diário, com ótima estabilidade no calcanhar.",
    details: "Modelo pensado para quem precisa de firmeza em treinos de força e conforto no dia a dia. A base larga ajuda na estabilidade, enquanto o cabedal respirável melhora a ventilação durante exercícios intensos.",
    highlights: ["Base larga para estabilidade", "Visual esportivo premium", "Ideal para treino e rotina"]
  },
  {
    id: 2,
    name: "Tênis Adidas Ultraboost 5 Masculino - Branco+Preto",
    category: "CALÇADOS",
    target: "COLEÇÕES",
    price: 759.99,
    priceString: "759,99",
    image: "https://static.netshoes.com.br/produtos/tenis-adidas-ultraboost-5-masculino/28/FBA-83D5-028/FBA-83D5-028_zoom2.jpg?ts=1779273485&ims=1088x",
    desc: "Tênis leve e moderno com amortecimento macio, indicado para corrida, caminhada e composições urbanas.",
    details: "Produto de destaque da coleção, combinando amortecimento responsivo, acabamento premium e design limpo. É uma peça forte para chamar atenção no carrossel e representar a linha mais avançada da loja.",
    highlights: ["Amortecimento responsivo", "Design de coleção", "Conforto para longos períodos"]
  },
  {
    id: 3,
    name: "Tênis Puma Velocity Nitro 4 Feminino - Preto",
    category: "CALÇADOS",
    target: "FEMININO",
    price: 749.90,
    priceString: "749,90",
    image: "https://static.netshoes.com.br/produtos/tenis-puma-velocity-nitro-4-feminino/06/PI3-75KB-006/PI3-75KB-006_zoom1.jpg?ts=1778036793&ims=1088x",
    desc: "Tênis feminino para corrida e caminhada, com pegada esportiva e visual leve.",
    details: "Criado para entregar conforto, tração e resposta em atividades de impacto. A proposta visual combina com a identidade esportiva da Bravos Store e deixa a vitrine feminina mais profissional.",
    highlights: ["Leve para corrida", "Solado com boa aderência", "Visual esportivo feminino"]
  },
  {
    id: 4,
    name: "Tênis Sportstyle Under Armour Phantom 4 Masculino - Cinza",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 899.90,
    priceString: "899,90",
    image: "https://static.netshoes.com.br/produtos/tenis-sportstyle-under-armour-phantom-4-masculino/10/R5M-29UN-010/R5M-29UN-010_zoom1.jpg?ts=1776939541&ims=1088x",
    desc: "Tênis masculino com estilo tecnológico, indicado para treinos intensos e uso casual esportivo.",
    details: "Une aparência futurista, estrutura firme e conforto para treinos de alta intensidade. Na apresentação, ele mostra como a loja trabalha produtos de performance e não apenas moda casual.",
    highlights: ["Estrutura firme", "Estilo tecnológico", "Boa escolha para treinos intensos"]
  },
  {
    id: 5,
    name: "Tênis Nike Winflo 11 Feminino - Preto",
    category: "CALÇADOS",
    target: "FEMININO",
    price: 699.90,
    priceString: "699,90",
    image: "https://static.netshoes.com.br/produtos/tenis-nike-winflo-11-feminino/06/JD8-7440-006/JD8-7440-006_zoom1.jpg?ts=1779271420&ims=1088x",
    desc: "Tênis feminino versátil para corrida leve, caminhada, academia e looks esportivos.",
    details: "Modelo versátil que ajuda a preencher a vitrine com um produto conhecido e fácil de vender. A descrição foi pensada para mostrar uso real: corrida leve, academia e combinações do dia a dia.",
    highlights: ["Versátil", "Confortável para caminhada", "Combina com looks esportivos"]
  },
  {
    id: 6,
    name: "Tênis Olympikus Corre 5 - Preto+Branco",
    category: "CALÇADOS",
    target: "COLEÇÕES",
    price: 599.90,
    priceString: "599,90",
    image: "https://static.netshoes.com.br/produtos/tenis-olympikus-corre-5/26/SE7-0803-026/SE7-0803-026_zoom1.jpg?ts=1779271064&ims=1088x",
    desc: "Tênis nacional de corrida com bom custo-benefício, leveza e amortecimento para treinos.",
    details: "Produto de coleção com foco em custo-benefício. Ele melhora a variedade da loja porque nem todos os itens precisam ser premium; também é importante ter opções acessíveis.",
    highlights: ["Bom custo-benefício", "Leve para corrida", "Ótimo para treino diário"]
  },
  {
    id: 7,
    name: "Tênis Mizuno Victory Masculino - Preto+Chumbo",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 379.90,
    priceString: "379,90",
    image: "https://static.netshoes.com.br/produtos/tenis-mizuno-victory-masculino/93/2FU-8274-793/2FU-8274-793_zoom1.jpg?ts=1779274038&ims=1088x",
    desc: "Tênis masculino confortável para academia, caminhada e uso casual.",
    details: "Opção de entrada para o público masculino, com preço mais acessível e proposta de uso diário. É importante para a loja ter variedade de valores dentro da mesma categoria.",
    highlights: ["Preço acessível", "Uso diário", "Conforto para caminhada"]
  },
  {
    id: 8,
    name: "Tênis Asics Gel-Nimbus 27 Masculino - Azul+Bege",
    category: "CALÇADOS",
    target: "COLEÇÕES",
    price: 799.99,
    priceString: "799,99",
    image: "https://static.netshoes.com.br/produtos/tenis-asics-gel-nimbus-27-masculino/42/SG4-01NH-842/SG4-01NH-842_zoom1.jpg?ts=1778904024&ims=1088x",
    desc: "Tênis premium de corrida com foco em amortecimento, conforto prolongado e alta performance.",
    details: "Um dos produtos mais fortes da coleção. Ele reforça o posicionamento premium da Bravos Store, com descrição voltada para tecnologia, absorção de impacto e conforto em longas distâncias.",
    highlights: ["Produto premium", "Amortecimento avançado", "Indicado para longas distâncias"]
  },
  {
    id: 9,
    name: "Tênis Reebok Nano FlexTR V2 Masculino - Azul",
    category: "CALÇADOS",
    target: "MASCULINO",
    price: 379.99,
    priceString: "379,99",
    image: "https://static.netshoes.com.br/produtos/tenis-reebok-nano-flextr-v2-masculino/08/D19-7430-008/D19-7430-008_zoom1.jpg?ts=1778690037&ims=1088x",
    desc: "Tênis para cross training, musculação e treinos de explosão, com solado firme.",
    details: "Produto focado em treinos funcionais e musculação. A descrição destaca estabilidade, durabilidade e segurança em movimentos rápidos, deixando claro o público-alvo.",
    highlights: ["Ideal para cross training", "Solado firme", "Alta durabilidade"]
  },
  {
    id: 10,
    name: "Tênis Nike Journey Run Masculino - Preto",
    category: "CALÇADOS",
    target: "FEMININO",
    price: 474.99,
    priceString: "474,99",
    image: "https://static.netshoes.com.br/produtos/tenis-nike-journey-run-masculino/06/JD8-7393-006/JD8-7393-006_zoom1.jpg?ts=1778596793&ims=1088x",
    desc: "Tênis feminino leve e acessível para caminhada, rotina e primeiros treinos.",
    details: "Produto pensado para entrada de linha. Ele deixa a vitrine feminina mais equilibrada, oferecendo uma opção bonita, útil e com preço mais baixo.",
    highlights: ["Leve e confortável", "Preço acessível", "Bom para primeiros treinos"]
  },
  {
    id: 11,
    name: "Camisa Adidas Squadra 25 Preta - Preto",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 229.90,
    priceString: "229,90",
    image: "https://static.netshoes.com.br/produtos/camisa-adidas-squadra-25-preta/06/FBA-4377-006/FBA-4377-006_zoom1.jpg?ts=1779268965&ims=1088x",
    desc: "Camisa masculina esportiva com tecido leve para treinos, futebol e uso casual.",
    details: "Peça básica e importante para uma loja esportiva. Combina com produtos de calçado e cria uma vitrine mais completa, oferecendo look esportivo completo ao cliente.",
    highlights: ["Tecido leve", "Boa para futebol", "Visual esportivo casual"]
  },
  {
    id: 12,
    name: "Calção Nike Park III Dri-Fit Masculino - Marinho",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 79.99,
    priceString: "79,99",
    image: "https://static.netshoes.com.br/produtos/calcao-nike-park-iii-dri-fit-masculino/12/HZM-6226-012/HZM-6226-012_zoom1.jpg?ts=1778557503&ims=1088x",
    desc: "Bermuda masculina para treino com tecido flexível e secagem rápida.",
    details: "A bermuda complementa a linha masculina e ajuda a demonstrar uma loja com categorias variadas. O foco é mobilidade, conforto e visual limpo.",
    highlights: ["Secagem rápida", "Boa mobilidade", "Ideal para academia"]
  },
  {
    id: 13,
    name: "Camiseta Nike Dri-FIT Feminina - Rosa+Branco",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 123.49,
    priceString: "123,49",
    image: "https://static.netshoes.com.br/produtos/camiseta-nike-dri-fit-feminina/06/SGL-055W-306/SGL-055W-306_zoom1.jpg?ts=1778597014&ims=1088x",
    desc: "Camisa feminina para corrida e academia, com caimento leve e respirável.",
    details: "Produto com boa descrição para apresentar recursos de vestuário esportivo: leveza, ventilação e conforto em movimento. Ajuda a valorizar a seção feminina.",
    highlights: ["Respirável", "Leve para corrida", "Caimento confortável"]
  },
  {
    id: 14,
    name: "Saia Shorts Adidas Tennis Club Preta Feminina - Preto",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 229.90,
    priceString: "229,90",
    image: "https://static.netshoes.com.br/produtos/saia-shorts-adidas-tennis-club-preta-feminina/06/FBA-84KQ-006/FBA-84KQ-006_zoom1.jpg?ts=1777089192&ims=1088x",
    desc: "Shorts saia feminino com proposta esportiva elegante para tênis, academia e lazer.",
    details: "Item que traz variedade visual para a seção feminina, saindo apenas de camisetas. A proposta mistura desempenho esportivo com estilo.",
    highlights: ["Shorts interno", "Estilo esportivo elegante", "Boa mobilidade"]
  },
  {
    id: 15,
    name: "Camiseta Puma Small Logo Poly Masculina - Preto",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 119.90,
    priceString: "119,90",
    image: "https://static.netshoes.com.br/produtos/camiseta-puma-small-logo-poly-masculina/06/PI3-76MI-006/PI3-76MI-006_zoom1.jpg?ts=1778755696&ims=1088x",
    desc: "Camiseta masculina básica de corrida com visual minimalista e tecido confortável.",
    details: "Produto simples, direto e fácil de entender para o cliente. É útil para demonstrar que a loja tem itens de diferentes preços e necessidades.",
    highlights: ["Visual minimalista", "Boa para corrida", "Preço competitivo"]
  },
  {
    id: 16,
    name: "Bermuda Adidas Tennis Classics Masculina - Bege+Preto",
    category: "VESTUÁRIO",
    target: "COLEÇÕES",
    price: 269.90,
    priceString: "269,90",
    image: "https://static.netshoes.com.br/produtos/bermuda-adidas-tennis-classics-masculina/84/FBA-85RU-784/FBA-85RU-784_zoom1.jpg?ts=1776397828&ims=1088x",
    desc: "Bermuda esportiva premium com tecido elástico para tênis, treino e lazer.",
    details: "Peça de coleção com acabamento mais premium. Ajuda a seção de coleções a não ficar apenas com tênis, mostrando variedade de produtos selecionados.",
    highlights: ["Tecido elástico", "Acabamento premium", "Boa para esportes com movimento"]
  },
  {
    id: 17,
    name: "Camiseta Nike Dri-FIT Legend Reset Masculina - Branco",
    category: "VESTUÁRIO",
    target: "COLEÇÕES",
    price: 123.49,
    priceString: "123,49",
    image: "https://static.netshoes.com.br/produtos/camiseta-nike-dri-fit-legend-reset-masculina/14/JD8-0402-014/JD8-0402-014_zoom1.jpg?ts=1778778674&ims=1088x",
    desc: "Camisa leve para treinos em dias quentes, com visual moderno e esportivo.",
    details: "Produto escolhido para reforçar a ideia de performance. A regata mostra que a loja atende atletas e pessoas que treinam com frequência.",
    highlights: ["Muito leve", "Boa ventilação", "Ideal para dias quentes"]
  },
  {
    id: 18,
    name: "Short Under Armour Launch 7 Masculino - Preto+Prata",
    category: "VESTUÁRIO",
    target: "MASCULINO",
    price: 159.90,
    priceString: "159,90",
    image: "https://static.netshoes.com.br/produtos/short-under-armour-launch-7-masculino/38/R5M-0005-038/R5M-0005-038_zoom1.jpg?ts=1779273146&ims=1088x",
    desc: "Shorts masculino de corrida com forro interno, leveza e bolso funcional.",
    details: "Item voltado para corrida e treino. Ele melhora a experiência da vitrine porque adiciona mais opções masculinas além de tênis e camisetas.",
    highlights: ["Forro interno", "Leve para corrida", "Bolso funcional"]
  },
  {
    id: 19,
    name: "Camiseta Adidas Own The Run Feminina - Lilás",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 133.90,
    priceString: "133,90",
    image: "https://static.netshoes.com.br/produtos/camiseta-adidas-own-the-run-feminina/22/FBA-81X0-022/FBA-81X0-022_zoom2.jpg?ts=1777433817&ims=1088x",
    desc: "Camiseta feminina de corrida com tecido confortável e detalhes esportivos.",
    details: "Peça criada para treinos leves e rotina ativa. A descrição destaca conforto, acabamento e facilidade de combinação com outros produtos da loja.",
    highlights: ["Confortável", "Detalhes esportivos", "Combina com shorts e tênis"]
  },
  {
    id: 20,
    name: "Shorts Nike One Feminino - Preto",
    category: "VESTUÁRIO",
    target: "FEMININO",
    price: 256.49,
    priceString: "256,49",
    image: "https://static.netshoes.com.br/produtos/shorts-nike-one-feminino/06/JD8-8024-006/JD8-8024-006_zoom1.jpg?ts=1778602893&ims=1088x",
    desc: "Shorts feminino de corrida com tecido flexível e acabamento premium.",
    details: "Produto feminino premium para treino e corrida. Ele melhora a vitrine por trazer um item com visual marcante e proposta de performance.",
    highlights: ["Tecido flexível", "Acabamento premium", "Bom para corrida"]
  },
  {
    id: 21,
    name: "Boné Nike Dri-FIT ADV Club Unissex - Branco",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 189.99,
    priceString: "189,99",
    image: "https://static.netshoes.com.br/produtos/bone-nike-dri-fit-adv-club-unissex/14/JD8-5500-014/JD8-5500-014_zoom1.jpg?ts=1779268889&ims=1088x",
    desc: "Boné esportivo ajustável para treino ao ar livre e uso casual.",
    details: "Acessório simples, mas importante para completar a loja. Ele mostra que a Bravos Store trabalha também com itens complementares ao vestuário.",
    highlights: ["Ajustável", "Proteção no sol", "Estilo esportivo"]
  },
  {
    id: 22,
    name: "Mala Adidas Duffel Linear Média - Azul+Branco",
    category: "ACESSÓRIOS",
    target: "COLEÇÕES",
    price: 279.90,
    priceString: "279,90",
    image: "https://static.netshoes.com.br/produtos/mala-adidas-duffel-linear-media/58/FBA-80E5-058/FBA-80E5-058_zoom1.jpg?ts=1775778390&ims=1088x",
    desc: "Mala esportiva média para academia, viagem curta e organização dos equipamentos.",
    details: "Produto funcional que deixa a coleção mais completa. É um bom exemplo para explicar que a loja não vende só roupas, mas também acessórios úteis.",
    highlights: ["Boa capacidade", "Ideal para academia", "Compartimentos úteis"]
  },
  {
    id: 23,
    name: "Jaqueta Nike Sportswear Classic Feminina - Azul Escuro",
    category: "ACESSÓRIOS",
    target: "FEMININO",
    price: 314.99,
    priceString: "314,99",
    image: "https://static.netshoes.com.br/produtos/jaqueta-nike-sportswear-classic-feminina/42/SGL-04OL-342/SGL-04OL-342_zoom1.jpg?ts=1774971846&ims=1088x",
    desc: "Jaqueta feminina corta-vento para treino externo, caminhada e dias frios.",
    details: "Peça importante para ampliar a seção feminina com um produto de maior valor. A descrição destaca proteção, praticidade e estilo esportivo.",
    highlights: ["Proteção contra vento", "Boa para treino externo", "Visual moderno"]
  },
  {
    id: 24,
    name: "Moletom Infantil Puma Essentials Big Logo Masculina - Preto",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 186.90,
    priceString: "186,90",
    image: "https://static.netshoes.com.br/produtos/moletom-infantil-puma-essentials-big-logo-masculina/06/2I3-2357-006/2I3-2357-006_zoom1.jpg?ts=1778792611&ims=1088x",
    desc: "Moletom masculino confortável para rotina, pós-treino e dias frios.",
    details: "Produto casual esportivo que deixa a loja mais realista, pois clientes também buscam peças confortáveis para usar fora do treino.",
    highlights: ["Confortável", "Bom para frio", "Estilo casual esportivo"]
  },
  {
    id: 25,
    name: "Viseira Feminina Adidas Jd1158 Corrida Aeroready - Preto+Cinza",
    category: "ACESSÓRIOS",
    target: "FEMININO",
    price: 139.90,
    priceString: "139,90",
    image: "https://static.netshoes.com.br/produtos/viseira-feminina-adidas-jd1158-corrida-aeroready/72/FBA-6956-172/FBA-6956-172_zoom1.jpg?ts=1777981879&ims=1088x",
    desc: "Viseira leve para corrida, caminhada e treino ao ar livre.",
    details: "Acessório feminino com preço acessível. Ajuda a vitrine a ter produtos menores e fáceis de adicionar ao carrinho.",
    highlights: ["Leve", "Protege do sol", "Fácil de combinar"]
  },
  {
    id: 26,
    name: "MOCHILA UNDER ARMOUR HUSTLE 6.0 - 29 LITROS - Preto",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 399.90,
    priceString: "399,90",
    image: "https://static.netshoes.com.br/produtos/mochila-under-armour-hustle-60-29-litros/06/R5M-2272-006/R5M-2272-006_zoom1.jpg?ts=1778235464&ims=1088x",
    desc: "Mochila esportiva resistente para academia, estudos e notebook.",
    details: "Produto muito útil para o público jovem e esportivo. A descrição conecta academia, escola/curso e rotina, deixando o produto mais próximo da realidade do usuário.",
    highlights: ["Compartimento para notebook", "Resistente", "Boa para academia e estudos"]
  },
  {
    id: 27,
    name: "Gorro Nike Peak Jordan Club Masculino - Preto",
    category: "ACESSÓRIOS",
    target: "COLEÇÕES",
    price: 169.90,
    priceString: "169,90",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcST0dyFVsG1EAZr2AYOOxz6PzLSrgmrTASMVfTndWo0_gUGcTEXImMoNNzTms35ColxtgN26MLjheLb1KbDjnUUDq90zX6J",
    desc: "Gorro urbano de coleção para dias frios, com estilo streetwear esportivo.",
    details: "Acessório de coleção com pegada urbana. Ele deixa a loja mais estilosa e ajuda a mostrar que a Bravos Store mistura esporte e moda.",
    highlights: ["Estilo streetwear", "Bom para frio", "Item de coleção"]
  },
  {
    id: 28,
    name: "Jaqueta Adidas 3 Stripes Masculina - Preto+Branco",
    category: "ACESSÓRIOS",
    target: "COLEÇÕES",
    price: 289.99,
    priceString: "289,99",
    image: "https://static.netshoes.com.br/produtos/jaqueta-adidas-3-stripes-masculina/26/FBA-4261-026/FBA-4261-026_zoom1.jpg?ts=1779272211&ims=1088x",
    desc: "Jaqueta clássica com visual retrô esportivo, ideal para compor looks urbanos.",
    details: "Peça forte para coleção porque tem identidade visual marcante. Na apresentação, ela ajuda a explicar o conceito de produtos em destaque e drops selecionados.",
    highlights: ["Visual retrô", "Produto de destaque", "Combina esporte e moda"]
  },
  {
    id: 29,
    name: "Pochete Fila Performance Slim Reflective - Prata",
    category: "ACESSÓRIOS",
    target: "FEMININO",
    price: 139.90,
    priceString: "139,90",
    image: "https://static.netshoes.com.br/produtos/pochete-fila-performance-slim-reflective/64/2FU-0305-064/2FU-0305-064_zoom2.jpg?ts=1775885699&ims=1088x",
    desc: "Pochete compacta para corrida e caminhada, ideal para celular, chave e documentos.",
    details: "Acessório funcional para quem treina ao ar livre. A descrição deixa claro o problema que ele resolve: carregar itens pequenos com segurança.",
    highlights: ["Compacta", "Boa para corrida", "Carrega celular e chaves"]
  },
  {
    id: 30,
    name: "Meia Nike Cano Alto Everyday Cushion Pacote C/ 3 Pares - Preto",
    category: "ACESSÓRIOS",
    target: "MASCULINO",
    price: 89.90,
    priceString: "89,90",
    image: "https://static.netshoes.com.br/produtos/meia-nike-cano-alto-everyday-cushion-pacote-c-3-pares/26/HZM-0747-026/HZM-0747-026_zoom1.jpg?ts=1778989570&ims=1088x",
    desc: "Kit de meias esportivas acolchoadas para treino, corrida e uso diário.",
    details: "Produto de baixo valor que deixa o carrinho mais completo. Em lojas reais, itens assim ajudam na venda adicional junto com tênis e roupas.",
    highlights: ["Kit com 3 pares", "Acolchoamento confortável", "Ótimo item complementar"]
  }
];

// Produtos usados no carrossel principal da home.
// Foram escolhidos produtos mais chamativos para causar uma boa primeira impressão.
export const HERO_PRODUCTS = [ALL_PRODUCTS[1], ALL_PRODUCTS[7], ALL_PRODUCTS[27]];
