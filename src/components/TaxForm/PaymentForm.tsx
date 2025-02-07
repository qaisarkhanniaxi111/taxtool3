import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, Calendar, Lock, Loader2 } from 'lucide-react';
import PaymentConfirmationScreen from './PaymentConfirmationScreen';

interface PaymentFormProps {
  onBack: () => void;
  amount?: number;
  formData?: any;
}

// Square application ID - these need to be exposed to the frontend
const SQUARE_APP_ID = 'sandbox-sq0idb-nweUnk6a_pfd1xrsn1Db-g';
const SQUARE_LOCATION_ID = 'L6483JMR97R3J';

declare global {
  interface Window {
    Square?: any;
  }
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onBack, formData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef<any>(null);
  const paymentsRef = useRef<any>(null);

  // Get payment details from formData
  const isPartialPayment = formData?.paymentOption === 'split';
  const secondPaymentDate = formData?.secondPaymentDate;
  const amount = 500;
  const firstPaymentAmount = isPartialPayment ? amount / 2 : amount;
  const secondPaymentAmount = amount - firstPaymentAmount;

  // Format date helper
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    let retryCount = 0;
    const maxRetries = 3;

    const loadSquareScript = () => {
      // Remove any existing Square script
      const existingScript = document.querySelector('script[src*="square.js"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script
      const script = document.createElement('script');
      script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
      script.type = 'text/javascript';
      
      script.onload = () => {
        if (isSubscribed && window.Square) {
          // Wait for the DOM to be ready
          setTimeout(() => {
            initializeSquare();
          }, 100);
        }
      };

      script.onerror = (error) => {
        console.error('Failed to load Square script:', error);
        if (isSubscribed) {
          setError('Failed to load payment system');
          setIsLoading(false);
        }
      };

      document.head.appendChild(script);
    };

    async function initializeSquare() {
      try {
        const cardContainer = document.getElementById('card-container');
        if (!cardContainer) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Card container not found, retrying... (${retryCount}/${maxRetries})`);
            setTimeout(initializeSquare, 500);
            return;
          }
          throw new Error('Card container element not found');
        }

        const payments = await window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
        const card = await payments.card();
        await card.attach('#card-container');
        
        if (isSubscribed) {
          cardRef.current = card;
          paymentsRef.current = payments;
          setError(null);
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Square initialization error:', e);
        if (isSubscribed) {
          setError('Failed to load payment form');
          setIsLoading(false);
        }
      }
    }

    loadSquareScript();

    return () => {
      isSubscribed = false;
      if (cardRef.current) {
        try {
          cardRef.current.destroy();
          cardRef.current = null;
          paymentsRef.current = null;
        } catch (e) {
          console.error('Error destroying card:', e);
        }
      }
    };
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      if (!cardRef.current || !paymentsRef.current) {
        throw new Error('Payment system not initialized');
      }

      // Get payment token
      const tokenResult = await cardRef.current.tokenize();
      console.log('Token result:', tokenResult);
      
      if (tokenResult.status === 'OK') {
        try {
          console.log('Sending data:', {
            sourceId: tokenResult.token,
            amount: firstPaymentAmount,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            isPartialPayment,
            secondPaymentDate: isPartialPayment ? secondPaymentDate : null,
            secondPaymentAmount: isPartialPayment ? secondPaymentAmount : 0
          });
          
          
          const response = await fetch('https://geniesheet.io/process-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              sourceId: tokenResult.token,
              amount: firstPaymentAmount,
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              isPartialPayment,
              secondPaymentDate: isPartialPayment ? secondPaymentDate : null,
              secondPaymentAmount: isPartialPayment ? secondPaymentAmount : 0
            })
          });

          const data = await response.json();
          console.log('Payment response:', data);

          if (!response.ok) {
            throw new Error(data.message || `Payment failed: ${response.statusText}`);
          }

          if (data.success) {
            setIsComplete(true);
          } else {
            throw new Error(data.message || 'Payment failed');
          }
        } catch (apiError: any) {
          throw new Error(apiError.message || 'Failed to process payment');
        }
      } else {
        throw new Error('Payment tokenization failed');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isComplete ? (
        <PaymentConfirmationScreen formData={formData} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-6">
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Payment Details</h2>
                
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="border-b pb-2 mb-2">
                    <p className="text-sm font-medium text-gray-700">Customer Name</p>
                    <p className="text-sm text-gray-900">{formData?.firstName} {formData?.middleName ? `${formData.middleName} ` : ''}{formData?.lastName}</p>
                  </div>
                  {isPartialPayment ? (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-700">First Payment: ${firstPaymentAmount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Due today</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Second Payment: ${secondPaymentAmount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Due on {formatDate(secondPaymentDate)}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Full Payment: ${amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Due today</p>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-md bg-white shadow-sm">
                  <div id="card-container" className="min-h-[100px]"></div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={onBack}
                    disabled={isProcessing}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing || isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      `Pay ${isPartialPayment ? `$${firstPaymentAmount.toFixed(2)} now` : `$${amount.toFixed(2)}`}`
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;