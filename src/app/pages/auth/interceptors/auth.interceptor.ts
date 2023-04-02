import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService,
    private router:Router
              ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    if(token){
      request =  request.clone({headers: request.headers.set("Authorization", `Bearer ${token}`)});
    }

    return next.handle(request).pipe(
      map(
        (event:HttpEvent<any>) =>{
          if(event instanceof HttpResponse){
            if(event.status== 0 || event.status == 401){          
            this.router.navigate(['auth']);
            }
          }
          return event;
        }

      )
    );

  }
}
