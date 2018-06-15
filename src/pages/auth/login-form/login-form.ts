import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';
import { AuthProvider } from '../../../providers/auth.service';

import { HomePage } from '../../home/home';
import { SignupPage } from '../signup/signup';



/**
 * Generated class for the LoginFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface User {
  email: string;
  password: string;
}

@IonicPage()
@Component({
  selector: 'page-login-form',
  templateUrl: 'login-form.html',
})
export class LoginFormPage {

  public userDetails: User = { email: '', password: '' };
  public submitted: boolean = false;
  public serverError: any = { email: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    public userService: UserService, public configService: ConfigService,
    public authProvider: AuthProvider) {

      let token = this.authProvider.getAuthToken();
      if(token) {
        this.navCtrl.setRoot(HomePage);  
      }
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  public forgot() {
    let modal = this.modalCtrl.create(ForgotPasswordPage);
    modal.present();
  }

  public goSignUp() {
    this.navCtrl.push(SignupPage);
  }


  onLogin(form: NgForm) {
    this.submitted = true;
    this.serverError = {};
    if (!form.valid) {
      return;
    }

    this.userService.userLogin(this.userDetails).subscribe((res) => {
      console.log(res);
      if (!res.status) {
        this.configService.showToast(res.error);
      } else {
        this.authProvider.setAuthToken(res.token);
        this.navCtrl.setRoot(HomePage);
     }
    }, (error) => {
      if (error._body) {
        let errObj = JSON.parse(error._body);
        // console.log('errObj====', errObj);
        this.serverError = errObj.errors;
      }
    })

  }

}
