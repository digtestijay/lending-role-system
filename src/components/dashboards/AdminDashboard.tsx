
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import StatsCard from '../common/StatsCard';
import LoanTable from '../common/LoanTable';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Settings, Users, Database, Shield, Activity, AlertTriangle } from 'lucide-react';
import { Loan, DashboardStats } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [systemAlerts, setSystemAlerts] = useState<string[]>([]);
  const [recentLoans, setRecentLoans] = useState<Loan[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalLoans: 1247,
      pendingLoans: 89,
      approvedLoans: 1050,
      rejectedLoans: 108,
      totalAmount: 456700000,
    });

    setSystemAlerts([
      'High volume of applications today',
      'Server performance optimal',
      'Database backup completed',
    ]);

    setRecentLoans([
      {
        id: 'LN007',
        applicantName: 'Deepak Joshi',
        amount: 2500000,
        type: 'business',
        status: 'approved',
        applicationDate: '2024-01-15',
        agentId: '3',
        agentName: 'Mike Agent',
      },
    ]);
  }, []);

  const systemMetrics = [
    { label: 'Total Users', value: '45', icon: Users },
    { label: 'Active Sessions', value: '23', icon: Activity },
    { label: 'Database Size', value: '2.4GB', icon: Database },
    { label: 'Uptime', value: '99.9%', icon: Shield },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">System Administration</h2>
          <p className="text-red-100">Monitor system health and manage platform operations.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Loans"
            value={stats?.totalLoans || 0}
            icon={Database}
            description="System wide"
          />
          <StatsCard
            title="Active Users"
            value="45"
            icon={Users}
            description="Currently online"
          />
          <StatsCard
            title="System Health"
            value="99.9%"
            icon={Activity}
            description="Uptime percentage"
          />
          <StatsCard
            title="Total Value"
            value={`₹${((stats?.totalAmount || 0) / 10000000).toFixed(1)}Cr`}
            icon={Shield}
            description="Platform portfolio"
          />
        </div>

        {/* System Metrics and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>System Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <metric.icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">{metric.label}</span>
                    </div>
                    <span className="font-semibold text-blue-600">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">{alert}</p>
                    <p className="text-xs text-yellow-600 mt-1">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <Settings className="h-5 w-5" />
                <span>System Settings</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <Database className="h-5 w-5" />
                <span>Database Backup</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
                <Shield className="h-5 w-5" />
                <span>Security Audit</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent System Activity */}
        <LoanTable
          loans={recentLoans}
          title="Recent System Activity"
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
