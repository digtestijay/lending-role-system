
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import LoanTable from '../common/LoanTable';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Loan } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface LoansListPageProps {
  title: string;
  canApprove?: boolean;
  canCreate?: boolean;
}

const LoansListPage: React.FC<LoansListPageProps> = ({ title, canApprove = false, canCreate = false }) => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockLoans: Loan[] = [
      {
        id: 'LN001',
        applicantName: 'Rajesh Kumar',
        amount: 500000,
        type: 'home',
        status: 'pending',
        applicationDate: '2024-01-15',
        agentId: '1',
        agentName: 'John Agent',
        interestRate: 8.5,
        tenure: 240,
      },
      {
        id: 'LN002',
        applicantName: 'Priya Sharma',
        amount: 200000,
        type: 'personal',
        status: 'approved',
        applicationDate: '2024-01-10',
        agentId: '1',
        agentName: 'John Agent',
        interestRate: 12.0,
        tenure: 36,
      },
      {
        id: 'LN003',
        applicantName: 'Amit Singh',
        amount: 750000,
        type: 'business',
        status: 'disbursed',
        applicationDate: '2024-01-08',
        agentId: '2',
        agentName: 'Sarah Agent',
        interestRate: 10.5,
        tenure: 60,
      },
    ];

    setLoans(mockLoans);
    setFilteredLoans(mockLoans);
  }, []);

  useEffect(() => {
    let filtered = loans;

    if (searchTerm) {
      filtered = filtered.filter(loan =>
        loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(loan => loan.status === statusFilter);
    }

    setFilteredLoans(filtered);
  }, [loans, searchTerm, statusFilter]);

  const handleLoanAction = (loanId: string, action: string) => {
    if (!canApprove) return;

    setLoans(prevLoans =>
      prevLoans.map(loan => {
        if (loan.id === loanId) {
          const newStatus: Loan['status'] = action === 'approve' ? 'approved' : 'rejected';
          return { ...loan, status: newStatus };
        }
        return loan;
      })
    );
  };

  return (
    <DashboardLayout title={title}>
      <div className="space-y-6">
        {/* Search and Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Loan Management</span>
              <div className="flex space-x-2">
                {canCreate && (
                  <Button asChild size="sm">
                    <Link to="/loan-application">
                      <Plus className="h-4 w-4 mr-2" />
                      New Application
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or loan ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="disbursed">Disbursed</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loans Table */}
        <LoanTable
          loans={filteredLoans}
          title={`${filteredLoans.length} Loans Found`}
          showActions={canApprove}
          onLoanAction={handleLoanAction}
        />
      </div>
    </DashboardLayout>
  );
};

export default LoansListPage;
