import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customers } from '../../Models/Customers';

import { CustomerServiceService } from '../customer.service.service';
import { Customer } from '../../Models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = []; // Define an array to hold the list of customers

  constructor(private customerService: CustomerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadCustomers(); // Call to load customers when the component is initialized
  }

  // Method to load customers from the service
  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error loading customers:', error);
      }
    );
  }

  // Method to navigate to a specific customer's details
  viewCustomer(customerId: number): void {
    this.router.navigate(['/customer-details', customerId]);
  }
}
//implements OnInit {
//   customers: Customers = {
//     customerId: 0,
//     userId: 0,
//     address: '',
//     phoneNumber:  '',

//   };

//   constructor(private customerService: CustomerServiceService) {}

//   ngOnInit(): void {
//     this.getCustomers(); // Fetch customers on component initialization
//   }

//   // Fetch the customer list from the service
//   getCustomers(): void {
//     this.customerService.getCustomers().subscribe(
//       data => {
//         this.customers = data;
//       },
//       (error) => {
//         console.error('Error fetching customer list', error);
//       }
//     );
//   }
// }