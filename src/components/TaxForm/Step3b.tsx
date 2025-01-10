import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface Step3bProps {
  onNext: () => void;
  onPrevious: () => void;
  formData: {
    debtType?: string;
    businessTaxTypes?: string[];
    taxType?: string;
    debtAmount?: string;
    hasPaymentPlan?: string;
    monthlyPayment?: string;
    [key: string]: any;
  };
  updateFormData: (data: any) => void;
}

const Step3b: React.FC<Step3bProps> = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [debtType, setDebtType] = useState<string>(formData?.debtType || '');
  const [businessTaxTypes, setBusinessTaxTypes] = useState<string[]>(formData?.businessTaxTypes || []);
  const [taxType, setTaxType] = useState<string>(formData?.taxType || '');
  const [debtAmount, setDebtAmount] = useState<string>(formData?.debtAmount || '');
  const [hasPaymentPlan, setHasPaymentPlan] = useState<string>(formData?.hasPaymentPlan || '');
  const [monthlyPayment, setMonthlyPayment] = useState<string>(formData?.monthlyPayment || '');
  const [showDebtWarning, setShowDebtWarning] = useState<boolean>(false);
  const [showMonthlyPaymentWarning, setShowMonthlyPaymentWarning] = useState<boolean>(false);

  const showStateWarning = taxType === 'state';
  const showBothWarning = taxType === 'both';

  const handleBusinessTaxTypeChange = (type: string) => {
    setBusinessTaxTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const handleDebtAmountBlur = () => {
    setShowDebtWarning(Number(debtAmount) < 5000 && debtAmount !== '');
  };

  const handleDebtAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebtAmount(e.target.value);
    setShowDebtWarning(false);
  };

  const handleMonthlyPaymentBlur = () => {
    if (hasPaymentPlan === 'yes') {
      setShowMonthlyPaymentWarning(
        Number(monthlyPayment) > 0 && Number(monthlyPayment) <= 300
      );
    }
  };

  const handleMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyPayment(e.target.value);
    setShowMonthlyPaymentWarning(false);
  };

  const isFormValid = 
    debtType && 
    (debtType !== 'personal-business' || businessTaxTypes.length > 0) &&
    taxType && 
    debtAmount && 
    Number(debtAmount) >= 5000 &&
    hasPaymentPlan && 
    (hasPaymentPlan === 'no' || (
      monthlyPayment && 
      (Number(monthlyPayment) === 0 || Number(monthlyPayment) > 300)
    )) &&
    taxType !== 'state';

  const handleNext = () => {
    updateFormData({
      debtType,
      businessTaxTypes,
      taxType,
      debtAmount,
      hasPaymentPlan,
      monthlyPayment
    });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 3 of 5 • Tax Liability Info (2/2)</div>
        <div className="text-blue-500">60% Complete</div>
      </div>

      <div className="space-y-8">
        {/* Type of Debt Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Type of Debt <span className="text-red-500">*</span></h3>
          <div className="space-y-3">
            {['personal', 'personal-business'].map(type => (
              <label key={type} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="debtType"
                  value={type}
                  checked={debtType === type}
                  onChange={(e) => setDebtType(e.target.value)}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {type === 'personal' ? 'Personal' : 'Personal & Business'}
                </span>
              </label>
            ))}
          </div>

          {debtType === 'personal-business' && (
            <div className="ml-8 p-4 bg-gray-50 rounded-lg space-y-3">
              <p className="text-sm font-medium text-gray-700">Business Tax Liability Type <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {['income', 'payroll', 'sales'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={businessTaxTypes.includes(type)}
                      onChange={() => handleBusinessTaxTypeChange(type)}
                      className="w-4 h-4 text-blue-500 rounded"
                    />
                    <span className="ml-3 text-gray-900">
                      {type.charAt(0).toUpperCase() + type.slice(1)} Taxes
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Federal/State Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Do you owe Federal or State taxes? <span className="text-red-500">*</span></h3>
          <div className="space-y-3">
            {['federal', 'state', 'both'].map(type => (
              <label key={type} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="taxType"
                  value={type}
                  checked={taxType === type}
                  onChange={(e) => setTaxType(e.target.value)}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {showStateWarning && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">
                We don't take on State cases. We specialize in Federal IRS cases only. We recommend that clients NOT hire a firm to work on state tax problems; working directly with your state revenue department is better.
              </p>
            </div>
          )}

          {showBothWarning && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
              <Info className="w-5 h-5 text-yellow-800 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-800">
                The Fresh Start Programs are for Federal IRS cases only. We advise NOT hire a firm to work on state tax problems. We recommend working directly with your state revenue department. We can proceed with your Federal Tax Debt.
              </p>
            </div>
          )}
        </div>

        {/* Debt Amount Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Tax Debt Amount <span className="text-red-500">*</span></h3>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={debtAmount}
              onChange={handleDebtAmountChange}
              onBlur={handleDebtAmountBlur}
              className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {showDebtWarning && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">We do not take on clients who owe less than $5,000</p>
            </div>
          )}
        </div>

        {/* Payment Plan Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Are you currently on a payment plan with the IRS? <span className="text-red-500">*</span></h3>
          <div className="space-y-3">
            {['no', 'yes'].map(option => (
              <label key={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentPlan"
                  value={option}
                  checked={hasPaymentPlan === option}
                  onChange={(e) => {
                    setHasPaymentPlan(e.target.value);
                    if (e.target.value === 'no') setMonthlyPayment('');
                  }}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3 text-gray-900">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {hasPaymentPlan === 'yes' && (
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">How much are you paying a month? <span className="text-red-500">*</span></h4>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={handleMonthlyPaymentChange}
                  onBlur={handleMonthlyPaymentBlur}
                  className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter monthly payment"
                />
              </div>

              {showMonthlyPaymentWarning && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-800 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">We do not take on clients who are on a current payment plan with the IRS for that amount</p>
                </div>
              )}
            </div>
          )}
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
            onClick={handleNext}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-lg font-medium ${
              isFormValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } transition-colors duration-150 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3b;