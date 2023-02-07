import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IntegratedService } from '@core/services/integrated.service';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { UtilsService } from '@core/services/utils.service';

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
    await this.intService.setTokenPushOnUser();
  }

  ngAfterViewInit() {
  }

  getChatNotification = (item: any) => {

  };

  private sum = (items: any) => items.reduce((a: any, b: any) => a + (b.unread || 0), 0);


}
