// M-Pesa Daraja STK Push integration

async function getDarajaToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const data = await res.json();
  return data.access_token as string;
}

export async function stkPush(phone: string, amount: number, reference: string) {
  const token = await getDarajaToken();
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const res = await fetch(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: reference,
        TransactionDesc: "AUTO HEADS payment",
      }),
    }
  );
  return res.json();
}

export async function checkTransactionStatus(_checkoutRequestId: string) {
  // TODO: Implement Daraja query API
  throw new Error("Not implemented");
}
