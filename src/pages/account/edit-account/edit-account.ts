import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the EditAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  telephone: any;
}

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {

  public userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: ''
  };

  public submitted: boolean = false;
  public serverError: any = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService, public configService: ConfigService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.configService.showLoading(true);
    this.userService.getUserProfile().subscribe((res) => {
      if (!res.status) {
        this.configService.showToast(res.error);
      } else {
        let userDetail = res.user || {};
        delete userDetail.userId;
        this.userProfile = userDetail;
     }
      this.configService.showLoading(false);
    }, (error) => {
      this.configService.showToast('Something want to wrong.');
      this.configService.showLoading(false);
    })
  }

  updateUserProfile(form: NgForm) {
    this.submitted = true;
    this.serverError = {};
    if (!form.valid) {
      return;
    }
    this.userService.updateUserProfile(this.userProfile).subscribe((res) => {
      if (!res.status) {
        this.configService.showToast(res.error);
      } else {
        let userDetail = res.user || {};
        delete userDetail.userId;
        this.userProfile = userDetail;
        this.configService.showToast('Your details update succesfully.');
      }
    }, (error) => {
      if (error._body) {
        let errObj = JSON.parse(error._body);
        this.serverError = errObj.errors;
      }
    })
  }

}
