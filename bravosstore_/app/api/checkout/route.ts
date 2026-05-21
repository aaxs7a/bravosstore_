import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura o Mercado Pago com o seu Access Token de teste
const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-4757930159342572-052100-5816affb2ffce7fb9d9d481b441ed30b-3417406826',
});

export async function POST(request: Request) {
    try {
        const { items } = await request.json();

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items.map((item: any) => ({
                    title: item.title,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.price),
                    currency_id: 'BRL',
                })),
                back_urls: {
                    success: 'http://localhost:3000',
                    failure: 'http://localhost:3000',
                    pending: 'http://localhost:3000',
                },
            },
        });

        // Retorna o link que vai redirecionar o cliente
        return NextResponse.json({ init_point: result.init_point });
    } catch (error) {
        console.error('Erro no Mercado Pago:', error);
        return NextResponse.json({ error: 'Erro ao criar preferência' }, { status: 500 });
    }
}