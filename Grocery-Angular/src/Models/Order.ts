import { User } from "./User";

export interface Order {
    orderId: number;
    customerId: number;
    orderDate: Date;
    status?: string;
    deliveryStaffId?: number;
    totalPrice?: number; // Calculated property
    customer?: Customer; // Navigation property
    deliveryStaff?: DeliveryStaff; // Navigation property
    orderItems?: OrderItem[]; // Navigation property
  }
  
  export interface Customer {
    customerId: number;  
    name?: string;
    userId:number;
    address?: string;
    phoneNumber?:string;
    user:User
  }
  
  export interface DeliveryStaff {
    deliveryStaffId: number;
    name: string;
    phoneNumber:number;
  }
  
  export interface OrderItem {
    orderItemId: number;
    productId: number;
    quantity: number;
    price: number;
  }
  