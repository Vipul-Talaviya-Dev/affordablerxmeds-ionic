import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

//services
import { ApiService } from './api.service';

@Injectable()
export class UserService {

  constructor(private _apiService: ApiService) {
  }

  public userLogin(data: any): Observable<any> {
    let apiUrl = 'auth/login';
    return this._apiService.request('post', apiUrl, data, {}, false);
  }

  public userRegister(data: any): Observable<any> {
    let apiUrl = 'auth/registration';
    return this._apiService.request('post', apiUrl, data, {}, false);
  }

  public forgotPassword(data: any): Observable<any> {
    let apiUrl = 'auth/forgotPassword';
    return this._apiService.request('post', apiUrl, data, {}, false);
  }

  public countrys(): Observable<any> {
    let apiUrl = 'countries';
    return this._apiService.request('get', apiUrl, {}, {}, false);
  }

  public states(data: any): Observable<any> {
    let apiUrl = 'country/' + data.id + '/states';
    return this._apiService.request('get', apiUrl, {}, {}, false);
  }

  public getUserProfile(): Observable<any> {
    let apiUrl = 'profile';
    return this._apiService.request('get', apiUrl, {}, {}, true);
  }

  public updateUserProfile(data: any): Observable<any> {
    let apiUrl = 'profile';
    return this._apiService.request('post', apiUrl, data, {}, true);
  }

  public changeUserPassword(data: any): Observable<any> {
    let apiUrl = 'change/password';
    return this._apiService.request('post', apiUrl, data, {}, true);
  }

}
