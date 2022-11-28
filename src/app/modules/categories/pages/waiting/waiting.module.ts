import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { CorePipeModule } from '@core/pipe/pipe.module';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

const app: Routes = [
  { path: '', component: WaitingComponent }
];

@NgModule({
  exports: [WaitingComponent],
  declarations: [WaitingComponent],
  entryComponents: [WaitingComponent],
  imports: [
    IonicModule,
    CommonModule,
    AgmCoreModule,
    CorePipeModule,
    TranslateModule,
    RouterModule.forChild(app)
  ]
})
export class WaitingModule { }
