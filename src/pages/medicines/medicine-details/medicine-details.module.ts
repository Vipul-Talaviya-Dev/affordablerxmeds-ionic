import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineDetailsPage } from './medicine-details';

@NgModule({
  declarations: [
    MedicineDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineDetailsPage),
  ],
})
export class MedicineDetailsPageModule {}
