import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyViewModalComponent } from './company-view-modal.component';
import * as mapbox from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';

(mapbox as any).accessToken = environment.mapbox;

@NgModule({
  exports: [CompanyViewModalComponent],
  declarations: [CompanyViewModalComponent],
  entryComponents: [CompanyViewModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    AgmCoreModule,
  ]
})

export class CompanyViewModalModule { }
