import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs/Rx';
import { LOGOUT } from '../reducers/authentication.reducer';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService extends BaseHttpService {

  private helper:JwtHelperService = new JwtHelperService();

  constructor(private httpClient:HttpClient,
              private store:Store<any>) {
                super();
                store.select('token').subscribe((token) => {
                  if(token != undefined) {
                    localStorage.setItem('token', token);
                  }
                });
               }


  login(emailAddress: String, password: String):Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/sign-in`,
                                  {
                                    "emailAddress": emailAddress,
                                    "password": password
                                  });
  }

  isLoggedIn():boolean {
    return localStorage.getItem('token') != undefined
            && localStorage.getItem('token').length > 0
            && !this.helper.isTokenExpired(localStorage.getItem('token'));
  }

  signUp(firstName:String, lastName:String, emailAddress:String, password:String, captcha: string): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/sign-up`,
                                  {
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "emailAddress": emailAddress,
                                    "username": emailAddress,
                                    "password": password,
                                    "captcha": captcha
                                  },
                                  { observe: 'response' }
                                );
  }

  forgottenPassword(email: string): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/reset/${email}`, {});
  }

  resetPassword(password: string, token: string): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/reset`,
    {
      'password': password,
      'token': token
    });
  }

  logout():void {
    if(this.isLoggedIn()) {
      this.store.dispatch({type: LOGOUT});
    }
    
    localStorage.removeItem('token');
  }

}
