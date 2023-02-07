import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Device, DeviceInfo } from '@capacitor/device';

import { AppService } from 'src/app/app.service';
import { PushService } from './core/services/push.service';
import { IntegratedService } from '@core/services/integrated.service';
import { ValidationTokenService } from '@core/services/validation-token.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  user: any;
  appVersion: any = [];

  constructor(
    private platform: Platform,
    private appService: AppService,
    private pushService: PushService,
    private modalCtrl: ModalController,
    private integrated: IntegratedService,
    private token: ValidationTokenService,
  ) {}
  ngOnDestroy(): void {
    console.log('On Destroy');
    this.modalCtrl.dismiss();
  }

  async ngOnInit() {
    this.initializeApp();
    this.appStateChange();
  }

  initializeApp = async (): Promise<void> => {
    await this.getLoadAppMobile();
    await this.platform.ready();
    this.appService.getBanner();
    this.appService.getLanguage();
    this.integrated.initStates();
    this.token.validate();
  };

  appStateChange = () => {
    App.addListener('appStateChange',
    async ({ isActive }) => {
      console.log('Is Active: ', isActive);
      if (isActive) {
        this.modalCtrl.dismiss();
        this.token.validate();
        this.getLoadAppMobile();
        this.integrated.initStates();
        this.appService.getLanguage();
      } else {
        this.modalCtrl.dismiss();
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
