
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import FormModal from '../common/FormModal';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { FileText, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EMICollection {
  id: string;
  loanId: string;
  customerName: string;
  emiAmount: number;
  dueDate: string;
  collectionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  collectorName: string;
  remarks?: string;
  paymentMode: 'cash' | 'cheque' | 'online' | 'upi';
}

const BMEMICollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<EMICollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<EMICollection | null>(null);
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [remarkText, setRemarkText] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API call
    setCollections([
      {
        id: 'EMI001',
        loanId: 'LN001',
        customerName: 'Rajesh Kumar',
        emiAmount: 25000,
        dueDate: '2024-01-15',
        collectionDate: '2024-01-16',
        status: 'pending',
        collectorName: 'Agent Smith',
        paymentMode: 'cash',
      },
      {
        id: 'EMI002',
        loanId: 'LN002',
        customerName: 'Priya Sharma',
        emiAmount: 18500,
        dueDate: '2024-01-12',
        collectionDate: '2024-01-12',
        status: 'approved',
        collectorName: 'Agent Johnson',
        paymentMode: 'upi',
        remarks: 'Payment verified successfully',
      },
      {
        id: 'EMI003',
        loanId: 'LN003',
        customerName: 'Amit Patel',
        emiAmount: 32000,
        dueDate: '2024-01-10',
        collectionDate: '2024-01-11',
        status: 'rejected',
        collectorName: 'Agent Davis',
        paymentMode: 'cheque',
        remarks: 'Cheque bounced - insufficient funds',
      },
    ]);
  }, []);

  const handleAction = (collection: EMICollection, action: 'approve' | 'reject') => {
    setCollections(prev => 
      prev.map(item => 
        item.id === collection.id 
          ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
          : item
      )
    );

    toast({
      title: 'Success',
      description: `EMI collection ${action}d successfully`,
    });
  };

  const handleRemarkSubmit = () => {
    if (selectedCollection && remarkText.trim()) {
      setCollections(prev => 
        prev.map(item => 
          item.id === selectedCollection.id 
            ? { ...item, remarks: remarkText.trim() }
            : item
        )
      );

      toast({
        title: 'Success',
        description: 'Remark added successfully',
      });

      setRemarkText('');
      setSelectedCollection(null);
      setIsRemarkModalOpen(false);
    }
  };

  const openRemarkModal = (collection: EMICollection) => {
    setSelectedCollection(collection);
    setRemarkText(collection.remarks || '');
    setIsRemarkModalOpen(true);
  };

  const getStatusBadgeVariant = (status: EMICollection['status']) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <DashboardLayout title="EMI Collection Statements">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">EMI Collection Management</h2>
          <p className="text-blue-100">Review and approve EMI collection statements</p>
        </div>

        {/* Collections Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>EMI Collection Statements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collection ID</TableHead>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>EMI Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Collection Date</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Collector</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">{collection.id}</TableCell>
                      <TableCell>{collection.loanId}</TableCell>
                      <TableCell>{collection.customerName}</TableCell>
                      <TableCell>{formatCurrency(collection.emiAmount)}</TableCell>
                      <TableCell>{new Date(collection.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(collection.collectionDate).toLocaleDateString()}</TableCell>
                      <TableCell className="capitalize">{collection.paymentMode}</TableCell>
                      <TableCell>{collection.collectorName}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(collection.status)}>
                          {collection.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {collection.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleAction(collection, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleAction(collection, 'reject')}
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openRemarkModal(collection)}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Remark
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Remark Modal */}
        <FormModal
          trigger={<div />} // Hidden trigger since we control it programmatically
          title="Add/Edit Remark"
          description={`Add remark for EMI collection ${selectedCollection?.id}`}
          open={isRemarkModalOpen}
          onOpenChange={setIsRemarkModalOpen}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collection-details">Collection Details</Label>
              {selectedCollection && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p><strong>Customer:</strong> {selectedCollection.customerName}</p>
                  <p><strong>Amount:</strong> {formatCurrency(selectedCollection.emiAmount)}</p>
                  <p><strong>Payment Mode:</strong> {selectedCollection.paymentMode}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remark">Remark</Label>
              <Textarea
                id="remark"
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                placeholder="Enter your remark here..."
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRemarkModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleRemarkSubmit}>
                Save Remark
              </Button>
            </div>
          </div>
        </FormModal>
      </div>
    </DashboardLayout>
  );
};

export default BMEMICollectionsPage;
