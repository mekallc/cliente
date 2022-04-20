import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { ConnectService } from './../../services/connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-soporte-chat',
  templateUrl: 'soporte.page.html',
  styleUrls: ['soporte.page.scss'],
})

export class SoporteChatPage implements OnInit, AfterViewInit {
  @Input() user: any;
  @ViewChild('content') content: IonContent;
  @ViewChild('msg', { read: ElementRef }) msg: ElementRef;
  items: any;
  message = '';
  format = 'dd/MM HH:mm';
  items$: Observable<any>;

  constructor(
    private router: Router,
    private conn: ConnectService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.onCreateRoom();
    this.items$ = this.conn.getMessages();
  }

  ngAfterViewInit() {
    setTimeout(() => this.content.scrollToBottom(300), 100);
    this.conn.readMessage().subscribe((res) => {});
  }
  onCreateRoom = () => {
    this.storage.getStorage('userCompany').then((user) => {
      this.conn.getChatId(user.email).subscribe(async (res) => {
        this.items = res;
        if(res) { return; }
        await this.conn.createMessageId(user);
      });
    });
  };

  sendMessageKeypress = (ev: any) => {
    if (ev !== 13) { return; }
    this.sendMessage();
  };

  sendMessage = () => {
    if (this.message.length === 0) { return; }
    this.conn.sendMessage('cliente01@gmail.com', this.message);
    this.message = '';
  };

  onClose = () => this.router.navigate(['']);

  logScrolling(ev: any) { };
}
