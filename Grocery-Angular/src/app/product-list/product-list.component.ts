import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartComponent } from "../components/cart/cart.component";
import { CartService } from '../services/cart.service'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  // data :any
  
  // constructor(private productService: ProductService,private cart : CartService,private router: Router) { }

  // ngOnInit():void {
  //   this.productService.get().subscribe((response)=> {
  //     this.data = response
  //   });
    
    
  // }
  // addToCart(product: Product) {
  //   this.cart.addToCart(product);
  // }
  data: Product[] = []; // All products fetched from service
  filteredProducts: Product[] = []; // Filtered products for display

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts(); // Fetch products on component load
  }

  // Method to load products from service
  loadProducts(): void {
    this.productService.get().subscribe((response: Product[]) => {
      this.data = response;
      this.filteredProducts = response; // Initialize with all products
    });
  }

  // Filter products by description
  filterByDescription(description: string): void {
    if (description === 'all') {
      this.filteredProducts = this.data; // Reset to all products
    } else {
      this.filteredProducts = this.data.filter(product =>
        product.description.toLowerCase().includes(description.toLowerCase())
      );
    }
  }
  scrollToCart(): void {
    const cartSection = document.getElementById('cart-section');
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Method to add product to the cart
  addToCart(product: Product): void {
    this.cart.addToCart(product);
  }
  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

}