/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { MomentModule } from 'ngx-moment';

import { AgmCoreModule } from '@agm/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { environment } from 'src/environments/environment';
import { CoreStoreModule } from '@store/core-store.module';
import ApiInterceptor from '@core/services/http.interceptor';

export function playerFactory() { return player; }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MomentModule,
    CoreStoreModule,
    LottieModule.forRoot({ player: playerFactory }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCLRF1U1vrDAqVmIdwMKTcnAEMylbvnkhY' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule { }
