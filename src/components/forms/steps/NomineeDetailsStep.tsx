
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { NomineeDetails } from '../../../types';

interface NomineeDetailsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const NomineeDetailsStep: React.FC<NomineeDetailsStepProps> = ({ data, onDataChange }) => {
  const [nomineeDetails, setNomineeDetails] = useState<NomineeDetails>({
    name: '',
    relationship: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    sharePercentage: 100,
    ...data.nomineeDetails,
  });

  useEffect(() => {
    onDataChange({ nomineeDetails });
  }, [nomineeDetails, onDataChange]);

  const handleChange = (field: keyof NomineeDetails, value: string | number) => {
    setNomineeDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold">Nominee Information</h3>
      <p className="text-xs sm:text-sm text-gray-600">
        Please provide details of your nominee who will be the beneficiary in case of unfortunate events.
      </p>
      
      {/* Mobile: 2 inputs per row, Desktop: 4 inputs per row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomineeName" className="text-xs sm:text-sm">Nominee Name *</Label>
          <Input
            id="nomineeName"
            value={nomineeDetails.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter nominee name"
            className="text-xs sm:text-sm"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relationship" className="text-xs sm:text-sm">Relationship *</Label>
          <Input
            id="relationship"
            value={nomineeDetails.relationship}
            onChange={(e) => handleChange('relationship', e.target.value)}
            placeholder="e.g., Spouse, Child"
            className="text-xs sm:text-sm"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nomineeDob" className="text-xs sm:text-sm">Date of Birth *</Label>
          <Input
            id="nomineeDob"
            type="date"
            value={nomineeDetails.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="text-xs sm:text-sm"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nomineePhone" className="text-xs sm:text-sm">Phone Number</Label>
          <Input
            id="nomineePhone"
            value={nomineeDetails.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter phone number"
            className="text-xs sm:text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sharePercentage" className="text-xs sm:text-sm">Share Percentage *</Label>
          <Input
            id="sharePercentage"
            type="number"
            min="1"
            max="100"
            value={nomineeDetails.sharePercentage}
            onChange={(e) => handleChange('sharePercentage', Number(e.target.value))}
            placeholder="100"
            className="text-xs sm:text-sm"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nomineeAddress" className="text-xs sm:text-sm">Nominee Address *</Label>
        <Textarea
          id="nomineeAddress"
          value={nomineeDetails.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter complete address of nominee"
          rows={3}
          className="text-xs sm:text-sm"
          required
        />
      </div>
    </div>
  );
};

export default NomineeDetailsStep;
