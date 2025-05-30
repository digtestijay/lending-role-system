
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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Nominee Information</h3>
      <p className="text-sm text-gray-600">
        Please provide details of your nominee who will be the beneficiary in case of unfortunate events.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomineeName">Nominee Name *</Label>
          <Input
            id="nomineeName"
            value={nomineeDetails.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter nominee name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relationship">Relationship *</Label>
          <Input
            id="relationship"
            value={nomineeDetails.relationship}
            onChange={(e) => handleChange('relationship', e.target.value)}
            placeholder="e.g., Spouse, Child, Parent"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nomineeDob">Date of Birth *</Label>
          <Input
            id="nomineeDob"
            type="date"
            value={nomineeDetails.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nomineePhone">Phone Number</Label>
          <Input
            id="nomineePhone"
            value={nomineeDetails.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter phone number (optional)"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sharePercentage">Share Percentage *</Label>
          <Input
            id="sharePercentage"
            type="number"
            min="1"
            max="100"
            value={nomineeDetails.sharePercentage}
            onChange={(e) => handleChange('sharePercentage', Number(e.target.value))}
            placeholder="100"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nomineeAddress">Nominee Address *</Label>
        <Textarea
          id="nomineeAddress"
          value={nomineeDetails.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter complete address of nominee"
          rows={3}
          required
        />
      </div>
    </div>
  );
};

export default NomineeDetailsStep;
