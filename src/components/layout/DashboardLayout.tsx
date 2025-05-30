
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOut, User, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import AppSidebar from './AppSidebar';
import { useIsMobile } from '../../hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile-optimized Header */}
          <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                <SidebarTrigger className="flex-shrink-0">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {isMobile && title.length > 15 ? `${title.substring(0, 15)}...` : title}
                </h1>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                {!isMobile && (
                  <span className="text-sm text-gray-600 capitalize hidden md:block">
                    {user?.role} Dashboard
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          {/* Mobile-optimized Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-3 sm:p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
