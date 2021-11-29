import { NgModule } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    HTTP,
    Globalization,
    NativePageTransitions,
  ],
})
export class CoreCordovaModule { }
