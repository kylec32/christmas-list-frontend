import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_MY_PRESENTS, ADD_MY_PRESENTS, REMOVE_MY_PRESENTS, UPDATE_MY_PRESENTS } from '../reducers/mypresents.reducer';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class MyPresentsService extends BaseHttpService {

  myPresents: Observable<Array<any>>;

  constructor(private http:Http, private store: Store<any>) { 
      super();
      this.myPresents = this.store.select("mypresents");
  }

  loadMyPresents(token: String): void {
    this.http.get(`${this.BASE_URL}/my/presents`, super.getHeaders())
                        .map((response) => response.json())
                        .map(payload => ({ type: LOAD_MY_PRESENTS, payload }))
                        .subscribe(action => this.store.dispatch(action));
  }

  newPresent(token: String, name:String, url:String):void {
    this.store.dispatch({type: ADD_MY_PRESENTS, payload: {description: name, url: url}});
      this.http.post(`${this.BASE_URL}/my/presents`,
                        {
                            "description": name,
                            "url": url
                        }, super.getHeaders())
                        .subscribe(result => {
                            this.loadMyPresents(token);
                        });
    
  }

  removePresent(token:String, id:Number): void {
    this.store.dispatch({type: REMOVE_MY_PRESENTS, payload: id});
    this.http.delete(`${this.BASE_URL}/my/presents/${id}`, this.getHeaders())
                .subscribe(result => {
                    this.loadMyPresents(token);
                });
    
  }

  updatePresent(token:String, id:Number, name:String, url:String): void {
    this.store.dispatch({type: UPDATE_MY_PRESENTS, payload: {ID: id, description: name, url: url}});
    this.http.put(`${this.BASE_URL}/my/presents/${id}`,
                {
                    "description" : name,
                    "url" : url
                }, this.getHeaders())
              .subscribe(result => {
                  this.loadMyPresents(token);
              });
    }

}
