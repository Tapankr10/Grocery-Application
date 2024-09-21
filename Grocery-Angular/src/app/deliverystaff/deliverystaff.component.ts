import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer, Order } from '../../Models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CustomerServiceService } from '../customer.service.service';

@Component({
  selector: 'app-deliverystaff',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './deliverystaff.component.html',
  styleUrl: './deliverystaff.component.css'
})
export class DeliverystaffComponent implements OnInit {
  // order: Order = {
  //   orderId: 0,
  //   customerId: 0,
  //   orderDate: new Date(),
  //   status: 'Pending',
  //   deliveryStaff: undefined,
  //   // customer: { address: '' }, // Assuming order has a customer with an address field
  //   orderItems: [] // Ensure this matches your model
  // };

  // confirmationCode: number | null = null;
  // isValidCode = true;
  // confirmationCodeTouched = false;

  // constructor(
  //   private route: ActivatedRoute,
  //   private orderService: OrderService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   this.loadOrder();
  // }

  // // Load the order based on route parameter
  // loadOrder(): void {
  //   const id = +this.route.snapshot.paramMap.get('id')!;
  //   this.orderService.getOrderById(id).subscribe(
  //     (order: Order) => {
  //       this.order = order;
  //     },
  //     (error) => {
  //       console.error('Error loading order', error);
  //     }
  //   );
  // }

  // // Handle status change, show confirmation code input if status is "Completed"
  // onStatusChange(event: any): void {
  //   if (this.order.status === 'Completed') {
  //     this.confirmationCodeTouched = false;
  //     this.confirmationCode = null; // Reset confirmation code
  //   }
  // }

  // // Validate the confirmation code
  // validateConfirmationCode(): void {
  //   this.confirmationCodeTouched = true;
  //   this.isValidCode =
  //     this.confirmationCode !== null &&
  //     this.confirmationCode.toString().length === 4 &&
  //     this.confirmationCode % 3 === 0;
  // }

  // // Check if the form is valid to submit
  // isCompletedInvalid(): boolean {
  //   return (
  //     this.order.status === 'Completed' && (!this.confirmationCodeTouched || !this.isValidCode)
  //   );
  // }

  // // Update order status
  // updateOrderStatus(): void {
  //   if (this.order.status === 'Completed' && this.isValidCode) {
      
  //     const id = this.order.orderId;
  //     this.orderService.updateOrder(id,this.order).subscribe(
  //       (updatedOrder: Order) => {
  //         console.log('Order status updated successfully', updatedOrder);
  //         this.router.navigate(['/orders']); // Navigate to the order list
  //       },
  //       (error) => {
  //         console.error('Error updating order status', error);
  //       }
  //     );
  //   } else if (this.order.status === 'Out for Delivery') {
  //     const id = this.order.orderId;
  //     this.orderService.updateOrder(id,this.order).subscribe(
  //       (updatedOrder: Order) => {
  //         console.log('Order status updated successfully', updatedOrder);
  //         this.router.navigate(['/orders']);
  //       },
  //       (error) => {
  //         console.error('Error updating order status', error);
  //       }
  //     );
  //   }
  // }
  
  data: Order[] = [];
confirmationCodes: { [orderId: number]: number | null } = {};
isValidCode: { [orderId: number]: boolean } = {};
confirmationCodeTouched: { [orderId: number]: boolean } = {};
customers: { [id: number]: Customer } = {};

constructor(
  private route: ActivatedRoute,
  private orderService: OrderService,
  private customerService: CustomerServiceService,
  private router: Router
) {}

ngOnInit(): void {
  this.loadOrders();
}

// Load the orders and customer details
loadOrders(): void {
  this.orderService.getOrders().subscribe(
    (orders: Order[]) => {
      this.data = orders;
      const customerIds = orders.map(order => order.customerId).filter(id => id != null);
      this.loadCustomers(customerIds);
    },
    (error) => {
      console.error('Error loading orders', error);
    }
  );
}

// Load customer details for given customer IDs
loadCustomers(customerIds: number[]): void {
  customerIds.forEach(id => {
    this.customerService.getCustomerById(id).subscribe(
      (customer: Customer) => {
        this.customers[customer.customerId] = customer;
      },
      (error) => {
        console.error('Error loading customer', error);
      }
    );
  });
}

// Handle status change
onStatusChange(order: Order): void {
  if (order.status === 'Completed') {
    this.confirmationCodeTouched[order.orderId] = false;
    this.confirmationCodes[order.orderId] = null; // Reset confirmation code for the specific order
  }
  this.validateConfirmationCode(order.orderId);
}

// Validate the confirmation code
validateConfirmationCode(orderId: number): void {
  this.confirmationCodeTouched[orderId] = true;
  const code = this.confirmationCodes[orderId];
  this.isValidCode[orderId] =
    code !== null &&
    code.toString().length === 4 &&
    code % 3 === 0;
}

// Check if the confirmation code is invalid
isCompletedInvalid(orderId: number): boolean {
  return (
    this.confirmationCodes[orderId] !== null &&
    !this.isValidCode[orderId] &&
    this.confirmationCodeTouched[orderId]
  );
}

// Handle the Update button functionality
handleUpdate(order: Order): void {
  if (order.status === 'Completed' && !this.isValidCode[order.orderId]) {
    alert('Please enter a valid 4-digit confirmation code ');
  } else {
    this.orderService.updateOrder(order.orderId, order).subscribe(
      (updatedOrder: Order) => {
        console.log('Order status updated successfully', updatedOrder);
        this.router.navigate(['/Delivery']); // Navigate to the order list
      },
      (error) => {
        console.error('Error updating order status', error);
      }
    );
  }
}
}