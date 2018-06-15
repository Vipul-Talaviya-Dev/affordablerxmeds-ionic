import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginFormPage } from '../../auth/login-form/login-form';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';
import { AuthProvider } from '../../../providers/auth.service';

interface ChangePasswordDetail {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public changePasswordDetail: ChangePasswordDetail = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  public submitted: boolean = false;
  public serverError: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService, public configService: ConfigService,
    public authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  onChangePassword(form: NgForm) {
    this.submitted = true;
    this.serverError = {};
    if (!form.valid) {
      return;
    }

    this.userService.changeUserPassword(this.changePasswordDetail).subscribe((res) => {
      if (res.status) {
        this.configService.showToast('Your password update succesfully.');
        this.authProvider.clearAuthToken();
         this.navCtrl.setRoot(LoginFormPage);
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
