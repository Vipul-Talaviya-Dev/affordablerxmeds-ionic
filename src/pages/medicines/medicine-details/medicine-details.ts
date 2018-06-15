import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../../providers/product.service';
import { ConfigService } from '../../../providers/config.service';

import { MedicineResultsPage } from '../medicine-results/medicine-results';

interface ProductDetails {
  id: number;
  name: string;
  productCode: string;
  brand: string;
  qty: number;
  availability: string;
  productOptions: any;
}

/**
 * Generated class for the MedicineDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicine-details',
  templateUrl: 'medicine-details.html',
})
export class MedicineDetailsPage {

  public productDetails: any = {};
  public selectMedicine: any = {};
  public medicineQuantity: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public productService: ProductService, public configService: ConfigService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineDetailsPage');
    this.loadProductDetails();
  }

  back() {
    this.navCtrl.pop();
  }

  loadProductDetails() {
    console.log('productList====', this.navParams)
    // if (this.navParams.data && !this.navParams.data.id) {
    //   this.navCtrl.push(MedicineResultsPage);
    // }

    let param = {
      id: this.navParams.data.id
    }

    this.configService.showLoading(true);
    this.productService.productDetail(param).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.productDetails = res.product || [];
      } else {
        this.configService.showToast(res.error);
      }
      this.configService.showLoading(false);
    }, (error) => {
      this.configService.showToast('something want to wrong');
      this.configService.showLoading(false);
    })
  }


  onCheckMedicine(event: any, medicineChild: any, index: any) {
    if (event.checked) {
      if (!this.selectMedicine[medicineChild.productOptionId]) {
        this.selectMedicine[medicineChild.productOptionId] = [];
      }
      this.selectMedicine[medicineChild.productOptionId].push(medicineChild.productOptionValueId);
    } else {
      var array = this.selectMedicine[medicineChild.productOptionId];
      var index = array.indexOf(medicineChild.productOptionValueId);
      if (index > -1) {
        array.splice(index, 1);
      }

      if (this.selectMedicine[medicineChild.productOptionId].length <= 0) {
        delete this.selectMedicine[medicineChild.productOptionId];
      }

    }
  }

  AddToCartMedicine() {

    if (this.isEmptyObject(this.selectMedicine)) {
      this.configService.showToast('please select Medicine...');
      return;
    }

    let data = {};
    data['productId'] = this.productDetails.id;
    data['options'] = this.selectMedicine;
    data['qty'] = this.medicineQuantity;

    this.productService.addMedicineToCart(data).subscribe((res) => {
      console.log('res======', res);
      if (res.status) {
        this.configService.showToast(res.success);
      } else {
        this.configService.showToast(res.error);
      }
    }, (error) => {
      this.configService.showToast('something want to wrong add to cart');

    })
  }


  isEmptyObject(obj: any) {
    let name;
    for (name in obj) {
      return false;
    }
    return true;
  }


}
