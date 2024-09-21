import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "https://localhost:7284/api/Products"; // Replace with your API URL

  constructor(private http: HttpClient) { }

 get():Observable<any>
  {
    return this.http.get(this.apiUrl)
  }
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Create new product
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update existing product
  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.productId}`, product);
  }

  // Delete product
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Additional methods can be added for filtering products
  // getFilteredProducts(filterParams: any): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}?filter=${filterParams}`);
  // }
  
}
