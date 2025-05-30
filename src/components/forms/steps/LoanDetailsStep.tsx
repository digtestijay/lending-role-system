
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface LoanDetailsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const LoanDetailsStep: React.FC<LoanDetailsStepProps> = ({ data, onDataChange }) => {
  const [loanDetails, setLoanDetails] = useState({
    amount: 0,
    purpose: '',
    tenure: 12,
    type: 'personal' as 'personal' | 'home' | 'business' | 'education',
    ...data.loanDetails,
  });

  useEffect(() => {
    onDataChange({ loanDetails });
  }, [loanDetails, onDataChange]);

  const handleChange = (field: string, value: string | number) => {
    setLoanDetails(prev => ({ ...prev, [field]: value }));
  };

  const calculateEMI = () => {
    const principal = loanDetails.amount;
    const rate = 0.12 / 12; // Assuming 12% annual interest
    const time = loanDetails.tenure;
    
    if (principal > 0 && time > 0) {
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      return emi.toFixed(0);
    }
    return 0;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold">Loan Details</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          {/* Mobile: 2 inputs per row, Desktop: 4 inputs per row */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-xs sm:text-sm">Loan Amount (₹) *</Label>
              <Input
                id="loanAmount"
                type="number"
                min="10000"
                max="10000000"
                value={loanDetails.amount}
                onChange={(e) => handleChange('amount', Number(e.target.value))}
                placeholder="Enter amount"
                className="text-xs sm:text-sm"
                required
              />
              <p className="text-xs text-gray-500">Min: ₹10K | Max: ₹1Cr</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenure" className="text-xs sm:text-sm">Tenure (months) *</Label>
              <Input
                id="tenure"
                type="number"
                min="6"
                max="360"
                value={loanDetails.tenure}
                onChange={(e) => handleChange('tenure', Number(e.target.value))}
                placeholder="Enter tenure"
                className="text-xs sm:text-sm"
                required
              />
              <p className="text-xs text-gray-500">Min: 6m | Max: 30y</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm">Loan Type *</Label>
            <RadioGroup
              value={loanDetails.type}
              onValueChange={(value) => handleChange('type', value)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="text-xs sm:text-sm">Personal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home" className="text-xs sm:text-sm">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business" className="text-xs sm:text-sm">Business</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="education" id="education" />
                <Label htmlFor="education" className="text-xs sm:text-sm">Education</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="space-y-4">
          {loanDetails.amount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Loan Summary</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">₹{loanDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-medium">{loanDetails.tenure} months</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-medium">12% p.a.*</span>
                </div>
                <hr className="border-blue-300" />
                <div className="flex justify-between font-medium text-blue-900">
                  <span>Estimated EMI:</span>
                  <span>₹{Number(calculateEMI()).toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">*Interest rate may vary based on final assessment</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="purpose" className="text-xs sm:text-sm">Loan Purpose *</Label>
        <Textarea
          id="purpose"
          value={loanDetails.purpose}
          onChange={(e) => handleChange('purpose', e.target.value)}
          placeholder="Please describe the purpose of this loan (e.g., home renovation, education fees, business expansion, etc.)"
          rows={3}
          className="text-xs sm:text-sm"
          required
        />
      </div>
    </div>
  );
};

export default LoanDetailsStep;
