import { Component, OnInit } from '@angular/core';
import { Order } from '../../Models/Order';
import { OrderService } from '../services/order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  customerOrders: Order[] = [];
  totalPrice: number = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService, // To get logged-in user details
    private router: Router
  ) {}

  // ngOnInit(): void {
  // //  this.userId = this.authService.getUserId(); // Fetch the logged-in user's ID
  //   if (this.userId) {
  //     this.loadCustomerOrders(this.userId); // Load orders for the customer
  //   }
  // }

  // // Method to load orders for the logged-in customer
  // // loadCustomerOrders(userId: number): void {
  // //  // this.orderService.getCustomerById(userId).subscribe(
  // //     (orders: Order[]) => {
  // //       this.customerOrders = orders; // Store the customer's orders
  // //     },
  // //   //  (error) => {
  // //       console.error('Error loading customer orders', error);
  // //     }
  // //   );
  // }

  // // Navigate to order details view
  // viewDetails(orderId: number): void {
  //   this.router.navigate(['/orderdetail', orderId]);
  // }


  
  
  
  ngOnInit(): void {
    this.loadCustomerOrders(); // Load customer orders on component initialization
  }
  
  // Method to load customer orders and calculate total price
  loadCustomerOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        // Filter to only show orders for customer with ID = 1
        this.customerOrders = orders.filter(order => order.customerId === 1);
        this.calculateTotalPrice(); // Call the method to calculate total prices
      },
      (error) => {
        console.error('Error loading customer orders', error);
      }
    );
  }
  
  // Method to calculate total price for each order
  calculateTotalPrice(): void {
    this.customerOrders.forEach(order => {
      this.orderService.getTotalPrice(order.orderId).subscribe(
        (totalPrice: number) => {
          order.totalPrice = totalPrice; // Set the total price for each order
        },
        (error) => {
          console.error('Error fetching total price', error);
        }
      );
    });
  }
}
