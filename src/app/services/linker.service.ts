import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LinkerService {

  constructor(private http:Http) { }


  getFollowed(token: String):Observable<any> {
    return this.http.get("/api/connections")
                        .map((response) => response.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  disconnectFollowee(token: String, followeeId:Number):Observable<any> {
    return this.http.delete(`/api/connections/${followeeId}`)
                        .map((response) => response.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  followNew(token:String, emailAddress:String):Observable<any> {
      return this.http.post(`/api/connections/${emailAddress}`, {})
                        .map((response) => {
                            response.json();
                        })
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
