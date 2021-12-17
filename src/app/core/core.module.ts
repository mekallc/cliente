import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { MomentModule } from 'ngx-moment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import ApiInterceptor from '@core/services/http.interceptor';
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function playerFactory() { return player; }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MomentModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule { }
