import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../../Models/orderitem';
import { Observable } from 'rxjs/internal/Observable';
import { OrderItemPayload } from '../../Models/OrderItemPayload';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {


    private apiUrl = 'https://localhost:7284/api/Orders'; // Replace with your API URL
  
    constructor(private http: HttpClient) {}
  
    // Add a single order item
    addOrderItem(orderItem: OrderItemPayload): Observable<any> {
      return this.http.post<any>(this.apiUrl, orderItem);
    }
  }
