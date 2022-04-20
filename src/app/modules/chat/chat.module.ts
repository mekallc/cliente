import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { chatRoute } from './chat.routes';

@NgModule({
  declarations: [],
  imports: [
    chatRoute,
    IonicModule,
    CommonModule,
  ]
})
export class ChatModule { }
