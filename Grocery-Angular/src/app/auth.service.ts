// import { HttpClient } from '@angular/common/http';
// import { token } from '../Models/Token';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { User } from '../Models/User';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = "https://localhost:7284/api/Token"; // Ensure this is the correct API URL
//   private tokenKey = 'jwtToken'; // Use the correct key for localStorage
//   private userRoleSubject = new BehaviorSubject<string>('');
//   userRole$ = this.userRoleSubject.asObservable();

//   constructor(private http: HttpClient, private router: Router) 
//   { 
//     this.setUserRoleFromToken();
//   }

//   login(login:User): Observable<token> {
//     console.log("welcome");
//     return this.http.post<token>(this.apiUrl, login).pipe(
//       tap(response => {
//         localStorage.setItem('token', response.token); // Store the token in localStorage
//         this.setUserRoleFromToken(); // Update user role
//         this.router.navigate(['/']); // Navigate to home or dashboard
//       })
//     );
    
//   }
//   setUserRoleFromToken(): void {
//     const token = this.getToken();
//     if (token) {
//       try {
//         const decodedToken: any = jwtDecode(token);
//         this.userRoleSubject.next(decodedToken.role || '');
//       } catch (e) {
//         console.error('Error decoding token:', e);
//         this.userRoleSubject.next('');
//       }
//     } else {
//       this.userRoleSubject.next('');
//     }
//   }
  
//   getToken(): string | null {
//     return localStorage.getItem('token');
    
//   }

//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token;
//   }

//   hasRole(requiredRole: string): boolean {
//     const token = this.getToken();
//     if (!token) return false;
//     try {
//       const decodedToken: any = jwtDecode(token);
//       return decodedToken.role === requiredRole;
//     } catch (e) {
//       console.error('Error decoding token:', e);
//       return false;
//     }
//   }
//   getUserRole(): string {
//     return this.userRoleSubject.value;
//   }

//   isAdmin(): boolean {
//     return this.getUserRole() === 'Admin';
//   }
//   logout() {
//     localStorage.removeItem(this.tokenKey);
//     this.router.navigate(['/login']);
//   }
// }
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { User } from '../Models/User';
import { token } from '../Models/Token';
import { isPlatformBrowser } from '@angular/common';  // Import isPlatformBrowser

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //   }
  //   login(login:User): Observable<token> {
  //     console.log("welcome");
  //     return this.http.post<token>(this.apiUrl, login).pipe(
  //       tap(response => {
  //         localStorage.setItem('token', response.token); // Store the token in localStorage
  //         this.setUserRoleFromToken(); // Update user role
  //         this.router.navigate(['/']); // Navigate to home or dashboard
  //       })
  //     );
  //   }
  //   setUserRoleFromToken(): void {
  //     const token = this.getToken();
  //     if (token) {
  //       try {
  //         const decodedToken: any = jwtDecode(token);
  //         this.userRoleSubject.next(decodedToken.role || '');
  //       } catch (e) {
  //         console.error('Error decoding token:', e);
  //         this.userRoleSubject.next('');
  //       }
  //     } else {
  //       this.userRoleSubject.next('');
  //     }
  //   }
  //   getToken(): string | null {
  //     return localStorage.getItem('token');
  //   }
  //   isAuthenticated(): boolean {
  //     const token = localStorage.getItem('token');
  //     return !!token;
  //   }
  //   hasRole(requiredRole: string): boolean {
  //     const token = this.getToken();
  //     if (!token) return false;
  //     try {
  //       const decodedToken: any = jwtDecode(token);
  //       return decodedToken.role === requiredRole;
  //     } catch (e) {
  //       console.error('Error decoding token:', e);
  //       return false;
  //     }
  //   }
  //   getUserRole(): string {
  //     return this.userRoleSubject.value;
  //   }
  //   isAdmin(): boolean {
  //     return this.getUserRole() === 'Admin';
  //   }
  //   logout() {
  //     localStorage.removeItem(this.tokenKey);
  //     this.router.navigate(['/login']);
  //   }
  // }
  isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }
  private apiUrl = "https://localhost:7284/api/Token"; // Ensure this is the correct API URL
  private tokenKey = 'jwtToken'; // Use the correct key for localStorage
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check for browser
  ) {
    if (this.isBrowser()) {
      this.setUserRoleFromToken();
    }
  }

  // Check if the platform is a browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(login: User): Observable<token> {
    return this.http.post<token>(this.apiUrl, login).pipe(
      tap(response => {
        if (this.isBrowser()) {
          localStorage.setItem('token', response.token); // Store the token in localStorage
          this.setUserRoleFromToken(); // Update user role
        }
        this.router.navigate(['/']); // Navigate to home or dashboard
      })
    );
  }

  setUserRoleFromToken(): void {
    if (!this.isBrowser()) return;

    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userRoleSubject.next(decodedToken.role || '');
      } catch (e) {
        console.error('Error decoding token:', e);
        this.userRoleSubject.next('');
      }
    } else {
      this.userRoleSubject.next('');
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  hasRole(requiredRole: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role === requiredRole;
    } catch (e) {
      console.error('Error decoding token:', e);
      return false;
    }
  }

  getUserRole(): string {
    return this.userRoleSubject.value;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }
}
