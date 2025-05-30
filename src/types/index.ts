
export type UserRole = 'agent' | 'grt' | 'bm' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Loan {
  id: string;
  applicantName: string;
  amount: number;
  type: 'personal' | 'home' | 'business' | 'education';
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'closed';
  applicationDate: string;
  agentId: string;
  agentName: string;
  interestRate?: number;
  tenure?: number;
  documents?: string[];
  remarks?: string;
}

export interface DashboardStats {
  totalLoans: number;
  pendingLoans: number;
  approvedLoans: number;
  rejectedLoans: number;
  totalAmount: number;
  monthlyTarget?: number;
  achievement?: number;
}
