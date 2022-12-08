import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Device, DeviceInfo } from '@capacitor/device';

import { AppService } from 'src/app/app.service';
import { PushService } from './core/services/push.service';
import { IntegratedService } from '@core/services/integrated.service';
import { ValidationTokenService } from '@core/services/validation-token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  user: any;
  appVersion: any = [];

  constructor(
    private platform: Platform,
    private appService: AppService,
    private pushService: PushService,
    private integrated: IntegratedService,
    private token: ValidationTokenService,
  ) {}

  async ngOnInit() {
    this.initializeApp();
    this.appStateChange();
  }

  initializeApp = async (): Promise<void> => {
    await this.getLoadAppMobile();
    await this.platform.ready();
    this.appService.getLanguage();
    this.integrated.initStates();
    this.token.validate();
  };

  appStateChange = () => {
    App.addListener('appStateChange',
    async ({ isActive }) => {
      if (isActive) {
        this.token.validate();
        this.getLoadAppMobile();
        this.integrated.initStates();
        this.appService.getLanguage();
      } else {
        this.appService.closeModal();
      }
    });
  };

  activate(ev: any) {
    console.log('Component:', ev);
  }

  private async getLoadAppMobile(): Promise<void> {
    const info: DeviceInfo = await Device.getInfo();
    if (info.platform !== 'web') {
      this.pushService.initPush();
      this.appVersion = await App.getInfo();
      this.appService.setVersion$(this.appVersion);
    }
  }
}
