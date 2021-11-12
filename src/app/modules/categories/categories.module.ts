import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { categoriesRoute } from 'src/app/modules/categories/categories.routes';



@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    categoriesRoute,
  ]
})
export class CategoriesModule { }
