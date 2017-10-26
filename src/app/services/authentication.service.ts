import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseHttpService } from './base-http.service';
import {Observable} from 'rxjs/Rx';
import { LOGIN, LOGOUT } from '../reducers/authentication.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthenticationService extends BaseHttpService {

  constructor(private http:Http,
              private store:Store<any>) {
                super();
               }


  login(emailAddress: String, password: String):Observable<any> {
    return this.http.post(`${this.BASE_URL}/verify`,
                        { "emailAddress": emailAddress ,"password": password})
                        .map((response) => response.json())
                        .map(response => {
                              localStorage.setItem('token', response.token);
                              return response;
                            })
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  isLoggedIn():boolean {
    return localStorage.getItem('token') != undefined && localStorage.getItem('token').length > 0;
  }

  signUp(name:String, emailAddress:String, password:String): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user`, {"name": name, "emailAddress": emailAddress, "password": password})
            .map(response => response.json())
            .catch(error => error.json());

  }

  logout():void {
    this.store.dispatch({type: LOGOUT});
    localStorage.removeItem('token');
  }

}
