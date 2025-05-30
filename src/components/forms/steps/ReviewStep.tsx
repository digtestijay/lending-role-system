
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CheckCircle, User, MapPin, Users, FileText, CreditCard } from 'lucide-react';

interface ReviewStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  const { personalDetails, addressDetails, nomineeDetails, documents, loanDetails } = data;

  const uploadedDocs = documents?.filter((doc: any) => doc.uploaded) || [];
  const requiredDocsCount = 4; // aadhar, pan, income, bank_statement

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">Review Your Application</h3>
        <p className="text-gray-600 mt-2">Please review all the information before submitting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <User className="h-5 w-5" />
              <span>Personal Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{personalDetails?.firstName} {personalDetails?.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{personalDetails?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{personalDetails?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span className="font-medium">{personalDetails?.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Occupation:</span>
              <span className="font-medium">{personalDetails?.occupation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Income:</span>
              <span className="font-medium">₹{personalDetails?.monthlyIncome?.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <MapPin className="h-5 w-5" />
              <span>Address Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600 font-medium">Current Address:</span>
              <p className="mt-1">
                {addressDetails?.currentAddress?.addressLine1}, {addressDetails?.currentAddress?.city}, {addressDetails?.currentAddress?.state} - {addressDetails?.currentAddress?.pincode}
              </p>
              <Badge variant="outline" className="mt-1">
                {addressDetails?.currentAddress?.addressType}
              </Badge>
            </div>
            {!addressDetails?.permanentAddress?.isSameAsCurrent && (
              <div>
                <span className="text-gray-600 font-medium">Permanent Address:</span>
                <p className="mt-1">
                  {addressDetails?.permanentAddress?.addressLine1}, {addressDetails?.permanentAddress?.city}, {addressDetails?.permanentAddress?.state} - {addressDetails?.permanentAddress?.pincode}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nominee Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Users className="h-5 w-5" />
              <span>Nominee Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{nomineeDetails?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Relationship:</span>
              <span className="font-medium">{nomineeDetails?.relationship}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Share:</span>
              <span className="font-medium">{nomineeDetails?.sharePercentage}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Loan Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <CreditCard className="h-5 w-5" />
              <span>Loan Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-lg">₹{loanDetails?.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <Badge className="capitalize">{loanDetails?.type}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tenure:</span>
              <span className="font-medium">{loanDetails?.tenure} months</span>
            </div>
            <div className="mt-3">
              <span className="text-gray-600 font-medium">Purpose:</span>
              <p className="mt-1 text-gray-800">{loanDetails?.purpose}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="h-5 w-5" />
            <span>Documents</span>
            {uploadedDocs.length >= requiredDocsCount && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {documents?.map((doc: any) => (
              <div key={doc.type} className="flex items-center space-x-2">
                {doc.uploaded ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                )}
                <span className="text-sm capitalize">{doc.type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission Note */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-green-900">Ready to Submit</p>
            <p className="mt-1 text-green-700">
              Your application is complete and ready for submission. After submission, you will receive a confirmation email with your application reference number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
