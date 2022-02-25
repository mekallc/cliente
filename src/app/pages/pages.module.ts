import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPage } from './pages.page';
import { pagesRoute } from './pages.routes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    pagesRoute,
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [PagesPage]
})
export class PagesPageModule {}
