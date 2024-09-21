import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../Models/Order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.css'
})
export class OrderListComponent implements OnInit {
  data: Order[] = []; // Store the orders

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders(); // Load orders on component initialization
  }

  // Method to load all orders
  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (response: Order[]) => {
        this.data = response; // Store the orders in data array
        this.calculateTotalPrice(); // Call the method to calculate total prices
      },
      (error) => {
        console.error('Error loading orders', error);
      }
    );
  }

  // Method to calculate total price for each order
  calculateTotalPrice(): void {
    this.data.forEach(order => {
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

  // Navigate to the add order form
  addOrder(): void {
    this.router.navigate(['/ordercreate']);
  }

  // Navigate to the order details view
  viewDetails(id: number): void {
    this.router.navigate(['/orderdetail', id]);
  }

  // Navigate to the edit order form
  editOrder(id: number): void {
    this.router.navigate(['/orderedit', id]);
  }

  // Delete an order and reload the list
  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          this.loadOrders(); // Reload the orders after deletion
        },
        (error) => {
          console.error('Error deleting order', error);
        }
      );
    }
  }
}