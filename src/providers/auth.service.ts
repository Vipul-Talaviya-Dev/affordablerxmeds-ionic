import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private isLoggedIn = false;
  constructor(public http: HttpClient, public localStorageService: LocalStorageService) {
    console.log('Hello AuthProvider Provider');
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }


  public getAuthToken(): any {
    return this.localStorageService.get('token');
  }

  public setAuthToken(token: any) {
    this.localStorageService.set('token', token);
  }

  public clearAuthToken() {
    this.localStorageService.clearAll();
  }

  authenticated(): boolean {
    return this.isLoggedIn;
  }

}
