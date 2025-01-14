import { Client, Environment } from 'square';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Initialize Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
  environment: Environment.Production,
  squareVersion: '2024-01-17'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { sourceId, amount, currency = 'USD', ...customerInfo } = req.body;
    const { isPartialPayment, secondPaymentDate, secondPaymentAmount } = req.body;

    if (!sourceId || !amount || !customerInfo.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        details: 'sourceId, amount, and email are required'
      });
    }

    // Create a customer first
    const customerResponse = await client.customersApi.createCustomer({
      emailAddress: customerInfo.email,
      givenName: customerInfo.firstName || '',
      familyName: customerInfo.lastName || '',
      phoneNumber: customerInfo.phone || '',
    });

    if (!customerResponse?.result?.customer?.id) {
      return res.status(400).json({
        success: false,
        message: 'Failed to create customer',
        details: customerResponse.result
      });
    }

    // Process first payment immediately
    const firstPaymentResponse = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: Math.round(amount * 100),
        currency,
      },
      customerId: customerResponse.result.customer.id,
      locationId: process.env.SQUARE_LOCATION_ID || '',
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
    });

    if (!firstPaymentResponse?.result?.payment) {
      return res.status(400).json({
        success: false,
        message: 'First payment failed',
        details: firstPaymentResponse.result
      });
    }

    // If this is a split payment, schedule the second payment
    if (isPartialPayment && secondPaymentDate && secondPaymentAmount) {
      // Store card for future payment
      const cardResponse = await client.cardsApi.createCard({
        card: {
          customerId: customerResponse.result.customer.id,
        },
        sourceId,
        idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
      });

      if (!cardResponse?.result?.card?.id) {
        return res.status(400).json({
          success: false,
          message: 'Failed to store card for future payment',
          details: cardResponse.result
        });
      }

      // Schedule the second payment
      const scheduledPaymentResponse = await client.paymentsApi.createPayment({
        sourceId: cardResponse.result.card.id,
        amountMoney: {
          amount: Math.round(secondPaymentAmount * 100),
          currency,
        },
        customerId: customerResponse.result.customer.id,
        locationId: process.env.SQUARE_LOCATION_ID || '',
        idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
        delayDuration: `PT${Math.floor((new Date(secondPaymentDate).getTime() - new Date().getTime()) / 1000)}S`,
        autocomplete: false
      });

      if (!scheduledPaymentResponse?.result?.payment) {
        return res.status(400).json({
          success: false,
          message: 'Failed to schedule second payment',
          details: scheduledPaymentResponse.result
        });
      }
    }

    return res.status(200).json({
      success: true,
      payment: firstPaymentResponse.result.payment
    });
  } catch (error: any) {
    console.error('Payment processing error:', error);
    
    // Handle Square API errors
    if (error.errors) {
      return res.status(400).json({
        success: false,
        message: 'Payment processing failed',
        errors: error.errors
      });
    }

    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: error.message || 'An unexpected error occurred'
    });
  }
}
