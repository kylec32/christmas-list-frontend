import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class BaseHttpService {
    //BASE_URL = "http://localhost:3000";
    BASE_URL:String = "https://yan3wfeeg2.execute-api.us-east-1.amazonaws.com/dev";

    getHeaders():RequestOptions {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return new RequestOptions({ headers: headers });
    }
    
}    