import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_MY_PRESENTS } from '../reducers/mypresents.reducer';

@Injectable()
export class MyPresentsService {

  private BASE_URL = "http://localhost:3000";
  myPresents: Observable<Array<any>>;

  constructor(private http:Http, private store: Store<any>) { 
      this.myPresents = this.store.select("mypresents");
  }


  loadMyPresents(token: String) {
    return this.http.get(`${this.BASE_URL}/my/presents`)
                        .map((response) => response.json())
                        .map(payload => ({ type: LOAD_MY_PRESENTS, payload }))
                        .subscribe(action => this.store.dispatch(action));
  }

}
