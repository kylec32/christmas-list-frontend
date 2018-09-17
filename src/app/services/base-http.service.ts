import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class BaseHttpService {
    //BASE_URL = "http://localhost:3000";
    BASE_URL:string = "https://nv372hias4.execute-api.us-east-1.amazonaws.com/dev";
}    