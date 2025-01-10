import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  FileText, 
  Building2, 
  Users, 
  Ban, 
  ShieldBan,
  HandshakeIcon,
  PauseCircle,
  MinusCircle,
  CalendarClock,
  FileEdit,
  Calculator
} from 'lucide-react';
import ProcessDetailsScreen from './ProcessDetailsScreen';

const SuccessScreen = ({ formData }) => {
  const [showProcessDetails, setShowProcessDetails] = useState(false);

  console.log('SuccessScreen received formData:', formData);

  if (showProcessDetails) {
    console.log('SuccessScreen passing formData to ProcessDetailsScreen:', formData);
    return <ProcessDetailsScreen formData={formData} />;
  }

  // Check conditions for showing different sections
  const showFederalTaxFiling = formData?.taxFilings === 'missed';
  
  const showBusinessTaxFiling = 
    formData?.taxFilings === 'missed' && 
    formData?.debtType === 'personal-business';
  
  const showEmploymentTaxFilings = showBusinessTaxFiling; // Same conditions as Business Tax Filing
  
  const showGarnishmentRemoval = formData?.selectedActions?.includes('garnishment');
  
  const showLevyRemoval = formData?.selectedActions?.includes('levy');

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-sm">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Congratulations! Based on the information you provided it looks like you would be a good candidate!
              </h2>
            </div>

            {/* Programs Section */}
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Here are some tax relief programs, services & strategies we use and often combine to yield the most savings possible.
              </p>

              <div className="space-y-6">
                {/* Standard programs - always shown */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <HandshakeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Offer in Compromise (OIC)</h3>
                      <p className="mt-2 text-gray-700">
                        With this option, we make an offer to the IRS to settle your debt for a fraction of what you owe.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <PauseCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Currently Non-Collectible Status (CNC)</h3>
                      <p className="mt-2 text-gray-700">
                        This option is a hardship program where you won't need to make any payments toward your debt.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MinusCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Penalty Abatement (PA)</h3>
                      <p className="mt-2 text-gray-700">
                        Here, we work to remove or reduce penalties that have been added on top of your principal balance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CalendarClock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Partial Payment Installment Agreement (PPIA)</h3>
                      <p className="mt-2 text-gray-700">
                        A payment plan that lets you pay a fraction of your tax debt over time based on your disposable income.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileEdit className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Amended Returns</h3>
                      <p className="mt-2 text-gray-700">
                        If we identify errors on a previous tax return, we can fix them by refiling and reduce the tax liability you
                        owe for that year.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Installment Agreement Negotiations</h3>
                      <p className="mt-2 text-gray-700">
                        After reducing your tax debt as much as possible, we'll negotiate an affordable monthly payment plan for
                        the remaining balance. This will be a payment you can actually afford, not one the IRS dictates.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conditional sections */}
                {showFederalTaxFiling && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Federal Tax Filing</h3>
                        <ul className="mt-2 space-y-1 text-gray-700">
                          <li>W2-1040</li>
                          <li>1099</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {showBusinessTaxFiling && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Business Tax Filing</h3>
                        <ul className="mt-2 space-y-2 text-gray-700">
                          <li><span className="font-medium">Form 1120:</span> For corporations to report income, deductions, and credits.</li>
                          <li><span className="font-medium">Form 1120-S:</span> For S corporations</li>
                          <li><span className="font-medium">Form 1065:</span> For partnerships, reporting income, deductions, and distribution of profits.</li>
                          <li><span className="font-medium">Schedule C (with Form 1040):</span> For sole proprietors to report business income and expenses.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {showEmploymentTaxFilings && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Employment Tax Filings</h3>
                        <ul className="mt-2 space-y-2 text-gray-700">
                          <li><span className="font-medium">Form 941:</span> Employer's Quarterly Federal Tax Return, reporting income tax, Social Security, and Medicare taxes withheld from employee paychecks.</li>
                          <li><span className="font-medium">Form 940:</span> For Federal Unemployment (FUTA) tax.</li>
                          <li><span className="font-medium">Form W-2:</span> Filed by employers to report employee wages and taxes withheld.</li>
                          <li><span className="font-medium">Form 1099-NEC:</span> For reporting payments to independent contractors.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {showGarnishmentRemoval && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Ban className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Garnishment Removal</h3>
                        <p className="mt-2 text-gray-700">
                          We contact the IRS to notify them that we are representing you to resolve your tax debt as well as lift the active garnishment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showLevyRemoval && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ShieldBan className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Levy Removal</h3>
                        <p className="mt-2 text-gray-700">
                          We contact the IRS to notify them that we are representing you to resolve your tax debt as well as lift the active levy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Process Details Button */}
            <div className="mt-8 pt-4 border-t">
              <button
                onClick={() => setShowProcessDetails(true)}
                className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
              >
                <span>View Process Details</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;