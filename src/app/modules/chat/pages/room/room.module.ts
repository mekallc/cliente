import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomChatPage } from './room.page';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

const routes: Routes = [
  { path: ':uid', component: RoomChatPage }
];

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    MomentModule,
    RouterModule.forChild(routes),
  ],
  exports: [RoomChatPage],
  declarations: [RoomChatPage],
})
export class RoomChatPageModule {}
