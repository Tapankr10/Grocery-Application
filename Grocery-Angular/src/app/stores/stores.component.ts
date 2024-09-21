import { Component, OnInit } from '@angular/core';
import { GroceryStoreService } from '../services/grocerystore.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '../../Models/Store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css'
})
export class StoresComponent implements OnInit {
  // data :any;
  // constructor(private grocerystoreservice:GroceryStoreService,private router: Router){

  // }
  // ngOnInit():void{
  //   this.grocerystoreservice.get().subscribe(
  //     (response) =>{
  //       this.data=response;
  //     }
  //   );
  // }
  data: Store[] = []; // Type the data property as an array of Store

  constructor(
    private groceryStoreService: GroceryStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.groceryStoreService.get().subscribe(
      (response: Store[]) => {
        this.data = response;
      },
      (error) => {
        console.error('Error loading stores', error);
      }
    );
  }
  viewDetails(storeId: number): void {
    this.router.navigate(['/store-details', storeId]);
  }

  editStore(storeId: number): void {
    this.router.navigate(['/edit-store', storeId]);
  }

  deleteStore(storeId: number): void {
    if (confirm('Are you sure you want to delete this store?')) {
      this.groceryStoreService.delete(storeId).subscribe(
        () => {
          this.loadStores();
        },
        (error) => {
          console.error('Error deleting store', error);
        }
      );
    }
  }

  addStore(): void {
    this.router.navigate(['/create-store']);
  }
}
