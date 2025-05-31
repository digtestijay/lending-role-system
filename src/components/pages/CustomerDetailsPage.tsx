
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowLeft, Edit, Phone, Mail, MapPin, User, Calendar, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';

interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  idNumber1: string;
  idNumber2: string;
  joinDate: string;
  totalLoans: number;
  activeLoans: number;
  status: 'active' | 'inactive';
  creditScore?: number;
}

const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCustomer: CustomerDetails = {
      id: id || 'CUST001',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      address: '123 Main Street, Andheri West, Mumbai, Maharashtra 400058',
      dateOfBirth: '1985-06-15',
      idNumber1: 'ABCD1234567E',
      idNumber2: 'PAN123456789',
      joinDate: '2023-01-15',
      totalLoans: 3,
      activeLoans: 1,
      status: 'active',
      creditScore: 750,
    };
    setCustomer(mockCustomer);
  }, [id]);

  const handleEdit = () => {
    navigate(`/customer/${id}/edit`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!customer) {
    return (
      <DashboardLayout title="Customer Details">
        <div className="flex justify-center items-center h-64">
          <p>Loading customer details...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Customer Details">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={handleBack} size={isMobile ? "sm" : "default"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{customer.name}</h2>
              <p className="text-sm text-gray-600">ID: {customer.id}</p>
            </div>
          </div>
          <Button onClick={handleEdit} size={isMobile ? "sm" : "default"}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Status and Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overview</span>
              <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                {customer.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{customer.totalLoans}</p>
                <p className="text-sm text-gray-600">Total Loans</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{customer.activeLoans}</p>
                <p className="text-sm text-gray-600">Active Loans</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{customer.creditScore}</p>
                <p className="text-sm text-gray-600">Credit Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {new Date(customer.joinDate).getFullYear()}
                </p>
                <p className="text-sm text-gray-600">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">{new Date(customer.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{customer.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ID Number 1</p>
                    <p className="font-medium">{customer.idNumber1}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">ID Number 2</p>
                    <p className="font-medium">{customer.idNumber2}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDetailsPage;
