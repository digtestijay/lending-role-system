import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, Search, Filter, Eye, Edit, CheckCircle, XCircle, CalendarIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { Loan } from '../../types';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';

const LoansListPage: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockLoans: Loan[] = [
      {
        id: 'LN001',
        applicantName: 'Rajesh Kumar',
        amount: 500000,
        type: 'home',
        status: 'pending',
        applicationDate: '2024-01-15',
        agentId: '1',
        agentName: 'Agent Name',
      },
      {
        id: 'LN002',
        applicantName: 'Priya Sharma',
        amount: 200000,
        type: 'personal',
        status: 'approved',
        applicationDate: '2024-01-10',
        agentId: '1',
        agentName: 'Agent Name',
      },
      {
        id: 'LN003',
        applicantName: 'Amit Singh',
        amount: 300000,
        type: 'business',
        status: 'rejected',
        applicationDate: '2024-01-12',
        agentId: '1',
        agentName: 'Agent Name',
      },
    ];
    setLoans(mockLoans);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'default',
      approved: 'secondary',
      rejected: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status.toUpperCase()}</Badge>;
  };

  const canCreateLoan = user?.role === 'agent';
  const canApprove = user?.role === 'grt';

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    
    // Date filtering
    const loanDate = new Date(loan.applicationDate);
    const matchesDateRange = (!startDate || loanDate >= startDate) && 
                            (!endDate || loanDate <= endDate);
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const renderMobileCard = (loan: Loan) => (
    <Card key={loan.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-sm">{loan.applicantName}</h3>
            <p className="text-xs text-gray-500">ID: {loan.id}</p>
          </div>
          {getStatusBadge(loan.status)}
        </div>
        
        <div className="space-y-1 mb-3">
          <p className="text-sm">Amount: ₹{loan.amount.toLocaleString()}</p>
          <p className="text-sm">Type: {loan.type}</p>
          <p className="text-sm">Date: {new Date(loan.applicationDate).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          {canCreateLoan && (
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          )}
          {canApprove && loan.status === 'pending' && (
            <>
              <Button size="sm" variant="default" className="flex-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="destructive" className="flex-1">
                <XCircle className="h-3 w-3 mr-1" />
                Reject
              </Button>
            </>
          )}
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
                <th className="text-left p-4 font-medium">Loan ID</th>
                <th className="text-left p-4 font-medium">Applicant</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{loan.id}</td>
                  <td className="p-4">{loan.applicantName}</td>
                  <td className="p-4">₹{loan.amount.toLocaleString()}</td>
                  <td className="p-4 capitalize">{loan.type}</td>
                  <td className="p-4">{getStatusBadge(loan.status)}</td>
                  <td className="p-4">{new Date(loan.applicationDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      {canCreateLoan && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                      {canApprove && loan.status === 'pending' && (
                        <>
                          <Button size="sm" variant="default">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
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
    <DashboardLayout title="Loan Applications">
      <div className="space-y-4">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Loan Applications</h2>
            <p className="text-sm text-gray-600">Manage and track loan applications</p>
          </div>
          {canCreateLoan && (
            <Button asChild className="w-full sm:w-auto">
              <Link to="/loan-application">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Link>
            </Button>
          )}
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or ID..."
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
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Date Range Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy") : <span>Start Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy") : <span>End Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {(startDate || endDate) && (
              <Button
                variant="outline"
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                }}
                className="whitespace-nowrap"
              >
                Clear Dates
              </Button>
            )}
          </div>
        </div>

        {/* Loans list */}
        {filteredLoans.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No loans found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : isMobile ? (
          <div>
            {filteredLoans.map(renderMobileCard)}
          </div>
        ) : (
          renderDesktopTable()
        )}
      </div>
    </DashboardLayout>
  );
};

export default LoansListPage;
