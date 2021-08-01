export default {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  clientName: process.env.NEXT_PUBLIC_BASE_NAME,
  isProduction: process.env.NODE_ENV === 'production',
  payment: {
    paystack: {
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    },
    flutterwave: {
      publicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    },
  },
}
