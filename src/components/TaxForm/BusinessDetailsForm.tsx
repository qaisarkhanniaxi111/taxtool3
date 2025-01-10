import React, { useState, useCallback } from 'react';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import RetainerForm from './RetainerForm';

interface ClientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
}

const InputField = ({ label, name, value, onChange, required = false, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select business type</option>
        <option value="sole-proprietorship">Sole Proprietorship</option>
        <option value="partnership">Partnership</option>
        <option value="llp">LLP</option>
        <option value="llc-single">LLC (Single)</option>
        <option value="llc-multiple">LLC (Multiple)</option>
        <option value="s-corp">S Corporation</option>
        <option value="c-corp">C Corporation</option>
        <option value="non-profit">Non Profit</option>
        <option value="trust">Trust</option>
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      />
    )}
  </div>
);

const BusinessDetailsForm = ({
  clientInfo,
  formData,
  onNext
}: {
  clientInfo?: ClientInfo;
  formData?: any;
  onNext?: () => void;
}) => {
  const [showRetainerForm, setShowRetainerForm] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    ein: '',
    businessPhone: '',
    businessEmail: ''
  });
  const [address, setAddress] = useState({
    street: '',
    unit: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleBusinessInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({
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

  if (showRetainerForm) {
    return <RetainerForm
      clientInfo={clientInfo}
      formData={{
        ...formData,
        businessInfo,
        address
      }}
    />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRetainerForm(true);
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
          <h2 className="text-2xl font-semibold text-gray-900">Business Details</h2>

          {/* Business Information */}
          <div className="space-y-6">
            <SectionTitle icon={Building2} title="Business Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Business Name"
                name="businessName"
                value={businessInfo.businessName}
                onChange={handleBusinessInfoChange}
                required
              />
              <InputField
                label="EIN"
                name="ein"
                value={businessInfo.ein}
                onChange={handleBusinessInfoChange}
                required
              />
              <InputField
                label="Business Type"
                name="businessType"
                value={businessInfo.businessType}
                onChange={handleBusinessInfoChange}
                type="select"
                required
              />
              <InputField
                label="Business Phone"
                name="businessPhone"
                value={businessInfo.businessPhone}
                onChange={handleBusinessInfoChange}
                type="tel"
                required
              />
              <InputField
                label="Business Email"
                name="businessEmail"
                value={businessInfo.businessEmail}
                onChange={handleBusinessInfoChange}
                type="email"
                required
              />
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-6">
            <SectionTitle icon={MapPin} title="Business Address" />
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
            <span>Submit</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;