
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AgentDashboard from './dashboards/AgentDashboard';
import GRTDashboard from './dashboards/GRTDashboard';
import BMDashboard from './dashboards/BMDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'agent':
      return <AgentDashboard />;
    case 'grt':
      return <GRTDashboard />;
    case 'bm':
      return <BMDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Role</h1>
            <p className="text-gray-600">Please contact administrator for access.</p>
          </div>
        </div>
      );
  }
};

export default DashboardRouter;
