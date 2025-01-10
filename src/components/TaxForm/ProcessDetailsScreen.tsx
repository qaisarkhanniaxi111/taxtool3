import React, { useState } from 'react';
import { Check, ArrowRight, FileSearch, Handshake } from 'lucide-react';
import PersonalDetailsForm from './PersonalDetailsForm';

interface FormData {
  filingStatus: string;
  debtType: string;
}

const ProcessDetailsScreen = ({ formData }) => {
  const [showPersonalForm, setShowPersonalForm] = useState(false);

  if (showPersonalForm) {
    return <PersonalDetailsForm formData={formData} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-sm">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Now that we determined eligibility. 
              <br></br>
              Lets go over how the process works.
            </h2>

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="p-6 bg-blue-50 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileSearch className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900">Phase 1: Tax Investigation</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>Retrieve your Account Transcripts and Wage & Income Transcripts from the IRS.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>Ensure all eligible tax deductions and write-offs are applied.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>Identify any red flags or pending collection activities on your account.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>Combine this data with your financial details to prepare for the next phase.</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="p-6 bg-green-50 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Handshake className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-900">Phase 2: Resolution</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>Our team will use the information gathered to formulate your Resolution Plan.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>You will receive a call to schedule an appointment with your Resolution Agent.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0 mr-3" />
                    <span>Your Resolution Agent will review the IRS data with you and then present your Resolution Plan outlining the exact steps to get your tax debt resolved.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Get Started CTA */}
            <button 
              onClick={() => setShowPersonalForm(true)}
              className="w-full py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDetailsScreen;