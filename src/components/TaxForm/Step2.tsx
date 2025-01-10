import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const Step2 = ({ onNext, onPrevious, formData, updateFormData }: { 
  onNext: () => void; 
  onPrevious: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}) => {
  const [filingStatus, setFilingStatus] = useState(formData?.filingStatus || '');
  const [taxFilings, setTaxFilings] = useState(formData?.taxFilings || '');
  const [multipleYears, setMultipleYears] = useState(formData?.multipleYears || '');

  const isFormValid = filingStatus && taxFilings && multipleYears;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 2 of 5 • Filing Status</div>
        <div className="text-blue-500">40% Complete</div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Filing Status <span className="text-red-500">*</span></h2>
        </div>
        <p className="text-gray-600">
          Your filing status influences how much you owe, relief program eligibility, and the ability to provide accurate, tailored solutions for your situation.
        </p>

        {/* Filing Status Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            How do you file? <span className="text-red-500">*</span>
          </label>
          <select
            value={filingStatus}
            onChange={(e) => {
              const newStatus = e.target.value;
              console.log('Step2 - New Filing Status:', newStatus);
              console.log('Step2 - Current Form Data:', formData);
              setFilingStatus(newStatus);
              // Clear spouse-related data if not married-joint
              if (newStatus !== 'married-joint') {
                const updatedData = { 
                  ...formData, 
                  filingStatus: newStatus,
                  spouseMonthlyIncome: '' 
                };
                console.log('Step2 - Updating form data (not married):', updatedData);
                updateFormData(updatedData);
              } else {
                const updatedData = { ...formData, filingStatus: newStatus };
                console.log('Step2 - Updating form data (married):', updatedData);
                updateFormData(updatedData);
              }
            }}
            className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="single">Single</option>
            <option value="married-joint">Married filing jointly</option>
            <option value="married-separate">Married filing separately</option>
            <option value="head">Head of Household</option>
            <option value="widow">Qualified Widower</option>
          </select>
        </div>

        {/* Tax Filings Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Are you up to date on your tax filings? <span className="text-red-500">*</span>
          </label>
          <select
            value={taxFilings}
            onChange={(e) => {
              setTaxFilings(e.target.value);
              updateFormData({ ...formData, taxFilings: e.target.value });
            }}
            className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="up-to-date">Yes, I have filed all my taxes</option>
            <option value="missed">No, Missed one or more years</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>

        {/* Multiple Years */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Do you have tax debt from multiple different years? <span className="text-red-500">*</span>
          </label>
          <select
            value={multipleYears}
            onChange={(e) => {
              setMultipleYears(e.target.value);
              updateFormData({ ...formData, multipleYears: e.target.value });
            }}
            className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
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
            onClick={() => {
              updateFormData({
                ...formData,
                filingStatus,
                taxFilings,
                multipleYears
              });
              onNext();
            }}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-lg font-medium ${
              isFormValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;