import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

const ASSET_RANGES = [
  '$0 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000+'
];

const Step4c = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [selectedAssets, setSelectedAssets] = useState<{[key: string]: string}>(formData?.selectedAssets || {});

  const handleNext = () => {
    updateFormData({ selectedAssets });
    onNext();
  };

  const isFormValid = Object.keys(selectedAssets).length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 4 of 5 • Financial Profile (3/3)</div>
        <div className="text-blue-500">80% Complete</div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Assets</h2>
          </div>
          <p className="mt-2 text-gray-600">
            Understanding what assets you own will help identify what needs to be protected
          </p>
        </div>

        <div className="space-y-6">
          {[
            { id: 'bankAccounts', label: 'Bank Accounts', desc: '(Checkings & Savings)' },
            { id: 'investments', label: 'Investments', desc: '(Stocks, Bond, Cryptocurrencies)' },
            { id: 'retirement', label: 'Retirement Accounts', desc: '(401k, IRA, etc)' },
            { id: 'realEstate', label: 'Real Estate', desc: '(Equity)' },
            { id: 'lifeInsurance', label: 'Life Insurance', desc: '(Whole Life Insurance Policies)' }
          ].map((asset) => (
            <div key={asset.id} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {asset.label} {asset.desc && <span className="text-sm text-gray-500">{asset.desc}</span>}
              </label>
              <select
                value={selectedAssets[asset.id] || ''}
                onChange={(e) => setSelectedAssets({...selectedAssets, [asset.id]: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value=""></option>
                {ASSET_RANGES.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          ))}
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

export default Step4c;