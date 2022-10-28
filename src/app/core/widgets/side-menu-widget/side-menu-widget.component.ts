import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@modules/users/services/auth.service';
import { Observable } from 'rxjs';
import { PostContentsWidgetComponent } from '@modules/contents/widget/post/post.component';
import { RateApp } from 'capacitor-rate-app';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Browser, OpenOptions } from '@capacitor/browser';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-side-menu-widget',
  templateUrl: './side-menu-widget.component.html',
  styleUrls: ['./side-menu-widget.component.scss'],
})
export class SideMenuWidgetComponent implements OnInit, AfterViewInit {

  @Input() appVersion: any;
  user$: Observable<any>;
  score$: Observable<any>;

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
    private store: Store<AppState>,
    private uService: UtilsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user$ = this.store.select('user')
      .pipe(map((res: any) => res.user));
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.score$ = this.store.select('score')
    .pipe(
      filter(row => !row.loading),
      map(({ item }: any) => item),
    );
    this.score$.subscribe(res => console.log(res));
  }


  async signOut(): Promise<void> {
    this.menu.close();
    await this.uService.load({ duration: 3000, message: 'Loading...' });
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
