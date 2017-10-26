import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_OTHER_PRESENTS, SET_AS_PURCHASED, UNSET_AS_PURCHASED } from '../reducers/present.reducer';

import { BaseHttpService } from './base-http.service';


@Injectable()
export class PresentService extends BaseHttpService {

    otherPresents:Observable<Array<any>>;

    constructor(private http:Http, private store: Store<any>) { 
        super();
        this.otherPresents = this.store.select("presents");
        this.store.select('following')
                    .subscribe(followers => {
                        this.loadOtherPresents();
                    })
    }

    loadOtherPresents():void {
        this.http.get(`${this.BASE_URL}/presents`, super.getHeaders())
                    .map(response => response.json())
                    .map(payload => ({type:LOAD_OTHER_PRESENTS, payload: payload}))
                    .subscribe(action => this.store.dispatch(action));
    }

    markAsPurchased(id:Number):void {
        this.store.dispatch({type: SET_AS_PURCHASED, payload:id});
        this.http.post(`${this.BASE_URL}/presents/${id}`,[], super.getHeaders())
                .subscribe(result => this.loadOtherPresents());
    }

    unmarkAsPurchased(id:Number):void {
        this.store.dispatch({type: UNSET_AS_PURCHASED, payload:id});
        this.http.delete(`${this.BASE_URL}/presents/${id}`, super.getHeaders())
                    .subscribe(result => this.loadOtherPresents());
    }

}    