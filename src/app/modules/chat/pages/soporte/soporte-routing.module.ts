import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoporteChatPage } from './soporte.page';

const routes: Routes = [
  {
    path: '',
    component: SoporteChatPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoporteChatPageRoutingModule {}
