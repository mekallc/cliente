import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyViewModalComponent } from './company-view-modal.component';



@NgModule({
  exports: [CompanyViewModalComponent],
  declarations: [CompanyViewModalComponent],
  entryComponents: [CompanyViewModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    AgmCoreModule,
  ]
})
export class CompanyViewModalModule { }
