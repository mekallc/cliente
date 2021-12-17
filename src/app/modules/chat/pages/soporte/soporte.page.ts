import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { ConnectService } from './../../services/connect.service';

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
    private conn: ConnectService,
    private storage: StorageService,
    private modalCtrl: ModalController,
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
    this.storage.getStorage('userClient').then((user) => {
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

  onClose = () => this.modalCtrl.dismiss();

  logScrolling(ev: any) {
    // console.log(ev);
  };
}
