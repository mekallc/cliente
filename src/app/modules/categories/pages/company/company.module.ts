import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyModalComponent } from './company-modal.component';
import { StarsWidgetModule } from '@modules/rate/widgets/stars/stars.module';
import { CompanyViewModalModule } from '@modules/categories/pages/company-view-modal/company-view-modal.module';

const routes: Routes = [ { path: '', component: CompanyModalComponent } ];

@NgModule({
  exports: [CompanyModalComponent],
  declarations: [CompanyModalComponent],
  entryComponents: [CompanyModalComponent],
  imports: [
    IonicModule,
    CommonModule,
    AgmCoreModule,
    TranslateModule,
    StarsWidgetModule,
    CompanyViewModalModule,
    RouterModule.forChild(routes),

  ]
})
export class CompanyModule { }
