import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConnectService } from '@modules/chat/services/connect.service';
import { IntegratedService } from '@core/services/integrated.service';
import { ChatService } from '@core/services/chat.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit, AfterViewInit {

  chats$: Observable<any>;
  total$: Observable<number|any>;
  count: number | 0;
  notification = false;


  constructor(
    private conn: ConnectService,
    private chatService: ChatService,
    private intService: IntegratedService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.intService.pageStates();
    await this.intService.onServiceStatus();
  }

  ngAfterViewInit() {
    console.log('PAGES PAGE');
    this.getServiceStatus();
  }

  getServiceStatus() {
    this.intService.onServiceStatus();
    this.chatService.getMessage()
    .subscribe(res => console.log(res));
  }

  getChatNotification = (item: any) => {
    this.total$ = this.conn.unReadMessage(item).pipe(map((res: any) => res?.length));
  };



  private sum = (items: any) => items.reduce((a: any, b: any) => a + (b.unread || 0), 0);


}
