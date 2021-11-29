import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SolicitudPage } from './solicitud.page';
import { PartsComponent } from './../../widgets/parts/parts.component';
import { SolicitudPageRoutingModule } from './solicitud-routing.module';
import { HeaderModule } from 'src/app/core/widgets/header/header.module';
import { MechanicsComponent } from '../../widgets/mechanics/mechanics.component';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    SolicitudPageRoutingModule
  ],
  declarations: [
    SolicitudPage,
    PartsComponent,
    MechanicsComponent,
  ],
  exports: [SolicitudPage]
})
export class SolicitudCategoriesModule {}
