import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../../Models/Order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ordercreate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ordercreate.component.html',
  styleUrl: './ordercreate.component.css'
})
export class OrdercreateComponent {

  order: Order = {
    orderId: 0,
    customerId: 0,
    orderDate: new Date(),
    status: 'Pending',

  };

  constructor(private orderService: OrderService, private router: Router) { }

  // Create a new order (CREATE)
  createOrder(): void {
    this.orderService.createOrder(this.order).subscribe(
      () => {
        this.router.navigate(['/orders']); // Redirect to order list after creating
      },
      (error) => {
        console.error('Error creating order', error);
      }
    );
  }
}
