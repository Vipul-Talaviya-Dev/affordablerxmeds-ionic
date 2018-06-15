import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandListPage } from './brand-list';

@NgModule({
  declarations: [
    BrandListPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandListPage),
  ],
})
export class BrandListPageModule {}
