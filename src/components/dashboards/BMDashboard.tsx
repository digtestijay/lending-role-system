
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import StatsCard from '../common/StatsCard';
import LoanTable from '../common/LoanTable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Users, Target, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { Loan, DashboardStats } from '../../types';

const BMDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [teamLoans, setTeamLoans] = useState<Loan[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalLoans: 156,
      pendingLoans: 23,
      approvedLoans: 120,
      rejectedLoans: 13,
      totalAmount: 45600000,
      monthlyTarget: 50000000,
      achievement: 91.2,
    });

    setTeamLoans([
      {
        id: 'LN005',
        applicantName: 'Rohit Verma',
        amount: 1200000,
        type: 'home',
        status: 'approved',
        applicationDate: '2024-01-12',
        agentId: '1',
        agentName: 'John Agent',
      },
      {
        id: 'LN006',
        applicantName: 'Kavya Reddy',
        amount: 850000,
        type: 'business',
        status: 'disbursed',
        applicationDate: '2024-01-11',
        agentId: '2',
        agentName: 'Sarah Agent',
      },
    ]);
  }, []);

  const teamPerformance = [
    { agent: 'John Agent', loans: 15, amount: 2500000, achievement: 83 },
    { agent: 'Sarah Agent', loans: 12, amount: 2100000, achievement: 70 },
    { agent: 'Mike Agent', loans: 18, amount: 3200000, achievement: 107 },
  ];

  return (
    <DashboardLayout title="Branch Manager Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Branch Performance Overview</h2>
          <p className="text-purple-100">Monitor team performance and branch metrics.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Monthly Target"
            value={`${stats?.achievement || 0}%`}
            icon={Target}
            description="Target achievement"
            trend={{ value: 15.2, isPositive: true }}
          />
          <StatsCard
            title="Total Portfolio"
            value={`₹${((stats?.totalAmount || 0) / 10000000).toFixed(1)}Cr`}
            icon={DollarSign}
            description="Branch portfolio"
            trend={{ value: 8.1, isPositive: true }}
          />
          <StatsCard
            title="Active Loans"
            value={stats?.approvedLoans || 0}
            icon={TrendingUp}
            description="Currently active"
          />
          <StatsCard
            title="Team Size"
            value="8"
            icon={Users}
            description="Active agents"
          />
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Team Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{member.agent}</p>
                      <p className="text-sm text-gray-600">{member.loans} loans</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(member.amount / 100000).toFixed(1)}L</p>
                      <p className={`text-sm ${member.achievement >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                        {member.achievement}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Loan Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Home Loans</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Personal Loans</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">20%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Business Loans</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent High Value Loans */}
        <LoanTable
          loans={teamLoans}
          title="Recent High Value Loans"
        />
      </div>
    </DashboardLayout>
  );
};

export default BMDashboard;
