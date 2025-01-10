import React, { useState } from 'react';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import RetainerForm from './RetainerForm';

interface ClientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
}

const BusinessDetailsForm = ({ clientInfo }: { clientInfo?: ClientInfo }) => {
  const [showRetainer, setShowRetainer] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    hasBusiness: '',
    businessName: '',
    ein: '',
    businessType: '',
    businessAddress: '',
    businessPhone: ''
  });
  const [address, setAddress] = useState({
    street: '',
    unit: '',
    city: '',
    state: '',
    zipCode: ''
  });

  if (showRetainer) {
    return <RetainerForm clientInfo={clientInfo} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRetainer(true);
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Business Details</h2>

          {/* Business Information */}
          <div className="space-y-6">
            <SectionTitle icon={Building2} title="Business Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputField
                  label="Do you have a business?"
                  name="hasBusiness"
                  value={businessInfo.hasBusiness}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, hasBusiness: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Business Name"
                  name="businessName"
                  value={businessInfo.businessName}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Business Type"
                  name="businessType"
                  value={businessInfo.businessType}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessType: e.target.value })}
                  type="select"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Employer ID No"
                  name="ein"
                  value={businessInfo.ein}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, ein: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Business Address"
                  name="businessAddress"
                  value={businessInfo.businessAddress}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessAddress: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Business Phone"
                  name="businessPhone"
                  value={businessInfo.businessPhone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessPhone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-6">
            <SectionTitle icon={MapPin} title="Business Address" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputField
                  label="Street"
                  name="street"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  required
                />
              </div>
              <InputField
                label="Unit, Suite, Apt #"
                name="unit"
                value={address.unit}
                onChange={(e) => setAddress({ ...address, unit: e.target.value })}
              />
              <InputField
                label="City"
                name="city"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
              <InputField
                label="State"
                name="state"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
              <InputField
                label="Zip Code"
                name="zipCode"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
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