import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/auth/login/login';
import { AlphabetsPage } from '../pages/medicines/alphabets/alphabets';
import { LoginFormPage } from '../pages/auth/login-form/login-form';
import { EditAccountPage } from '../pages/account/edit-account/edit-account';
import { ChangePasswordPage } from '../pages/account/change-password/change-password';
import { AddressBookPage } from '../pages/account/address-book/address-book';
import { WishlistPage } from '../pages/account/wishlist/wishlist';
import { SignupPage } from '../pages/auth/signup/signup';

// import { MedicineDetailsPage } from '../pages/medicines/medicine-results/medicine-results';

import { AuthProvider } from '../providers/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any;
  public isLoginUser: any; 
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public authProvider: AuthProvider) {
    this.initializeApp();

    this.isLoginUser = this.authProvider.getAuthToken();
    this.loginCheck();
    this.rootPage = LoginFormPage;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('cordova')){
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        // this.statusBar.backgroundColorByHexString('#FFFFFF');
      }
    });
  }

  public loginCheck() {
    if(!this.isLoginUser) {
      this.rootPage = LoginFormPage;
    } else {
      this.rootPage = HomePage;
      
    }
  }

  public goto(page: string){
    console.log('goto==', page);
    if(!this.isLoginUser) {
      this.rootPage = LoginFormPage;
    }

    if(page == 'home'){
      this.nav.setRoot(HomePage);
    } else if(page == 'all'){
      this.nav.push(AlphabetsPage);
    } else if(page == 'history'){
      this.nav.push(AlphabetsPage);
    } else if(page == 'reward'){
      this.nav.push(AlphabetsPage);
    } else if(page == 'return'){
      this.nav.push(AlphabetsPage);
    } else if(page == 'transaction'){
      this.nav.push(AlphabetsPage);
    } else if(page == 'payment'){
      this.nav.push(AlphabetsPage);
    } else if(page == 'edit'){
      this.nav.push(EditAccountPage);
    } else if(page === 'forgotPassword'){
      this.nav.push(ChangePasswordPage);
    } else if(page == 'address'){
      this.nav.push(AddressBookPage);
    } else if(page == 'wishlist'){
      this.nav.push(WishlistPage);
    }
  }
}
