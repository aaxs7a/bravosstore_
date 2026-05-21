import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Instancia e configura o cliente do Mercado Pago injetando o seu Access Token de autenticação.
const client = new MercadoPagoConfig({
  accessToken: 'TEST-7493132714470987-052112-9ee6857ba8d6c757cff5ee9f0fb5219b-163273415', 
});

// Função que trata requisições do tipo POST enviadas para o endpoint /api/checkout
export async function POST(request: Request) {
  try {
    // Extrai a lista de itens (carrinho) enviada no corpo (body) da requisição vinda do frontend
    const { items } = await request.json();

    // Validação de segurança básica: se não houver itens ou a lista vier vazia, interrompe com erro 400
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    // Cria uma nova instância de Preferência de pagamento vinculada ao cliente configurado acima
    const preference = new Preference(client);

    // Envia os dados estruturados do pedido para a API oficial do Mercado Pago gerar o link
    const result = await preference.create({
      body: {
        // Mapeia cada produto recebido para garantir os nomes de propriedades exigidos pelo SDK
        items: items.map((item: any) => ({
          title: item.title,          // Nome do produto exibido no checkout
          quantity: Number(item.quantity), // Força a quantidade a ser um número inteiro
          unit_price: Number(item.price),  // Força o preço unitário a ser um número decimal/float
          currency_id: 'BRL',         // Define a moeda padrão como Real Brasileiro
        })),
        // Definição de URLs para onde o cliente será mandado após interagir na tela do Mercado Pago
        back_urls: {
          success: 'http://localhost:3000', // URL destino se o pagamento der certo
          failure: 'http://localhost:3000', // URL destino se o pagamento falhar
          pending: 'http://localhost:3000', // URL destino se o pagamento ficar aguardando análise
        },
        // Customização dos métodos de pagamento aceitos
        payment_methods: {
          excluded_payment_types: [
            { id: 'ticket' } // Exclui a opção de boleto bancário para destacar o Pix e Cartão
          ],
          installments: 12, // Limita o parcelamento do cartão de crédito em até 12 vezes
        }
      },
    });

    // Se tudo correr bem, devolve o link de redirecionamento seguro (init_point) gerado pelo Mercado Pago
    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    // Caso aconteça qualquer erro no servidor ou na API do MP, printa os detalhes no terminal do VS Code
    console.error('ERRO DETALHADO DO MERCADO PAGO:', error);
    // Devolve uma resposta de erro genérica com status 500 para o frontend não ficar travado esperando
    return NextResponse.json({ error: 'Erro interno ao criar preferência' }, { status: 500 });
  }
}