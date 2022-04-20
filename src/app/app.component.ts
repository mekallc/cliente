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
import { GeolocationService } from '@core/services/geolocation.service';
import { CodeUserComponent } from '@modules/users/pages/code/code.component';
import { ValidationTokenService } from '@core/services/validation-token.service';

import * as actions from './store/actions';
import { IntegratedService } from '@core/services/integrated.service';

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
    private geo: GeolocationService,
    private storage: StorageService,
    private pushService: PushService,
    private linkService: LinksService,
    public traslate: TraslationService,
    private token: ValidationTokenService,
    private integratedService: IntegratedService,
  ) { }

  ngOnInit() {
    this.getCodePassword();
    this.initializeApp();
    this.userState();
    this.getLanguage();
    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        // this.userState();
        this.token.validate();
        this.store.dispatch(actions.expertLoad());
        // this.geo.currentPosition2();
        // this.integratedService.newAccepted();
      }
    });
  }

  initializeApp = () => {
    this.platform.ready().then(async () => {
      this.toSplash();
      this.pushService.initPush();

      this.integratedService.newAccepted();
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
    this.integratedService.getStatus();
    this.store.dispatch(actions.itemLoad());
    this.store.dispatch(actions.expertLoad());
    this.store.dispatch(actions.loadHistory());
    this.store.dispatch(actions.loadUser(user));
  };

  getCodePassword = async () => {
    // this.storage.removeStorage('oChange');
    // const { result } = await this.storage.getStorage('oChange');
    // if (result === 'OK') {
    //   const modal =await this.modalCtrl.create({ component: CodeUserComponent });
    //   modal.present();
    // }
  };
}
