import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';
import { Follower } from '../wish-list/interfaces/follower';

@Injectable()
export class LinkerService extends BaseHttpService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getFollowed(token: String):Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/connections`)
  }

  disconnectFollowee(token: String, id:string):Observable<any> {
    return this.httpClient.delete(`${this.BASE_URL}/connections/${id}`);
  }

  followNew(token:String, emailAddress:String):Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/connections/${emailAddress}`, {});
  }

  searchFollowers(emailAddressSearch: string):Observable<Follower[]> {
    return this.httpClient.get<Follower[]>(`${this.BASE_URL}/users/${emailAddressSearch}`);
  }

}
