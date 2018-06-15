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

  public getAddressWithId(id: any): Observable<any> {
    let apiUrl = 'address/' + id + '/edit';
    return this._apiService.request('get', apiUrl, {}, {}, true);
  }

  public updateAddress(data: any, id: any): Observable<any> {
    let apiUrl = 'address/' + id + '/update';
    return this._apiService.request('post', apiUrl, data, {}, true);
  }

 public deleteAddress(id: any): Observable<any> {
    let apiUrl = 'address/' + id + '/delete';
    return this._apiService.request('get', apiUrl, {}, {}, true);
  }


}
