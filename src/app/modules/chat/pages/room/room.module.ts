import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomChatPage } from './room.page';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageWidgetModule } from '../../widget/message/message.module';
import { CoreModule } from '@core/core.module';

const routes: Routes = [
  { path: ':uid', component: RoomChatPage }
];

@NgModule({
  imports: [
    CoreModule,
    IonicModule,
    FormsModule,
    CommonModule,
    MessageWidgetModule,
    RouterModule.forChild(routes),
  ],
  exports: [RoomChatPage],
  declarations: [RoomChatPage],
})
export class RoomChatPageModule {}
