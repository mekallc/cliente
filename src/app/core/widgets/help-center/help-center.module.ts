import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterComponent } from './help-center.component';



@NgModule({
  exports: [HelpCenterComponent],
  declarations: [HelpCenterComponent],
  entryComponents: [HelpCenterComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class HelpCenterModule { }
