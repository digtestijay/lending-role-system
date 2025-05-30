
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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Loan Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount (₹) *</Label>
            <Input
              id="loanAmount"
              type="number"
              min="10000"
              max="10000000"
              value={loanDetails.amount}
              onChange={(e) => handleChange('amount', Number(e.target.value))}
              placeholder="Enter loan amount"
              required
            />
            <p className="text-xs text-gray-500">Minimum: ₹10,000 | Maximum: ₹1,00,00,000</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tenure">Loan Tenure (months) *</Label>
            <Input
              id="tenure"
              type="number"
              min="6"
              max="360"
              value={loanDetails.tenure}
              onChange={(e) => handleChange('tenure', Number(e.target.value))}
              placeholder="Enter tenure in months"
              required
            />
            <p className="text-xs text-gray-500">Minimum: 6 months | Maximum: 30 years (360 months)</p>
          </div>
          
          <div className="space-y-2">
            <Label>Loan Type *</Label>
            <RadioGroup
              value={loanDetails.type}
              onValueChange={(value) => handleChange('type', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Personal Loan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home">Home Loan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business Loan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="education" id="education" />
                <Label htmlFor="education">Education Loan</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="space-y-4">
          {loanDetails.amount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Loan Summary</h4>
              <div className="space-y-2 text-sm">
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
        <Label htmlFor="purpose">Loan Purpose *</Label>
        <Textarea
          id="purpose"
          value={loanDetails.purpose}
          onChange={(e) => handleChange('purpose', e.target.value)}
          placeholder="Please describe the purpose of this loan (e.g., home renovation, education fees, business expansion, etc.)"
          rows={4}
          required
        />
      </div>
    </div>
  );
};

export default LoanDetailsStep;
