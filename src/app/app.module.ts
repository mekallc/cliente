import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { appRoute } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { environment } from 'src/environments/environment';
import { CoreCordovaModule } from '@core/core-cordova.module';
import { LanguageModule } from '@core/language/language.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    appRoute,
    CoreModule,
    BrowserModule,
    LanguageModule,
    LanguageModule,
    TranslateModule,
    HttpClientModule,
    CoreCordovaModule,
    IonicModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
