import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  {

  constructor(private router: Router) {}

  goToStoreList(): void {
    this.router.navigate(['/store']);
  }

  goToProductList(): void {
    this.router.navigate(['/producttable']);
  }
  goToOrderList(): void {
    this.router.navigate(['/order']);
  }
  goToDeliveryList(): void {
    this.router.navigate(['/Delivery']);
  }
  goToCustomerList(): void {
    this.router.navigate(['/customerlist']);
  }
}