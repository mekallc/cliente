import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@modules/users/services/auth.service';
import { Observable } from 'rxjs';
import { PostContentsWidgetComponent } from '@modules/contents/widget/post/post.component';
import { RateApp } from 'capacitor-rate-app';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { Browser, OpenOptions } from '@capacitor/browser';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-side-menu-widget',
  templateUrl: './side-menu-widget.component.html',
  styleUrls: ['./side-menu-widget.component.scss'],
})
export class SideMenuWidgetComponent implements AfterViewInit {

  @Input() appVersion: any;
  user$: Observable<any>;
  score$: Observable<any>;
  user: any;
  appPages = [
    { title: 'Home', url: '/home', },
    { title: 'Roster', url: '/roster' }
  ];

  menus = [ 'SIDEMENU.TERM_OF_USE' ];

  social = [
    {
      icon: 'logo-facebook',
      name: 'SIDEMENU.FANPAGE_FB',
      url: 'https://www.facebook.com/Meka-108821827303515'
    }
  ];


  constructor(
    private menu: MenuController,
    private uService: UtilsService,
    private authService: AuthService,
    private storage: StorageService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    this.user = await this.storage.getStorage('oUser');
  }



  async signOut(): Promise<void> {
    this.menu.close();
    await this.uService.load({ duration: 1500, message: 'Loading...' });
    this.authService.signOut();
  };

  onLink(url: string): void {
    this.menu.close();
    this.uService.navigate(url);
  }

  async onPost(title: string): Promise<void> {
    this.menu.close();
    await this.uService.modal({
      component: PostContentsWidgetComponent,
      componentProps: { title }
    });
  };

  onModalChat(): void {
    this.uService.navigate('chat/soporte');
  };

  async onAppRate(): Promise<void>{
    await RateApp.requestReview();
  };

  async openBrowser(url: string): Promise<void>{
    const options: OpenOptions = { url, toolbarColor: '#222428' };
    await Browser.open(options);
  };

  getName(first: string, last: string): string {
    if (first) {
      const a = first.slice(0,1);
      const b = last.slice(0,1);
      const value = a + b;
      return value;
    }
    return `mk`;
  };
}
