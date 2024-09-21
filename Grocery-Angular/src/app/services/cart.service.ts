import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }
  clearCart() {
    this.cartItems = [];
  }
}