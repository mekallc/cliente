import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { LinksService } from '@core/services/links.service';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { StorageService } from '@core/services/storage.service';
import { AuthService } from '@modules/users/services/auth.service';
import { SoporteChatPage } from '@modules/chat/pages/soporte/soporte.page';
import { PostContentsWidgetComponent } from '@modules/contents/widget/post/post.component';
import { RateApp } from 'capacitor-rate-app';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { UserModel } from '@core/model/user.interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-menu-widget',
  templateUrl: './side-menu-widget.component.html',
  styleUrls: ['./side-menu-widget.component.scss'],
})
export class SideMenuWidgetComponent implements OnInit {
  appVersion: any = [];
  appPages = [
    { title: 'Home', url: '/home', },
    { title: 'Roster', url: '/roster' }
  ];

  menus = [ 'SIDEMENU.TERM_OF_USE', 'SIDEMENU.ABOUT' ];

  social = [
    { icon: 'logo-facebook', name: 'SIDEMENU.FANPAGE_FB', url: 'https://www.facebook.com/Meka-108821827303515' },
  ];

  user$: Observable<UserModel>;

  constructor(
    private menu: MenuController,
    private store: Store<AppState>,
    private storage: StorageService,
    private authService: AuthService,
    private linkService: LinksService,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.initialize();
    this.user$ = this.store.select('user').pipe(map((res: any) => res.user));
  }

  initialize = async () => {
    this.appVersion = await App.getInfo();
    console.log(this.appVersion);
  };

  signOut = async () => {
    this.menu.close();
    const load = await this.loadCtrl.create({ duration: 3000, message: 'Loading...' });
    await load.present();
    this.authService.signOut();
    await load.dismiss();
  };

  onLink = (url: string) => this.linkService.onLink(url);

  onPost = async (title: string) => {
    const modal = await this.modalCtrl.create({
      component: PostContentsWidgetComponent, componentProps: { title }
    });
    await modal.present();
  };

  onModalChat = async () => {
    this.linkService.onLink('chat/soporte');
    // const modal = await this.modalCtrl.create({ component: SoporteChatPage });
    // await modal.present();
  };

  onAppRate = async () => {
    const info = await RateApp.requestReview();
    console.log(info);
  };
}
