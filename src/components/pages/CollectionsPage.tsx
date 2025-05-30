
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Phone, Calendar, DollarSign, Clock } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

interface Collection {
  id: string;
  loanId: string;
  customerName: string;
  customerPhone: string;
  amountDue: number;
  dueDate: string;
  overdueDays: number;
  status: 'pending' | 'partial' | 'collected' | 'overdue';
  lastContactDate?: string;
}

const CollectionsPage: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Mock data
    const mockCollections: Collection[] = [
      {
        id: 'COL001',
        loanId: 'LN001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 9876543210',
        amountDue: 25000,
        dueDate: '2024-01-20',
        overdueDays: 5,
        status: 'overdue',
        lastContactDate: '2024-01-18',
      },
      {
        id: 'COL002',
        loanId: 'LN002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 9876543211',
        amountDue: 15000,
        dueDate: '2024-01-25',
        overdueDays: 0,
        status: 'pending',
      },
    ];
    setCollections(mockCollections);
  }, []);

  const canCollect = user?.role === 'agent';

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'default',
      partial: 'secondary',
      collected: 'secondary',
      overdue: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status.toUpperCase()}</Badge>;
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.loanId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || collection.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderMobileCard = (collection: Collection) => (
    <Card key={collection.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-sm">{collection.customerName}</h3>
            <p className="text-xs text-gray-500">Loan: {collection.loanId}</p>
          </div>
          {getStatusBadge(collection.status)}
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="h-3 w-3 text-gray-400" />
              <span>Amount Due:</span>
            </div>
            <span className="font-semibold text-red-600">₹{collection.amountDue.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span>Due Date:</span>
            </div>
            <span>{new Date(collection.dueDate).toLocaleDateString()}</span>
          </div>

          {collection.overdueDays > 0 && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-red-400" />
                <span>Overdue:</span>
              </div>
              <span className="text-red-600">{collection.overdueDays} days</span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{collection.customerPhone}</span>
          </div>
        </div>

        {canCollect && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" variant="default" className="flex-1">
              Mark Collected
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderDesktopTable = () => (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Loan ID</th>
                <th className="text-left p-4 font-medium">Amount Due</th>
                <th className="text-left p-4 font-medium">Due Date</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Contact</th>
                {canCollect && <th className="text-left p-4 font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredCollections.map((collection) => (
                <tr key={collection.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{collection.customerName}</div>
                      <div className="text-sm text-gray-500">{collection.customerPhone}</div>
                    </div>
                  </td>
                  <td className="p-4">{collection.loanId}</td>
                  <td className="p-4">
                    <span className="font-semibold text-red-600">
                      ₹{collection.amountDue.toLocaleString()}
                    </span>
                    {collection.overdueDays > 0 && (
                      <div className="text-xs text-red-500">
                        {collection.overdueDays} days overdue
                      </div>
                    )}
                  </td>
                  <td className="p-4">{new Date(collection.dueDate).toLocaleDateString()}</td>
                  <td className="p-4">{getStatusBadge(collection.status)}</td>
                  <td className="p-4">
                    {collection.lastContactDate ? (
                      <div className="text-sm">
                        Last: {new Date(collection.lastContactDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">No contact</span>
                    )}
                  </td>
                  {canCollect && (
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="default">
                          Collect
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout title="Collections">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Collections</h2>
          <p className="text-sm text-gray-600">Track and manage loan collections</p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by customer or loan ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="partial">Partial</option>
            <option value="collected">Collected</option>
          </select>
        </div>

        {/* Collections list */}
        {filteredCollections.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No collections found.</p>
            </CardContent>
          </Card>
        ) : isMobile ? (
          <div>
            {filteredCollections.map(renderMobileCard)}
          </div>
        ) : (
          renderDesktopTable()
        )}
      </div>
    </DashboardLayout>
  );
};

export default CollectionsPage;
