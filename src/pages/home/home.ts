import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AlphabetsPage } from '../medicines/alphabets/alphabets';
// import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  allMedicine(){
    this.navCtrl.push(AlphabetsPage);
  }

  search(){
    // this.navCtrl.push(SearchPage);
  }
}
