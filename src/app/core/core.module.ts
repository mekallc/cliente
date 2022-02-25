/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { MomentModule } from 'ngx-moment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { EffectsArray } from 'src/app/store/effects';
import { ROOT_REDUCERS } from 'src/app/store/app.state';
import ApiInterceptor from '@core/services/http.interceptor';

export function playerFactory() { return player; }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MomentModule,
    LottieModule.forRoot({ player: playerFactory }),
    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({ name: 'TEST', maxAge: 25 }),
    EffectsModule.forRoot(EffectsArray),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule { }
