import React, { useState } from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const [bankruptcyStatus, setBankruptcyStatus] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress and Title */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-600">Step 1 of 5 • Before Proceeding</div>
        <div className="text-blue-500">20% Complete</div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Initial Bankruptcy Check <span className="text-red-500">*</span>
          </h2>
        </div>

        {/* Radio Options */}
        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-150 ease-in-out">
            <input
              type="radio"
              name="bankruptcy"
              className="w-4 h-4 text-blue-500"
              checked={bankruptcyStatus === 'no'}
              onChange={() => setBankruptcyStatus('no')}
            />
            <span className="ml-3 text-gray-900">No, I am not in bankruptcy</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-150 ease-in-out">
            <input
              type="radio"
              name="bankruptcy"
              className="w-4 h-4 text-blue-500"
              checked={bankruptcyStatus === 'yes'}
              onChange={() => setBankruptcyStatus('yes')}
            />
            <span className="ml-3 text-gray-900">Yes, I am currently in bankruptcy</span>
          </label>
        </div>

        {/* Error Message */}
        {bankruptcyStatus === 'yes' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-red-800">Service Temporarily Unavailable</h3>
              <p className="mt-1 text-red-600">
                Unfortunately, we cannot assist until your bankruptcy status is discharged. Please return once resolved.
              </p>
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onNext}
            disabled={bankruptcyStatus === 'yes' || !bankruptcyStatus}
            className={`px-6 py-2 rounded-lg font-medium ${
              bankruptcyStatus === 'no'
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

export default Step1;