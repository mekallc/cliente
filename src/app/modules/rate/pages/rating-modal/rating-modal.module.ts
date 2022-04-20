import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StarsWidgetModule } from '@core/widgets/stars/stars.module';
import { RatingModalComponent } from './rating-modal.component';



@NgModule({
  exports: [RatingModalComponent],
  declarations: [RatingModalComponent],
  entryComponents: [RatingModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    StarsWidgetModule
  ]
})
export class RatingModalModule { }
