
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import ReusableButton from '../common/ReusableButton';

interface CustomerEditData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  idNumber1: string;
  idNumber2: string;
  status: 'active' | 'inactive';
}

const CustomerEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [customer, setCustomer] = useState<CustomerEditData>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    idNumber1: '',
    idNumber2: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCustomer: CustomerEditData = {
      id: id || 'CUST001',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      address: '123 Main Street, Andheri West, Mumbai, Maharashtra 400058',
      dateOfBirth: '1985-06-15',
      idNumber1: 'ABCD1234567E',
      idNumber2: 'PAN123456789',
      status: 'active',
    };
    setCustomer(mockCustomer);
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!customer.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!customer.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!customer.idNumber1.trim()) {
      newErrors.idNumber1 = 'ID Number 1 is required';
    }

    if (!customer.idNumber2.trim()) {
      newErrors.idNumber2 = 'ID Number 2 is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Updating customer:', customer);
      
      toast({
        title: 'Success',
        description: 'Customer information updated successfully.',
      });
      
      navigate(`/customer/${id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update customer information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CustomerEditData, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBack = () => {
    navigate(`/customer/${id}`);
  };

  return (
    <DashboardLayout title="Edit Customer">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={handleBack} size={isMobile ? "sm" : "default"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Edit Customer</h2>
            <p className="text-sm text-gray-600">ID: {customer.id}</p>
          </div>
        </div>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customer.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customer.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customer.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={customer.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber1">ID Number 1 *</Label>
                  <Input
                    id="idNumber1"
                    value={customer.idNumber1}
                    onChange={(e) => handleChange('idNumber1', e.target.value)}
                    className={errors.idNumber1 ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.idNumber1 && <p className="text-xs text-red-500">{errors.idNumber1}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber2">ID Number 2 *</Label>
                  <Input
                    id="idNumber2"
                    value={customer.idNumber2}
                    onChange={(e) => handleChange('idNumber2', e.target.value)}
                    className={errors.idNumber2 ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.idNumber2 && <p className="text-xs text-red-500">{errors.idNumber2}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={customer.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} disabled={loading}>
                  Cancel
                </Button>
                <ReusableButton
                  type="submit"
                  loading={loading}
                  loadingText="Saving..."
                  icon={<Save className="h-4 w-4" />}
                >
                  Save Changes
                </ReusableButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerEditPage;
