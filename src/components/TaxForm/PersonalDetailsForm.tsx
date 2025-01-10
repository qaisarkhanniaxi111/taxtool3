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
}

interface SpouseInfo extends PersonalInfo {}

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
    email: ''
  });
  const [spouseInfo, setSpouseInfo] = useState<SpouseInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    phone: '',
    email: ''
  });
  const [address, setAddress] = useState({
    street: '',
    unit: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleClientInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSpouseInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpouseInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Add business form handling
  if (formData?.debtType === 'personal-business' && !showRetainerForm) {
    return <BusinessDetailsForm 
      clientInfo={clientInfo} 
      formData={formData} 
      onNext={() => setShowRetainerForm(true)}
    />;
  }

  if (showRetainerForm) {
    return <RetainerForm 
      clientInfo={clientInfo} 
      formData={formData} 
    />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Debt Type:', formData?.debtType);
    // Check if debtType is 'personal-business' (matches Step3's value)
    if (formData?.debtType === 'personal-business') {
      console.log('Showing Business Form');
      setShowBusinessForm(true);
    } else {
      console.log('Showing Retainer Form');
      setShowRetainerForm(true);
    }
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Personal Details</h2>

          {/* Client Information */}
          <div className="space-y-6">
            <SectionTitle icon={User} title="Client Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                name="firstName"
                value={clientInfo.firstName}
                onChange={handleClientInfoChange}
                required
              />
              <InputField
                label="Middle Name"
                name="middleName"
                value={clientInfo.middleName}
                onChange={handleClientInfoChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={clientInfo.lastName}
                onChange={handleClientInfoChange}
                required
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                value={clientInfo.dateOfBirth}
                onChange={handleClientInfoChange}
                type="date"
                required
              />
              <InputField
                label="Social Security Number"
                name="ssn"
                value={clientInfo.ssn}
                onChange={handleClientInfoChange}
                required
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={clientInfo.phone}
                onChange={handleClientInfoChange}
                type="tel"
                required
              />
              <InputField
                label="Email"
                name="email"
                value={clientInfo.email}
                onChange={handleClientInfoChange}
                type="email"
                required
              />
            </div>
          </div>

          {/* Spouse Information Section - Only show if married filing jointly */}
          {formData.filingStatus === 'married-joint' && (
            <div className="space-y-6">
              <SectionTitle icon={Users} title="Spouse Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={spouseInfo.firstName}
                  onChange={handleSpouseInfoChange}
                  required
                />
                <InputField
                  label="Middle Name"
                  name="middleName"
                  value={spouseInfo.middleName}
                  onChange={handleSpouseInfoChange}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={spouseInfo.lastName}
                  onChange={handleSpouseInfoChange}
                  required
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={spouseInfo.dateOfBirth}
                  onChange={handleSpouseInfoChange}
                  type="date"
                  required
                />
                <InputField
                  label="Social Security Number"
                  name="ssn"
                  value={spouseInfo.ssn}
                  onChange={handleSpouseInfoChange}
                  required
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={spouseInfo.phone}
                  onChange={handleSpouseInfoChange}
                  type="tel"
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  value={spouseInfo.email}
                  onChange={handleSpouseInfoChange}
                  type="email"
                  required
                />
              </div>
            </div>
          )}

          {/* Home Address */}
          <div className="space-y-6">
            <SectionTitle icon={Home} title="Home Address" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputField
                  label="Street Address"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <InputField
                label="Unit/Apt/Suite"
                name="unit"
                value={address.unit}
                onChange={handleAddressChange}
              />
              <InputField
                label="City"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
              <InputField
                label="State"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                required
              />
              <InputField
                label="ZIP Code"
                name="zipCode"
                value={address.zipCode}
                onChange={handleAddressChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;