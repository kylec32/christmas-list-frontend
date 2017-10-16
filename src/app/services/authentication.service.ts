import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }

  getGoogle():Observable<any> {
    return this.http.get("http://localhost:3000/hello-world")
                    .map((response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  login(emailAddress: String, password: String):Observable<any> {
    return this.http.post("/api/verify",
                        { "emailAddress": emailAddress ,"password": password})
                        .map((response) => response.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
