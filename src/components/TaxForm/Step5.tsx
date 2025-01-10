import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

interface Step5Props {
  onNext: () => void;
  onPrevious: () => void;
  formData: any;
}

const Step5 = ({ onNext, onPrevious, formData }: Step5Props) => {
  const [confirmed, setConfirmed] = useState(false);

  const formatCurrency = (amount: string | number) => {
    if (!amount) return '$0';
    return `$${Number(amount).toLocaleString()}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 5 of 5 • Submit</div>
        <div className="text-blue-500">100% Complete</div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Review Your Information</h2>
          </div>
          <p className="mt-2 text-gray-600">
            Before submitting for a pre-approval, double check the information you provided to ensure the best results.
          </p>
        </div>

        {/* Rest of the component remains unchanged */}
        {/* Summary Report */}
        <div className="space-y-6">
          {/* Bankruptcy Status */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">Bankruptcy Status</h3>
            <p className="text-gray-700">{formData.bankruptcyStatus === 'no' ? 'Not in bankruptcy' : 'In bankruptcy'}</p>
          </div>

          {/* Filing Information */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">Filing Information</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700">Filing Status: {formData.filingStatus}</p>
              <p className="text-gray-700">Tax Filings: {formData.taxFilings}</p>
              <p className="text-gray-700">Multiple Years: {formData.multipleYears}</p>
            </div>
          </div>

          {/* Tax Liability */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">Tax Liability</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700">Debt Type: {formData.debtType}</p>
              {formData.businessTaxTypes?.length > 0 && (
                <p className="text-gray-700">Business Tax Types: {formData.businessTaxTypes.join(', ')}</p>
              )}
              <p className="text-gray-700">Tax Type: {formData.taxType}</p>
              <p className="text-gray-700">Debt Amount: {formatCurrency(formData.debtAmount)}</p>
              <p className="text-gray-700">Payment Plan: {formData.hasPaymentPlan}</p>
              {formData.hasPaymentPlan === 'yes' && (
                <p className="text-gray-700">Monthly Payment: {formatCurrency(formData.monthlyPayment)}</p>
              )}
            </div>
          </div>

          {/* Financial Profile */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">Financial Profile</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700">Income Types: {formData.incomeTypes.join(', ')}</p>
              <p className="text-gray-700">Monthly Income: {formatCurrency(formData.monthlyIncome)}</p>
              {formData.spouseMonthlyIncome && (
                <p className="text-gray-700">Spouse Monthly Income: {formatCurrency(formData.spouseMonthlyIncome)}</p>
              )}
              <p className="text-gray-700">Household Size: {formData.householdSize}</p>
            </div>
          </div>

          {/* Monthly Expenses Summary */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">Monthly Expenses</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700">Food, Clothing, Misc: {formatCurrency(formData.foodClothingMisc)}</p>
              
              {formData.housingChecked && (
                <div className="ml-4 space-y-1">
                  <p className="text-gray-700">Rent: {formatCurrency(formData.rent)}</p>
                  <p className="text-gray-700">Mortgage: {formatCurrency(formData.mortgage)}</p>
                  <p className="text-gray-700">Utilities: {formatCurrency(formData.utilities)}</p>
                  <p className="text-gray-700">Cable/Internet: {formatCurrency(formData.cable)}</p>
                </div>
              )}

              {formData.autoChecked && (
                <div className="ml-4 space-y-1">
                  <p className="text-gray-700">Car Payment: {formatCurrency(formData.carPayment)}</p>
                  <p className="text-gray-700">Public Transport: {formatCurrency(formData.publicTransport)}</p>
                  <p className="text-gray-700">Vehicle Insurance: {formatCurrency(formData.vehicleInsurance)}</p>
                  <p className="text-gray-700">Gasoline: {formatCurrency(formData.gasoline)}</p>
                </div>
              )}

              {formData.healthcareChecked && (
                <div className="ml-4 space-y-1">
                  <p className="text-gray-700">Health Insurance: {formatCurrency(formData.healthInsurance)}</p>
                  <p className="text-gray-700">Prescriptions: {formatCurrency(formData.prescriptions)}</p>
                  <p className="text-gray-700">Copays: {formatCurrency(formData.copays)}</p>
                </div>
              )}

              {formData.otherChecked && (
                <div className="ml-4 space-y-1">
                  <p className="text-gray-700">Child Care: {formatCurrency(formData.childCare)}</p>
                  <p className="text-gray-700">Court Payments: {formatCurrency(formData.courtPayments)}</p>
                  <p className="text-gray-700">Life Insurance: {formatCurrency(formData.lifeInsurance)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assets */}
          <div className="pb-4">
            <h3 className="font-medium text-gray-900">Assets</h3>
            <div className="mt-2 space-y-2">
              {Object.entries(formData.selectedAssets || {}).map(([key, value]) => {
                const labels = {
                  bankAccounts: 'Bank Accounts',
                  investments: 'Investments',
                  retirement: 'Retirement',
                  realEstate: 'Real Estate',
                  lifeInsurance: 'Life Insurance'
                };
                return (
                  <p key={key} className="text-gray-700">
                    {labels[key] || key}: {value}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1.5 w-4 h-4 text-blue-500 rounded"
            />
            <span className="ml-3 text-gray-700">
              Yes, I confirm that the information I provided is accurate and correct to the best of my knowledge.
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onPrevious}
            className="px-6 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={!confirmed}
            className={`px-6 py-2 rounded-lg font-medium ${
              confirmed
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } transition-colors duration-150 ease-in-out`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;