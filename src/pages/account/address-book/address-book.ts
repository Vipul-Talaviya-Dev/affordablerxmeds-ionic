import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';
import { AccountService } from '../../../providers/account.service';


@IonicPage()
@Component({
  selector: 'page-address-book',
  templateUrl: 'address-book.html',
})
export class AddressBookPage {

  public userAddress: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public userService: UserService, public configService: ConfigService,
    public accountService: AccountService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressBookPage');
    this.loadAddress();
  }

  add() {
    let modal = this.modalCtrl.create('AddAddressPage');
    modal.present();
  }

  loadAddress() {
    this.configService.showLoading(true);
    this.accountService.getAddress().subscribe((res) => {
      // console.log(res);
      if (res.status) {
        this.userAddress = res.addresses || [];
      }
      this.configService.showLoading(false);
    }, (error) => {
      this.configService.showToast('something want to wrong address');
      this.configService.showLoading(false);
    })
  }

  editAddress(id: any) {
    let modal = this.modalCtrl.create('AddAddressPage', { addressId: id });
    modal.present();
  }

  deleteAddress(id: any) {
    this.accountService.deleteAddress(id).subscribe((res) => {
      // console.log(res);
      if (res.status) {
        this.configService.showToast(res.success);
        this.loadAddress();
      } else {
        this.configService.showToast(res.error);
      }
    }, (error) => {
      this.configService.showToast('something want to wrong address');
    })
  }

}
