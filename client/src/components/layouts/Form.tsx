import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    companyName: '',
    companyWebsite: '',
    companySize: '',
    annualRevenue: '',
    projectBudget: '',
    services: '',
    message: ''
  });

const [notification, setNotification] = useState<{
  type: 'success' | 'error' | '';
  message: string;
}>({ type: '', message: '' });


  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const revenueRanges = [
    'Less than $1M',
    '$1M - $5M',
    '$5M - $10M',
    '$10M - $50M',
    '$50M - $100M',
    '$100M+'
  ];

  const budgetRanges = [
    'Less than $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K - $250K',
    '$250K+'
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'Cloud Services',
    'Consulting',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDropdownSelect = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
    setOpenDropdown(null);
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/contact`, formData, {
      headers: { "Content-Type": "application/json" }
    });

    setNotification({
      type: 'success',
      message: 'Form submitted successfully!'
    });

    // Optional: Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      companyName: '',
      companyWebsite: '',
      companySize: '',
      annualRevenue: '',
      projectBudget: '',
      services: '',
      message: ''
    });

    // Hide notification after 3 seconds
    setTimeout(() => setNotification({ type: '', message: '' }), 3000);

  } catch (error: any) {
    setNotification({
      type: 'error',
      message: 'Something went wrong. Please try again.'
    });

    setTimeout(() => setNotification({ type: '', message: '' }), 3000);
  }
};



  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">

      {/* ===== Notification ===== */}
    {notification.type && (
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-6 py-4 rounded-lg shadow-xl text-white text-lg font-medium 
        ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-fade-in-out`}>
        {notification.message}
      </div>
    )}
    {/* ====================== */}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12">
            Tell us where you're at
          </h1>

          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">
                What is your name?
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">
                What is your email?
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              What is your phone?
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              What is your role in the company?
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter role"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Company Name and Website Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                placeholder="Enter company website"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Company Size and Revenue Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label className="block text-base font-medium text-gray-900 mb-2">
                Company Size
              </label>
              <button
                type="button"
                onClick={() => toggleDropdown('companySize')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex items-center justify-between"
              >
                <span className={formData.companySize ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.companySize || 'Select company size'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'companySize' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'companySize' && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {companySizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleDropdownSelect('companySize', size)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <label className="block text-base font-medium text-gray-900 mb-2">
                Company's Annual Revenue
              </label>
              <button
                type="button"
                onClick={() => toggleDropdown('annualRevenue')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex items-center justify-between"
              >
                <span className={formData.annualRevenue ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.annualRevenue || 'Select revenue range'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'annualRevenue' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'annualRevenue' && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {revenueRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => handleDropdownSelect('annualRevenue', range)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project Budget */}
          <div className="relative mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              Project budget
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown('projectBudget')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex items-center justify-between"
            >
              <span className={formData.projectBudget ? 'text-gray-900' : 'text-gray-500'}>
                {formData.projectBudget || 'Select budget range'}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'projectBudget' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'projectBudget' && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleDropdownSelect('projectBudget', range)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="relative mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              What services are you interested in?
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown('services')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex items-center justify-between"
            >
              <span className={formData.services ? 'text-gray-900' : 'text-gray-500'}>
                {formData.services || 'Select service'}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'services' && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleDropdownSelect('services', service)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-base font-medium text-gray-900 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter message"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}