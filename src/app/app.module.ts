import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/auth/login/login';
import { SignupPage } from '../pages/auth/signup/signup';
import { LoginFormPage } from '../pages/auth/login-form/login-form';
import { ForgotPasswordPage } from '../pages/auth/forgot-password/forgot-password';
import { AlphabetsPage } from '../pages/medicines/alphabets/alphabets';
import { BrandListPage } from '../pages/medicines/brand-list/brand-list';
import { MedicineResultsPage } from '../pages/medicines/medicine-results/medicine-results';
import { MedicineDetailsPage } from '../pages/medicines/medicine-details/medicine-details';
import { EditAccountPage } from '../pages/account/edit-account/edit-account';
import { ChangePasswordPage } from '../pages/account/change-password/change-password';
import { AddressBookPage } from '../pages/account/address-book/address-book';
import { WishlistPage } from '../pages/account/wishlist/wishlist';

import { SharedModule } from '../providers/shared.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AlphabetsPage,
    BrandListPage,
    LoginFormPage,
    MedicineResultsPage,
    MedicineDetailsPage,
    ForgotPasswordPage,
    EditAccountPage,
    ChangePasswordPage,
    AddressBookPage,
    WishlistPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    LocalStorageModule.withConfig({
      prefix: 'Medicin',
      storageType: 'localStorage'
    }),
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AlphabetsPage,
    BrandListPage,
    LoginFormPage,
    MedicineResultsPage,
    MedicineDetailsPage,
    ForgotPasswordPage,
    EditAccountPage,
    ChangePasswordPage,
    AddressBookPage,
    WishlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
