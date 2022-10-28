import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { chatRoute } from './chat.routes';

@NgModule({
  imports: [
    chatRoute,
    IonicModule,
    CommonModule,
  ],
  providers: []
})
export class ChatModule { }
