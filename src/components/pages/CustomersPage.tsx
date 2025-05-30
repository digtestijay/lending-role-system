
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
import { Search, Phone, Mail, MapPin, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalLoans: number;
  activeLoans: number;
  totalAmount: number;
  status: 'active' | 'inactive' | 'defaulter';
  lastActivity: string;
}

interface CustomersPageProps {
  title: string;
  canViewDetails?: boolean;
}

const CustomersPage: React.FC<CustomersPageProps> = ({ title, canViewDetails = true }) => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCustomers: Customer[] = [
      {
        id: 'CUST001',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 9876543210',
        address: 'Mumbai, Maharashtra',
        totalLoans: 2,
        activeLoans: 1,
        totalAmount: 750000,
        status: 'active',
        lastActivity: '2024-01-15',
      },
      {
        id: 'CUST002',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 9876543211',
        address: 'Delhi, Delhi',
        totalLoans: 1,
        activeLoans: 1,
        totalAmount: 200000,
        status: 'active',
        lastActivity: '2024-01-10',
      },
      {
        id: 'CUST003',
        name: 'Amit Singh',
        email: 'amit@example.com',
        phone: '+91 9876543212',
        address: 'Bangalore, Karnataka',
        totalLoans: 3,
        activeLoans: 0,
        totalAmount: 1200000,
        status: 'inactive',
        lastActivity: '2024-01-05',
      },
    ];

    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [customers, searchTerm]);

  const getStatusBadgeVariant = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'defaulter':
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
    <DashboardLayout title={title}>
      <div className="space-y-6">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>{filteredCustomers.length} Customers Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden lg:table-cell">Location</TableHead>
                    <TableHead>Loans</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    {canViewDetails && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500 md:hidden">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customer.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">Total: {customer.totalLoans}</p>
                          <p className="text-sm text-green-600">Active: {customer.activeLoans}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(customer.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      {canViewDetails && (
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
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

export default CustomersPage;
