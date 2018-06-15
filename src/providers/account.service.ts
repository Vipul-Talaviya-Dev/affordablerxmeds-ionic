import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

//services
import { ApiService } from './api.service';

@Injectable()
export class AccountService {

  constructor(private _apiService: ApiService) {
  }

  public addAddress(data: any): Observable<any> {
    let apiUrl = 'address/create';
    return this._apiService.request('post', apiUrl, data, {}, true);
  }

  public getAddress(): Observable<any> {
    let apiUrl = 'addresses';
    return this._apiService.request('get', apiUrl, {}, {}, true);
  }

  // public countrys(): Observable<any> {
  //   let apiUrl = 'countries';
  //   return this._apiService.request('get', apiUrl, {}, {}, false);
  // }

}
