import React, { useState, useEffect } from 'react';
import { Calculator, Home } from 'lucide-react';

const HOUSEHOLD_ALLOWANCES = {
  '1': 808,
  '2': 1411,
  '3': 1677,
  '4': 2027,
  '5': 2413,
  '6': 2799,
  '7': 3188,
  '8': 3571
};

const Step4b = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [householdSize, setHouseholdSize] = useState<string>(formData?.householdSize || '');
  const [foodClothingMisc, setFoodClothingMisc] = useState<number>(formData?.foodClothingMisc || 0);
  
  // Housing checkboxes and amounts
  const [housingChecked, setHousingChecked] = useState(formData?.housingChecked || false);
  const [rent, setRent] = useState<string>(formData?.rent || '');
  const [mortgage, setMortgage] = useState<string>(formData?.mortgage || '');
  const [utilities, setUtilities] = useState<string>(formData?.utilities || '');
  const [cable, setCable] = useState<string>(formData?.cable || '');

  // Auto checkboxes and amounts
  const [autoChecked, setAutoChecked] = useState(formData?.autoChecked || false);
  const [carPayment, setCarPayment] = useState<string>(formData?.carPayment || '');
  const [publicTransport, setPublicTransport] = useState<string>(formData?.publicTransport || '');
  const [vehicleInsurance, setVehicleInsurance] = useState<string>(formData?.vehicleInsurance || '');
  const [gasoline, setGasoline] = useState<string>(formData?.gasoline || '');

  // Healthcare checkboxes and amounts
  const [healthcareChecked, setHealthcareChecked] = useState(formData?.healthcareChecked || false);
  const [healthInsurance, setHealthInsurance] = useState<string>(formData?.healthInsurance || '');
  const [prescriptions, setPrescriptions] = useState<string>(formData?.prescriptions || '');
  const [copays, setCopays] = useState<string>(formData?.copays || '');

  // Other checkboxes and amounts
  const [otherChecked, setOtherChecked] = useState(formData?.otherChecked || false);
  const [childCare, setChildCare] = useState<string>(formData?.childCare || '');
  const [courtPayments, setCourtPayments] = useState<string>(formData?.courtPayments || '');
  const [lifeInsurance, setLifeInsurance] = useState<string>(formData?.lifeInsurance || '');

  // Calculate total expenses
  const calculateTotalExpenses = () => {
    const numbers = [
      foodClothingMisc,
      Number(rent) || 0,
      Number(mortgage) || 0,
      Number(utilities) || 0,
      Number(cable) || 0,
      Number(carPayment) || 0,
      Number(publicTransport) || 0,
      Number(vehicleInsurance) || 0,
      Number(gasoline) || 0,
      Number(healthInsurance) || 0,
      Number(prescriptions) || 0,
      Number(copays) || 0,
      Number(childCare) || 0,
      Number(courtPayments) || 0,
      Number(lifeInsurance) || 0
    ];
    return numbers.reduce((a, b) => a + b, 0);
  };

  // Update food/clothing allowance when household size changes
  useEffect(() => {
    if (householdSize && HOUSEHOLD_ALLOWANCES[householdSize as keyof typeof HOUSEHOLD_ALLOWANCES]) {
      setFoodClothingMisc(HOUSEHOLD_ALLOWANCES[householdSize as keyof typeof HOUSEHOLD_ALLOWANCES]);
    }
  }, [householdSize]);

  const handleNext = () => {
    updateFormData({
      householdSize,
      foodClothingMisc,
      housingChecked,
      rent,
      mortgage,
      utilities,
      cable,
      autoChecked,
      carPayment,
      publicTransport,
      vehicleInsurance,
      gasoline,
      healthcareChecked,
      healthInsurance,
      prescriptions,
      copays,
      otherChecked,
      childCare,
      courtPayments,
      lifeInsurance
    });
    onNext();
  };

  const isFormValid = householdSize !== '';

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 4 of 5 • Financial Profile (2/3)</div>
        <div className="text-blue-500">75% Complete</div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Expenses</h2>
          </div>
          <p className="mt-2 text-gray-600">
            Expenses fluctuate from month to month. Estimate the average to the best of your ability.
            The IRS only considers living essentials a qualified expense.
          </p>
        </div>

        {/* Household Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How many people live in your household? <span className="text-red-500">*</span>
          </label>
          <select
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select household size</option>
            {Object.keys(HOUSEHOLD_ALLOWANCES).map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Food, Clothing, Miscellaneous (auto-calculated) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food, Clothing, Miscellaneous
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={foodClothingMisc}
              disabled
              className="pl-8 w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {/* Housing and Utilities */}
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={housingChecked}
              onChange={(e) => setHousingChecked(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="ml-2 text-gray-900">Housing and Utilities</span>
          </label>

          {housingChecked && (
            <div className="ml-6 space-y-4">
              {[
                { label: 'Rent', value: rent, setter: setRent },
                { label: 'Mortgage(s)', value: mortgage, setter: setMortgage, hint: '(Include Home Insurance & Property Tax)' },
                { label: 'Utility Bills', value: utilities, setter: setUtilities },
                { label: 'Cable, Internet, Phone', value: cable, setter: setCable }
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {item.label} {item.hint && <span className="text-sm text-gray-500">{item.hint}</span>}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto/Transportation */}
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoChecked}
              onChange={(e) => setAutoChecked(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="ml-2 text-gray-900">Auto/Transportation</span>
          </label>

          {autoChecked && (
            <div className="ml-6 space-y-4">
              {[
                { label: 'Car Payment(s)', value: carPayment, setter: setCarPayment },
                { label: 'Public Transportation', value: publicTransport, setter: setPublicTransport },
                { label: 'Vehicle Insurance', value: vehicleInsurance, setter: setVehicleInsurance },
                { label: 'Gasoline', value: gasoline, setter: setGasoline }
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Health Care */}
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={healthcareChecked}
              onChange={(e) => setHealthcareChecked(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="ml-2 text-gray-900">Health Care</span>
          </label>

          {healthcareChecked && (
            <div className="ml-6 space-y-4">
              {[
                { label: 'Health Insurance', value: healthInsurance, setter: setHealthInsurance },
                { label: 'Prescriptions', value: prescriptions, setter: setPrescriptions },
                { label: 'Copays', value: copays, setter: setCopays }
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Other Expenses */}
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={otherChecked}
              onChange={(e) => setOtherChecked(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="ml-2 text-gray-900">Other</span>
          </label>

          {otherChecked && (
            <div className="ml-6 space-y-4">
              {[
                { label: 'Child Care', value: childCare, setter: setChildCare },
                { label: 'Court Ordered Payments', value: courtPayments, setter: setCourtPayments },
                { label: 'Life Insurance', value: lifeInsurance, setter: setLifeInsurance }
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="pl-8 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Monthly Expenses */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium text-blue-900">Total Monthly Expenses</span>
            </div>
            <span className="text-lg font-semibold text-blue-900">${calculateTotalExpenses().toFixed(2)}</span>
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

export default Step4b;