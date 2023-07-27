import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenApiModel } from '../models/token-api.model';
import { Mutex } from 'async-mutex';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthserviceService, private router:Router, private toastr:ToastrService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.auth.getToken();
    if(myToken){
      request=request.clone({
        setHeaders:{
          Authorization: `Bearer ${myToken}`
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
          
              this.auth.logout();
              this.router.navigate(['login'])   
          }
        }
     
        return throwError(()=> new Error('Auth error occurred'))
      })
    );
  }

 
}
