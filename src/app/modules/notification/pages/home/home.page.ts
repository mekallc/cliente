import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '@modules/chat/services/connect.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  chats$: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private chatService: ConnectService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    const items$ = this.store.select('accepted').pipe(filter((row: any) => !row.loading), map((res: any) => res.accepted));
    items$.pipe().subscribe((res: any) => {
      console.log(res);
      if (res.company_request !== null) {
        this.chats$ = this.chatService.unReadMessageServiceChat(res);
      }
    });
  };

  goToChat = (item: any) =>
    this.router.navigate(['/chat', 'room', item.code, item.company_request.id]);
}
