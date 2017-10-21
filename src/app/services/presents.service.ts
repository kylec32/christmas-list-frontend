import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LOAD_OTHER_PRESENTS } from '../reducers/present.reducer';

import { BaseHttpService } from './base-http.service';


@Injectable()
export class PresentService extends BaseHttpService {

    otherPresents:Observable<Array<any>>;

    constructor(private http:Http, private store: Store<any>) { 
        super();
        this.otherPresents = this.store.select("presents");
    }

    loadOtherPresents():void {
        this.http.get(`${this.BASE_URL}/presents`)
                    .map(response => response.json())
                    .map(payload => ({type:LOAD_OTHER_PRESENTS, payload: payload}))
                    .subscribe(action => this.store.dispatch(action));
    }

}    