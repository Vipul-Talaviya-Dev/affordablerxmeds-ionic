import { Injectable, EventEmitter } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
//import { UserService } from './user.service';

@Injectable()
export class ConfigService {
  public loginEmitter: EventEmitter<any> = new EventEmitter();


  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController) { }


  public getApiEndPoint() {
    // return 'http://api.altsolution.in/api/';
    return 'http://api.altsolution.in/public/customer/'
  }

  public showToast(message: string = 'Your activity successfully', duration: number = 3000, position: string = 'top') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }

  public showLoading(isShow: boolean = false, message: string = 'Please Wait...') {
    let loading = this.loadingCtrl.create({
      content: message,
      duration: 1000,
    });
    isShow ? loading.present() : loading.dismiss();
  }

  /* public notifyUserLogin() {
    let data = {
      type: 'login',
      data: {}
    };
    this.loginEmitter.next(data);
  }

  public notifyUserLogout() {
    console.log('notifyUserLogout is called....');
    let data = {
      type: 'logout',
      data: {}
    };
    this.loginEmitter.next(data);
  }   */

}
