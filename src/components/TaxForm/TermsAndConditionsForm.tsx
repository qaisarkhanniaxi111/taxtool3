import React, { useState } from 'react';
import { FileText, CreditCard, PenTool } from 'lucide-react';
import PaymentForm from './PaymentForm';

interface ClientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
}

const TermsAndConditionsForm = ({ 
  paymentOption,
  clientInfo = { firstName: '', middleName: '', lastName: '' }
}: { 
  paymentOption: string;
  clientInfo?: ClientInfo;
}) => {
  const [agreements, setAgreements] = useState({
    noDirectPayments: false,
    retainerCredit: false,
    phase2Understanding: false
  });
  const [signedDocs, setSignedDocs] = useState({
    serviceAgreement: false,
    form8821: false,
    form2848: false
  });
  const [showPayment, setShowPayment] = useState(false);
  const [viewedAgreements, setViewedAgreements] = useState({
    serviceAgreement: false,
    form8821: false,
    form2848: false
  });
  const [showError, setShowError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentAgreement, setCurrentAgreement] = useState('');

  const getClientFullName = () => {
    const { firstName, middleName, lastName } = clientInfo;
    return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim() || '[Client Name]';
  };

  const agreementContents = {
    serviceAgreement: `
This agreement is entered into between ${getClientFullName()} ("Client") and Remedy Tax Solutions ("RTS"). By signing this agreement, the Client retains RTS to represent them in resolving tax-related matters, subject to the terms outlined herein. RTS agrees to provide the services specified in this agreement in consideration of the Client's payment of the fees set forth in Section 4.

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
`,
    form8821: `
      Form 8821: Tax Information Authorization
      
      This form allows us to:
      1. Receive and inspect your confidential tax information
      2. Discuss your tax matters with the IRS
      3. Receive copies of IRS notices and documents
      
      Important Notes:
      - This form does not authorize us to represent you before the IRS
      - You maintain control over your tax matters
      - Authorization can be revoked at any time
    `,
    form2848: `
      Form 2848: Power of Attorney and Declaration of Representative
      
      This form authorizes us to:
      1. Represent you before the IRS
      2. Sign documents on your behalf
      3. Enter into agreements with the IRS
      4. Access your tax records
      
      Important Notes:
      - This grants us legal authority to act on your behalf
      - You remain responsible for accuracy of information
      - Power of attorney can be revoked at any time
    `
  };

  const handleViewAgreement = (key: keyof typeof viewedAgreements) => {
    setCurrentAgreement(key);
    setShowModal(true);
    setViewedAgreements(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleAgreementChange = (key: keyof typeof agreements, value: boolean) => {
    setAgreements(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSignDocument = (key: keyof typeof signedDocs) => {
    if (!viewedAgreements[key]) {
      setShowError('Click the blue Terms & Conditions link to review before checking this box to confirm you have read and understood them.');
      return;
    }
    setShowError('');
    setSignedDocs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const Modal = ({ show, onClose, title, content }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-6 overflow-y-auto whitespace-pre-line">
            {content}
          </div>
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const allChecked = paymentOption === 'split' 
    ? Object.values(agreements).every(value => value)
    : agreements.noDirectPayments && agreements.retainerCredit;
    
  const allSigned = Object.values(signedDocs).every(value => value);
  const canProceed = allChecked && allSigned;

  console.log('Payment Option:', paymentOption);
  console.log('Agreements:', agreements);
  console.log('Signed Docs:', signedDocs);
  console.log('All Checked:', allChecked);
  console.log('All Signed:', allSigned);
  console.log('Can Proceed:', canProceed);

  if (showPayment) {
    return <PaymentForm onBack={() => setShowPayment(false)} />;
  }

  const DocumentCard = ({ title, description, signed, onSign, agreementKey }: { 
    title: string; 
    description: string; 
    signed: boolean;
    onSign: () => void;
    agreementKey: keyof typeof viewedAgreements;
  }) => (
    <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          <button
            onClick={() => handleViewAgreement(agreementKey)}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            {title}
          </button>
        </h4>
        <p className="text-gray-600">{description}</p>
      </div>
      <button
        onClick={onSign}
        className={`p-2 rounded-lg ${signed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
      >
        <PenTool className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <Modal 
        show={showModal}
        onClose={() => setShowModal(false)}
        title={currentAgreement === 'serviceAgreement' ? 'Terms & Conditions' :
              currentAgreement === 'form8821' ? 'Form 8821: Tax Information Authorization' :
              'Form 2848: Power of Attorney'}
        content={agreementContents[currentAgreement]}
      />
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Terms & Conditions</h2>
        <p className="text-gray-600 mt-2">Please Read and Check the following boxes</p>
      </div>

      {showError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {showError}
        </div>
      )}

      {/* Documents Section */}
      <div className="space-y-6">
        <DocumentCard
          title="Terms & Conditions"
          description="Service Agreement"
          signed={signedDocs.serviceAgreement}
          onSign={() => handleSignDocument('serviceAgreement')}
          agreementKey="serviceAgreement"
        />

        <DocumentCard
          title="Form 8821: Tax Information Authorization"
          description="Allows us to retrieve the necessary documents from the IRS"
          signed={signedDocs.form8821}
          onSign={() => handleSignDocument('form8821')}
          agreementKey="form8821"
        />

        <DocumentCard
          title="Form 2848: Power of Attorney and Declaration of Representative"
          description="Allow us to represent you"
          signed={signedDocs.form2848}
          onSign={() => handleSignDocument('form2848')}
          agreementKey="form2848"
        />
      </div>

      {/* Agreements */}
      <div className="space-y-6 mt-8">
        <h3 className="text-xl font-medium text-gray-900">Please check the following boxes</h3>

        <div className="space-y-4">
          <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={agreements.noDirectPayments}
              onChange={(e) => handleAgreementChange('noDirectPayments', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-gray-700">
              I understand that I am not making direct payments to the IRS through this agreement.
            </span>
          </label>

          <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={agreements.retainerCredit}
              onChange={(e) => handleAgreementChange('retainerCredit', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-gray-700">
              I understand that the retainer paid will be credited toward the overall resolution cost.
            </span>
          </label>

          {paymentOption === 'split' && (
            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={agreements.phase2Understanding}
                onChange={(e) => handleAgreementChange('phase2Understanding', e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-500 rounded"
              />
              <span className="text-gray-700">
                I understand that Phase 2 will not commence until the retainer is paid in full.
              </span>
            </label>
          )}
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