import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderItemService } from '../services/order-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItem } from '../../Models/orderitem';
import { OrderItemPayload } from '../../Models/OrderItemPayload';

@Component({
  selector: 'app-orderitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderitem.component.html',
  styleUrl: './orderitem.component.css'
})
export class OrderitemComponent implements OnInit {
  orderItems: OrderItem[] = [];
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute, private OrderItemService: OrderItemService) {}

  ngOnInit(): void {
    // Retrieve orderItems from query params
    this.route.queryParams.subscribe(params => {
      const orderItemsString = params['orderItems'];

      // Parse the query string into order items array
      if (orderItemsString) {
        const orderItemsArray = orderItemsString.split('&');
        this.orderItems = this.parseOrderItems(orderItemsArray);
        this.calculateTotalPrice();
      }
    });
  }

  // Function to parse query string into order item objects
  parseOrderItems(orderItemsArray: string[]): OrderItem[] {
    const parsedOrderItems: OrderItem[] = [];

    for (let i = 0; i < orderItemsArray.length; i += 5) {
      const orderId = parseInt(orderItemsArray[i].split('=')[1], 10);
      const productId = parseInt(orderItemsArray[i + 1].split('=')[1], 10);
      const productName = decodeURIComponent(orderItemsArray[i + 2].split('=')[1]);
      const quantity = parseInt(orderItemsArray[i + 3].split('=')[1], 10);
      const price = parseFloat(orderItemsArray[i + 4].split('=')[1]);

      parsedOrderItems.push({ orderId, productId, productName, quantity, price } as OrderItem);
    }

    return parsedOrderItems;
  }

  calculateTotalPrice() {
    this.totalPrice = this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  increaseQuantity(index: number) {
    this.orderItems[index].quantity++;
    this.calculateTotalPrice();
  }

  // Method to decrease the quantity, ensuring it doesn't go below 1
  decreaseQuantity(index: number) {
    if (this.orderItems[index].quantity > 1) {
      this.orderItems[index].quantity--;
      this.calculateTotalPrice();
    }
  }

  submitOrderItem() {
    if (this.orderItems.length === 0) {
      alert('No items to submit.');
      return;
    }

    const orderItemsToSubmit: OrderItemPayload = new OrderItemPayload();
    orderItemsToSubmit.customerId = 1;//TODO
    orderItemsToSubmit.productList = this.orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));

    
    this.OrderItemService.addOrderItem(orderItemsToSubmit).subscribe(
      response => {
        alert('Order placed!!');
        // Handle success (e.g., show a message or navigate to another page)
      },
      error => {
        console.error('Error adding order item:', error);
        // Handle error (e.g., show an error message)
      }
    );
   
  }
}
