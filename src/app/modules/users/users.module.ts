import { NgModule } from '@angular/core';
import { userRoute } from './users.routes';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    userRoute,
    IonicModule,
    CommonModule,
  ]
})
export class UsersModule { }
