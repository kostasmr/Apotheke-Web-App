import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


@Injectable()
 export class AuthInterceptor implements HttpInterceptor {

   constructor(private userService: UserService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.userService.currentUser;

    const authToken = "Bearer " + user.token;
    const authReq = request.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq);
   }
 }