import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCordovaModule } from '@core/core-cordova.module';
import { SideMenuWidgetComponent } from './side-menu-widget.component';


@NgModule({
  exports: [SideMenuWidgetComponent],
  declarations: [SideMenuWidgetComponent],
  entryComponents: [SideMenuWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    CoreCordovaModule
  ]
})
export class SideMenuWidgetModule { }
