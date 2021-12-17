import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, Platform, ModalController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Globalization } from '@ionic-native/globalization/ngx';
import { timer } from 'rxjs';

import { PushService } from './core/services/push.service';
import { LinksService } from './core/services/links.service';
import { AuthService } from './modules/users/services/auth.service';
import { TraslationService } from '@core/language/traslation.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { SoporteChatPage } from '@modules/chat/pages/soporte/soporte.page';
import { PostContentsWidgetComponent } from './modules/contents/widget/post/post.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  appVersion: any = [];
  appPages = [
    { title: 'Home', url: '/home', },
    { title: 'Roster', url: '/roster' }
  ];

  menus = [ 'SIDEMENU.TERM_OF_USE', 'SIDEMENU.ABOUT' ];

  social = [
    { icon: 'star', name: 'SIDEMENU.RATING_APP' },
    { icon: 'logo-facebook', name: 'SIDEMENU.FANPAGE_FB' },
  ];

  user: any = [];

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private global: Globalization,
    private storage: StorageService,
    private pushService: PushService,
    private authService: AuthService,
    private linkService: LinksService,
    public traslate: TraslationService,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController,
  ) {
    this.onActive();
  }

  async ngOnInit() {
    this.initializeApp();
    await this.getLanguage();
  }

  initializeApp = () => {
    this.platform.ready().then(async () => {
      // this.toSplash();
      this.pushService.initPush();
      this.appVersion = await App.getInfo();
      this.user = await this.storage.getStorage('userClient');
    });
  };

  getLanguage = async () => {
    const { value } = await this.global.getPreferredLanguage();
    if (value) { this.traslate.use(value.split('-')[0]); }
    else { this.traslate.use('en');}
  };

  signOut = async () => {
    this.menu.close();
    const load = await this.loadCtrl.create({ duration: 3000, message: 'Loading...' });
    await load.present();
    this.authService.signOut();
    await load.dismiss();
  };

  toSplash = () => {
    timer(300).subscribe(async () => {
      await StatusBar.hide();
      SplashScreen.hide({fadeOutDuration: 200});
      this.linkService.onLinkFade('splash');
    });
  };

  onLink = (url: string) => this.linkService.onLink(url);

  onActive = () => {
    App.addListener('appStateChange', ({ isActive }) => {
      // if(isActive) { this.authService.decoded(); }
    });
  };

  onPost = async (title: string) => {
    const modal = await this.modalCtrl.create({
      component: PostContentsWidgetComponent,
      componentProps: { title }
    });
    await modal.present();
  };

  onModalChat = async () => {
    const modal = await this.modalCtrl.create({ component: SoporteChatPage });
    await modal.present();
  };

  onHelp = (title: string) => {
    // console.log('on Help');
  };
}
