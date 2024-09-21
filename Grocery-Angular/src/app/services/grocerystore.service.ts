import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../../Models/Store';

@Injectable({
  providedIn: 'root'
})
export class GroceryStoreService {

  private apiurl="https://localhost:7284/api/GroceryStore"
  constructor(private http:HttpClient) { }


 
  get(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiurl);
  }
  getById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiurl}/${id}`);
  }

  create(store: Store): Observable<Store> {
    return this.http.post<Store>(this.apiurl, store);
  }

  update(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.apiurl}/${store.storeId}`, store);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }
}
