import React, { useState, useEffect } from 'react';
import { Check, Mail, Loader2 } from 'lucide-react';

interface PaymentConfirmationScreenProps {
  formData?: any;
}

const PaymentConfirmationScreen = ({ formData }: PaymentConfirmationScreenProps) => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const sendFormData = async () => {
      try {
        console.log('Starting form data submission process...');
        console.log('Form data to be sent:', formData);

        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Processing time completed, attempting to send data...');
        
        // Send form data to Google Sheets
        const response = await fetch("https://script.google.com/macros/s/AKfycbzqOl8XFxVoZko6yVcx-eK0vxiNKK28Og7hTmALyOSCuhRsxTy0eKiq_olEQvjGwYh5/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
          mode: "no-cors"
        });
        
        console.log('Data sent successfully!');
        console.log('Response status:', response.status);
        console.log('Response type:', response.type);
        
        setIsProcessing(false);
      } catch (error) {
        console.error("Detailed error when sending form data:", {
          error: error,
          errorMessage: error.message,
          errorStack: error.stack
        });
        // Still set processing to false even if there's an error
        setIsProcessing(false);
      }
    };

    if (formData) {
      console.log('FormData is present, initiating data send...');
      sendFormData();
    } else {
      console.warn('FormData is missing or undefined!', formData);
      setIsProcessing(false);
    }
    
    return () => {
      // Cleanup if needed
      console.log('Cleanup: Component unmounting');
    };
  }, [formData]);

  const getIRSFormsDescription = () => {
    const isMarriedJoint = formData?.filingStatus === 'married-joint';
    const isBusinessIncluded = formData?.debtType === 'personal-business';

    if (isMarriedJoint && isBusinessIncluded) {
      return (
        <div className="space-y-1">
          Forms 8821, 2848 Spouse, 2848 Business: Tax Information Authorization<br />
          Forms 2848, 2848 Spouse, 2848 Business: Power of Attorney & Declaration of Representative
        </div>
      );
    } else if (isMarriedJoint) {
      return (
        <div className="space-y-1">
          Forms 8821 & 2848 Spouse: Tax Information Authorization<br />
          Forms 2848 & 2848 Spouse: Power of Attorney & Declaration of Representative
        </div>
      );
    } else if (isBusinessIncluded) {
      return (
        <div className="space-y-1">
          Forms 8821 & 2848 Business: Tax Information Authorization<br />
          Forms 2848 & 2848 Business: Power of Attorney & Declaration of Representative
        </div>
      );
    } else {
      return (
        <div className="space-y-1">
          Form 8821: Tax Information Authorization<br />
          Form 2848: Power of Attorney & Declaration of Representative
        </div>
      );
    }
  };

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
                  <ul className="list-disc list-inside space-y-4 text-gray-700">
                    <li className="space-y-1">
                      <span className="font-medium">Terms & Conditions</span>
                      <p className="ml-6 text-sm text-gray-600">Service agreement</p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium">IRS Forms</span>
                      <div className="ml-6 text-gray-600">
                        {getIRSFormsDescription()}
                      </div>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    If you don't see the email in your inbox within the next few minutes, please check your spam or junk folder.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center text-gray-600">
              <p>
                If you have any questions, please don't hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;