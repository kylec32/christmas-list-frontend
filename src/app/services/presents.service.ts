import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_OTHER_PRESENTS, SET_AS_PURCHASED, UNSET_AS_PURCHASED } from '../reducers/present.reducer';

import { BaseHttpService } from './base-http.service';


@Injectable()
export class PresentService extends BaseHttpService {

    otherPresents:Observable<Array<any>>;

    constructor(private store: Store<any>,
                private httpClient: HttpClient) { 
        super();
        this.otherPresents = this.store.select("presents");
        this.store.select('following')
                    .subscribe(followers => {
                        this.loadOtherPresents();
                    })
    }

    loadOtherPresents():void {
        this.httpClient.get(`${this.BASE_URL}/presents`)
                        .subscribe(payload => this.store.dispatch({type:LOAD_OTHER_PRESENTS, payload: payload}));
    }

    markAsPurchased(targetUserId: string, presentId: any):void {
        this.store.dispatch({type: SET_AS_PURCHASED, payload:presentId});
        this.httpClient.put(`${this.BASE_URL}/presents/${targetUserId}/${presentId}/purchased`,[])
                .subscribe(result => setTimeout(() => this.loadOtherPresents(), 10000));
    }

    unmarkAsPurchased(targetUserId: string, presentId: string):void {
        this.store.dispatch({type: UNSET_AS_PURCHASED, payload:presentId});
        this.httpClient.delete(`${this.BASE_URL}/presents/${targetUserId}/${presentId}/purchased`)
                    .subscribe(result => setTimeout(() => this.loadOtherPresents(), 10000));
    }

}    