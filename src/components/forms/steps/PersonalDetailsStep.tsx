
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { PersonalDetails } from '../../../types';

interface PersonalDetailsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({ data, onDataChange }) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    maritalStatus: 'single',
    occupation: '',
    monthlyIncome: 0,
    panNumber: '',
    aadharNumber: '',
    ...data.personalDetails,
  });

  useEffect(() => {
    onDataChange({ personalDetails });
  }, [personalDetails, onDataChange]);

  const handleChange = (field: keyof PersonalDetails, value: string | number) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={personalDetails.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={personalDetails.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={personalDetails.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={personalDetails.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={personalDetails.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation *</Label>
          <Input
            id="occupation"
            value={personalDetails.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
            placeholder="Enter occupation"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income (₹) *</Label>
          <Input
            id="monthlyIncome"
            type="number"
            value={personalDetails.monthlyIncome}
            onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
            placeholder="Enter monthly income"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Number *</Label>
          <Input
            id="panNumber"
            value={personalDetails.panNumber}
            onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase())}
            placeholder="ABCDE1234F"
            maxLength={10}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="aadharNumber">Aadhar Number *</Label>
          <Input
            id="aadharNumber"
            value={personalDetails.aadharNumber}
            onChange={(e) => handleChange('aadharNumber', e.target.value)}
            placeholder="1234 5678 9012"
            maxLength={12}
            required
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Gender *</Label>
          <RadioGroup
            value={personalDetails.gender}
            onValueChange={(value) => handleChange('gender', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label>Marital Status *</Label>
          <RadioGroup
            value={personalDetails.maritalStatus}
            onValueChange={(value) => handleChange('maritalStatus', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="married" id="married" />
              <Label htmlFor="married">Married</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="divorced" id="divorced" />
              <Label htmlFor="divorced">Divorced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="widowed" id="widowed" />
              <Label htmlFor="widowed">Widowed</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
