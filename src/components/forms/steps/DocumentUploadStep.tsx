
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { DocumentUpload } from '../../../types';

interface DocumentUploadStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const requiredDocuments = [
  { type: 'aadhar', label: 'Aadhar Card', required: true },
  { type: 'pan', label: 'PAN Card', required: true },
  { type: 'income', label: 'Income Proof', required: true },
  { type: 'bank_statement', label: 'Bank Statement', required: true },
];

const optionalDocuments = [
  { type: 'property_papers', label: 'Property Papers', required: false },
  { type: 'other', label: 'Other Documents', required: false },
];

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({ data, onDataChange }) => {
  const [documents, setDocuments] = useState<DocumentUpload[]>(() => {
    const allDocTypes = [...requiredDocuments, ...optionalDocuments];
    return allDocTypes.map(doc => ({
      type: doc.type as DocumentUpload['type'],
      file: null,
      uploaded: false,
      ...data.documents?.find((d: DocumentUpload) => d.type === doc.type),
    }));
  });

  useEffect(() => {
    onDataChange({ documents });
  }, [documents, onDataChange]);

  const handleFileChange = (type: DocumentUpload['type'], file: File | null) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.type === type 
          ? { ...doc, file, uploaded: !!file }
          : doc
      )
    );
  };

  const renderDocumentCard = (docType: any, document: DocumentUpload) => (
    <Card key={docType.type} className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-xs sm:text-sm flex items-center justify-between">
          <span className="flex items-center space-x-1 sm:space-x-2">
            <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="truncate">{docType.label}</span>
          </span>
          {docType.required && (
            <span className="text-xs text-red-500">Required</span>
          )}
          {document.uploaded && (
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 sm:space-y-3">
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(docType.type, e.target.files?.[0] || null)}
            className="cursor-pointer text-xs sm:text-sm"
          />
          {document.file && (
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-600">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate">{document.file.name}</span>
              <span className="text-xs">({(document.file.size / 1024 / 1024).toFixed(1)}MB)</span>
            </div>
          )}
          <p className="text-xs text-gray-500">
            PDF, JPG, PNG (Max 5MB)
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const requiredDocsUploaded = documents
    .filter(doc => requiredDocuments.some(req => req.type === doc.type))
    .every(doc => doc.uploaded);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold">Document Upload</h3>
        <div className="flex items-center space-x-2">
          {requiredDocsUploaded ? (
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
          )}
          <span className="text-xs sm:text-sm text-gray-600">
            {documents.filter(d => d.uploaded).length} of {documents.length} uploaded
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Required Documents</h4>
          {/* Mobile: 2 cards per row, Desktop: 4 cards per row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {requiredDocuments.map(docType => {
              const document = documents.find(d => d.type === docType.type)!;
              return renderDocumentCard(docType, document);
            })}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Optional Documents</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {optionalDocuments.map(docType => {
              const document = documents.find(d => d.type === docType.type)!;
              return renderDocumentCard(docType, document);
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-medium text-blue-900">Upload Guidelines:</p>
            <ul className="mt-1 text-blue-700 space-y-1">
              <li>• Ensure documents are clear and readable</li>
              <li>• All required documents must be uploaded to proceed</li>
              <li>• Maximum file size: 5MB per document</li>
              <li>• Supported formats: PDF, JPG, PNG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
