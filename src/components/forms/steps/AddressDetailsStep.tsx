
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { AddressDetails } from '../../../types';

interface AddressDetailsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const AddressDetailsStep: React.FC<AddressDetailsStepProps> = ({ data, onDataChange }) => {
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    currentAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      addressType: 'owned',
    },
    permanentAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isSameAsCurrent: false,
    },
    ...data.addressDetails,
  });

  useEffect(() => {
    onDataChange({ addressDetails });
  }, [addressDetails, onDataChange]);

  const handleCurrentAddressChange = (field: string, value: string) => {
    setAddressDetails(prev => ({
      ...prev,
      currentAddress: { ...prev.currentAddress, [field]: value }
    }));
  };

  const handlePermanentAddressChange = (field: string, value: string | boolean) => {
    setAddressDetails(prev => ({
      ...prev,
      permanentAddress: { ...prev.permanentAddress, [field]: value }
    }));
  };

  const handleSameAsCurrent = (checked: boolean) => {
    if (checked) {
      setAddressDetails(prev => ({
        ...prev,
        permanentAddress: {
          ...prev.currentAddress,
          isSameAsCurrent: true,
        }
      }));
    } else {
      setAddressDetails(prev => ({
        ...prev,
        permanentAddress: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          pincode: '',
          isSameAsCurrent: false,
        }
      }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Current Address</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="currentAddressLine1">Address Line 1 *</Label>
            <Input
              id="currentAddressLine1"
              value={addressDetails.currentAddress.addressLine1}
              onChange={(e) => handleCurrentAddressChange('addressLine1', e.target.value)}
              placeholder="Enter address line 1"
              required
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="currentAddressLine2">Address Line 2</Label>
            <Input
              id="currentAddressLine2"
              value={addressDetails.currentAddress.addressLine2}
              onChange={(e) => handleCurrentAddressChange('addressLine2', e.target.value)}
              placeholder="Enter address line 2 (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentCity">City *</Label>
            <Input
              id="currentCity"
              value={addressDetails.currentAddress.city}
              onChange={(e) => handleCurrentAddressChange('city', e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentState">State *</Label>
            <Input
              id="currentState"
              value={addressDetails.currentAddress.state}
              onChange={(e) => handleCurrentAddressChange('state', e.target.value)}
              placeholder="Enter state"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentPincode">Pincode *</Label>
            <Input
              id="currentPincode"
              value={addressDetails.currentAddress.pincode}
              onChange={(e) => handleCurrentAddressChange('pincode', e.target.value)}
              placeholder="Enter pincode"
              maxLength={6}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Address Type *</Label>
          <RadioGroup
            value={addressDetails.currentAddress.addressType}
            onValueChange={(value) => handleCurrentAddressChange('addressType', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="owned" id="owned" />
              <Label htmlFor="owned">Owned</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rented" id="rented" />
              <Label htmlFor="rented">Rented</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="family" id="family" />
              <Label htmlFor="family">Family Property</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAsCurrent"
            checked={addressDetails.permanentAddress.isSameAsCurrent}
            onCheckedChange={handleSameAsCurrent}
          />
          <Label htmlFor="sameAsCurrent">Permanent address is same as current address</Label>
        </div>
        
        {!addressDetails.permanentAddress.isSameAsCurrent && (
          <>
            <h3 className="text-lg font-semibold">Permanent Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="permanentAddressLine1">Address Line 1 *</Label>
                <Input
                  id="permanentAddressLine1"
                  value={addressDetails.permanentAddress.addressLine1}
                  onChange={(e) => handlePermanentAddressChange('addressLine1', e.target.value)}
                  placeholder="Enter address line 1"
                  required
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="permanentAddressLine2">Address Line 2</Label>
                <Input
                  id="permanentAddressLine2"
                  value={addressDetails.permanentAddress.addressLine2}
                  onChange={(e) => handlePermanentAddressChange('addressLine2', e.target.value)}
                  placeholder="Enter address line 2 (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permanentCity">City *</Label>
                <Input
                  id="permanentCity"
                  value={addressDetails.permanentAddress.city}
                  onChange={(e) => handlePermanentAddressChange('city', e.target.value)}
                  placeholder="Enter city"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permanentState">State *</Label>
                <Input
                  id="permanentState"
                  value={addressDetails.permanentAddress.state}
                  onChange={(e) => handlePermanentAddressChange('state', e.target.value)}
                  placeholder="Enter state"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permanentPincode">Pincode *</Label>
                <Input
                  id="permanentPincode"
                  value={addressDetails.permanentAddress.pincode}
                  onChange={(e) => handlePermanentAddressChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressDetailsStep;
