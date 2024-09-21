import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements  OnInit {
  data: Product[] = [];

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.get().subscribe(
      (response: Product[]) => {
        this.data = response;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  addProduct(): void {
    this.router.navigate(['/products-create']); // Navigate to add product form'products-create', component: ProductaddComponent },

  }

  viewDetails(id: number): void {
    this.router.navigate(['/products-id', id]); // Navigate to product details view
  }

  editProduct(id: number): void {
    this.router.navigate(['/products-edit', id]); // Navigate to edit product form
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(
        () => {
          this.loadProducts(); // Reload the product list
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }
}