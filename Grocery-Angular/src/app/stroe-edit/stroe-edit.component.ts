import { Component, OnInit } from '@angular/core';
import { Store } from '../../Models/Store';
import { GroceryStoreService } from '../services/grocerystore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stroe-edit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './stroe-edit.component.html',
  styleUrl: './stroe-edit.component.css'
})
export class StroeEditComponent implements OnInit {
  store: Store = {
    storeId: 0, name: '', location: '',
    contactNumber: ''
  };

  constructor(
    private groceryStoreService: GroceryStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.groceryStoreService.getById(id).subscribe(
      (store: Store) => {
        this.store = store;
      },
      (error) => {
        console.error('Error loading store', error);
      }
    );
  }

  save(): void {
    this.groceryStoreService.update(this.store).subscribe(
      () => {
        this.router.navigate(['/store']);
      },
      (error) => {
        console.error('Error updating store', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/store']);
  }
}
