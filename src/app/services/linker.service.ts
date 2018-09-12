import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class LinkerService extends BaseHttpService {

  constructor(private http: Http,
              private httpClient: HttpClient) { 
    super();
  }

  getFollowed(token: String):Observable<any> {
    return this.httpClient.get(`${this.NEW_URL}/connections`)
  }

  disconnectFollowee(token: String, id:string):Observable<any> {
    return this.httpClient.delete(`${this.NEW_URL}/connections/${id}`);
  }

  followNew(token:String, emailAddress:String):Observable<any> {
    return this.httpClient.post(`${this.NEW_URL}/connections/${emailAddress}`, {});
  }

}
