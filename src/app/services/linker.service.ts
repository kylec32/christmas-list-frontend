import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class LinkerService extends BaseHttpService {

  constructor(private http:Http) { 
    super();
  }

  getFollowed(token: String):Observable<any> {
    return this.http.get(`${this.BASE_URL}/connections`, super.getHeaders())
                        .map((response) => response.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  disconnectFollowee(token: String, followeeId:Number):Observable<any> {
    return this.http.delete(`${this.BASE_URL}/connections/${followeeId}`, super.getHeaders())
                        .map((response) => response.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  followNew(token:String, emailAddress:String):Observable<any> {
      return this.http.post(`${this.BASE_URL}/connections/${emailAddress}`, {}, super.getHeaders())
                        .map((response) => {
                            response.json();
                        })
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
