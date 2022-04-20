import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStatusListComponent } from './service-status-list.component';
import { MomentModule } from 'ngx-moment';
import { CompanyModule } from '@modules/categories/pages/company/company.module';



@NgModule({
  exports: [ServiceStatusListComponent],
  declarations: [ServiceStatusListComponent],
  entryComponents: [ServiceStatusListComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
    CompanyModule,
  ]
})
export class ServiceStatusListModule { }
