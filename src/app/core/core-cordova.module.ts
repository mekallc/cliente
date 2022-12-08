import { NgModule } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    Globalization,
    NativeStorage,
    NativeGeocoder,
    NativePageTransitions,
  ],
})
export class CoreCordovaModule { }
