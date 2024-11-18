import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN!;

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
const payments = new Payment(client);
