import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { MomentModule } from 'ngx-moment';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import ApiInterceptor from '@core/services/http.interceptor';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { LanguageModule } from '@core/language/language.module';
import { TranslateModule } from '@ngx-translate/core';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function playerFactory() { return player; }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MomentModule,
    LanguageModule,
    LanguageModule,
    TranslateModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxMapboxGLModule.withConfig({ accessToken: environment.mapbox, }),
    AgmCoreModule.forRoot({ apiKey: environment.maps, libraries: ['places'] }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule { }
