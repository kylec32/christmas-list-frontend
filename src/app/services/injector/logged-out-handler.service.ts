import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogOutWithUnauthroized implements HttpInterceptor {
    constructor(private router: Router,
                private authenticationServicer: AuthenticationService){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {},
                (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403 || err.status === 401) {
                        this.authenticationServicer.logout();
                        this.router.navigate(['/']);
                    }
                }
          }));
          
    }
}