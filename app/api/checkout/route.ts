import { NextResponse } from "next/server";

/*
  ARQUIVO: app/api/checkout/route.ts
  FUNÇÃO: API interna do Next.js que cria a preferência de pagamento no Mercado Pago.

  BLOCO DE APRESENTAÇÃO:
  O frontend não deve guardar nem expor o Access Token do Mercado Pago.
  Por isso o carrinho chama esta rota interna (/api/checkout). Esta rota roda
  no servidor, monta os itens do pedido e chama a API oficial do Mercado Pago.
  Se der certo, ela devolve o init_point, que é o link de pagamento.
*/

const ACCESS_TOKEN =
  process.env.MERCADO_PAGO_ACCESS_TOKEN ||
  "APP_USR-4757930159342572-052100-5816affb2ffce7fb9d9d481b441ed30b-3417406826";

type CheckoutItem = {
  title?: string;
  name?: string;
  quantity?: number;
  price?: number;
  unit_price?: number;
};

export async function POST(request: Request) {
  try {
    if (!ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "MERCADO_PAGO_ACCESS_TOKEN não configurado." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const items = body?.items as CheckoutItem[] | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    const preferenceItems = items.map((item) => {
      const title = String(
        item.title || item.name || "Produto Bravos Store",
      ).slice(0, 250);
      const quantity = Math.max(1, Math.trunc(Number(item.quantity || 1)));
      const unitPrice = Number(item.price ?? item.unit_price ?? 0);

      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        throw new Error(`Preço inválido no item: ${title}`);
      }

      return {
        title,
        quantity,
        unit_price: Math.round(unitPrice * 100) / 100,
        currency_id: "BRL",
      };
    });

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const mercadoPagoResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: preferenceItems,
          back_urls: {
            success: origin,
            failure: origin,
            pending: origin,
          },
        }),
      },
    );

    const result = await mercadoPagoResponse.json();

    if (!mercadoPagoResponse.ok) {
      console.error("Erro retornado pelo Mercado Pago:", result);
      return NextResponse.json(
        {
          error:
            result?.message ||
            result?.error ||
            "Erro interno ao criar preferência no Mercado Pago.",
          details: result,
        },
        { status: 500 },
      );
    }

    const initPoint = result.init_point || result.sandbox_init_point;

    if (!initPoint) {
      return NextResponse.json(
        {
          error: "Mercado Pago não retornou o link de pagamento.",
          details: result,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ init_point: initPoint });
  } catch (error: any) {
    console.error("ERRO DETALHADO DO MERCADO PAGO:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Erro interno ao criar preferência no Mercado Pago.",
      },
      { status: 500 },
    );
  }
}
