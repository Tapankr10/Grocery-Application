import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7284/api/Users'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
