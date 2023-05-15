import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Device, DeviceInfo } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { AppService } from 'src/app/app.service';
import { PushService } from './core/services/push.service';
import { IntegratedService } from '@core/services/integrated.service';
import { ValidationTokenService } from '@core/services/validation-token.service';
import { NavigationEnd, Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  user: any;
  appVersion: any = [];

  constructor(
    private router: Router,
    private platform: Platform,
    private appService: AppService,
    private pushService: PushService,
    private modalCtrl: ModalController,
    private integrated: IntegratedService,
    private token: ValidationTokenService,
    private gtmService: GoogleTagManagerService,
  ) {
    this.initializeApp();
    this.router.events.forEach((item: any): void => {
      if (item instanceof NavigationEnd) {
        this.gtmService.pushTag({ event: 'page', pageName: item.url });
      }
    });
  }
  ngOnDestroy(): void {
    console.log('On Destroy');
    this.modalCtrl.dismiss();
  }

  async ngOnInit() {
    this.initializeApp();
    this.appStateChange();
    await this.getLoadAppMobile();
    this.appService.getBanner();
    this.appService.getLanguage();
    this.integrated.initStates();
    this.token.validate();
  }

  initializeApp(): void {
    this.platform.ready().then(async () => {
      this.appService.validateTracking();
      if (Capacitor.getPlatform() !== 'web') {
        await StatusBar.hide();
        this.router.navigateByUrl('splash');
      }
    });
  };

  appStateChange = () => {
    App.addListener('appStateChange',
    async ({ isActive }) => {
      if (isActive) {
        this.token.validate();
        this.getLoadAppMobile();
        this.integrated.initStates();
        this.appService.getLanguage();
      }
    });
  };

  activate(ev: any) {
    console.log(ev);
    return null;
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
