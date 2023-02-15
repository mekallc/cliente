import { Store } from '@ngrx/store';
import { AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Device, DeviceInfo } from '@capacitor/device';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Globalization } from '@ionic-native/globalization/ngx';

import * as actions from  '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { TraslationService } from '@core/language/traslation.service';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  version$: BehaviorSubject<AppInfo> = new BehaviorSubject(null);

  constructor(
    private platform: Platform,
    private global: Globalization,
    public traslate: TraslationService,
    private uService: UtilsService,
    private store: Store<AppState>
  ) {}

  setVersion$  = (items: AppInfo) => this.version$.next(items);

  getVersion$  = (): Observable<AppInfo> => this.version$.asObservable();


  async getLanguage(): Promise<void> {
    const info: DeviceInfo = await Device.getInfo();
    if (info.platform !== 'web') {
      const { value } = await this.global.getPreferredLanguage();
      console.log(value);
      if (value) {
        this.traslate.use(value.split('-')[0]);
      } else {
        this.traslate.use('es');
      }
    }
  };

  async showSplash() {
    await this.platform.ready();
    if (this.platform.is('ios')) {
      const lottie = (window as any).lottie;
      await lottie.splashscreen.hide();
      await lottie.splashscreen.show('public/assets/splash.json', false);
    }
  }

  closeModal() {
    this.uService.modalDimiss();
  }

  async getBanner(): Promise<any> {
    const position: Position = await Geolocation.getCurrentPosition();
    if (position) {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.store.dispatch(actions.bannerLoad({ data }));
    }
  }
}
