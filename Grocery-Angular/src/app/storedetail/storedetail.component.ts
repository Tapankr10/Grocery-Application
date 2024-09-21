import { Component, OnInit } from '@angular/core';
import { GroceryStoreService } from '../services/grocerystore.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../Models/Store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storedetail',
  standalone: true,
  imports: [],
  templateUrl: './storedetail.component.html',
  styleUrl: './storedetail.component.css'
})
export class StoredetailComponent implements OnInit {
  store: Store | undefined;

  constructor(
    private groceryStoreService: GroceryStoreService,
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.groceryStoreService.getById(id).subscribe(
      (store: Store) => {
        this.store = store;
      },
      (error) => {
        console.error('Error loading store details', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/store']);
  }
}