
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Upload, FileText, CheckCircle, AlertCircle, Eye, ExternalLink, Image, FileIcon } from 'lucide-react';
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

  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

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

    // Create preview URL for image files
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, [type]: url }));
    } else {
      setPreviewUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[type];
        return newUrls;
      });
    }
  };

  const getFileIcon = (file: File | null, document: DocumentUpload) => {
    if (document.url) {
      return <ExternalLink className="h-4 w-4 text-blue-500" />;
    }
    if (file?.type.startsWith('image/')) {
      return <Image className="h-4 w-4 text-green-500" />;
    }
    return <FileIcon className="h-4 w-4 text-gray-500" />;
  };

  const renderFilePreview = (document: DocumentUpload) => {
    // Show existing URL if available
    if (document.url) {
      return (
        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded border">
          <ExternalLink className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-blue-700 truncate">Already uploaded</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(document.url, '_blank')}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      );
    }

    // Show file preview if file is selected
    if (document.file) {
      const previewUrl = previewUrls[document.type];
      
      return (
        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded border">
          {getFileIcon(document.file, document)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{document.file.name}</p>
            <p className="text-xs text-gray-500">
              {(document.file.size / 1024 / 1024).toFixed(1)}MB
            </p>
          </div>
          {previewUrl && (
            <div className="flex-shrink-0">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-12 w-12 object-cover rounded border"
              />
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderDocumentRow = (docType: any, document: DocumentUpload) => (
    <div key={docType.type} className="border rounded-lg p-4 space-y-3">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-sm">{docType.label}</span>
          {docType.required && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
          )}
        </div>
        {document.uploaded && (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
      </div>

      {/* File Input Row */}
      <div className="space-y-2">
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(docType.type, e.target.files?.[0] || null)}
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500">
          PDF, JPG, PNG (Max 5MB)
        </p>
      </div>

      {/* Preview Row */}
      {renderFilePreview(document)}
    </div>
  );

  const requiredDocsUploaded = documents
    .filter(doc => requiredDocuments.some(req => req.type === doc.type))
    .every(doc => doc.uploaded);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Document Upload</h3>
        <div className="flex items-center space-x-2">
          {requiredDocsUploaded ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-500" />
          )}
          <span className="text-sm text-gray-600">
            {documents.filter(d => d.uploaded).length} of {documents.length} uploaded
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
          <div className="space-y-3">
            {requiredDocuments.map(docType => {
              const document = documents.find(d => d.type === docType.type)!;
              return renderDocumentRow(docType, document);
            })}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Optional Documents</h4>
          <div className="space-y-3">
            {optionalDocuments.map(docType => {
              const document = documents.find(d => d.type === docType.type)!;
              return renderDocumentRow(docType, document);
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
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
