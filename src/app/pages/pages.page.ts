import { Component, OnInit } from '@angular/core';
import { ConnectService } from '@modules/chat/services/connect.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  chats$: Observable<any>;
  count: number | 0;

  constructor(
    private store: Store<AppState>,
    private chatService: ConnectService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    const items$ = this.store.select('accepted').pipe(filter((row: any) => !row.loading), map((res: any) => res.accepted));
    items$.pipe().subscribe((res: any) => {
      this.chatService.unReadMessageServiceChat(res).subscribe((one: any) => {
        this.count = this.sum(one);
      });
    });
  };

  private sum = (items: any) => items.reduce((a: any, b: any) => a + (b.unread || 0), 0);
}
