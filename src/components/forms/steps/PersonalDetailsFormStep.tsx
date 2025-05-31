
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';

interface PersonalDetailsFormStepProps {
  data: any;
  onDataChange: (data: any, isValid: boolean) => void;
}

const PersonalDetailsFormStep: React.FC<PersonalDetailsFormStepProps> = ({ data, onDataChange }) => {
  const [personalData, setPersonalData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    address: '',
    ...data.personalData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [personalData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required field validations
    if (!personalData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!personalData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Mobile number validation
    if (!personalData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(personalData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }
    
    // Email validation
    if (!personalData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Date of birth validation
    if (!personalData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    // Address validation
    if (!personalData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0 && 
                   personalData.firstName.trim() !== '' && 
                   personalData.lastName.trim() !== '' &&
                   personalData.mobileNumber.trim() !== '' &&
                   personalData.email.trim() !== '' &&
                   personalData.dateOfBirth !== '' &&
                   personalData.address.trim() !== '';
    
    onDataChange({ personalData }, isValid);
  };

  const handleChange = (field: string, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Personal Information</h3>
        <p className="text-sm text-gray-600">Please provide your personal details.</p>
      </div>
      
      {/* Mobile: 2 inputs per row, Desktop: 3 inputs per row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-xs sm:text-sm">First Name *</Label>
          <Input
            id="firstName"
            value={personalData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            className={`text-xs sm:text-sm ${errors.firstName ? 'border-red-500' : ''}`}
            required
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="middleName" className="text-xs sm:text-sm">Middle Name</Label>
          <Input
            id="middleName"
            value={personalData.middleName}
            onChange={(e) => handleChange('middleName', e.target.value)}
            placeholder="Enter middle name"
            className="text-xs sm:text-sm"
          />
        </div>
        
        <div className="space-y-2 col-span-2 lg:col-span-1">
          <Label htmlFor="lastName" className="text-xs sm:text-sm">Last Name *</Label>
          <Input
            id="lastName"
            value={personalData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
            className={`text-xs sm:text-sm ${errors.lastName ? 'border-red-500' : ''}`}
            required
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobileNumber" className="text-xs sm:text-sm">Mobile Number *</Label>
          <Input
            id="mobileNumber"
            value={personalData.mobileNumber}
            onChange={(e) => handleChange('mobileNumber', e.target.value)}
            placeholder="Enter mobile number"
            className={`text-xs sm:text-sm ${errors.mobileNumber ? 'border-red-500' : ''}`}
            required
          />
          {errors.mobileNumber && (
            <p className="text-xs text-red-500">{errors.mobileNumber}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs sm:text-sm">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={personalData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email address"
            className={`text-xs sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-xs sm:text-sm">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={personalData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className={`text-xs sm:text-sm ${errors.dateOfBirth ? 'border-red-500' : ''}`}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address" className="text-xs sm:text-sm">Address *</Label>
        <Textarea
          id="address"
          value={personalData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter complete address"
          rows={3}
          className={`text-xs sm:text-sm ${errors.address ? 'border-red-500' : ''}`}
          required
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsFormStep;
