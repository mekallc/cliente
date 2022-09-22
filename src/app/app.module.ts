import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { appRoute } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { AppService } from 'src/app/app.service';
import { FirebaseModule } from '@core/firebase.module';
import { CoreStoreModule } from '@store/core-store.module';
import { CoreCordovaModule } from '@core/core-cordova.module';
import { KeycloakModule } from '@core/keycloak/keycloak.module';
import { SideMenuWidgetModule } from '@core/widgets/side-menu-widget/side-menu-widget.module';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    appRoute,
    CoreModule,
    BrowserModule,
    FirebaseModule,
    KeycloakModule,
    CoreStoreModule,
    CoreCordovaModule,
    SideMenuWidgetModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
  ],
  providers: [
    AppService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
