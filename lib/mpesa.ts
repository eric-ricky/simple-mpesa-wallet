const MPESA_CONFIG = {
  CONSUMER_KEY: "zjUQsGb1bpGtTQT15fn482AlDt2kAvnmZL3iGkRTMRIpg4lR",
  CONSUMER_SECRET: "fzQLl7ysV0MayneTDeul8PpA9OsaBfq1gRF7Tr1zfHLyMqzoMVIA4ORwBLXAOMg9",
  SHORTCODE: "174379",
  PASSKEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
};

export async function initiateMpesaPayment(phoneNumber: string, amount: number) {
  // Simulate M-PESA API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        resolve({
          success: true,
          reference: `MPESA${Date.now()}${Math.floor(Math.random() * 1000)}`,
          message: 'Payment initiated successfully'
        });
      } else {
        resolve({
          success: false,
          message: 'Payment failed. Please try again.'
        });
      }
    }, 2000);
  });
}