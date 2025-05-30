
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import StatsCard from '../common/StatsCard';
import LoanTable from '../common/LoanTable';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, Clock, XCircle, FileText, AlertCircle } from 'lucide-react';
import { Loan, DashboardStats } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const GRTDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingLoans, setPendingLoans] = useState<Loan[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalLoans: 25,
      pendingLoans: 8,
      approvedLoans: 15,
      rejectedLoans: 2,
      totalAmount: 5500000,
    });

    setPendingLoans([
      {
        id: 'LN003',
        applicantName: 'Amit Singh',
        amount: 750000,
        type: 'business',
        status: 'pending',
        applicationDate: '2024-01-14',
        agentId: '1',
        agentName: 'John Agent',
      },
      {
        id: 'LN004',
        applicantName: 'Sunita Devi',
        amount: 300000,
        type: 'education',
        status: 'pending',
        applicationDate: '2024-01-13',
        agentId: '1',
        agentName: 'John Agent',
      },
    ]);
  }, [user]);

  const handleLoanAction = (loanId: string, action: string) => {
    setPendingLoans(prevLoans => 
      prevLoans.map(loan => 
        loan.id === loanId 
          ? { ...loan, status: action === 'approve' ? 'approved' : 'rejected' }
          : loan
      ).filter(loan => loan.status === 'pending')
    );

    toast({
      title: `Loan ${action}d`,
      description: `Loan ${loanId} has been ${action}d successfully.`,
    });
  };

  return (
    <DashboardLayout title="GRT Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">GRT Operations Center</h2>
          <p className="text-green-100">Review and process loan applications efficiently.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Pending Review"
            value={stats?.pendingLoans || 0}
            icon={Clock}
            description="Requires your attention"
          />
          <StatsCard
            title="Approved Today"
            value={stats?.approvedLoans || 0}
            icon={CheckCircle}
            description="Processed successfully"
          />
          <StatsCard
            title="Rejected"
            value={stats?.rejectedLoans || 0}
            icon={XCircle}
            description="Applications declined"
          />
          <StatsCard
            title="Total Portfolio"
            value={`₹${(stats?.totalAmount || 0).toLocaleString()}`}
            icon={FileText}
            description="Under management"
          />
        </div>

        {/* Priority Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Priority Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="destructive" className="flex items-center justify-center space-x-2 h-16">
                <Clock className="h-5 w-5" />
                <span>Urgent Reviews ({stats?.pendingLoans})</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <FileText className="h-5 w-5" />
                <span>Document Verification</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <CheckCircle className="h-5 w-5" />
                <span>Quality Checks</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Loans for Review */}
        <LoanTable
          loans={pendingLoans}
          title="Loans Pending Review"
          showActions={true}
          onLoanAction={handleLoanAction}
        />
      </div>
    </DashboardLayout>
  );
};

export default GRTDashboard;
