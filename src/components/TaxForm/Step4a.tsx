import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const Step4a = ({ onNext, onPrevious, formData, updateFormData }) => {
  console.log('Step4a - Form Data:', formData);
  console.log('Step4a - Filing Status:', formData?.filingStatus);

  const [incomeTypes, setIncomeTypes] = useState<string[]>(formData?.incomeTypes || []);
  const [monthlyIncome, setMonthlyIncome] = useState<string>(formData?.monthlyIncome || '');
  const [spouseMonthlyIncome, setSpouseMonthlyIncome] = useState<string>(formData?.spouseMonthlyIncome || '');

  const handleIncomeTypeChange = (type: string) => {
    setIncomeTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const isFormValid = incomeTypes.length > 0 && monthlyIncome;

  const handleNext = () => {
    updateFormData({
      incomeTypes,
      monthlyIncome,
      spouseMonthlyIncome
    });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 4 of 5 • Financial Profile (1/3)</div>
        <div className="text-blue-500">70% Complete</div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Income</h2>
          </div>
          <p className="mt-2 text-gray-600">
            Your monthly income, expenses, and what assets you have helps us match the right relief option that fits your current tax situation.
          </p>
        </div>

        {/* Rest of the component remains unchanged */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income Type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['employment', 'retirement', 'other'].map((type) => (
                <label key={type} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={incomeTypes.includes(type)}
                    onChange={() => handleIncomeTypeChange(type)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                  <span className="ml-3 text-gray-900">
                    {type === 'employment' && 'Employment (Wages)'}
                    {type === 'retirement' && 'Retirement (SSI, Pension)'}
                    {type === 'other' && 'Other (Child Support, Rental Income, Distributions, etc)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter monthly income"
              />
            </div>
          </div>

          {formData?.filingStatus === 'married-joint' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spouse Monthly Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={spouseMonthlyIncome}
                  onChange={(e) => {
                    setSpouseMonthlyIncome(e.target.value);
                    updateFormData({ ...formData, spouseMonthlyIncome: e.target.value });
                  }}
                  className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter spouse's monthly income"
                />
              </div>
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

export default Step4a;