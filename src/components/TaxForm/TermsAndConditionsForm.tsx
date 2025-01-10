import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import PaymentForm from './PaymentForm';

interface ClientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
}

interface TaxLiabilityType {
  hasSpouse: boolean;
  hasBusiness: boolean;
}

const TermsAndConditionsForm = ({ 
  paymentOption,
  clientInfo = { firstName: '', middleName: '', lastName: '' },
  taxLiabilityType = { hasSpouse: false, hasBusiness: false },
  formData = {}
}: { 
  paymentOption: string;
  clientInfo?: ClientInfo;
  taxLiabilityType?: TaxLiabilityType;
  formData?: any;
}) => {
  const [agreements, setAgreements] = useState({
    termsAndConditions: false,
    irsForms: false,
    complianceQuestions: false
  });
  const [hasViewedTerms, setHasViewedTerms] = useState(false);
  const [showError, setShowError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  const handleCheckboxChange = (field: keyof typeof agreements) => {
    if (field === 'termsAndConditions' && !hasViewedTerms) {
      setShowError('Please read the Terms & Conditions before accepting');
      return;
    }
    setShowError('');
    setAgreements(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleTermsClick = () => {
    setCurrentTitle('Terms & Conditions');
    setCurrentContent(`
This agreement is entered into between ${clientInfo.firstName} ${clientInfo.middleName ? clientInfo.middleName + ' ' : ''}${clientInfo.lastName} ("Client") and Remedy Tax Solutions ("RTS"). By signing this agreement, the Client retains RTS to represent them in resolving tax-related matters, subject to the terms outlined herein. RTS agrees to provide the services specified in this agreement in consideration of the Client's payment of the fees set forth in Section 4.

Section 1. Client Information Ownership Disclosure
The Client acknowledges that all personal information provided including name, address, Social Security number, birthdate, phone number, and email address pertains solely to them or the party involved in the tax matter for which RTS has been retained. The Client affirms that this information is accurate and relevant to their tax situation. The Client authorizes RTS to use this information exclusively for tax resolution purposes, in compliance with applicable laws and privacy policies. Misrepresentation or misuse of this information may result in termination of this agreement and potential legal consequences.

Section 2. Scope of Services Provided
RTS will represent the Client and provide the following services:
• File IRS Form 2848 (Power of Attorney) and Form 8821 (Tax Information Authorization)
• Review IRS and/or state tax records, including liabilities and statutes of limitations
• Order transcripts and records of accounts
• Prevent involuntary collection activities (e.g., levies, garnishments) where the Client is in compliance with tax filing obligations
• Prepare applicable tax resolution options, including Offer in Compromise, Penalty Abatement, Currently Not Collectible Status, or Installment Agreements

Services provided are limited to those explicitly listed above. Exploratory cases include only a) filing power of attorney and b) reviewing transcripts and reporting findings to the Client.

RTS reserves the right to terminate representation if the client fails to comply with the following duties outlined in Section 3 and may result in termination of this agreement, additional costs, or adverse outcomes from taxing authorities.

Section 3. Client Duties
The Client agrees to:
• Respond to all requests for documents or information from RTS, IRS, or state taxing authorities within 10 days of submission
• Notify RTS of any IRS/state correspondence, including notices received before or during representation
• Refrain from engaging with the IRS or state authorities during the term of this agreement
• Remain current with all tax filings and payments to avoid termination of representation
• Disclose all financial details (assets, liabilities, expenses) fully and accurately to RTS
• Authorize RTS to perform soft credit inquiries to assess liens or adverse actions, as required for tax resolution

Section 4. Service Fees
The Client agrees to pay the fees outlined for services in Section 2 when RTS receives the required documents needed.
If payment fails (e.g., insufficient funds or declined card), RTS may cancel the agreement or impose penalties. The Client is responsible for any resulting bank charges.
Payment adjustments require 72-hour advance notice to RTS for consideration. RTS will work with the Client on payment adjustments as needed.

Section 5. Cancellation and Refund Policy
• The Client is entitled to a refund if RTS cannot provide a Resolution Plan that does not put them in a better position with the IRS
• The Client may cancel this agreement within 3 business days of signing by submitting a written request via date-stamped fax or email
• Refunds, if applicable, will reflect the value of preliminary work and advice already provided
• RTS's total liability is limited to the fees paid by the Client
• Refunds will not be issued if the Client breaches this agreement or fails to comply with its terms

NOTICE AND ACKNOWLEDGMENT
THE CLIENT CONFIRMS THAT THEY HAVE READ, UNDERSTOOD, AND AGREED TO THE TERMS AND CONDITIONS OUTLINED HEREIN, INCLUDING ANY POLICIES, DISCLAIMERS, AND NOTICES. THE CLIENT ACKNOWLEDGES THAT THIS AGREEMENT IS BINDING AND REPRESENTS THEIR INFORMED CONSENT TO PROCEED AND ACKNOWLEDGES PAYMENT FOR SERVICES AND AGREES TO RETAIN RTS FOR THE RETAINER FEE TO REPRESENT THE CLIENT BEFORE THE IRS AND OR STATE TAXING AUTHORITY(S). I FURTHER ACKNOWLEDGE THAT NO WARRANTIES, GUARANTIES OR PROMISES HAVE BEEN MADE TO ME AS TO ANY ULTIMATE OUTCOME CONCERNING MY TAX LIABILITY(S).
`);
    setShowModal(true);
    setHasViewedTerms(true);
  };

  const getIRSFormsContent = () => {
    console.log('Form Data:', formData);
    console.log('Filing Status:', formData?.filingStatus);
    console.log('Debt Type:', formData?.debtType);

    const isMarriedJoint = formData?.filingStatus === 'married-joint';
    const isBusinessIncluded = formData?.debtType === 'personal-business';

    console.log('Is Married Joint:', isMarriedJoint);
    console.log('Is Business Included:', isBusinessIncluded);

    let title = "IRS Forms";
    let description;
    let modalContent;

    if (isMarriedJoint && isBusinessIncluded) {
      description = (
        <>
          Forms 8821, 2848 Spouse, 2848 Business: Tax Information Authorization<br />
          Forms 2848, 2848 Spouse, 2848 Business: Power of Attorney & Declaration of Representative
        </>
      );
      modalContent = {
        form8821Text: "Allows us to retrieve you, your spouse, & your business tax information from the IRS.",
        form2848Text: "Allows us to represent you, your spouse & your business.",
      };
    } else if (isMarriedJoint) {
      description = (
        <>
          Forms 8821 & 2848 Spouse: Tax Information Authorization<br />
          Forms 2848 & 2848 Spouse: Power of Attorney & Declaration of Representative
        </>
      );
      modalContent = {
        form8821Text: "Allows us to Retrieve you & your spouses tax information from the IRS.",
        form2848Text: "Allows us to represent you & your spouse.",
      };
    } else if (isBusinessIncluded) {
      description = (
        <>
          Forms 8821 & 2848 Business: Tax Information Authorization<br />
          Forms 2848 & 2848 Business: Power of Attorney & Declaration of Representative
        </>
      );
      modalContent = {
        form8821Text: "Allows us to retrieve you & your business tax information from the IRS.",
        form2848Text: "Allows us to represent you & your business.",
      };
    } else {
      modalContent = {
        form8821Text: "Allows us to retrieve your tax information from the IRS.",
        form2848Text: "Allows us to represent you.",
      };
    }

    console.log('Selected Modal Content:', modalContent);

    return {
      title,
      description,
      modalContent: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Forms 8821</h3>
            <p>{modalContent.form8821Text}</p>
          </div>
          <div>
            <h3 className="font-semibold">Forms 2848</h3>
            <p>{modalContent.form2848Text}</p>
          </div>
          <div>
            <h3 className="font-semibold">Important:</h3>
            <p>You will receive Forms via Email or Mail to Sign and Complete.</p>
          </div>
        </div>
      ),
    };
  };

  const handleIRSFormsClick = () => {
    console.log('IRS Forms Click - Form Data:', formData);
    
    const { title, description, modalContent } = getIRSFormsContent();
    setCurrentTitle(title);
    setCurrentDescription(description);
    setCurrentContent(modalContent);
    setShowModal(true);
  };

  const handleComplianceClick = () => {
    setCurrentTitle('Compliance Questions');
    const complianceContent = `I understand
- I am not making direct payments to the IRS through this agreement.
- The retainer paid will be credited toward the overall resolution cost.${paymentOption === 'split' ? '\n- Phase 2 will not commence until the retainer is paid in full.' : ''}`;
    
    setCurrentContent(complianceContent);
    setShowModal(true);
  };

  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">{currentTitle}</h3>
            <button 
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-6 overflow-y-auto whitespace-pre-line">
            {currentContent}
          </div>
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const allChecked = Object.values(agreements).every(value => value);
  const canProceed = allChecked;

  if (showPayment) {
    return <PaymentForm onBack={() => setShowPayment(false)} formData={formData} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <Modal />
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Terms & Conditions</h2>
        <p className="text-gray-600 mt-2">Please read and check the following boxes</p>
      </div>

      {showError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {showError}
        </div>
      )}

      <div className="space-y-6">
        {/* Terms & Conditions Box */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={handleTermsClick}
                className="text-blue-600 underline font-medium"
              >
                Terms & Conditions
              </button>
              <p className="text-sm text-gray-600">Service agreement</p>
            </div>
            <input
              type="checkbox"
              checked={agreements.termsAndConditions}
              onChange={() => handleCheckboxChange('termsAndConditions')}
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* IRS Forms Box */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={handleIRSFormsClick}
                className="text-blue-600 underline font-medium"
              >
                IRS Forms
              </button>
              <p className="text-sm text-gray-600">
                {getIRSFormsContent().description}
              </p>
            </div>
            <input
              type="checkbox"
              checked={agreements.irsForms}
              onChange={() => handleCheckboxChange('irsForms')}
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* Compliance Questions Box */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={handleComplianceClick}
                className="text-blue-600 underline font-medium"
              >
                Compliance Questions
              </button>
            </div>
            <input
              type="checkbox"
              checked={agreements.complianceQuestions}
              onChange={() => handleCheckboxChange('complianceQuestions')}
              className="h-4 w-4"
            />
          </div>
        </div>
      </div>

      {/* Process Payment Button */}
      <div className="mt-8 pt-4 border-t">
        <button
          onClick={() => setShowPayment(true)}
          disabled={!canProceed}
          className={`w-full py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2
            ${canProceed 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          <span>Process Payment</span>
          <CreditCard className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditionsForm;