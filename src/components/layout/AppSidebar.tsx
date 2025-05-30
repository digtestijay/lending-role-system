
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '../ui/sidebar';
import { 
  Home, 
  FileText, 
  Users, 
  CreditCard, 
  Settings, 
  Plus,
  BarChart3,
  Shield,
  Database
} from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const getMenuItems = () => {
    const baseItems = [
      { title: 'Dashboard', url: '/', icon: Home },
    ];

    switch (user?.role) {
      case 'agent':
        return [
          ...baseItems,
          { title: 'New Application', url: '/loan-application', icon: Plus },
          { title: 'Loan List', url: '/agent/loans', icon: FileText },
          { title: 'Customers', url: '/agent/customers', icon: Users },
          { title: 'Collections', url: '/agent/collections', icon: CreditCard },
        ];
      
      case 'grt':
        return [
          ...baseItems,
          { title: 'Loan Reviews', url: '/grt/loans', icon: FileText },
          { title: 'Collections', url: '/grt/collections', icon: CreditCard },
          { title: 'Customers', url: '/grt/customers', icon: Users },
          { title: 'Reports', url: '/grt/reports', icon: BarChart3 },
        ];
      
      case 'bm':
        return [
          ...baseItems,
          { title: 'Performance', url: '/bm/performance', icon: BarChart3 },
          { title: 'Loan Portfolio', url: '/bm/loans', icon: FileText },
          { title: 'Collections', url: '/bm/collections', icon: CreditCard },
          { title: 'Customer Base', url: '/bm/customers', icon: Users },
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { title: 'User Management', url: '/admin/users', icon: Shield },
          { title: 'System Loans', url: '/admin/loans', icon: FileText },
          { title: 'Analytics', url: '/admin/analytics', icon: Database },
          { title: 'Settings', url: '/admin/settings', icon: Settings },
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-3 sm:p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">LMS</span>
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-base sm:text-lg truncate block">
              {isMobile ? 'LMS' : 'Loan Management'}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="capitalize text-xs sm:text-sm">
            {user?.role} Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link to={item.url} className="flex items-center space-x-3 w-full">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 sm:p-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          {user?.role} user
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
