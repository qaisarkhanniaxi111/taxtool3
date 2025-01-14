import express from 'express';
import { Client, Environment } from 'square';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
  environment: Environment.Sandbox,
});

router.use(cors());
router.use(express.json());

router.post('/process-payment', async (req, res) => {
  try {
    const { sourceId, amount, currency = 'USD', email } = req.body;

    const payment = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(amount * 100), // Convert to cents
        currency,
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      customerId: email,
      note: `Payment for ${email}`,
    });

    res.json({ success: true, payment: payment.result });
  } catch (error: any) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed',
      details: error.details,
    });
  }
});

export default router;
