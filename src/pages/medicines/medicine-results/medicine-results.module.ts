import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineResultsPage } from './medicine-results';

@NgModule({
  declarations: [
    MedicineResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineResultsPage),
  ],
})
export class MedicineResultsPageModule {}
