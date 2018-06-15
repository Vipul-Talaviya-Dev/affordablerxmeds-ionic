import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';

import { HomePage } from '../../home/home';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  public forgotEmail: string = '';
  public submitted: boolean = false;
  public serverError: any = { email: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    public userService: UserService, public configService: ConfigService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }

  onForgot(form: NgForm) {
    this.submitted = true;
    this.serverError = {};
    if (!form.valid) {
      return;
    }

    let data = {
      'email': this.forgotEmail
    }

    this.userService.forgotPassword(data).subscribe((res) => {
      console.log(res);
      if (!res.status) {
        this.configService.showToast(res.error);
      } else {
        this.navCtrl.setRoot(HomePage);
      }
    }, (error) => {
      if (error._body) {
        let errObj = JSON.parse(error._body);
        // console.log('errObj====', errObj);
        this.serverError = errObj.errors;
      } else {
         this.configService.showToast('something want to wrong!');
      }
    })

  }

}
