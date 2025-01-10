import React, { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface Step3Props {
  onNext: () => void;
  onPrevious: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const Step3 = ({ onNext, onPrevious, formData, updateFormData }: Step3Props) => {
  const [selectedActions, setSelectedActions] = useState<string[]>(formData?.selectedActions || []);
  const [isNoticeCertified, setIsNoticeCertified] = useState<string | null>(formData?.isNoticeCertified || null);
  const [debtType, setDebtType] = useState<string>(formData?.debtType || '');
  const [businessTaxTypes, setBusinessTaxTypes] = useState<string[]>(formData?.businessTaxTypes || []);
  const [taxType, setTaxType] = useState<string>(formData?.taxType || '');
  const [debtAmount, setDebtAmount] = useState<string>(formData?.debtAmount || '');
  const [hasPaymentPlan, setHasPaymentPlan] = useState<string>(formData?.hasPaymentPlan || '');
  const [monthlyPayment, setMonthlyPayment] = useState<string>(formData?.monthlyPayment || '');

  const showStateWarning = taxType === 'state';
  const showBothWarning = taxType === 'both';
  const showLowDebtWarning = Number(debtAmount) < 5000 && debtAmount !== '';
  const showLowPaymentWarning = 
    hasPaymentPlan === 'yes' && 
    Number(monthlyPayment) > 0 && 
    Number(monthlyPayment) <= 300;

  const handleBusinessTaxTypeChange = (type: string) => {
    setBusinessTaxTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const isFormValid = 
    selectedActions.length > 0 && 
    (!selectedActions.includes('notices') || isNoticeCertified) &&
    debtType && 
    (debtType !== 'personal-business' || businessTaxTypes.length > 0) &&
    taxType && 
    debtAmount && 
    hasPaymentPlan && 
    (hasPaymentPlan === 'no' || monthlyPayment) &&
    taxType !== 'state';

  useEffect(() => {
    const formState = {
      selectedActions,
      isNoticeCertified,
      debtType,
      businessTaxTypes,
      taxType,
      debtAmount,
      hasPaymentPlan,
      monthlyPayment
    };
    updateFormData(formState);
  }, [
    selectedActions,
    isNoticeCertified,
    debtType,
    businessTaxTypes,
    taxType,
    debtAmount,
    hasPaymentPlan,
    monthlyPayment,
    updateFormData
  ]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 3 of 5 • Tax Liability Info</div>
        <div className="text-blue-500">60% Complete</div>
      </div>

      <div className="space-y-8">
        {/* IRS Actions Section */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">IRS Actions Encountered <span className="text-red-500">*</span></h2>
          </div>
          <p className="mt-2 text-gray-600">
            Has any of the following occurred yet? Bringing us up to speed on your current tax situation will help us gauge what level of collection actions the IRS is going to take next.
          </p>
        </div>

        <div className="space-y-4">
          {/* IRS Notices */}
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedActions.includes('notices')}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedActions([...selectedActions, 'notices']);
                } else {
                  setSelectedActions(selectedActions.filter(action => action !== 'notices'));
                  setIsNoticeCertified(null);
                }
              }}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="ml-3">
              <span className="text-gray-900">IRS Notices</span>
              <span className="text-sm text-gray-500 ml-2">(Collection Letter, Intent to Garnish, Levy, or Lien)</span>
            </span>
          </label>

          {selectedActions.includes('notices') && (
            <div className="ml-8 p-4 bg-gray-50 rounded-lg space-y-3">
              <p className="text-sm font-medium text-gray-700">Was the notice certified? <span className="text-red-500">*</span></p>
              <p className="text-sm text-gray-500">(A signature was required upon delivery)</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="certified"
                    checked={isNoticeCertified === 'yes'}
                    onChange={() => setIsNoticeCertified('yes')}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="ml-3 text-gray-900">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="certified"
                    checked={isNoticeCertified === 'no'}
                    onChange={() => setIsNoticeCertified('no')}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="ml-3 text-gray-900">No</span>
                </label>
              </div>
            </div>
          )}

          {/* Other IRS Actions */}
          {[
            { id: 'garnishment', label: 'Wage Garnishment', desc: '(Is the IRS taking a % of your paychecks?)' },
            { id: 'levy', label: 'Active Bank Account Levy', desc: '(Is the IRS taking money from your bank accounts?)' },
            { id: 'lien', label: 'IRS Lien', desc: '(Has the IRS placed a Lien on your passport or properties?)' },
            { id: 'agent', label: 'IRS Agent', desc: '(Has an IRS Revenue Officer appeared to your home or work?)' }
          ].map(action => (
            <label key={action.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedActions.includes(action.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedActions([...selectedActions, action.id]);
                  } else {
                    setSelectedActions(selectedActions.filter(a => a !== action.id));
                  }
                }}
                className="w-4 h-4 text-blue-500 rounded"
              />
              <span className="ml-3">
                <span className="text-gray-900">{action.label}</span>
                <span className="text-sm text-gray-500 ml-2">{action.desc}</span>
              </span>
            </label>
          ))}
        </div>

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
              onChange={(e) => setDebtAmount(e.target.value)}
              className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {showLowDebtWarning && (
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
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter monthly payment"
                />
              </div>

              {showLowPaymentWarning && (
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
            onClick={onNext}
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

export default Step3;