import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPage } from './chat.page';



@NgModule({
  declarations: [ChatPage],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ChatModule { }
