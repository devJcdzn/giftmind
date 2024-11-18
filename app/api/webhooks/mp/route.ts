import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { action, data } = await request.json();

  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id");

  const parts = xSignature?.split(",");

  let ts;
  let hash;

  parts?.forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const secret = process.env.MERCADO_PAGO_SECRET_WEBHOOK!;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);

  const sha = hmac.digest("hex");

  if (sha === hash) {
    const paymentId = data.id;

    if (action === "payment.created" || action === "payment.updated") {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );
      const paymentDetails = await response.json();

      if (paymentDetails.status === "approved") {
        console.log("Pagamento aprovado!", paymentDetails);
      } else if (paymentDetails.status === "pending") {
        console.log("Pagamento pendente.", paymentDetails);
      } else if (paymentDetails.status === "rejected") {
        console.log("Pagamento rejeitado.", paymentDetails);
      }
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  }

  console.log("HMAC verification failed");
  return NextResponse.json(
    {
      error: "HMAC verification failed",
    },
    { status: 500 }
  );
}
