import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../Models/Order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-orderdetail',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './orderdetail.component.html',
  styleUrl: './orderdetail.component.css'
})
export class OrderdetailComponent implements OnInit {
  order: Order = {
    orderId: 0,
    customerId: 0,
    orderDate: new Date(),
    status: 'Pending',
    customer: undefined,
    deliveryStaff: undefined,
    orderItems: []
  };

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.orderService.getOrderById(id).subscribe(
        (response: Order) => {
          this.order = response;
        },
        (error) => {
          console.error('Error fetching order details', error);
        }
      );
    });
  }
}