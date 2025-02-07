import React, { useState, useCallback } from 'react';
import { User, Users, Home, ArrowRight } from 'lucide-react';
import BusinessDetailsForm from './BusinessDetailsForm';
import RetainerForm from './RetainerForm';

interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  phone: string;
  email: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseLastName: string;
  spouseDateOfBirth: string;
  spouseSsn: string;
  spousePhone: string;
  spouseEmail: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FormData {
  filingStatus: string;
  debtType?: string;
}

const InputField = ({ label, name, value, onChange, required = false, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
);

const PersonalDetailsForm = ({ formData }: { formData: FormData }) => {
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showRetainerForm, setShowRetainerForm] = useState(false);
  const [clientInfo, setClientInfo] = useState<PersonalInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    phone: '',
    email: '',
    spouseFirstName: '',
    spouseMiddleName: '',
    spouseLastName: '',
    spouseDateOfBirth: '',
    spouseSsn: '',
    spousePhone: '',
    spouseEmail: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format the number as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleClientInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'spousePhone') {
      const formattedNumber = formatPhoneNumber(value);
      setClientInfo(prev => ({
        ...prev,
        [name]: formattedNumber
      }));
    } else {
      setClientInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prepare the payload with clientInfo and formData
    const payload = {
      ...formData,
      ...clientInfo, // Attach personal info
    };
   console.log(payload)
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzqOl8XFxVoZko6yVcx-eK0vxiNKK28Og7hTmALyOSCuhRsxTy0eKiq_olEQvjGwYh5/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          mode: "no-cors" // Use no-cors to prevent CORS issues
        }
      );
  
      console.log("Form submitted successfully!");
  
      // Show the next form based on debt type
      if (formData?.debtType === 'personal-business') {
        setShowBusinessForm(true);
      } else {
        setShowRetainerForm(true);
      }
  
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  // Show BusinessDetailsForm if it's personal & business and showBusinessForm is true
  if (formData?.debtType === 'personal-business' && showBusinessForm) {
    return <BusinessDetailsForm 
      clientInfo={clientInfo} 
      formData={formData}
      onNext={() => setShowRetainerForm(true)}
    />;
  }

  // Show RetainerForm if showRetainerForm is true
  if (showRetainerForm) {
    return <RetainerForm 
      clientInfo={clientInfo} 
      formData={formData}
    />;
  }

  // Always show the PersonalDetailsForm first
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" name="firstName" value={clientInfo.firstName} onChange={handleClientInfoChange} required />
            <InputField label="Middle Name" name="middleName" value={clientInfo.middleName} onChange={handleClientInfoChange} />
            <InputField label="Last Name" name="lastName" value={clientInfo.lastName} onChange={handleClientInfoChange} required />
            <InputField label="Date of Birth" name="dateOfBirth" value={clientInfo.dateOfBirth} onChange={handleClientInfoChange} required type="date" />
            <InputField label="SSN" name="ssn" value={clientInfo.ssn} onChange={handleClientInfoChange} required />
            <InputField
              label="Phone Number"
              name="phone"
              value={clientInfo.phone}
              onChange={handleClientInfoChange}
              required={true}
              type="tel"
              pattern="\(\d{3}\) \d{3}-\d{4}"
              placeholder="(XXX) XXX-XXXX"
              maxLength={14}
            />
            <InputField
              label="Email"
              name="email"
              value={clientInfo.email}
              onChange={handleClientInfoChange}
              required={true}
              type="email"
            />
          </div>
        </div>

        {/* Spouse Information Section - Only show if married filing jointly */}
        {formData?.filingStatus === 'married-joint' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Spouse Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="First Name" name="spouseFirstName" value={clientInfo.spouseFirstName} onChange={handleClientInfoChange} required />
              <InputField label="Middle Name" name="spouseMiddleName" value={clientInfo.spouseMiddleName} onChange={handleClientInfoChange} />
              <InputField label="Last Name" name="spouseLastName" value={clientInfo.spouseLastName} onChange={handleClientInfoChange} required />
              <InputField label="Date of Birth" name="spouseDateOfBirth" value={clientInfo.spouseDateOfBirth} onChange={handleClientInfoChange} required type="date" />
              <InputField label="SSN" name="spouseSsn" value={clientInfo.spouseSsn} onChange={handleClientInfoChange} required />
              <InputField
                label="Phone Number"
                name="spousePhone"
                value={clientInfo.spousePhone}
                onChange={handleClientInfoChange}
                required={true}
                type="tel"
                pattern="\(\d{3}\) \d{3}-\d{4}"
                placeholder="(XXX) XXX-XXXX"
                maxLength={14}
              />
              <InputField
                label="Email"
                name="spouseEmail"
                value={clientInfo.spouseEmail}
                onChange={handleClientInfoChange}
                required={true}
                type="email"
              />
            </div>
          </div>
        )}

        {/* Address Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Address</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InputField label="Street Address" name="street" value={clientInfo.street} onChange={handleClientInfoChange} required />
            </div>
            <InputField label="City" name="city" value={clientInfo.city} onChange={handleClientInfoChange} required />
            <InputField label="State" name="state" value={clientInfo.state} onChange={handleClientInfoChange} required />
            <InputField label="ZIP Code" name="zipCode" value={clientInfo.zipCode} onChange={handleClientInfoChange} required />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;