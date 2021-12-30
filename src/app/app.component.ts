import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Globalization } from '@ionic-native/globalization/ngx';
import { timer } from 'rxjs';

import { PushService } from './core/services/push.service';
import { LinksService } from './core/services/links.service';
import { TraslationService } from '@core/language/traslation.service';
import { ValidationTokenService } from '@core/services/validation-token.service';

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
    private pushService: PushService,
    private linkService: LinksService,
    public traslate: TraslationService,
    private token: ValidationTokenService,
  ) { }

  async ngOnInit() {
    this.initializeApp();
    await this.getLanguage();
    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) { return; }
      this.token.validate();
    });
  }

  initializeApp = () => {
    this.platform.ready().then(async () => {
      // this.toSplash();
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
}
