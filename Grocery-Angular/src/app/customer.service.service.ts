import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../Models/Order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private apiUrl = 'https://localhost:7284/api/Customers'; // Your backend API URL

  constructor(private http: HttpClient) { }

  // Method to get the list of customers from the backend
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Method to get a specific customer by ID
  getCustomerById(customerId: number): Observable<Customer> {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.get<Customer>(url);
  }
}
