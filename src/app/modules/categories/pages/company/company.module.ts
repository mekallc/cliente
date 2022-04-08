import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CompanyModalComponent } from './company-modal.component';
import { StarsWidgetModule } from '@core/widgets/stars/stars.module';
import { CompanyViewModalModule } from '@modules/categories/pages/company-view-modal/company-view-modal.module';


@NgModule({
  exports: [CompanyModalComponent],
  declarations: [CompanyModalComponent],
  entryComponents: [CompanyModalComponent],
  imports: [
    IonicModule,
    CommonModule,
    AgmCoreModule,
    StarsWidgetModule,
    CompanyViewModalModule
  ]
})
export class CompanyModule { }
