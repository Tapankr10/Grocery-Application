import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../Models/Login';
import { AuthService } from '../../auth.service';
import { User } from '../../../Models/User';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   role: string = 'Customer'; // Default role

  
//   constructor(private router: Router) {}

//   login(): void {
//     // Implement login logic here with API call
//    // console.log(`Email: ${this.email}, Password: ${this.password}, Role: ${this.role}`);
//    this.router.navigate(['/p']);
//   }

//   navigateToRegister(): void {
//     this.router.navigate(['/register']);
//   }
// }
// //   login() {
// //     const loginData = {
// //       email: this.email,
// //       password: this.password,
// //       role: this.role
// //     };

// //     // Call API to verify login credentials
// //     this.http.post('', loginData)
// //       .subscribe({
// //         next: (response: any) => {
// //           // Assuming the API sends back a token with userId, name, email, role
// //           const userId = response.userId;
// //           const name = response.name;
// //           const role = response.role;
          
// //           // Store the token details in localStorage
// //           localStorage.setItem('userId', userId);
// //           localStorage.setItem('name', name);
// //           localStorage.setItem('role', role);
          
// //           // Redirect to the product-list page upon successful login
// //           this.router.navigate(['/products']);
// //         },
// //         error: (error) => {
// //           // Handle login error (e.g., invalid credentials)
// //           console.error('Login failed', error);
// //           alert('Invalid login credentials. Please try again.');
// //         }
// //       });
// //   }

// //   navigateToRegister() {
// //     this.router.navigate(['/register']);
// //   }
// // }

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   template: `<form (ngSubmit)="login()">
//       <label for="username">Username</label>
//       <input type="text" id="username" [(ngModel)]="user.name" name="username" required>
//       <label for="email">Email</label>
//       <input type="email" id="email" [(ngModel)]="user.email" name="email" required>
//       <label for="password">Password</label>
//       <input type="password" id="password" [(ngModel)]="user.password" name="password" required>
//       <label for="role">Role</label>
//       <input type="text" id="role" [(ngModel)]="user.role" name="role" required>
//       <button type="submit">Login</button>
//     </form>
//     `,
//   styleUrl: './login.component.css'
// })
export class LoginComponent {
  user: User = {
    userId:0,
    name: '',
    email:'',
    password: '',
    role:''
  }

  constructor(private authService: AuthService, private router: Router) { }

  // login() {
  //   console.log(this.user.email, this.user.password);
  //   if (this.user.email && this.user.password) {
  //     this.authService.login(this.user).subscribe(
  //       data => {
  //         console.log(data)
  //        const token = data?.token;
  //        console.log(token) // Directly get the token from API response
  //         if (token) {
  //           localStorage.setItem('token', token); // Store the token directly
  //           console.log('Token stored');
  //           console.log(localStorage.getItem('token'));
  //           this.router.navigate(['/store']); // Navigate to the products component
  //         } else {
  //           console.log('No token found in API response.');
  //           alert("Failed to retrieve token.");
  //         }        
  //       },
  //       error => {
  //         console.error('Login error:', error);
  //         alert("Invalid login details or server error");
  //       }
  //     );
  //   } else {
  //     alert("Please enter username and password first");
  //   }
  // }

  

 /* getToken() {
    this.authService.login(this.loginus).subscribe(
      data => {
        const jsonString = localStorage.getItem('jwtUserToken');
        // Check if the JSON string exists
        if (jsonString) {
          // Parse the JSON string to an object
          const parsedObject = JSON.parse(jsonString);

          // Extract the token value from the parsed object
          const token = parsedObject.token;

          // Log the token
          console.log('Token:', token);
          localStorage.setItem('token',token);
          this.router.navigate(['/products']);
        } else {
          console.log('No token found in local storage.');
        }        
      },
      error => {
        console.error('Login error:', error);
        alert("Invalid login details or server error");
      }
    );
  }*/
    onLogin(){
      console.log(this.user.email, this.user.password);
      if (this.user.email && this.user.password) {
        this.authService.login(this.user).subscribe(
          data => {
            console.log(data)
           const token = data?.token;
           console.log(token) // Directly get the token from API response
            if (token) {
              localStorage.setItem('token', token); // Store the token directly
              console.log('Token stored');
              console.log(localStorage.getItem('token'));
              const decodedToken: any = jwtDecode(token);
              console.log(decodedToken);
              if(decodedToken.role === "Admin"){
                this.router.navigate(['/admin']);
              }
             
              else if(decodedToken.role === "Customer"){
                this.router.navigate(['/products']);
              }
              else if(decodedToken.role === "DeliveryPartner"){
                this.router.navigate(['/Delivery']);
              }
               // Navigate to the products component
            } else {
              console.log('No token found in API response.');
              alert("Failed to retrieve token.");
            }        
          },
          error => {
            console.error('Login error:', error);
            alert("Invalid login details or server error");
          }
        );
      } else {
        alert("Please enter username and password first");
      }
    }
  
    navigateToRegister() {
          this.router.navigate(['/register']);
        }
  // register() {
  //   this.router.navigate(['register']);
  // }

}