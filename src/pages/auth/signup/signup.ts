import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../providers/user.service';
import { ConfigService } from '../../../providers/config.service';
import { AuthProvider } from '../../../providers/auth.service';

import { HomePage } from '../../home/home';
import { LoginFormPage } from '../login-form/login-form';

interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  telephone: any;
  address1: string;
  address2: string;
  city: string;
  postCode: any;
  countryId: any;
  stateId: any;
  password: string;
  confirmPassword: string;
  newsLetter: any;
}

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupDetails: SignUp = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    address1: '',
    address2: '',
    city: '',
    postCode: '',
    countryId: '',
    stateId: '',
    password: '',
    confirmPassword: '',
    newsLetter: true,
  };

  public submitted: boolean = false;
  public serverError: any = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    address1: '',
    address2: '',
    city: '',
    postCode: '',
    countryId: '',
    stateId: '',
    password: '',
    confirmPassword: '',
    newsLetter: '',
  };

  terms1: boolean = true;
  terms2: boolean = true;
  color: string = 'danger';
  public countrys: any = [];
  public states: any = [];
  public authToken: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService, public configService: ConfigService,
    public authProvider: AuthProvider) {

    this.authToken = this.authProvider.getAuthToken();
    if (this.authToken) {
      this.navCtrl.setRoot(HomePage);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    setTimeout(() => {
      this.loadCountry();
    })
  }

  checkTerms() {
    if (this.terms1 == true && this.terms2 == true) {
      console.log('terms checked');
      this.color = 'success';
    }
    else {
      this.color = 'secondary';
    }
  }

  back() {
    this.authToken = this.authProvider.getAuthToken();
    if (this.authToken) {
      this.navCtrl.setRoot(HomePage);
    } else {
      this.navCtrl.push(LoginFormPage);
    }
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

  loadStates(data: any) {
    let param = {
      id: data.id
    }
    this.userService.states(param).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.states = res.states || [];
        // console.log('this.countrys====', this.states);
      }
    }, (error) => {
      this.configService.showToast('something want to wrong state');
    })
  }

  onSignup(form: NgForm) {
    // console.log('form======', form);
    // console.log('this.signupDetails=====', this.signupDetails);

    this.submitted = true;
    this.serverError = {};
    if (!form.valid) {
      return;
    }

    for (let i in this.signupDetails) {
      let value = this.signupDetails[i];
      if (i === 'countryId') {
        this.signupDetails.countryId = this.signupDetails[i].id;
      } else if (i === 'stateId') {
        this.signupDetails.stateId = this.signupDetails[i].id;
      }
    }

    this.userService.userRegister(this.signupDetails).subscribe((res) => {
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
