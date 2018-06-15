import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlphabetsPage } from './alphabets';

@NgModule({
  declarations: [
    AlphabetsPage,
  ],
  imports: [
    IonicPageModule.forChild(AlphabetsPage),
  ],
})
export class AlphabetsPageModule {}
