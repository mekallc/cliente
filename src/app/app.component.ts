import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';

import { AppService } from 'src/app/app.service';
import { PushService } from './core/services/push.service';
import { IntegratedService } from '@core/services/integrated.service';
import { GeolocationService } from '@core/services/geolocation.service';
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
    private appService: AppService,
    private geo: GeolocationService,
    private pushService: PushService,
    private integrated: IntegratedService,
    private token: ValidationTokenService,
  ) {}

  ngOnInit() {
    this.initializeApp();
    this.appStateChange();
  }

  initializeApp = async (): Promise<void> => {
    const info = await Device.getInfo();
    if (info.platform !== 'web') {
      this.pushService.initPush();
      this.appVersion = await App.getInfo();
      this.appService.setVersion$(this.appVersion);
    }
    await this.platform.ready();
    this.appService.getLanguage();
    this.integrated.initStates();
    this.token.validate();
    // this.integrated.onSync();
  };

  appStateChange = () => {
    App.addListener('appStateChange',
    async ({ isActive }) => {
      if (isActive) {
        this.appService.getLanguage();
        this.token.validate();
        this.integrated.initStates();
        this.geo.currentPosition2();
      }
    });
  };

  activate = (ev: any) => console.log('Component:', ev);

}
