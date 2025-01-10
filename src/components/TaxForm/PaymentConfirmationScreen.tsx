import React, { useState, useEffect } from 'react';
import { Check, Mail, Loader2 } from 'lucide-react';

const PaymentConfirmationScreen = () => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto p-6">
          <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-900">Processing Your Payment</h2>
            <p className="text-gray-600">Please wait while we process your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="space-y-8">
            {/* Success Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Thank You! Your Payment is Complete.
              </h2>
              <p className="text-gray-600">
                We've successfully received your payment.
              </p>
            </div>

            {/* Email Information */}
            <div className="p-6 bg-blue-50 rounded-lg space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    You will soon receive an email containing:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Terms & Conditions</li>
                    <li>Form 8821: Tax Information Authorization</li>
                    <li>Form 2848: Power of Attorney and Declaration of Representative</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    If you don't see the email in your inbox within the next few minutes, please check your spam or junk folder.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center space-y-3">
              <p className="text-gray-700">
                If you need any assistance, feel free to contact us at{' '}
                <a href="mailto:contact@remedytaxsolutions.com" className="text-blue-600 hover:underline">
                  contact@remedytaxsolutions.com
                </a>
              </p>
              <p className="text-gray-700">
                Phone: (833) 611 - 3611
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;