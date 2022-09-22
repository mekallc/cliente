import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyModalComponent } from './company-modal.component';
import { StarsWidgetModule } from '@modules/rate/widgets/stars/stars.module';
import { CompanyViewModalModule } from '@modules/categories/pages/company-view-modal/company-view-modal.module';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [ { path: '', component: CompanyModalComponent } ];

@NgModule({
  exports: [CompanyModalComponent],
  declarations: [CompanyModalComponent],
  entryComponents: [CompanyModalComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    StarsWidgetModule,
    AgmCoreModule,
    CompanyViewModalModule,
    RouterModule.forChild(routes),

  ]
})
export class CompanyModule { }
