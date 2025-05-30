
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import AddressDetailsStep from './steps/AddressDetailsStep';
import NomineeDetailsStep from './steps/NomineeDetailsStep';
import DocumentUploadStep from './steps/DocumentUploadStep';
import LoanDetailsStep from './steps/LoanDetailsStep';
import ReviewStep from './steps/ReviewStep';
import { LoanApplicationData } from '../../types';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '../../hooks/use-mobile';

const steps = [
  { id: 1, title: 'Personal Details', component: PersonalDetailsStep },
  { id: 2, title: 'Address Details', component: AddressDetailsStep },
  { id: 3, title: 'Nominee Details', component: NomineeDetailsStep },
  { id: 4, title: 'Documents', component: DocumentUploadStep },
  { id: 5, title: 'Loan Details', component: LoanDetailsStep },
  { id: 6, title: 'Review', component: ReviewStep },
];

const LoanApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<Partial<LoanApplicationData>>({});
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleStepData = (stepData: any) => {
    setApplicationData(prev => ({ ...prev, ...stepData }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would call your API to submit the application
      console.log('Submitting application:', applicationData);
      toast({
        title: 'Application Submitted',
        description: 'Your loan application has been submitted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
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
              Loan Application
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
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4 overflow-x-auto">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${
                      step.id === currentStep
                        ? 'bg-blue-600 text-white'
                        : step.id < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.id}
                  </div>
                ))}
              </div>
            </div>

            <CurrentStepComponent
              data={applicationData}
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
                <span className="text-xs sm:text-sm">Previous</span>
              </Button>

              {currentStep === steps.length ? (
                <Button 
                  onClick={handleSubmit} 
                  className="flex items-center space-x-1 sm:space-x-2"
                  size={isMobile ? "sm" : "default"}
                >
                  <span className="text-xs sm:text-sm">Submit Application</span>
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
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

export default LoanApplicationForm;
