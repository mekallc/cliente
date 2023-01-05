import { Injectable } from '@angular/core';
import { App, AppInfo } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { TraslationService } from '@core/language/traslation.service';
import { UtilsService } from '@core/services/utils.service';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import * as actions from  '@store/actions';

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


  getLanguage = async () => {
    const { value } = await this.global.getPreferredLanguage();
    console.log('GLOBAL ', value);
    if (value) { this.traslate.use(value.split('-')[0]); }
    else { this.traslate.use('en');}
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
