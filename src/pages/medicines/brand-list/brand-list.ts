import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicineResultsPage } from '../medicine-results/medicine-results';
import { ProductService } from '../../../providers/product.service';
import { ConfigService } from '../../../providers/config.service';

import { AlphabetsPage } from '../alphabets/alphabets';

/**
 * Generated class for the BrandListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand-list',
  templateUrl: 'brand-list.html',
})
export class BrandListPage {

  public brandLists: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public productService: ProductService, public configService: ConfigService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandListPage');
    this.loadBrandList();
  }

  loadBrandList() {
    if (this.navParams.data && !this.navParams.data.id) {
      this.navCtrl.push(AlphabetsPage);
    }

    let param = {
      search: this.navParams.data.id
    }

    this.configService.showLoading(true);
    this.productService.brandList(param).subscribe((res) => {
      if(res.status) {
        this.brandLists = res.categories || [];
      } else {
        this.configService.showToast(res.error);
      }
      this.configService.showLoading(false);
    }, (error) => {
      this.configService.showToast('something want to wrong');
      this.configService.showLoading(false);
    })
  }

  medicineResult(data: any) {
    this.navCtrl.push(MedicineResultsPage, {
        id: data.id
    });
  }

  back() {
    this.navCtrl.pop();
  }

}
