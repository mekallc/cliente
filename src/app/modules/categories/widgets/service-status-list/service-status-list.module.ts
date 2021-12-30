import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStatusListComponent } from './service-status-list.component';
import { MomentModule } from 'ngx-moment';



@NgModule({
  exports: [ServiceStatusListComponent],
  declarations: [ServiceStatusListComponent],
  entryComponents: [ServiceStatusListComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
  ]
})
export class ServiceStatusListModule { }
