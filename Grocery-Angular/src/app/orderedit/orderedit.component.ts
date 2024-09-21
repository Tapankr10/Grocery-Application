import { Component, OnInit } from '@angular/core';
import { Order } from '../../Models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orderedit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orderedit.component.html',
  styleUrl: './orderedit.component.css'
})
export class OrdereditComponent implements OnInit {
  // order: Order = {
  //   orderId: 0,
  //   customerId: 0,
  //   orderDate: new Date(),
  //   status: 'Pending',
  //  // Allow null value



  // };

  // constructor(
  //   private route: ActivatedRoute,
  //   private orderService: OrderService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   this.loadOrder(); // Load order data on component initialization
  // }

  // // Load order data based on route parameter
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

  // // Method to update the order
  // updateOrder(): void {
  //   const id = this.order.orderId;
  //   this.orderService.updateOrder(id, this.order).subscribe(
  //     (updatedOrder: Order) => {
  //       // Handle successful update, e.g., navigate back to the order list
  //       this.router.navigate(['/order']);
  //     },
  //     (error) => {
  //       console.error('Error updating order', error);
  //     }
  //   );
  // }
  order: Order = {
    orderId: 0,
    customerId: 0,
    orderDate: new Date(), // Format to YYYY-MM-DD
    status: 'Pending',
    deliveryStaff: undefined // Allow null value
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrder(); // Load order data on component initialization
  }

  // Load order data based on route parameter
  loadOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(id).subscribe(
      (order: Order) => {
        this.order = order;
      },
      (error) => {
        console.error('Error loading order', error);
      }
    );
  }

  // Method to update the order
  updateOrder(): void {
    const cid = +this.route.snapshot.paramMap.get('id')!;
    this.order.customerId = cid;
    const id = this.order.orderId;
    this.orderService.updateOrder(id,this.order).subscribe(
      (updatedOrder: Order) => {
        // Handle successful update, e.g., navigate back to the order list
        alert("Updated succesfully")
        this.router.navigate(['/order']);
      },
      (error) => {
        console.error('Error updating order', error);
      }
    );
  }
}