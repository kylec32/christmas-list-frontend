import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_MY_PRESENTS, ADD_MY_PRESENTS, REMOVE_MY_PRESENTS, UPDATE_MY_PRESENTS } from '../reducers/mypresents.reducer';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class MyPresentsService extends BaseHttpService {

  myPresents: Observable<Array<any>>;

  constructor(private http:Http, private store: Store<any>, private httpClient: HttpClient) { 
      super();
      this.myPresents = this.store.select("mypresents");
  }

  loadMyPresents(): void {
    this.httpClient.get(`${this.BASE_URL}/my/presents`)
                        .subscribe(payload => this.store.dispatch({ type: LOAD_MY_PRESENTS, payload }));
  }

  newPresent(name:String, url:String):void {
    this.store.dispatch({type: ADD_MY_PRESENTS, payload: {title: name, url: url}});
    this.httpClient.post(`${this.BASE_URL}/my/presents`,
                            {
                                "title": name,
                                "url": url.length == 0 ? null : url
                            })
                            .subscribe(result => {
                                setTimeout(() => this.loadMyPresents(), 1700)
                            });
  }

  removePresent(id:string): void {
    this.store.dispatch({type: REMOVE_MY_PRESENTS, payload: id});
    this.httpClient.delete(`${this.BASE_URL}/my/presents/${id}`)
                        .subscribe(payload => setTimeout(()=>this.loadMyPresents(), 2000));
    
  }

  updatePresent(id:string, name:string, url:string): void {
    this.store.dispatch({type: UPDATE_MY_PRESENTS, payload: {id: id, title: name, url: url}});
    this.httpClient.put(`${this.BASE_URL}/my/presents/${id}`,
                {
                    "title" : name,
                    "url" : url.length == 0 ? null : url
                })
              .subscribe(result => {
                  setTimeout(() => this.loadMyPresents(), 1750);
              });
    }

}
