export interface Customers {
    customerId: number;
    userId: number;
    address?: string;
    phoneNumber?: string;
    user?: any; // Optionally include User navigation properties if needed
  orders?: any[]; //
  }
  