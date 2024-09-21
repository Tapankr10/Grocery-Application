import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isAdmin :boolean =false;
  isLogIn: boolean = false;
  constructor(private router: Router,private authservice : AuthService) { }

   
  
  ngOnInit(): void {
    this.updateAdminStatus();
  }

  private updateAdminStatus(): void {
    this.isAdmin = this.authservice.isAdmin();
    this.isLogIn = this.authservice.isAuthenticated();
  }
 
  isLoggedIn(): boolean {
    // Implement your authentication check logic here
    return !!localStorage.getItem('token');  // Example logic
  }
  
 
  
  logout(): void {
    // Perform logout operation
    localStorage.removeItem('token');  // Remove token or user info
    this.router.navigate(['/login']);  // Navigate to login page after logout
  }
}

