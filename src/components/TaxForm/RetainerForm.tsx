import React, { useState } from 'react';
import { Shield, Calendar, CreditCard, ArrowRight, Info } from 'lucide-react';
import TermsAndConditionsForm from './TermsAndConditionsForm';

interface ClientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  phone: string;
  email: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseLastName: string;
  spouseDateOfBirth: string;
  spouseSsn: string;
  spousePhone: string;
  spouseEmail: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const RetainerForm = ({ clientInfo, formData }: { clientInfo?: ClientInfo; formData?: any }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const [secondPaymentDate, setSecondPaymentDate] = useState<string>('');

  const addBusinessDays = (date: Date, days: number) => {
    let currentDate = new Date(date);
    let addedDays = 0;
    
    while (addedDays < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip weekends
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++;
      }
    }
    
    return currentDate;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFullPaymentDate = () => {
    const today = new Date();
    const futureDate = addBusinessDays(today, 7);
    return futureDate.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSplitPaymentDate = () => {
    if (!secondPaymentDate) return '';
    const secondPayment = new Date(secondPaymentDate);
    const futureDate = addBusinessDays(secondPayment, 7);
    return futureDate.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Date selected:', e.target.value);
    setSecondPaymentDate(e.target.value);
  };

  if (showTerms) {
    console.log('showTerms is true');
    console.log('paymentOption:', paymentOption);
    console.log('secondPaymentDate:', secondPaymentDate);
    console.log('formData:', formData);
    return <TermsAndConditionsForm 
      paymentOption={paymentOption} 
      clientInfo={clientInfo} 
      formData={{
        ...formData,
        paymentOption,
        secondPaymentDate: secondPaymentDate,
      }} 
    />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900">RETAINER</h2>

          {/* Guarantee */}
          <div className="p-6 bg-blue-50 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-blue-900">OUR GUARANTEE</h3>
            </div>
            <p className="text-gray-700">
              If we are unable to develop a resolution that puts you in a better position with the IRS, 
              <br></br>
              you will get a full refund.
            </p>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Payment Options</h3>
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentOption"
                  checked={paymentOption === 'full'}
                  onChange={() => setPaymentOption('full')}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3">
                  <span className="text-gray-900">Pay In Full</span>
                  <span className="text-sm ml-2">
                    <span className="text-green-300">Estimated Time to Resolution</span>{" "}
                    <span className="text-green-700">{getFullPaymentDate()}</span>
                  </span>
                </span>
              </label>

              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentOption"
                  checked={paymentOption === 'split'}
                  onChange={() => setPaymentOption('split')}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3">
                  <span className="text-gray-900">Split Payment</span>
                  {paymentOption === 'split' && (
                    <span className="text-sm ml-2">
                      <span className="text-orange-300">Estimated Time to Resolution</span>{" "}
                      <span className="text-orange-700">{getSplitPaymentDate() || 'Select second payment date'}</span>
                    </span>
                  )}
                </span>
              </label>
            </div>

            {paymentOption === 'split' && (
              <>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                  <Info className="w-5 h-5 text-yellow-800 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-800">
                    We offer the option to split the retainer to accommodate financial constraints. However please note that we
                    cannot proceed to Phase 2 until the retainer is paid in full.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Second Payment Date
                  </label>
                  <input
                    type="date"
                    value={secondPaymentDate}
                    onChange={handleDateChange}
                    className="w-full p-2 border rounded-lg"
                    min={getCurrentDate()} // Can't be before first payment date
                  />
                </div>
              </>
            )}
          </div>

          {/* Summary */}
          <div className="p-6 bg-gray-50 rounded-lg space-y-4">
            <h3 className="text-xl font-medium text-gray-900">Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Retainer Fee:</span>
                <span className="text-gray-900">$600</span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span>Discount Applied:</span>
                <span>-$100</span>
              </div>
              <div className="text-sm text-gray-500">- Online Assessment Tool</div>
              {paymentOption === 'split' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Second Payment Date:</span>
                  <span className="text-gray-900">{formatDate(secondPaymentDate)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total:</span>
                <span>$500</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">
              *The retainer is an upfront deposit that is credited toward your Resolution Cost*
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={() => setShowTerms(true)}
            className="w-full py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetainerForm;