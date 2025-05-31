
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Phone, Mail, MapPin, User } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalLoans: number;
  activeLoans: number;
  status: 'active' | 'inactive';
}

const CustomersPage: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data
    const mockCustomers: Customer[] = [
      {
        id: 'CUST001',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 9876543210',
        address: 'Mumbai, Maharashtra',
        totalLoans: 2,
        activeLoans: 1,
        status: 'active',
      },
      {
        id: 'CUST002',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 9876543211',
        address: 'Delhi, India',
        totalLoans: 1,
        activeLoans: 0,
        status: 'inactive',
      },
    ];
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customerId: string) => {
    navigate(`/customer/${customerId}`);
  };

  const renderMobileCard = (customer: Customer) => (
    <Card key={customer.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{customer.name}</h3>
              <p className="text-xs text-gray-500">ID: {customer.id}</p>
            </div>
          </div>
          <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
            {customer.status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-3 w-3 text-gray-400" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="truncate">{customer.address}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm bg-gray-50 p-2 rounded flex-1 mr-3">
            <span>Total: {customer.totalLoans} | Active: {customer.activeLoans}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewDetails(customer.id)}
          >
            View
          </Button>
        </div>
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
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium">Address</th>
                <th className="text-left p-4 font-medium">Loans</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.id}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      <div className="text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{customer.address}</td>
                  <td className="p-4 text-sm">
                    <div>Total: {customer.totalLoans}</div>
                    <div>Active: {customer.activeLoans}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(customer.id)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout title="Customers">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Customers</h2>
          <p className="text-sm text-gray-600">Manage customer information and history</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Customers list */}
        {filteredCustomers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No customers found.</p>
            </CardContent>
          </Card>
        ) : isMobile ? (
          <div>
            {filteredCustomers.map(renderMobileCard)}
          </div>
        ) : (
          renderDesktopTable()
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
