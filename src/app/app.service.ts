import { Store } from '@ngrx/store';
import { AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Device, DeviceInfo } from '@capacitor/device';
import { Globalization } from '@ionic-native/globalization/ngx';
import {
  AppTrackingTransparency,
  AppTrackingStatusResponse,
} from 'capacitor-plugin-app-tracking-transparency';
import { Capacitor } from '@capacitor/core';

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
  ) { }

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


  async validateTracking() {
    if (Capacitor.getPlatform() === 'ios') {
      const { status }: AppTrackingStatusResponse = await AppTrackingTransparency.getStatus();
      if (status !== 'authorized') {
        await AppTrackingTransparency.requestPermission();
      }
    }
  }
}
