import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/Product';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { OrderItemService } from '../../services/order-item.service';
import { OrderItem } from '../../../Models/orderitem';
import { Router, RouterModule } from '@angular/router';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

  export class CartComponent implements OnInit {
    cartItems!: Product[];
    //cartItem: any[] = [];
  //   cartItem: { product: Product; quantity: number }[] = [];
  //router: any;
  
    constructor(private cartService: CartService,private orderitemservice: OrderItemService ,private router : Router) { }
  
    ngOnInit() {
      this.cartItems = this.cartService.getCartItems();
    }
  
    removeFromCart(index: number) {
      this.cartService.removeFromCart(index);
      this.cartItems = this.cartService.getCartItems();
    }
  
    clearCart() {
      this.cartService.clearCart();
      this.cartItems = [];
    }
    // submitOrderItems() {
    //   const orderItems = this.cartItem.map(item => ({
    //     orderId: Math.floor(100 + Math.random() * 900),
    //     productId: item.product.id,
    //     quantity: item.quantity
    //   }));
  
    //   this.router.navigate(['/orderitem'], { state: { orderItems } });
    // }
    submitOrder() {
      if (this.cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
      }
    
      const orderItems = this.cartItems.map(item => ({
        orderId: 3, // Set orderId as needed
        productId: item.productId,  // Ensure productId is correctly passed
        productName: item.name, // Include product name
        quantity: 1, // Set default quantity
        price: item.price
      }));
    
      // Convert the orderItems array to a query string format
      const orderItemsString = orderItems.map(orderItem =>
        `orderId=${orderItem.orderId}&productId=${orderItem.productId}&productName=${encodeURIComponent(orderItem.productName)}&quantity=${orderItem.quantity}&price=${orderItem.price}`
      ).join('&');
    
      // Navigate to OrderItemComponent with queryParams
      this.router.navigate(['/orderitem'], { queryParams: { orderItems: orderItemsString } });
    }
    
    
}
