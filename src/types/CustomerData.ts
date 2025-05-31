
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
