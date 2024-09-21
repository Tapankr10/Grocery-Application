import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Assume you store the token in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Clone the request and add the authorization header
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    } else {
      // If no token, proceed with the request as is
      return next.handle(req);
    }
  }
}
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let authReq = req;

//     // Check if running in the browser
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token'); // Access localStorage only in browser
//       if (token) {
//         authReq = req.clone({
//           headers: req.headers.set('Authorization', `Bearer ${token}`),
//         });
//       }
//     }

//     // Forward the request to the next handler
//     return next.handle(authReq);
//   }
// }
