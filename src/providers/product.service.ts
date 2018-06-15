import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

//services
import { ApiService } from './api.service';

@Injectable()
export class ProductService {

  constructor(private _apiService:ApiService) {
  }

  public brandList(param: any):Observable<any> {
    let apiUrl = 'categories';
    return this._apiService.request('get', apiUrl, {}, param, true);
  }

  public productList(data: any):Observable<any> {
    let apiUrl = 'category/' + data.id + '/products';
    return this._apiService.request('get', apiUrl, {}, {}, true);
  }

  public productDetail(data: any):Observable<any> {
    let apiUrl = 'product/' + data.id + '/detail';
    return this._apiService.request('get', apiUrl, {}, {}, true);
  }

  public addMedicineToCart(data: any):Observable<any> {
    let apiUrl = 'add/cart';
    return this._apiService.request('post', apiUrl, data, {}, true);
  }

}
