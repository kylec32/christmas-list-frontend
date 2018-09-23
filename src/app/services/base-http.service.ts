import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class BaseHttpService {
    //BASE_URL = "http://localhost:3000";
    BASE_URL:string = "https://9jok0yonc3.execute-api.us-west-2.amazonaws.com/dev";
}    