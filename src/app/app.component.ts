import { loadService } from './store/actions/service.actions';
import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Globalization } from '@ionic-native/globalization/ngx';
import { timer } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '@store/app.state';
import { PushService } from './core/services/push.service';
import { LinksService } from './core/services/links.service';
import { StorageService } from '@core/services/storage.service';
import { TraslationService } from '@core/language/traslation.service';
import { ValidationTokenService } from '@core/services/validation-token.service';
import { loadHistory, loadUser, loadInProcess, loadAccepted } from '@store/actions';
import { GeolocationService } from '@core/services/geolocation.service';
import { CodeUserComponent } from '@modules/users/pages/code/code.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  user: any = [];
  appVersion: any = [];

  constructor(
    private platform: Platform,
    private global: Globalization,
    private store: Store<AppState>,
    private storage: StorageService,
    private pushService: PushService,
    private linkService: LinksService,
    public traslate: TraslationService,
    private modalCtrl: ModalController,
    private token: ValidationTokenService,
    private geo: GeolocationService
  ) { }

  ngOnInit() {
    this.getCodePassword();
    this.initializeApp();
    this.userState();
    this.getLanguage();
    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) { return; }
      this.token.validate();
      this.geo.currentPosition2();
    });
  }

  initializeApp = () => {
    this.platform.ready().then(async () => {
      this.toSplash();
      this.pushService.initPush();
      this.appVersion = await App.getInfo();
    });
  };

  getLanguage = async () => {
    const { value } = await this.global.getPreferredLanguage();
    if (value) { this.traslate.use(value.split('-')[0]); }
    else { this.traslate.use('en');}
  };

  toSplash = () => {
    timer(300).subscribe(async () => {
      await StatusBar.hide();
      SplashScreen.hide({fadeOutDuration: 200});
      this.linkService.onLinkFade('splash');
    });
  };

  userState = async () => {
    const user = await this.storage.getStorage('userClient');
    if (!user) { return; }
    this.store.dispatch(loadUser(user));
    this.store.dispatch(loadInProcess());
    this.store.dispatch(loadAccepted());
    this.store.dispatch(loadHistory());
    this.store.dispatch(loadService({ status: 'OPEN' }));
  };

  getCodePassword = async () => {
    this.storage.removeStorage('oChange');
    const { result } = await this.storage.getStorage('oChange');
    if (result === 'OK') {
      const modal =await this.modalCtrl.create({ component: CodeUserComponent });
      modal.present();
    }
  };
}
