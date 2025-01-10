import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const Step3a = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [selectedActions, setSelectedActions] = useState<string[]>(formData?.selectedActions || []);
  const [isNoticeCertified, setIsNoticeCertified] = useState<string | null>(formData?.isNoticeCertified || null);

  const isFormValid = selectedActions.length > 0 && (!selectedActions.includes('notices') || isNoticeCertified);

  const handleNext = () => {
    updateFormData({ selectedActions, isNoticeCertified });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 3 of 5 • Tax Liability Info (1/2)</div>
        <div className="text-blue-500">50% Complete</div>
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
          <div className="mt-2 space-y-2">
            <p className="text-gray-600">
              Bringing us up to speed on your current tax situation will help us gauge what level of collection actions the IRS is going to take next.
            </p>
            <p className="text-gray-600">
              Has any of the following occurred yet?
            </p>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
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

export default Step3a;