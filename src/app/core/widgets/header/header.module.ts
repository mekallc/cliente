import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { SearchFactoriesModule } from 'src/app/modules/factories/widgets/search/search.module';


@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    IonicModule,
    CommonModule,
    SearchFactoriesModule,
  ]
})
export class HeaderModule { }
