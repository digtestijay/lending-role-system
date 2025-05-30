
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import StatsCard from '../common/StatsCard';
import LoanTable from '../common/LoanTable';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Target, TrendingUp, Users, FileText } from 'lucide-react';
import { Loan, DashboardStats } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLoans, setRecentLoans] = useState<Loan[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalLoans: 15,
      pendingLoans: 3,
      approvedLoans: 10,
      rejectedLoans: 2,
      totalAmount: 2500000,
      monthlyTarget: 5000000,
      achievement: 50,
    });

    setRecentLoans([
      {
        id: 'LN001',
        applicantName: 'Rajesh Kumar',
        amount: 500000,
        type: 'home',
        status: 'pending',
        applicationDate: '2024-01-15',
        agentId: user?.id || '1',
        agentName: user?.name || 'Agent',
      },
      {
        id: 'LN002',
        applicantName: 'Priya Sharma',
        amount: 200000,
        type: 'personal',
        status: 'approved',
        applicationDate: '2024-01-10',
        agentId: user?.id || '1',
        agentName: user?.name || 'Agent',
      },
    ]);
  }, [user]);

  return (
    <DashboardLayout title="Agent Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-blue-100">Manage your loan applications and track your performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Loans"
            value={stats?.totalLoans || 0}
            icon={FileText}
            description="All time applications"
          />
          <StatsCard
            title="Pending Loans"
            value={stats?.pendingLoans || 0}
            icon={Users}
            description="Awaiting approval"
          />
          <StatsCard
            title="Monthly Target"
            value={`${stats?.achievement || 0}%`}
            icon={Target}
            description="Target achievement"
          />
          <StatsCard
            title="Total Amount"
            value={`₹${(stats?.totalAmount || 0).toLocaleString()}`}
            icon={TrendingUp}
            description="Total loan amount"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="flex items-center justify-center space-x-2 h-16">
                <Plus className="h-5 w-5" />
                <span>New Loan Application</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <FileText className="h-5 w-5" />
                <span>View All Applications</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <Target className="h-5 w-5" />
                <span>Performance Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Loans */}
        <LoanTable
          loans={recentLoans}
          title="Recent Loan Applications"
        />
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
