import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { AgmCoreModule } from '@agm/core';

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
    TranslateModule,
    RouterModule.forChild(app)
  ]
})
export class WaitingModule { }
