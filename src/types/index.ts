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

// Loan Application Form Types
export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  occupation: string;
  monthlyIncome: number;
  panNumber: string;
  aadharNumber: string;
}

export interface AddressDetails {
  currentAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    addressType: 'owned' | 'rented' | 'family';
  };
  permanentAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isSameAsCurrent: boolean;
  };
}

export interface NomineeDetails {
  name: string;
  relationship: string;
  dateOfBirth: string;
  phone?: string;
  address: string;
  sharePercentage: number;
}

export interface DocumentUpload {
  type: 'aadhar' | 'pan' | 'income' | 'bank_statement' | 'property_papers' | 'other';
  file: File | null;
  uploaded: boolean;
  url?: string;
}

export interface LoanApplicationData {
  personalDetails: PersonalDetails;
  addressDetails: AddressDetails;
  nomineeDetails: NomineeDetails;
  documents: DocumentUpload[];
  loanDetails: {
    amount: number;
    purpose: string;
    tenure: number;
    type: 'personal' | 'home' | 'business' | 'education';
  };
}

export interface CustomerData {
  identityData: {
    idNumber1: string;
    idNumber2: string;
  };
  personalData: {
    firstName: string;
    middleName?: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    dateOfBirth: string;
    address: string;
  };
}
