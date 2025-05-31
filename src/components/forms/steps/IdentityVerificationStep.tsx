
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface IdentityVerificationStepProps {
  data: any;
  onDataChange: (data: any, isValid: boolean) => void;
}

const IdentityVerificationStep: React.FC<IdentityVerificationStepProps> = ({ data, onDataChange }) => {
  const [identityData, setIdentityData] = useState({
    idNumber1: '',
    idNumber2: '',
    ...data.identityData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [identityData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!identityData.idNumber1.trim()) {
      newErrors.idNumber1 = 'ID Number 1 is required';
    } else if (identityData.idNumber1.length < 6) {
      newErrors.idNumber1 = 'ID Number 1 must be at least 6 characters';
    }
    
    if (!identityData.idNumber2.trim()) {
      newErrors.idNumber2 = 'ID Number 2 is required';
    } else if (identityData.idNumber2.length < 6) {
      newErrors.idNumber2 = 'ID Number 2 must be at least 6 characters';
    }

    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0 && 
                   identityData.idNumber1.trim() !== '' && 
                   identityData.idNumber2.trim() !== '';
    
    onDataChange({ identityData }, isValid);
  };

  const handleChange = (field: string, value: string) => {
    setIdentityData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Verify Your Identity</h3>
        <p className="text-sm text-gray-600">Enter your identification details to proceed.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="idNumber1" className="text-sm font-medium">
            ID Number 1 (National ID) *
          </Label>
          <Input
            id="idNumber1"
            value={identityData.idNumber1}
            onChange={(e) => handleChange('idNumber1', e.target.value)}
            placeholder="Enter your National ID number"
            className={`text-sm ${errors.idNumber1 ? 'border-red-500' : ''}`}
            required
          />
          {errors.idNumber1 && (
            <p className="text-xs text-red-500">{errors.idNumber1}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="idNumber2" className="text-sm font-medium">
            ID Number 2 (Tax ID or Passport) *
          </Label>
          <Input
            id="idNumber2"
            value={identityData.idNumber2}
            onChange={(e) => handleChange('idNumber2', e.target.value)}
            placeholder="Enter your Tax ID or Passport number"
            className={`text-sm ${errors.idNumber2 ? 'border-red-500' : ''}`}
            required
          />
          {errors.idNumber2 && (
            <p className="text-xs text-red-500">{errors.idNumber2}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityVerificationStep;
