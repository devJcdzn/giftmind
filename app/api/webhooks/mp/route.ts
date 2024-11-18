import crypto from "crypto";

export async function POST(request: Request) {
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  const urlParams = new URLSearchParams(window.location.search);
  const dataId = urlParams.get("data.id");

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
    console.log("HMAC verification passed");
  } else {
    console.log("HMAC verification failed");
  }
}
