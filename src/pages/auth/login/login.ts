import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginFormPage } from '../login-form/login-form';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../../providers/user.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
            public userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm(){
    this.navCtrl.push(LoginFormPage);
  }

  signUp(){
    // this.navCtrl.push(SignupPage);
    let data = {
        'username': 'bhavin',
        'password': '123456789'
    }   
    
    this.userService.userLogin(data).subscribe((res)=>{
        console.log(res);        
    },(error) => {
        console.log('error===', error);
    })
  }

}
