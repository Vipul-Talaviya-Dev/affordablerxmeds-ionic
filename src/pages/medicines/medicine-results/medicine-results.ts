import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../../providers/product.service';
import { ConfigService } from '../../../providers/config.service';

import { MedicineDetailsPage } from '../medicine-details/medicine-details';
import { BrandListPage } from '../brand-list/brand-list';

/**
 * Generated class for the MedicineResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicine-results',
  templateUrl: 'medicine-results.html',
})
export class MedicineResultsPage {

  public productLists: any = [];
  public categoryName: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public productService: ProductService, public configService: ConfigService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineResultsPage');
    setTimeout(() => {
      this.loadProductList();

    })
  }

  back() {
    this.navCtrl.pop();
  }

  loadProductList() {
    console.log('productList====', this.navParams)
    if (this.navParams.data && !this.navParams.data.id) {
      this.navCtrl.push(BrandListPage);
    }

    let param = {
      id: this.navParams.data.id
    }

    this.configService.showLoading(true);
    this.productService.productList(param).subscribe((res) => {
      console.log(res);
      if (res) {
        this.categoryName = res.categoryName || '';
        this.productLists = res.products || [];
        console.log('this.productLists===', this.productLists);
      }
      this.configService.showLoading(false);
    }, (error) => {
      this.configService.showToast('something want to wrong');
      this.configService.showLoading(false);
    })
  }

  medicineDetail(data: any) {
    this.navCtrl.push(MedicineDetailsPage, {
      id: data.id
    });
  }

}
