import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../Models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productedit',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './productedit.component.html',
  styleUrl: './productedit.component.css'
})
export class ProducteditComponent implements OnInit {
  product: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getById(id).subscribe(
        (response: Product) => {
          this.product = response;
        },
        (error) => {
          console.error('Error fetching product', error);
        }
      );
    });
  }

  save(): void {
    this.productService.update(this.product).subscribe(
      () => {
        this.router.navigate(['/producttable']);
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }
}
