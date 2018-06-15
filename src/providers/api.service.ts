import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ConfigService } from './config.service';
import { AuthProvider } from './auth.service';

@Injectable()
export class ApiService {

  // loaderEmitter:EventEmitter<any> = new EventEmitter();
  public nativeEl: any;


  constructor(public http: Http, public _configService: ConfigService,
    public authProvider: AuthProvider) {
    // console.log('ApiService called');
  }

  request(method, url, data, param, token) {


    let endPoint = this._configService.getApiEndPoint();
    let apiURL = endPoint + url;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(data);
    let params: URLSearchParams = this.objToSearchParams(param);
    let request;

    let authToken = this.authProvider.getAuthToken();

    if (method === 'post') {
      if (token && authToken) {
        headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': authToken
        });
      }

      let options = new RequestOptions({ headers: headers });
      request = this.http.post(apiURL, body, options).map((res) => {
        return this.extractData(res);
      }, (error: any) => {
        return this.handleError(error);
      });


    } else if (method === 'get') {
      let getMethodOptions = { search: params };
      if (token && authToken) {
        headers.append('Authorization', authToken);
        getMethodOptions = new RequestOptions({ headers: headers, search: params });
      }

      request = this.http.get(apiURL, getMethodOptions)
        .map((res) => {
          return this.extractData(res);
        }, (error: any) => {
          return this.handleError(error);
        });
    }

    return request;
  }

  private objToSearchParams(obj) {
    let params: URLSearchParams = new URLSearchParams();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }
    return params;
  }

  private extractData(res) {
    /*if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }*/
    let response = res._body.replace(/\)]}'/g, '');
    let data = JSON.parse(response);
    // console.log('<<<data>>>>>');
    return data || {};

  }

  private handleError(error: any) {
    // let errMsg = error.message || 'Server error';
    // return Observable.throw(errMsg);
    return error;
  }

}
