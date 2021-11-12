import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFactoriesWidgetComponent } from './search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [SearchFactoriesWidgetComponent],
  declarations: [SearchFactoriesWidgetComponent],
  entryComponents: [SearchFactoriesWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class SearchFactoriesModule { }
