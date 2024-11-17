import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditProfileForm = ({ userProfile, onClose, onUpdate, refreshProfile }) => {
  const [formData, setFormData] = useState({
    name: userProfile.Name || '',
    phoneNumber: userProfile['PhoneNumber'] || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 11-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user-profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
          name: formData.name,
          phoneNumber: formData.phoneNumber,
        }),
      });
  
      if (response.ok) {
        onUpdate(formData); // Update local state
        await refreshProfile(); // Fetch updated profile from backend
        onClose(); // Close the form
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-green-50/90 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative border-2 border-green-200 shadow-xl shadow-green-100">
        <div className="absolute -top-4 -right-4">
          <button
            onClick={onClose}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-green-50 transition-colors duration-200"
          >
            <X size={24} className="text-green-600" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-600 mb-2">Edit Profile</h2>
          <div className="h-1 w-24 bg-green-500 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-green-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={localStorage.getItem('userEmail')}
              disabled
              className="w-full p-4 border-2 border-green-100 rounded-xl bg-green-50/50 text-gray-600 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-green-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 transition-all duration-200 outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-green-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 transition-all duration-200 outline-none"
                placeholder="Enter 10-digit phone number"
              />
              {errors.phoneNumber && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg shadow-green-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
