import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { appRoute } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { CoreCordovaModule } from '@core/core-cordova.module';
import { LanguageModule } from '@core/language/language.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    appRoute,
    CoreModule,
    BrowserModule,
    LanguageModule,
    TranslateModule,
    HttpClientModule,
    CoreCordovaModule,
    IonicModule.forRoot(),
    AngularFireStorageModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    providePerformance(() => getPerformance()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),


  ],
  providers: [
    ScreenTrackingService,UserTrackingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: BUCKET, useValue: 'meka-app' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
