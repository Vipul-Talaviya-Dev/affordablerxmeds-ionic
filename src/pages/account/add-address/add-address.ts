import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';
import { AccountService } from '../../../providers/account.service';

import { AddressBookPage } from '../address-book/address-book';

/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface AddressDetails {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  postCode: any;
  countryId: any;
  stateId: any;
  defualtAddress: any;
}

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  public addressDetails: AddressDetails = {
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    postCode: '',
    countryId: '',
    stateId: '',
    defualtAddress: 'yes',
  };

  public submitted: boolean = false;
  public serverError: any = {
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    city: '',
    postCode: '',
    countryId: '',
    stateId: '',
  };

  public countrys: any = [];
  public states: any = [];
  public userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public userService: UserService, public configService: ConfigService,
    public accountService: AccountService) {
    if (this.navParams.data && this.navParams.data.addressId) {
      this.userId = this.navParams.data.addressId;
      this.getAddressWithId();
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
    this.loadCountry();
  }

  loadCountry() {
    this.userService.countrys().subscribe((res) => {
      // console.log(res);
      if (res.status) {
        this.countrys = res.countries || [];
      }
    }, (error) => {
      this.configService.showToast('something want to wrong country');
    })
  }


  onCountryChange(event) {
    // console.log('onCountryChange====', event);
    if (!event) {
      return;
    }
    this.loadStates(event);
  }

  loadStates(data: any, stateId?: any) {
    let param = {
      id: data.id
    }
    this.userService.states(param).subscribe((res) => {
      // console.log(res);
      if (res.status) {
        this.states = res.states || [];
        if (stateId) {
          this.addressDetails.stateId = this.getObjUsingId(this.states, stateId);
        }
      }
    }, (error) => {
      this.configService.showToast('something want to wrong state');
    })
  }

  getAddressWithId() {
    this.accountService.getAddressWithId(this.userId).subscribe((res) => {
      if (res.status) {
        let data = res.address || {};
        this.addressDetails = data;
        let countryId = {
          id: data.countryId
        }

        this.loadStates(countryId, data.stateId);
        this.addressDetails.countryId = this.getObjUsingId(this.countrys, data.countryId);
      } else {
        this.navCtrl.setRoot(AddressBookPage);
        this.configService.showToast(res.error);
      }
    }, (error) => {
      this.configService.showToast('something want to wrong getAddressWithId');
    })
  }

  getObjUsingId(arr: any, id: any) {
    let ret = {};
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      if (obj.id === id) {
        ret = obj;
      }
    }
    return ret;

  }

  addAddressDetails(form: NgForm) {
    // console.log('form======', form);
    // console.log('this.signupDetails=====', this.signupDetails);
    this.submitted = true;
    this.serverError = {};
    if (!form.valid) {
      return;
    }

    for (let i in this.addressDetails) {
      let value = this.addressDetails[i];
      if (i === 'countryId') {
        this.addressDetails.countryId = this.addressDetails[i].id;
      } else if (i === 'stateId') {
        this.addressDetails.stateId = this.addressDetails[i].id;
      }
    }

    if (this.userId) {
      this.updateAddress(this.addressDetails);
    } else {
      this.saveAddress(this.addressDetails);
    }

  }


  saveAddress(data: any) {
    this.accountService.addAddress(data).subscribe((res) => {
      if (res.status) {
        this.configService.showToast(res.success);
        this.navCtrl.setRoot(AddressBookPage);
      } else {
        this.configService.showToast(res.error);
      }
    }, (error) => {
      if (error._body) {
        let errObj = JSON.parse(error._body);
        this.serverError = errObj.errors;
      }
    })
  }

  updateAddress(data: any) {
    this.accountService.updateAddress(data, this.userId).subscribe((res) => {
      if (!res.status) {
        this.configService.showToast(res.success);
        this.navCtrl.setRoot(AddressBookPage);
      } else {
        this.configService.showToast(res.error);
      }
    }, (error) => {
      if (error._body) {
        let errObj = JSON.parse(error._body);
        this.serverError = errObj.errors;
      }
    })
  }

}
