import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_MY_PRESENTS, ADD_MY_PRESENTS, REMOVE_MY_PRESENTS, UPDATE_MY_PRESENTS } from '../reducers/mypresents.reducer';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class MyPresentsService extends BaseHttpService {

  myPresents: Observable<Array<any>>;
  private NEW_URL = "https://nv372hias4.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private http:Http, private store: Store<any>, private httpClient: HttpClient) { 
      super();
      this.myPresents = this.store.select("mypresents");
  }

  loadMyPresents(): void {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpClient.get(`${this.NEW_URL}/my/presents`, { headers: headers })
                        .subscribe(payload => this.store.dispatch({ type: LOAD_MY_PRESENTS, payload }));
  }

  newPresent(name:String, url:String):void {
    this.store.dispatch({type: ADD_MY_PRESENTS, payload: {description: name, url: url}});
      this.http.post(`${this.BASE_URL}/my/presents`,
                        {
                            "description": name,
                            "url": url
                        }, super.getHeaders())
                        .subscribe(result => {
                            this.loadMyPresents();
                        });
    
  }

  removePresent(id:string): void {
    this.store.dispatch({type: REMOVE_MY_PRESENTS, payload: id});
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.httpClient.delete(`${this.NEW_URL}/my/presents/${id}`, { headers: headers })
                        .subscribe(payload => setTimeout(()=>this.loadMyPresents(), 2000));
    
  }

  updatePresent(id:Number, name:String, url:String): void {
    this.store.dispatch({type: UPDATE_MY_PRESENTS, payload: {ID: id, description: name, url: url}});
    this.http.put(`${this.BASE_URL}/my/presents/${id}`,
                {
                    "description" : name,
                    "url" : url
                }, this.getHeaders())
              .subscribe(result => {
                  this.loadMyPresents();
              });
    }

}
