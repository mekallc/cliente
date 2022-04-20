import { NgModule } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    HTTP,
    PhotoViewer,
    Globalization,
    NativeStorage,
    NativeGeocoder,
    NativePageTransitions,
  ],
})
export class CoreCordovaModule { }
