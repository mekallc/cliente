import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeWidgetComponent } from 'src/app/modules/categories/widgets/home/home.component';



@NgModule({
  declarations: [HomeWidgetComponent],
  exports: [HomeWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ]
})
export class CategoriesWidgetModule { }
