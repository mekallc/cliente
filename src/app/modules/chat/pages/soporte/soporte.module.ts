import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SoporteChatPage } from './soporte.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { Routes, RouterModule } from '@angular/router';
import { MessageWidgetModule } from '@modules/chat/widget/message/message.module';
import { CoreModule } from '@core/core.module';

const routes: Routes = [
  { path: '', component: SoporteChatPage, }
];

@NgModule({
  imports: [
    CoreModule,
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    MessageWidgetModule,
    RouterModule.forChild(routes),
  ],
  exports: [SoporteChatPage],
  declarations: [SoporteChatPage],
})
export class SoporteChatPageModule {}
