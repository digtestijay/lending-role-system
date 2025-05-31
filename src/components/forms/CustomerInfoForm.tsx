
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IdentityVerificationStep from './steps/IdentityVerificationStep';
import PersonalDetailsFormStep from './steps/PersonalDetailsFormStep';
import { CustomerData } from '../../types';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '../../hooks/use-mobile';

const steps = [
  { id: 1, title: 'Identity Verification', component: IdentityVerificationStep },
  { id: 2, title: 'Personal Details', component: PersonalDetailsFormStep },
];

const CustomerInfoForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerData, setCustomerData] = useState<Partial<CustomerData>>({});
  const [isValidStep, setIsValidStep] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (isValidStep && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setIsValidStep(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsValidStep(true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleStepData = (stepData: any, isValid: boolean) => {
    setCustomerData(prev => ({ ...prev, ...stepData }));
    setIsValidStep(isValid);
  };

  const handleSubmit = async () => {
    if (!isValidStep) return;
    
    try {
      console.log('Submitting customer data:', customerData);
      toast({
        title: 'Success',
        description: 'Customer information has been submitted successfully.',
      });
      // You can navigate to another page or reset the form here
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit customer information. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Mobile Back Button */}
        {isMobile && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">
              Customer Information
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Step {currentStep} of {steps.length}</span>
                <span className="truncate ml-2">{steps[currentStep - 1].title}</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={customerData}
              onDataChange={handleStepData}
            />

            <div className="flex justify-between mt-6 sm:mt-8 gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-1 sm:space-x-2"
                size={isMobile ? "sm" : "default"}
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Back</span>
              </Button>

              {currentStep === steps.length ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isValidStep}
                  className="flex items-center space-x-1 sm:space-x-2"
                  size={isMobile ? "sm" : "default"}
                >
                  <span className="text-xs sm:text-sm">Submit</span>
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  disabled={!isValidStep}
                  className="flex items-center space-x-1 sm:space-x-2"
                  size={isMobile ? "sm" : "default"}
                >
                  <span className="text-xs sm:text-sm">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerInfoForm;
