import React, { useState } from 'react';
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

interface FormData {
  filingStatus: string;
}

const PersonalDetailsForm = ({ formData }: { formData: FormData }) => {
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [clientInfo, setClientInfo] = useState<PersonalInfo>({
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

  if (showBusinessForm) {
    return <BusinessDetailsForm clientInfo={clientInfo} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBusinessForm(true);
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
                name="clientFirstName"
                value={clientInfo.firstName}
                onChange={(e) => setClientInfo({ ...clientInfo, firstName: e.target.value })}
                required
              />
              <InputField
                label="Middle Name"
                name="clientMiddleName"
                value={clientInfo.middleName}
                onChange={(e) => setClientInfo({ ...clientInfo, middleName: e.target.value })}
              />
              <InputField
                label="Last Name"
                name="clientLastName"
                value={clientInfo.lastName}
                onChange={(e) => setClientInfo({ ...clientInfo, lastName: e.target.value })}
                required
              />
              <InputField
                label="Date of Birth"
                name="clientDob"
                value={clientInfo.dateOfBirth}
                onChange={(e) => setClientInfo({ ...clientInfo, dateOfBirth: e.target.value })}
                type="date"
                required
              />
              <InputField
                label="Social Security Number"
                name="clientSsn"
                value={clientInfo.ssn}
                onChange={(e) => setClientInfo({ ...clientInfo, ssn: e.target.value })}
                required
              />
              <InputField
                label="Phone Number"
                name="clientPhone"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                type="tel"
                required
              />
              <InputField
                label="Email"
                name="clientEmail"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                type="email"
                required
              />
            </div>
          </div>

          {/* Home Address */}
          <div className="space-y-6">
            <SectionTitle icon={Home} title="Home Address" />
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
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;