import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrandListPage } from '../brand-list/brand-list';

/**
 * Generated class for the AlphabetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alphabets',
  templateUrl: 'alphabets.html',
})
export class AlphabetsPage {

  alpha: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  }

  back(){
    this.navCtrl.pop();
  }
  
  brand(name: string){
    console.log(name);

    this.navCtrl.push(BrandListPage, {
        id: name
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlphabetsPage');
  }

}
