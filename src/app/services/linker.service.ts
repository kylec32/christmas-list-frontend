import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class LinkerService extends BaseHttpService {

  private NEW_URL = "https://nv372hias4.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private http: Http,
              private httpClient: HttpClient) { 
    super();
  }

  getFollowed(token: String):Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.httpClient.get(`${this.NEW_URL}/connections`, { headers: headers })
  }

  disconnectFollowee(token: String, id:string):Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.httpClient.delete(`${this.NEW_URL}/connections/${id}`, { headers: headers });
    // return this.http.delete(`${this.BASE_URL}/connections/${followeeId}`, super.getHeaders())
    //                     .map((response) => response.json())
    //                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  followNew(token:String, emailAddress:String):Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
            
    return this.httpClient.post(`${this.NEW_URL}/connections/${emailAddress}`, {}, { headers: headers });
  }

}
