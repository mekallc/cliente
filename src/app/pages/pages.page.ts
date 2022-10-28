import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConnectService } from '@modules/chat/services/connect.service';
import { IntegratedService } from '@core/services/integrated.service';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { UtilsService } from '@core/services/utils.service';
import { RatingModalComponent } from '@modules/rate/pages/rating-modal/rating-modal.component';
import { RateComponent } from '@modules/rate/rate.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit, AfterViewInit {

  count: number | 0;
  chats$: Observable<any>;
  notification = false;
  total$: Observable<number|any>;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private intService: IntegratedService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.intService.pageStates();
    await this.intService.onServiceStatus();
    await this.intService.setTokenPushOnUser();
  }

  ngAfterViewInit() {
    this.getServiceStatus();
    this.setRating();
  }

  getServiceStatus() {
    this.intService.onServiceStatus();
  }

  getChatNotification = (item: any) => {

  };

  setRating() {
    this.store.select('item')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.item)
    )
    .subscribe(async (res: any) => {
      if (res && res.status === 'finished') {
        await this.uService.modal({
          mode: 'ios',
          initialBreakpoint: 0.9,
          breakpoints: [0, 0.5, 1],
          component: RateComponent,
          componentProps: { service: res }
        });
      }
    });
  }

  private sum = (items: any) => items.reduce((a: any, b: any) => a + (b.unread || 0), 0);


}
