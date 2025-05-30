
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Search, Phone, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Collection {
  id: string;
  loanId: string;
  customerName: string;
  phone: string;
  amount: number;
  dueDate: string;
  overdueDays: number;
  status: 'due' | 'overdue' | 'collected' | 'follow_up';
  lastContact: string;
  agentName: string;
}

interface CollectionsPageProps {
  title: string;
  canCollect?: boolean;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ title, canCollect = true }) => {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCollections: Collection[] = [
      {
        id: 'COL001',
        loanId: 'LN001',
        customerName: 'Rajesh Kumar',
        phone: '+91 9876543210',
        amount: 25000,
        dueDate: '2024-01-20',
        overdueDays: 5,
        status: 'overdue',
        lastContact: '2024-01-18',
        agentName: 'John Agent',
      },
      {
        id: 'COL002',
        loanId: 'LN002',
        customerName: 'Priya Sharma',
        phone: '+91 9876543211',
        amount: 15000,
        dueDate: '2024-01-25',
        overdueDays: 0,
        status: 'due',
        lastContact: '2024-01-15',
        agentName: 'Sarah Agent',
      },
      {
        id: 'COL003',
        loanId: 'LN003',
        customerName: 'Amit Singh',
        phone: '+91 9876543212',
        amount: 30000,
        dueDate: '2024-01-15',
        overdueDays: 10,
        status: 'follow_up',
        lastContact: '2024-01-20',
        agentName: 'Mike Agent',
      },
    ];

    setCollections(mockCollections);
    setFilteredCollections(mockCollections);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = collections.filter(collection =>
        collection.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.phone.includes(searchTerm)
      );
      setFilteredCollections(filtered);
    } else {
      setFilteredCollections(collections);
    }
  }, [collections, searchTerm]);

  const getStatusBadgeVariant = (status: Collection['status']) => {
    switch (status) {
      case 'due':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      case 'collected':
        return 'default';
      case 'follow_up':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: Collection['status']) => {
    switch (status) {
      case 'due':
        return <Clock className="h-4 w-4" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'collected':
        return <CheckCircle className="h-4 w-4" />;
      case 'follow_up':
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleCollectionAction = (collectionId: string, action: string) => {
    if (!canCollect) return;

    setCollections(prevCollections =>
      prevCollections.map(collection => {
        if (collection.id === collectionId) {
          let newStatus: Collection['status'] = collection.status;
          if (action === 'collect') newStatus = 'collected';
          if (action === 'follow_up') newStatus = 'follow_up';
          
          return { 
            ...collection, 
            status: newStatus,
            lastContact: new Date().toISOString().split('T')[0]
          };
        }
        return collection;
      })
    );
  };

  return (
    <DashboardLayout title={title}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Due Today</p>
                  <p className="text-2xl font-bold">
                    {filteredCollections.filter(c => c.status === 'due').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold">
                    {filteredCollections.filter(c => c.status === 'overdue').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Collected</p>
                  <p className="text-2xl font-bold">
                    {filteredCollections.filter(c => c.status === 'collected').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Phone className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Follow Up</p>
                  <p className="text-2xl font-bold">
                    {filteredCollections.filter(c => c.status === 'follow_up').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by customer name, loan ID, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Collections Table */}
        <Card>
          <CardHeader>
            <CardTitle>{filteredCollections.length} Collections Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collection ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Agent</TableHead>
                    {canCollect && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">{collection.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{collection.customerName}</p>
                          <p className="text-sm text-gray-500">Loan: {collection.loanId}</p>
                          <p className="text-sm text-gray-500 md:hidden">{collection.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(collection.amount)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{new Date(collection.dueDate).toLocaleDateString()}</p>
                          {collection.overdueDays > 0 && (
                            <p className="text-xs text-red-600">
                              {collection.overdueDays} days overdue
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(collection.status)} className="flex items-center space-x-1 w-fit">
                          {getStatusIcon(collection.status)}
                          <span className="capitalize">{collection.status.replace('_', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{collection.agentName}</TableCell>
                      {canCollect && (
                        <TableCell>
                          <div className="flex space-x-2">
                            {collection.status !== 'collected' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleCollectionAction(collection.id, 'collect')}
                                >
                                  Collect
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCollectionAction(collection.id, 'follow_up')}
                                >
                                  Follow Up
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CollectionsPage;
