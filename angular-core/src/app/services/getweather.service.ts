import { Injectable } from '@angular/core';
import {Http, Headers, Jsonp, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetweatherService {
  lat:any;
  long:any;

  constructor(private http:Http) { }

  getWeather(lat){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let coord = JSON.stringify(lat);
    return this.http.post('http://localhost:3000/getweather/value',coord,{headers:headers}).map(res =>res.json()).toPromise();
  }
}
